import React, { Component } from "react";

class ExerciseViewSidebar extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="exerciseview-sidebar h-100">
          <div className="serving-select p-2 width-100-per">
            <select className="form-control">
              <option>This month</option>
              <option>Last month</option>
              <option>Last 3 months</option>
              <option>Last 6 months</option>
              <option>Last year</option>
            </select>
          </div>
          <div className="subtitle">Exercises with data for period:</div>
          <div className="progress-exercise-list">
            <ul>
              <li className="active">Bench Press</li>
              <li>Press Up</li>
              <li>Bent-over row</li>
              <li>Decline Bench Press</li>
              <li>Chest Flies</li>
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ExerciseViewSidebar;
