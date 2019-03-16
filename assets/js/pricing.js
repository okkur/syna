import $ from './helpers/jq-helpers';

window.syna.stream.subscribe('plan:change', function({ plan }) {
  const pricingPlan = $(`[data-pricing-plan="${plan}"]`);
  const primaryAction = pricingPlan.$('[data-primary-action]');
console.log("EVENT", "plan:change", {pricingPlan,primaryAction})
  $('.pricing-plan').removeClass('selected');
  pricingPlan.addClass('selected');
  setTimeout(() => primaryAction[0][primaryAction.attr('data-primary-action')](), 100);
});
