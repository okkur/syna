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

function resetPrice(form) {
  return function() {
    const backup = form.$('[data-render=backup]');
    form.$('[data-render=price]').html(backup.html());
    form.$('[data-render=price] [data-price].active').$nodes.forEach(node => node.click());
    backup.html('');
  }
}

function onSubmit(configId, form, stripe, card) {
  return function(e) {
    e.preventDefault();

    const config = window.syna.api.get('stripe', configId);
    // Stripe requires creating a token for user data to avoid sending data to other server
    stripe.createToken(card).then(result => {
      if (result.error) {
        $('.invalid-feedback').text(result.error.message);
      } else {
        const action = form.attr('action');
        // Empty backup so that if an event has changed the price, the old
        // values would be ignored
        const backup = form.$('[data-render=backup]').html();
        form.$('[data-render=backup]').html('');

        // Parse the form data and calculate the price based on whether the form
        // had single value, custom value or multiple values
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

        // Send the form to the server and display messages according to the response
        form.$('[data-render=backup]').html(backup);
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

  if ($(`${config.form} input[name=multichoice]`).length > 0) {
    const choices = $(`${config.form} input[name=price_text]`);
    choices.$nodes[0].setAttribute('checked', true);
    choices.$nodes[0].parentElement.classList.add('active');
  }

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

window.syna.stream.subscribe('pricing:change', function({ product, price, currency }) {
  updateStripeFragments(product, price, currency);
});

function updateStripeFragments(product, price, currency) {
  window.syna.api.toArray('stripe').forEach(config => {
    const form = $(config.form);
    config.product = product;

    if (price) {
      const priceTemplate = $('#stripe-price-template').html();
      const data = { price, currency };
      const priceDisplay = form.$('[data-render=price]');
      const backup = form.$('[data-render=backup]');

      if (!backup.html()) {
        backup.html(priceDisplay.html());
      }

      priceDisplay.html(window.syna.api.renderTemplate(priceTemplate, data));
      priceDisplay.$('[data-action=reset]').on('click', resetPrice(form));
    }

    if (currency) {
      form.$('input[name=currency]').text(currency);
    }

    form.$('input[name=email]')[0].focus();
    // TODO: REVISIT: Remove the following line whenever firefox fixes center on focus
    form.$('input[name=email]')[0].scrollIntoView({behavior: "instant", block: "center"});
  });
}
