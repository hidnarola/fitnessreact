import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { FaCircleONotch } from "react-icons/lib/fa";
import NoRecordFound from "../../../Common/NoRecordFound";
import NoWorkoutFound from "../../../../../assets/img/no-workouts-found2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router-dom";
import { routeCodes } from "../../../../constants/routes";
import WorkoutActivityList from "./WorkoutActivityList";

class TodayWorkout extends Component {
  render() {
    const { loading, workouts, history } = this.props;
    console.log("===========workouts===========");
    console.log("workouts", workouts);
    console.log("==========================");
    return (
      <React.Fragment>
        <div className="activity-body fithub-body">
          {loading && (
            <div className="loader" key={0}>
              <FaCircleONotch className="loader-spinner loader-spinner-icon mr-1" />
              Loading ...
            </div>
          )}
          <Scrollbars autoHide>
            {!loading && (
              <ul className="workout-list">
                {workouts &&
                  workouts.length > 0 &&
                  workouts.map((item, i) => (
                    <WorkoutActivityList workout={item} key={i} index={i} />
                  ))}
              </ul>
            )}
            {!loading &&
              (!workouts || workouts.length === 0) && (
                <div className="d-flex flex-wrap justify-content-center dashboard-record-not-found">
                  <img
                    src={NoWorkoutFound}
                    alt="NoWorkoutFound"
                    height="200px"
                  />
                  <h3 className="mt-5">You've not added any</h3>
                  <h3> workouts for today</h3>
                </div>
              )}
          </Scrollbars>
          {!loading && (
            <ul className="workout-list display-workout-btn">
              <li
                className="workout-list-items-btn"
                onClick={() => history.push(routeCodes.CALENDAR_OVERVIEW)}
              >
                <a href="#" className="btn width-100-per">
                  <FontAwesomeIcon icon="plus" /> Add Workout
                </a>
              </li>
            </ul>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(TodayWorkout);
