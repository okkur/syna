import $ from 'jquery';

$(function() {
  handleScroll()
  $(window).on('scroll', handleScroll);
  $('.scroll-to-top').on('click', scrollToTop);
});

function handleScroll() {
  if (window.scrollY > window.innerHeight / 2) {
    $('.scroll-to-top').removeClass('d-none');
  } else {
    $('.scroll-to-top').addClass('d-none');
  }
}

function scrollToTop() {
  $('html,body').animate({ scrollTop: 0 }, 'slow');
}
