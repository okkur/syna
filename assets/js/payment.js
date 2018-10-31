import $ from './helpers/jq-helpers';

window.syna.payment.forEach(config => {
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
  form.on('submit', e => {
    e.preventDefault();

    stripe.createToken(card).then(result => {
      if (result.error) {
        $('.invalid-feedback').text(result.error.message);
      } else {
        const action = form.attr('action');
        const serializedForm = form.serialize() + `&stripeToken=${result.token.id}`;
        $.post(action, serializedForm, {
          contentType: 'application/x-www-form-urlencoded',
        });
      }
    });
  });
});
