import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import ExerciseViewSidebar from "./ExerciseViewSidebar";
import ExerciseViewContent from "./ExerciseViewContent";
import cns from "classNames";
import ExerciseEnduranceView from "./ExerciseEnduranceView";

class ExerciseView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exerciseTab: "#strength",
      activeTab: "Bench Press"
    };
  }
  render() {
    const { exerciseTab, activeTab } = this.state;
    const exerciseTabList = [
      "Bench Press",
      "Press Up",
      "Bent-over row",
      "Decline Bench Press",
      "Chest Flies"
    ];
    return (
      <React.Fragment>
        <div className="body-content exerciseview">
          <div className="exercise-navbar">
            <div className="tabs sub-tab">
              <div
                className={cns("tab", { active: exerciseTab === "#strength" })}
                onClick={() => this.handleChnageExerciseTab("#strength")}
              >
                <Link to="#">Strength</Link>
              </div>
              <div
                className={cns("tab", { active: exerciseTab === "#endurance" })}
                onClick={() => this.handleChnageExerciseTab("#endurance")}
              >
                <Link to="#">Endurance</Link>
              </div>
              <div
                className={cns("tab", { active: exerciseTab === "#mobility" })}
                onClick={() => this.handleChnageExerciseTab("#mobility")}
              >
                <Link to="#">Mobility</Link>
              </div>
              <div
                className={cns("tab", {
                  active: exerciseTab === "#fitness_test"
                })}
                onClick={() => this.handleChnageExerciseTab("#fitness_test")}
              >
                <Link to="#">Fitness Tests</Link>
              </div>
            </div>
          </div>
          <div className="whitebox-body exerciseview-body">
            <div className="row no-gutters h-100">
              {exerciseTab !== "#endurance" ? (
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
              ) : (
                <ExerciseEnduranceView />
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
  handleChnageExerciseTab = tab => {
    this.setState({ exerciseTab: tab });
  };
  handleChangeActiveTab = tab => {
    this.setState({ activeTab: tab });
  };
}

export default ExerciseView;
