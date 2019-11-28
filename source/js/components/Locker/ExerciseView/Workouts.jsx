import React, { Component } from "react";
import LockerHeader from "../LockerHeader";
import WorkoutsList from "./WorkoutsList";
import { routeCodes } from "../../../constants/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Scrollbars } from "react-custom-scrollbars";
import { Link } from "react-router-dom";

class Workouts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercisesTab: "yours"
    };
    this.tabList = ["Yours", "Saved", "All"];
  }
  render() {
    const { exercisesTab } = this.state;
    const { history } = this.props;
    let optionsList = [];
    return (
      <React.Fragment>
        <div className="whitebox-body dashboard-body ml-3 mr-3 h-100 locker">
          <div className="locker-header">
            <h3 className="locker-title">Workouts</h3>
          </div>
          <LockerHeader
            exercisesTab={exercisesTab}
            optionsList={optionsList}
            handleChangeTab={this.handleChangeTab}
            tabList={this.tabList}
          />
          <div className="locker-body">
            <Scrollbars autoHide>
              <div className="locker-exercise-list">
                <ul className="locker-exercise-items">
                  <WorkoutsList />
                  <WorkoutsList />
                  <WorkoutsList />
                  <WorkoutsList />
                  <WorkoutsList />
                </ul>
              </div>
            </Scrollbars>
          </div>
          <ul className="workout-list display-workout-btn">
            <li className="workout-list-items-btn">
              <Link
                to={routeCodes.LOCKER_EXERCISE_CREATE}
                className="btn width-100-per"
              >
                <FontAwesomeIcon icon="plus" /> Create Workout
              </Link>
            </li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
  handleChangeTab = tab => {
    this.setState({ exercisesTab: tab });
  };
}

export default Workouts;
