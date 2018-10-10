import Chart from 'chart.js';
import $ from './helpers/jq-helpers';

(window.syna.stats || (window.syna.stats = [])).forEach(fragment => {
  (window.syna.statsCharts || (window.syna.statsCharts = [])).push(new Chart($(fragment.selector), {
    type: fragment.config.type || 'line',
    options: Object.assign({
      maintainAspectRatio: false,
    }, (fragment.config || {}).options),
    data: (fragment.config || {}).data,
  }));
});
