import React, { Component } from "react";
import LockerHeader from "../LockerHeader";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { routeCodes } from "../../../constants/routes";
import { Scrollbars } from "react-custom-scrollbars";
import NutritionLists from "./NutritionLists";
import NutritionPlanList from "./NutritionPlanList";
import MealsPlanYoursList from "./MealsPlanYoursList";
import MealsPlanAllList from "./MealsPlanAllList";

class MealsPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercisesTab: "yours"
    };
    this.tabList = ["Yours", "Saved", "All"];
  }
  render() {
    const { exercisesTab } = this.state;
    let optionsList = [];
    return (
      <React.Fragment>
        <div className="whitebox-body dashboard-body ml-3 mr-3 h-100 locker">
          <div className="locker-header">
            <h3 className="locker-title">Meal Plans</h3>
          </div>
          <LockerHeader
            exercisesTab={exercisesTab}
            optionsList={optionsList}
            handleChangeTab={this.handleChangeTab}
            tabList={this.tabList}
          />
          <div className="locker-body">
            {exercisesTab === "yours" && <MealsPlanYoursList />}
            {exercisesTab === "all" && <MealsPlanAllList />}
          </div>
          <ul className="workout-list display-workout-btn">
            <li className="workout-list-items-btn">
              <Link
                to={routeCodes.LOCKER_NUTRITION_PROGRAM_MASTER_SAVE}
                className="btn width-100-per"
              >
                <FontAwesomeIcon icon="plus" /> Create Meal Plan
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

export default MealsPlan;
