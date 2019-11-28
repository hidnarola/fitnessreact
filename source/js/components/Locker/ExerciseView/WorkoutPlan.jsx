import React, { Component } from "react";
import LockerHeader from "../LockerHeader";
import WorkoutPlanList from "./WorkoutPlanList";
import { Scrollbars } from "react-custom-scrollbars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { routeCodes } from "../../../constants/routes";
import { Link } from "react-router-dom";
import WorkoutPlanDisplayAllList from "./WorkoutPlanDisplayAllList";
import { PROGRAM_PRIVATE, PROGRAM_PUBLIC } from "../../../constants/consts";
import { connect } from "react-redux";
import WorkoutPlanDisplayYoursList from "./WorkoutPlanDisplayYoursList";
import WorkoutPlanDisplayPublicList from "./WorkoutPlanDisplayPublicList";

class WorkoutPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercisesTab: "yours"
    };
    this.tabList = ["Yours", "Public", "All"];
  }
  render() {
    const { exercisesTab } = this.state;
    const { history, loggedUserData } = this.props;
    let optionsList = [];
    return (
      <React.Fragment>
        <div className="whitebox-body dashboard-body h-100 locker">
          <div className="locker-header">
            <h3 className="locker-title">Workout Plans</h3>
          </div>
          <LockerHeader
            exercisesTab={exercisesTab}
            optionsList={optionsList}
            handleChangeTab={this.handleChangeTab}
            tabList={this.tabList}
          />
          <div className="locker-body">
            {exercisesTab === "all" && (
              <WorkoutPlanDisplayAllList condition={{}} />
            )}
            {exercisesTab === "yours" && (
              <WorkoutPlanDisplayYoursList
                condition={{
                  privacy: PROGRAM_PRIVATE,
                  userId: loggedUserData.authId
                }}
              />
            )}
            {exercisesTab === "public" && (
              <WorkoutPlanDisplayPublicList
                condition={{
                  privacy: PROGRAM_PUBLIC
                }}
              />
            )}
          </div>
          <ul className="workout-list display-workout-btn">
            <li className="workout-list-items-btn">
              <Link
                to={routeCodes.PROGRAM_MASTER_SAVE}
                className="btn width-100-per"
              >
                <FontAwesomeIcon icon="plus" /> Create Plan
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
const mapStateToProps = state => {
  const { user } = state;
  return {
    loggedUserData: user.get("loggedUserData")
  };
};

export default connect(mapStateToProps)(WorkoutPlan);
