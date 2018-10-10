import Chart from 'chart.js';
import $ from './helpers/jq-helpers';

(window.syna.graph || (window.syna.graph = [])).forEach(fragment => {
  (window.syna.graphCharts || (window.syna.graphCharts = [])).push(new Chart($(fragment.selector), {
    type: fragment.config.type || 'line',
    options: Object.assign({
      maintainAspectRatio: false,
    }, (fragment.config || {}).options),
    data: (fragment.config || {}).data,
  }));
});
