import './helpers/bootstrap-helper';
import './scroll';
import './modal';

import $ from './helpers/jq-helpers';

$('.btn-group-toggle').$nodes.forEach(group => {
  $(group).$('label.btn input[type=radio]').on('click', e => {
    $(group).$('label.btn.active').removeClass('active');
    $(e.target.parentElement).addClass('active');
  });
});

$('.dropdown-toggle').on('click', e => {
  const parent = e.target.parentElement;
  const dropdowns = $(parent).$('.dropdown-menu');
  if (parent.classList.contains('show')) {
    parent.classList.remove('show');
    dropdowns.removeClass('show');
  } else {
    parent.classList.add('show');
    dropdowns.addClass('show');
  }
});

$('.dropdown-item').on('click', e => {
  const dropdown = e.target.parentElement;
  const button = $(dropdown.parentElement).$('.dropdown-toggle');
  button.text(e.target.innerText);
  button.attr('data-value', e.target.dataset.value);
  $(dropdown).removeClass('show');
  $(dropdown.parentElement).removeClass('show');
});
