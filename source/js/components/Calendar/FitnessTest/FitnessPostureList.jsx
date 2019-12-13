import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class FitnessPostureList extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="excercise-boxs">
          <div className="excercise-number">
            <span>1.</span>
          </div>
          <div className="excercise-right">
            <div className="topbar-title">
              <h3>Posture</h3>
              <div role="toolbar" className="btn-toolbar ml-auto">
                <button type="button" className="timline-post-del-btn">
                  <FontAwesomeIcon icon="trash-alt" />
                </button>
              </div>
            </div>
            <div className="excercise-content  animated fadeIn">
              <div className="row no-gutters">
                <div className="col-xs-12 col-lg-2">
                  <span className="warmup-title">value :</span>
                </div>
                <div className="col-xs-12 col-lg-3">
                  <div className="serving-boxs">
                    <button className="btn btn-minus">
                      <FontAwesomeIcon icon="minus" />
                    </button>
                    <input
                      type="number"
                      className="form-control"
                      defaultValue="86"
                    />
                    <button className="btn btn-plus">
                      <FontAwesomeIcon icon="plus" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default FitnessPostureList;
