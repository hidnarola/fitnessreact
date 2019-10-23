import React, { Component } from "react";
import ExerciseViewSidebar from "./ExerciseViewSidebar";
import ExerciseViewContent from "./ExerciseViewContent";

class ExerciseEnduranceView extends Component {
  state = {
    activeTab: "Running - Treadmill"
  };
  render() {
    const { activeTab } = this.state;
    const exerciseTabList = [
      "Running - Treadmill",
      "Cycling - Spin bike",
      "Swimming - Indoor"
    ];
    return (
      <React.Fragment>
        <div className="col-xs-12 col-md-3">
          <ExerciseViewSidebar
            dataList={exerciseTabList}
            handleChangeActiveTab={this.handleChangeActiveTab}
            activeTab={activeTab}
          />
        </div>
        <div className="col-xs-12 col-md-9">
          <ExerciseViewContent title={activeTab} />
        </div>
      </React.Fragment>
    );
  }
  handleChangeActiveTab = tab => {
    this.setState({ activeTab: tab });
  };
}

export default ExerciseEnduranceView;
