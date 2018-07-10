import $ from './helpers/jq-helpers';

const modal = $('.modal');
const dialog = $('.modal .modal-dialog');

modal.on('click', function(e) {
  if (!dialog[0].contains(e.target)) {
    $('body').removeClass('modal-open');
    this.classList.remove('show');
  }
});

(window.syna || (window.syna = {})).showModal = function({ title, subtitle, content, size = '' }) {
  $('body').addClass('modal-open');
  modal.addClass('show');
  dialog.$('.title').html(title || '');
  dialog.$('.subtitle').html(subtitle || '');
  if (content) {
    dialog.$('.modal-body').html(content);
    dialog.$('.modal-body').removeClass('hidden');
  } else {
    dialog.$('.modal-body').addClass('hidden');
  }
  dialog.removeClass('md').removeClass('lg').addClass(size);
}
