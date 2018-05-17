import $ from './helpers/jq-helpers';

(function() {
  handleScroll()
  window.onscroll = handleScroll;
  $('.scroll-to-top').on('click', scrollToTop);
})();

function handleScroll() {
  if (window.scrollY > window.innerHeight / 2) {
    $('.scroll-to-top').removeClass('d-none');
  } else {
    $('.scroll-to-top').addClass('d-none');
  }
}

function scrollToTop() {
  $.scrollTo(document.body, 0, 250)
}
