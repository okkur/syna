import $ from './helpers/jq-helpers';

window.syna.payment.forEach(config => {
  const stripe = Stripe(config.token);
  const elements = stripe.elements();
  const card = elements.create('card', config.options);
  card.mount('#card-element');
  card.addEventListener('change', function(event) {
    const displayError = document.querySelector('.invalid-feedback');
    if (event.error) {
      displayError.textContent = event.error.message;
    } else {
      displayError.textContent = '';
    }
  });

  const form = document.querySelector('#payment-form');
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    stripe.createToken(card).then(function(result) {
      if (result.error) {
        const errorElement = document.querySelector('.invalid-feedback');
        errorElement.textContent = result.error.message;
      } else {
        stripeTokenHandler(result.token);
      }
    });
  });

  function stripeTokenHandler(token) {
    const form = $('#payment-form');
    const action = form.attr('action');
    const serializedForm = form.serialize() + `&stripeToken=${token.id}`;
    $.post(action, serializedForm, {
      contentType: 'application/x-www-form-urlencoded',
    });
  }
});
