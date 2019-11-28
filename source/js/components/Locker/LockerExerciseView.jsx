import React, { Component } from "react";
import Exercises from "./ExerciseView/Exercises";
import Workouts from "./ExerciseView/Workouts";
import WorkoutPlan from "./ExerciseView/WorkoutPlan";
import { routeCodes } from "../../constants/routes";
import { NavLink } from "react-router-dom";

class LockerExerciseView extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="body-head d-flex justify-content-start front-white-header with-tabs custome_header">
          <div className="body-head-l p-3">
            <div className="display-date">
              <div className="tabs ml-4">
                <div className="tab">
                  <NavLink to={routeCodes.LOCKER_EXERCISE}>Exercise</NavLink>
                </div>
                <div className="tab">
                  <NavLink to={routeCodes.LOCKER_NUTRITION}>Nutrition</NavLink>
                </div>
              </div>
              <span className="date-text ml-auto mr-4">Locker</span>
            </div>
          </div>
        </div>
        <div className="body-content flex col-md-12 h-100 mt-3">
          <div className="row no-gutters h-100">
            <div className="col-xs-12 col-md-4">
              <Exercises />
            </div>
            <div className="col-xs-12 col-md-4">
              <Workouts />
            </div>
            <div className="col-xs-12 col-md-4">
              <WorkoutPlan />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LockerExerciseView;
