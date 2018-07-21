import * as React from 'react';

class Editor extends React.PureComponent {
  render() {
    return (
      <div className="container py-4 text-center">
        <h3 className="text-dark">Editor Fragment</h3>
        <h4 className="text-dark">This fragment supports React Portals. Here you are looking at a React Component.</h4>
        <form action="#">
          <div className="row pt-3">
            <div className="col-md-6">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Enter your name" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <input type="email" className="form-control" placeholder="Enter your email" />
              </div>
            </div>
          </div>
          <div className="row pb-3">
            <div className="col">
              <div className="form-group">
                <textarea type="text" className="form-control" placeholder="Enter your message"></textarea>
              </div>
            </div>
          </div>
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

window.synaEditorPortal = Editor;
