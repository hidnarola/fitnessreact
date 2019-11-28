import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ExercisesList extends Component {
  render() {
    return (
      <li>
        <div className="exercise-box-header">
          <div className="exercise-title">Boxing</div>
          <div className="ml-auto">
            <FontAwesomeIcon icon="star" className="star-active" />
          </div>
        </div>
        <div className="exercise-box-body">
          <div className="exercise-content">
          <span>Category</span>
          <span className="ml-auto">Cardio - Boxing</span>
          </div>
        </div>
      </li>
    );
  }
}

export default ExercisesList;
