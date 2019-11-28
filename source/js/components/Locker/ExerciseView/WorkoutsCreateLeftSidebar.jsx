import React, { Component } from "react";

class WorkoutsCreateLeftSidebar extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="white-box border-right workouts-creation-leftsidebar">
          <ul className="workouts-creation-list">
            <li>
              <div className="row no-gutters">
                <div className="col-md-4 d-flex align-items-center">
                  <h3>Type</h3>
                </div>
                <div className="col-md-8">
                  <div className="serving-select width-100-per">
                    <select className="form-control">
                      <option>General</option>
                    </select>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="row no-gutters">
                <div className="col-md-4 d-flex align-items-center">
                  <h3>Visibility</h3>
                </div>
                <div className="col-md-8">
                  <div className="serving-select width-100-per">
                    <select className="form-control">
                      <option>Public</option>
                      <option>Private</option>
                      <option>Protected</option>
                    </select>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="row no-gutters">
                <div className="col-md-12 d-flex align-items-center">
                  <h3>Description</h3>
                </div>
                <div className="col-md-12 mt-1">
                  <textarea className="form-control" rows="4"></textarea>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

export default WorkoutsCreateLeftSidebar;
