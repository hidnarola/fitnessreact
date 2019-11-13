import React, { Component } from "react";

class FithubExercise extends Component {
  render() {
    return (
      <React.Fragment>
        <ul className="workout-list">
          <li className="workout-list-items active d-flex">
            <div className="workout-content width-100-per">
              <div
                className="d-flex flex-wrap width-100-per align-items-center p-3"
                style={{ background: "#201f60" }}
              >
                <div className="title">Running </div>
                <i className="fad fa-star ml-auto" />
              </div>
              <div className="is-complete">
                <div className="workout-switch-wrap">
                  <small>Workout complete</small>
                  <div className="material-switch ml-auto">
                    <input id={"workout"} type="checkbox" checked={false} />
                    <label htmlFor={"workout"} className="label-default" />
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className="workout-list-items active d-flex">
            <div className="workout-content width-100-per">
              <div
                className="d-flex flex-wrap width-100-per align-items-center p-3"
                style={{ background: "#201f60" }}
              >
                <div className="title">Running </div>
                <i className="fad fa-star active ml-auto" />
              </div>
              <div className="is-complete">
                <div className="workout-switch-wrap">
                  <small>Workout complete</small>
                  <div className="material-switch ml-auto">
                    <input id={"workout"} type="checkbox" checked={false} />
                    <label htmlFor={"workout"} className="label-default" />
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </React.Fragment>
    );
  }
}

export default FithubExercise;
