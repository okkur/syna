import React from 'react';
import ReactDOM from 'react-dom';

import './editor';

const Portal = ({ component: Component, container }) => {
  return ReactDOM.createPortal(
    <div>
      <Component />
    </div>
  , document.querySelector(container));
};

class Portals extends React.PureComponent {
  render() {
    return Object.keys(window.synaPortals || {}).map(portal => (
      <Portal
        key={window.synaPortals[portal].container}
        component={window.synaPortals[portal].component}
        container={window.synaPortals[portal].container} />
    ));
  }
}

ReactDOM.render(<Portals />, document.querySelector('#react'));
