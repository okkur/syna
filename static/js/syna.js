$.validate({
  modules: 'html5, sanitize, toggleDisabled',
  validateOnEvent: true,
  onError: function($form) {
    $('form[id=' +  $form.attr('id') +'] .error').removeClass('d-none');
 },
  onSuccess: function($form) {
    $.post($('#' + $form.attr('id')).attr('action'), $('#' + $form.attr('id')).serialize(), function(){
      $('form[id=' +  $form.attr('id') +'] .success').removeClass('d-none');
    }, 'json').fail(function(){
      $('form[id=' +  $form.attr('id') +'] .error').removeClass('d-none');
  });
    return false;
}
});
