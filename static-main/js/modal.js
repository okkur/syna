import $ from './helpers/jq-helpers';

const modalOverlay = $('.modal-overlay');
const modalPortal = $('.modal-overlay .modal-portal');

modalOverlay.on('click', function(e) {
  if (!modalPortal[0].contains(e.target)) {
    this.classList.add('hide');
    $('body').removeClass('has-modal');
  }
});

(window.syna || (window.syna = {})).showModal = function({ title, subtitle, content, size = '' }) {
  modalOverlay.removeClass('hide');
  modalPortal.$('.title').html(title || '');
  modalPortal.$('.subtitle').html(subtitle || '');
  if (content) {
    modalPortal.$('.modal-content').html(content);
    modalPortal.$('.modal-content').removeClass('hidden');
  } else {
    modalPortal.$('.modal-content').addClass('hidden');
  }
  modalPortal.removeClass('md').removeClass('lg').addClass(size);
  $('body').addClass('has-modal');
}
