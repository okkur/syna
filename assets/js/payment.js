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
        const serializedForm = JSON.parse(form.serialize(true));
        serializedForm.stripeToken = result.token.id;
        serializedForm.price = parseInt(config.price.match(/\w+/g).reduce((tmp, match) => tmp + match, ''), 10);
        serializedForm.currency = config.currency;
        $.post(action, JSON.stringify(serializedForm))
          .then(() => form.$('#generic-success').removeClass('d-none'))
          .catch(() => form.$('#generic-error').removeClass('d-none'));
      }
    });
  });
});
