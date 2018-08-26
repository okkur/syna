import Fuse from 'fuse.js';

import $ from './helpers/jq-helpers';

const summaryInclude = 60;
const fuseOptions = {
  shouldSort: true,
  includeMatches: true,
  threshold: 0.0,
  tokenize: true,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    { name: 'title', weight: 0.8 },
    { name: 'contents', weight: 0.5 },
    { name: 'tags', weight: 0.3 },
    { name: 'categories', weight: 0.3 }
  ]
};

const searchQuery = param('s');
const searchInput = $('#search-query');
searchInput.val(searchQuery);
searchInput.on('input', e => search(e.target.value));
search(searchQuery);

function search(query) {
  if (!query) {
    return $('#search-results').html('<p>Please enter a word or phrase above</p>');
  }

  executeSearch(query);
}

function executeSearch(query) {
  $.ajax({ method: 'get', url: '/index.json' })
    .then(data => {
      const pages = data;
      const fuse = new Fuse(pages, fuseOptions);
      const matches = fuse.search(query);
      console.log(matches)
      if (matches.length > 0) {
        populateResults(matches, query);
      } else {
        $('#search-results').html('<p>No matches found</p>');
      }
    });
}

function populateResults(result, query) {
  let finalHTML = '';
  result.forEach((value, key) => {
    const { contents } = value.item;
    if (!contents) return;

    let snippet = '';
    const snippetHighlights = [];
    if (fuseOptions.tokenize) {
      snippetHighlights.push(query);
    } else {
      value.matches.forEach(mvalue => {
        if (mvalue.key === 'tags' || mvalue.key === 'categories') {
          snippetHighlights.push(mvalue.value);
        } else if (mvalue.key === 'contents') {
          start =
            mvalue.indices[0][0] - summaryInclude > 0
              ? mvalue.indices[0][0] - summaryInclude
              : 0;
          end =
            mvalue.indices[0][1] + summaryInclude < contents.length
              ? mvalue.indices[0][1] + summaryInclude
              : contents.length;
          snippet += contents.substring(start, end);
          snippetHighlights.push(
            mvalue.value.substring(
              mvalue.indices[0][0],
              mvalue.indices[0][1] - mvalue.indices[0][0] + 1
            )
          );
        }
      });
    }

    if (snippet.length < 1) {
      snippet += contents.substring(0, summaryInclude * 2);
    }
    //pull template from hugo templarte definition
    const templateDefinition = $('#search-result-template').html();
    //replace values
    let output = render(templateDefinition, {
      key: key,
      title: value.item.title,
      link: value.item.permalink,
      tags: value.item.tags,
      categories: value.item.categories,
      snippet: snippet
    });

    snippetHighlights.forEach(snipvalue => {
      const node = $('#summary-' + key);
      if (!node.length) return;

      output = output.replace(new RegExp(snipvalue, 'img'), `<mark>${snipvalue}</mark>`);
    });
    finalHTML += output;
  });
  $('#search-results').html(finalHTML);
}

function param(name) {
  return decodeURIComponent(
    (location.search.split(name + '=')[1] || '').split('&')[0]
  ).replace(/\+/g, ' ');
}

function render(templateString, data) {
  let conditionalMatches, conditionalPattern, copy;
  conditionalPattern = /\$\{\s*isset ([a-zA-Z]*) \s*\}(.*)\$\{\s*end\s*}/g;
  //since loop below depends on re.lastInxdex, we use a copy to capture any manipulations whilst inside the loop
  copy = templateString;
  while (
    (conditionalMatches = conditionalPattern.exec(templateString)) !== null
  ) {
    if (data[conditionalMatches[1]]) {
      //valid key, remove conditionals, leave contents.
      copy = copy.replace(conditionalMatches[0], conditionalMatches[2]);
    } else {
      //not valid, remove entire section
      copy = copy.replace(conditionalMatches[0], '');
    }
  }
  templateString = copy;
  //now any conditionals removed we can do simple substitution
  let key, find, re;
  for (key in data) {
    find = '\\$\\{\\s*' + key + '\\s*\\}';
    re = new RegExp(find, 'g');
    templateString = templateString.replace(re, data[key]);
  }
  return templateString;
}
