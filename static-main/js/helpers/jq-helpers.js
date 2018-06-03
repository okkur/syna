import serialize from './serialize';

function $(selector) {
  const nodes = Array.from(document.querySelectorAll(selector));

  return {
    $nodes: nodes,
    on: (event, callback) => nodes.forEach(node => node[`on${event}`] = callback),
    addClass: className => nodes.forEach(node => node.classList.add(className)),
    removeClass: className => nodes.forEach(node => node.classList.remove(className)),
    attr: (attribute, value) => {
      if (value === undefined && nodes.length > 1) {
        throw new Error('Can\'t access value of several nodes\' attributes');
      }

      if (value === undefined) {
        return nodes[0].getAttribute(attribute);
      } else {
        nodes.forEach(node => node.setAttribute(attribute, value));
      }
    },
    submit: () => nodes.forEach(node => node.submit()),
    serialize: () => {
      if (nodes.length > 1) {
        throw new Error('Can\'t serialize forms at once');
      }

      return serialize(nodes[0]);
    },
    length: nodes.length,
  }
}

$.scrollTo = function scrollTo(element, to, duration) {
  if (duration <= 0) return;
  var difference = to - element.scrollTop;
  var perTick = difference / duration * 10;

  setTimeout(function() {
      element.scrollTop = element.scrollTop + perTick;
      if (element.scrollTop === to) return;
      scrollTo(element, to, duration - 10);
  }, 10);
}

$.ajax = function ajax({
  method,
  url,
  data,
}) {
  const xhr = new XMLHttpRequest();
  xhr.open(method.toUpperCase(), url);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(data);

  return new Promise((resolve, reject) => {
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            resolve(JSON.parse(xhr.responseXML));
        } else {
            reject(xhr.statusText);
        }
      }
    }
  })
}

$.post = (url, data) => $.ajax({ method: 'post', url, data })

export default $;
