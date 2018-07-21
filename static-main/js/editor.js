import React from 'react';
import ReactJsonschemaForm from 'react-jsonschema-form';

if (!window.synaPortals.editorDefault) {
  class Editor extends React.PureComponent {
    render() {
      return (
        <div className="container editor-container">
          <ReactJsonschemaForm schema={{
            title: "Sample form using React and JSON Schema",
            type: "object",
            required: ["title"],
            properties: {
              title: {type: "string", title: "Title", default: "A new task"}
            }
          }} />
        </div>
      );
    }
  }

  window.synaPortals.editorDefault = {
    component: Editor,
    container: '#editor [data-portal]',
  };
}
