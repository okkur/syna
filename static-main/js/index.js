import React from 'react';
import ReactDOM from 'react-dom';

import './helpers/bootstrap-helper';
import './editor';
import './scroll';
import './modal';
import Portals from './portals';

import '../styles';

ReactDOM.render(<Portals />, document.querySelector('#react'));
