import $ from './helpers/jq-helpers';

const portfolioItem = $('.portfolio-item.has-modal');

portfolioItem.on('click', function() {
  window.syna.showModal({
    title: this.querySelector('.title').innerHTML,
    subtitle: this.querySelector('.subtitle').innerHTML,
    content: this.querySelector('.content').innerHTML,
    size: 'md',
  });
})
