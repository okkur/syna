import React from 'react';
import ReactDOM from 'react-dom';

const Portal = ({ component: Component, container }) => {
  return ReactDOM.createPortal(
    <div>
      <Component />
    </div>
  , document.querySelector(container));
};

class Portals extends React.PureComponent {
  render() {
    return Object.keys(window.syna.portals).map(portal => {
      if (Array.isArray(window.syna.portals[portal]) && window.syna.portals[portal].length > 0) {
        return window.syna.portals[portal].map(innerPortal => {
          if (document.querySelector(innerPortal.container) === null) {
            return null;
          }
  
          return (
            <Portal
              key={innerPortal.container}
              component={innerPortal.component}
              container={innerPortal.container} />
          );
        })
      }

      if (document.querySelector(window.syna.portals[portal].container) === null) {
        return null;
      }

      return (
        <Portal
          key={window.syna.portals[portal].container}
          component={window.syna.portals[portal].component}
          container={window.syna.portals[portal].container} />
      );
    });
  }
}

ReactDOM.render(<Portals />, document.querySelector('#react'));
