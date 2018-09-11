import $ from './helpers/jq-helpers';

const portfolioItem = $('.portfolio-item.has-modal');
const _default = { innerHTML: '' };

portfolioItem.on('click', function() {
  window.syna.showModal({
    title: (this.querySelector('.title') || _default).innerHTML,
    subtitle: (this.querySelector('.subtitle') || _default).innerHTML,
    content: this.querySelector('.content').innerHTML,
    image: this.querySelector('img').src,
    size: 'md',
  });
})
