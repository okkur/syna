function $(selector) {
  const nodes = Array.from(document.querySelectorAll(selector));

  return {
    $nodes: nodes,
    on: (event, callback) => nodes.forEach(node => node[`on${event}`] = callback),
    addClass: className => nodes.forEach(node => node.classList.add(className)),
    removeClass: className => nodes.forEach(node => node.classList.remove(className)),
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

export default $;
