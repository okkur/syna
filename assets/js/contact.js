import $ from './helpers/jq-helpers';
import Validator from 'form-validator-simple';

const selfCheck = 'checkSelf';

(function() {
  if ($('.g-recaptcha')) {
    checkReCaptcha();
  }
})();

const validatorConfig = {
  errorTemplate: '<span class="help-block form-error">%s</span>',
  onFormValidate: (isFormValid, form) => {
    form.querySelector('button').disabled = !isFormValid
  },
  onError: function(e, form) {
    $(`form[id=${form.getAttribute('id')}] .generic-error`).removeClass('d-none');
  },
  onSuccess: function(e, form) {
    if (selfCheck !== "checkSelf") {
      genericError.removeClass('d-none');
      return false;
    }

    if (form.dataset.hasNetlify) {
      return;
    }

    e.preventDefault()
    const id = form.getAttribute('id')
    const action = $(`#${id}`).attr('action')
    const genericSuccess = $(`form[id=${id}] .generic-success`)
    const genericError = $(`form[id=${id}] .generic-error`)
    const serializedForm = $(`#${id}`).serialize()
    if ($('.g-recaptcha').length === 0) {
      $.post(action, serializedForm, {
        contentType: 'application/x-www-form-urlencoded',
      })
        .then(() => genericSuccess.removeClass('d-none'))
        .catch(() => genericError.removeClass('d-none'));
    } else if (typeof grecaptcha !== "undefined") {
      if (grecaptcha.getResponse() !== "") {
        $.post(action, serializedForm, {
          contentType: 'application/x-www-form-urlencoded',
        })
          .then(() => {
            genericSuccess.removeClass('d-none')
            $(`form[id=${id}] .success`).removeClass('d-none')
          })
          .catch(() => genericError.removeClass('d-none'));
      } else {
        grecaptcha.execute();
      };
    }
    return false;
  }
};

document.querySelectorAll('form')
  .forEach((form ) => new Validator(Object.assign(validatorConfig, { form })))

function checkReCaptcha() {
  if (document.querySelector('.g-recaptcha-container') && typeof grecaptcha === "undefined") {
    $('.captcha-error').removeClass('d-none');
    setTimeout(checkReCaptcha, 200);
  } else {
    $('.captcha-error').addClass('d-none');
    $('.g-recaptcha-filler').addClass('d-none');
    $('.g-recaptcha').attr('disabled', true);
  }
}

window.onContactCaptcha = function($form) {
  document.querySelector('form.contact').dispatchEvent(new Event('submit'))
}

window.syna.stream.subscribe('contact:update', function({ name, email, phone, message }) {
  $('input[name=name]').attr('value', name || null)[0].focus();
  // TODO: REVISIT: Remove the following line whenever firefox fixes center on focus
  $('input[name=name]')[0].scrollIntoView({behavior: "instant", block: "center"});
  $('input[name=email]').attr('value', email || null);
  $('input[name=phone]').attr('value', phone || null);
  $('textarea[name=message]').$nodes.forEach(node => node.appendChild(document.createTextNode(message || '')));
});
