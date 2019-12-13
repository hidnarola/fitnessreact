import React, { Component } from "react";

class CommonCustomSweetAlert extends Component {
  render() {
    const { title, handleCloseAlert } = this.props;
    return (
      <React.Fragment>
        <div className="common-custom-sweetalert-header">
          <h2>{title}</h2>
          <button
            className="btn btn-cancel ml-auto"
            onClick={() => handleCloseAlert()}
          >
            Cancel
          </button>
        </div>
        <div className="common-custom-sweetalert-body">
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}

export default CommonCustomSweetAlert;
