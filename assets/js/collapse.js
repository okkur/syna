import $ from './helpers/jq-helpers';

const collapse = $('[data-toggle="collapse"]');

collapse.on('click', function (e) {
  const target = $(this).attr('data-target');

  if ($(this).attr('aria-expanded') === 'true') {
    hideCollapse(this, target);
  } else {
    showCollapse(this, target);
  }
});

const hideCollapse = function (el, target) {
  $(el).attr('aria-expanded', 'false');
  $(el).addClass('collapsed');
  $(target).removeClass('show');
};

const showCollapse = function (el, target) {
  $(el).attr('aria-expanded', 'true');
  $(el).removeClass('collapsed');
  $(target).addClass('show');
};
