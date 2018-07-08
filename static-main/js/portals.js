import React from 'react';
import ReactDOM from 'react-dom';

class Portals extends React.PureComponent {
  render() {
    const container = document.querySelector('#editor-react');
    if (!container) {
      return null;
    }

    return ReactDOM.createPortal(
      <div>
        {Array.isArray(window.synaEditorPortal) ? 
          window.synaEditorPortal.map(PortalComponent => <PortalComponent />) : 
          <window.synaEditorPortal />
        }
      </div>
    , container);
  }
}

export default Portals;
