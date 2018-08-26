import Fuse from 'fuse.js';

import $ from './helpers/jq-helpers';

class SynaSearch {
  constructor({ queryParam, searchInput, resultsContainer, template }) {
    this.resultsContainer = resultsContainer;
    this.template = template;
    this.fuseOptions = {
      shouldSort: true,
      threshold: 0.6,
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
  
    this.summaryInclude = 60;
    this.indexCache = null;

    const searchQuery = this.param(queryParam);
    searchInput.val(searchQuery);
    searchInput.on('input', e => this.search(e.target.value));
    this.search(searchQuery);
  }

  getIndex(callback) {
    if (this.indexCache) {
      return callback(this.indexCache);
    }

    $.ajax({ method: 'get', url: '/index.json' }).then(data => {
      this.indexCache = data;
      callback(data);
    });
  }

  search(query) {
    if (!query) {
      return this.resultsContainer.html('<p>Please enter a word or phrase above</p>');
    }

    this.getIndex(data => {
      const pages = data;
      const fuse = new Fuse(pages, this.fuseOptions);
      const matches = fuse.search(query);
      console.log(matches)
      if (matches.length > 0) {
        this.populateResults(matches, query);
      } else {
        this.resultsContainer.html('<p>No matches found</p>');
      }
    });
  }

  populateResults(result, query) {
    let finalHTML = '';
    result.forEach((value, key) => {
      const { contents } = value.item;
      if (!contents) return;

      let snippet = '';
      const snippetHighlights = [];
      if (this.fuseOptions.tokenize) {
        snippetHighlights.push(query);
      } else {
        value.matches.forEach(mvalue => {
          if (mvalue.key === 'tags' || mvalue.key === 'categories') {
            snippetHighlights.push(mvalue.value);
          } else if (mvalue.key === 'contents') {
            const start =
              mvalue.indices[0][0] - this.summaryInclude > 0
                ? mvalue.indices[0][0] - this.summaryInclude
                : 0;
            const end =
              mvalue.indices[0][1] + this.summaryInclude < contents.length
                ? mvalue.indices[0][1] + this.summaryInclude
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
        snippet += contents.substring(0, this.summaryInclude * 2);
      }
      //pull template from hugo templarte definition
      const templateDefinition = this.template.html();
      //replace values
      let output = this.render(templateDefinition, {
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
    this.resultsContainer.html(finalHTML);
  }

  param(name) {
    return decodeURIComponent(
      (location.search.split(name + '=')[1] || '').split('&')[0]
    ).replace(/\+/g, ' ');
  }

  render(templateString, data) {
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
}

new SynaSearch({
  queryParam: 's',
  searchInput: $('#search-query'),
  resultsContainer: $('#search-results'),
  template: $('#search-result-template'),
});
