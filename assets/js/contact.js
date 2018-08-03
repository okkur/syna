import $ from './helpers/jq-helpers';
import Validator from 'form-validator-simple';

const selfCheck = 'checkSelf';

(function() {
  if ($('.g-recaptcha')) {
    checkReCaptcha();
  }
})();

const validator = new Validator({
  errorTemplate: '<span class="help-block form-error">%s</span>',
  onFormValidate: (isFormValid, form) => {
    form.querySelector('button').disabled = !isFormValid
  },
  onError: function(e, form) {
    $(`form[id=${form.getAttribute('id')}] .generic-error`).removeClass('d-none');
  },
  onSuccess: function(e, form) {
    e.preventDefault()

    if (selfCheck !== "checkSelf") {
      genericError.removeClass('d-none');
      return false;
    }

    const id = form.getAttribute('id')
    const action = $(`#${id}`).attr('action')
    const genericSuccess = $(`form[id=${id}] .generic-success`)
    const genericError = $(`form[id=${id}] .generic-error`)
    const serializedForm = $(`#${id}`).serialize()
    if ($('.g-recaptcha').length === 0) {
      $.post(action, serializedForm)
        .then(() => genericSuccess.removeClass('d-none'))
        .catch(() => genericError.removeClass('d-none'));
    } else if (typeof grecaptcha !== "undefined") {
      if (grecaptcha.getResponse() !== "") {
        $.post(action, serializedForm)
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
});
validator.initAll()

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
