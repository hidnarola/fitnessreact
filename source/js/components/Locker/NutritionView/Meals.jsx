import React, { Component } from "react";
import LockerHeader from "../LockerHeader";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { routeCodes } from "../../../constants/routes";
import { Scrollbars } from "react-custom-scrollbars";
import NutritionLists from "./NutritionLists";

class Meals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercisesTab: "favourites"
    };
    this.tabList = ["Favourites", "Created", "All"];
  }
  render() {
    const { exercisesTab } = this.state;
    let optionsList = [];
    return (
      <React.Fragment>
        <div className="whitebox-body dashboard-body ml-3 mr-3 h-100 locker">
          <div className="locker-header">
            <h3 className="locker-title">Meals</h3>
          </div>
          <LockerHeader
            exercisesTab={exercisesTab}
            optionsList={optionsList}
            handleChangeTab={this.handleChangeTab}
            tabList={this.tabList}
          />
          <div className="locker-body">
            <Scrollbars autoHide>
              <div className="nutrition-list locker-meals-list">
                <NutritionLists />
                <NutritionLists />
              </div>
            </Scrollbars>
          </div>
          <ul className="workout-list display-workout-btn">
            <li className="workout-list-items-btn">
              <Link
                to={routeCodes.LOCKER_EXERCISE_CREATE}
                className="btn width-100-per"
              >
                <FontAwesomeIcon icon="plus" /> Create Meal
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

export default Meals;
