import React, { Component } from "react";
import WorkoutActivityList from "./WorkoutActivityList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Scrollbars } from "react-custom-scrollbars";
import { FaCircleONotch } from "react-icons/lib/fa";
import { connect } from "react-redux";
import NoRecordFound from "../../Common/NoRecordFound";
import { routeCodes } from "../../../constants/routes";
import { withRouter } from "react-router-dom";

class TodaysActivity extends Component {
  render() {
    const { loading, workouts, history } = this.props;
    console.log("===========Todays workouts===========");
    console.log("Todays workouts", workouts);
    console.log("==========================");
    return (
      <React.Fragment>
        <div className="whitebox-body dashboard-body h-100 dashboard-sidebar">
          <div className="activity-title">
            <h2>Today</h2>
          </div>
          <div className="activity-header">
            <div className="exercise-navbar">
              <div className="tabs sub-tab">
                <div className="tab active">
                  <a href="#">Exercise</a>
                </div>
                <div className="tab">
                  <a href="#">Nutrition</a>
                </div>
                <div className="tab">
                  <a href="#">Logs</a>
                </div>
                <div className="tab">
                  <a href="#">Photos</a>
                </div>
              </div>
            </div>
          </div>
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
                workouts &&
                workouts.length === 0 && (
                  <NoRecordFound title="No workouts found for today." />
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
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(withRouter(TodaysActivity));
