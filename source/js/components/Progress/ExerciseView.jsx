import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";

class ExerciseView extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="body-content">
          <div className="exercise-navbar">
            <div className="tabs sub-tab">
              <div className="tab active">
                <Link to="#">Strength</Link>
              </div>
              <div className="tab">
                <Link to="#">Endurance</Link>
              </div>
              <div className="tab">
                <Link to="#">Mobility</Link>
              </div>
              <div className="tab">
                <Link to="#">Fitness Tests</Link>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ExerciseView;
