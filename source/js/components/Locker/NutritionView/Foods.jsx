import React, { Component } from "react";
import LockerHeader from "../LockerHeader";
import { Scrollbars } from "react-custom-scrollbars";
import NutritionLists from "./NutritionLists";

export class Foods extends Component {
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
        <div className="whitebox-body dashboard-body h-100 locker">
          <div className="locker-header">
            <h3 className="locker-title">Foods</h3>
          </div>
          <LockerHeader
            exercisesTab={exercisesTab}
            optionsList={optionsList}
            handleChangeTab={this.handleChangeTab}
            tabList={this.tabList}
          />
          <div className="locker-body full-body">
            <Scrollbars autoHide>
              <div className="nutrition-list locker-meals-list">
                <NutritionLists />
                <NutritionLists />
              </div>
            </Scrollbars>
          </div>
        </div>
      </React.Fragment>
    );
  }
  handleChangeTab = tab => {
    this.setState({ exercisesTab: tab });
  };
}

export default Foods;
