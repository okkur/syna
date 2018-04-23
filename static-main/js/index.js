import $ from 'jquery';
import 'bootstrap';
import fontawesome from '@fortawesome/fontawesome';
import faSolid from '@fortawesome/fontawesome-free-solid';
import faRegular from '@fortawesome/fontawesome-free-regular';
import faBrands from '@fortawesome/fontawesome-free-brands';

window.$ = $;
window.jQuery = $;

fontawesome.library.add(faSolid);
fontawesome.library.add(faRegular);
fontawesome.library.add(faBrands);

import './form';
import './scroll';
import './particles';

import '../styles';
