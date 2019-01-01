import $ from './helpers/jq-helpers';
import Validator from 'form-validator-simple';
import parsePrice from 'parse-price';

function initFormValidation(form, onSuccess = () => false) {
  new Validator({
    errorTemplate: '<span class="help-block form-error">%s</span>',
    onFormValidate: (isFormValid, form) => {
      form.querySelector('button').disabled = !isFormValid
    },
    onError: function(e, form) {
      form.querySelector('.generic-error').removeClass('d-none');
    },
    onSuccess,
    form,
  });
}

function onSubmit(configId, form, stripe, card) {
  return function(e) {
    e.preventDefault();

    const config = window.syna.api.get('stripe', configId);
    stripe.createToken(card).then(result => {
      if (result.error) {
        $('.invalid-feedback').text(result.error.message);
      } else {
        const action = form.attr('action');
        const serializedForm = Object.assign(JSON.parse(form.serialize(true)), {
          stripeToken: result.token.id,
          product: config.product,
          from: window.location.href,
        });

        let price = serializedForm.price_text;
        if (serializedForm.custom_value === "true") {
          price = serializedForm.custom_price_text;
          serializedForm.currency = form.$('[data-input=currency]').attr('data-value');
        } else if (serializedForm.multichoice === "true") {
          serializedForm.currency = form.$('input[name=price_text]:checked').attr('data-currency');
        }
        delete serializedForm.custom_price_text;
        serializedForm.price_text = price;
        serializedForm.price = parsePrice(price) * 100;

        $.post(action, JSON.stringify(serializedForm))
          .then(() => form.$('#generic-success').removeClass('d-none'))
          .catch(() => form.$('#generic-error').removeClass('d-none'));
      }
    });
  }
}

const stripeFragments = window.syna.api.getScope('stripe');
Object.keys(stripeFragments).forEach(key => {
  const config = stripeFragments[key];
  const stripe = Stripe(config.token);
  const elements = stripe.elements();
  const card = elements.create('card', config.options);
  card.mount(`${config.form} #card-element`);
  card.addEventListener('change', e => {
    const displayError = $('.invalid-feedback');
    if (event.error) {
      displayError.text(event.error.message);
    } else {
      displayError.text('');
    }
  });

  const form = $(config.form);
  initFormValidation(form[0], onSubmit(key, form, stripe, card));
  form.$('[data-action="toggle-price-change"]').on('click', (() => {
    let isEditable = false;
    return () => {
      if (isEditable) {
        form.$('.price-display').removeClass('hidden');
        form.$('.price-input').addClass('hidden');
        form.$('input[name=custom_value]').val('false');
      } else {
        form.$('.price-display').addClass('hidden');
        form.$('.price-input').removeClass('hidden');
        form.$('input[name=custom_value]').val('true');
      }
      isEditable = !isEditable;
    }
  })());

  form.$('input[name=price_text]').on('input', e => {
    form.$('input[name=price]').val(parseInt(e.target.value.match(/\w+/g).reduce((tmp, match) => tmp + match, ''), 10));
  });
});

window.syna.stream.subscribe('pricing:change', function({ product, price, price_text, currency }) {
  updateStripeFragments(product, price, price_text, currency);
});

function updateStripeFragments(product, price, price_text, currency) {
  window.syna.api.toArray('stripe').forEach(config => {
    config.product = product;
    $(`${config.form} [data-render="price_text"]`).text(price_text || price || null);
    $(`${config.form} input[name=email]`)[0].focus();
    // TODO: REVISIT: Remove the following line whenever firefox fixes center on focus
    $(`${config.form} input[name=email]`)[0].scrollIntoView({behavior: "instant", block: "center"});
  });
}
