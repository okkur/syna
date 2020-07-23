import $ from './helpers/jq-helpers';
import ModalTemplate from './templates/modal';

$('body').append(ModalTemplate);

const setImage = (image, element) => {
  if (image) {
    element.removeClass('hidden');
    element[0].src = image;
  } else {
    element.addClass('hidden');
  }
};

setTimeout(() => {
  const modal = $('.modal');
  const dialog = $('.modal .modal-dialog');

  function closeDialog() {
    $('body').removeClass('modal-open');
    modal.removeClass('show');
  }

  $('[data-dismiss="modal"]').on('click', closeDialog);

  modal.on('click', (e) => {
    if (!dialog[0].contains(e.target)) {
      closeDialog();
    }
  });

  (window.syna || (window.syna = {})).showModal = function({
    title,
    subtitle,
    background,
    image,
    icon,
    content,
    labels,
    size = '',
  }) {
    $('body').addClass('modal-open');
    modal.addClass('show');
    dialog.$('.title').html(title || '');
    dialog.$('.subtitle').html(subtitle || '');

    setImage(image, dialog.$('.modal-asset-image'));
    setImage(background, dialog.$('.modal-background-image'));

    if (!background) {
      dialog.$('.modal-asset-image').addClass('hidden');
      setImage(image, dialog.$('.modal-background-image'));
    }

    if (labels) {
      dialog.$('.badge-container').removeClass('hidden');
      dialog.$('.badge-container').html(labels || '');
    } else {
      dialog.$('.badge-container').addClass('hidden');
    }

    if (icon) {
      dialog.$('.icon-container').removeClass('hidden');
      dialog.$('.icon-container').html(icon.replace(/fa-inverse/g, ''));
    } else {
      dialog.$('.icon-container').addClass('hidden');
    }

    if (content) {
      dialog.$('.modal-body .content').html(content);
      dialog.$('.modal-body .content').removeClass('hidden');
    } else {
      dialog.$('.modal-body .content').addClass('hidden');
    }
    dialog
      .removeClass('md')
      .removeClass('lg')
      .addClass(size);
  };
}, 0);
