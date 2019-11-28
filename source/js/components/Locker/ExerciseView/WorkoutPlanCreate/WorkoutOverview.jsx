import React, { Component } from "react";
import { routeCodes } from "../../../../constants/routes";

class WorkoutOverview extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="body-head d-flex justify-content-start front-white-header with-tabs custome_header">
          <div className="body-head-l p-3">
            <div className="display-date">
              <span className="date-text">Workout Plan Creation</span>
            </div>
            <div className="display-date">
              <div className="tabs ml-4">
                <div className="tab">
                  <NavLink to={routeCodes.LOCKER_EXERCISE}>Overview</NavLink>
                </div>
                <div className="tab">
                  <NavLink to={routeCodes.LOCKER_NUTRITION}>Plan</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default WorkoutOverview;
