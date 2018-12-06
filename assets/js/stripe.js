import $ from './helpers/jq-helpers';
import Validator from 'form-validator-simple';

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
          price: parseInt(config.price.match(/\w+/g).reduce((tmp, match) => tmp + match, ''), 10),
          price_text: config.price_text,
          currency: config.currency,
          from: window.location.href,
        });
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
});

window.syna.stream.subscribe('topic.pricing.change', function({ product, price, price_text, currency }) {
  updateStripeFragments(product, price, price_text, currency);
});

window.syna.stream.subscribe('topic.url.change', function({ newURL }) {
  const query = newURL.split('?')[1] || '';
  const params = query
    .split('&')
    .reduce((tmp, pair) => {
      const [key, value] = pair.split('=')
      tmp[decodeURIComponent(key)] = decodeURIComponent(value);
      return tmp;
    }, {})

  updateStripeFragments(params.product, params.price, params.price_text, params.currency);
});

function updateStripeFragments(product, price, price_text, currency) {
  window.syna.api.toArray('stripe').forEach(config => {
    config.product = product;
    config.price = price;
    config.price_text = price_text || price;
    config.currency = currency;
    $(`${config.form} [data-render="price_text"]`).text(price_text || price);
  });
}
