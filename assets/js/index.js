import './helpers/bootstrap-helper';
import './scroll';
import './modal';

import $ from './helpers/jq-helpers';

$('.btn-group-toggle').$nodes.forEach(group => {
  $(group).$('label.btn input[type=radio]').on('click', e => {
    $(group).$('label.btn.active').removeClass('active');
    $(e.target.parentElement).addClass('active');
  })
})
