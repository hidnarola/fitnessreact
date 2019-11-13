import React, { Component } from "react";
import cns from "classnames";
import { Scrollbars } from "react-custom-scrollbars";
import FithubBody from "./FithubBody";
import FithubPhotos from "./FithubPhotos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FithubExercise from "./FithubExercise";
import FithubGoals from "./FithubGoals";

class FithubActivities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fithubTab: "body"
    };
  }
  render() {
    const { fithubTab } = this.state;
    const {
      userWidgets,
      widgetBodyFat,
      changeBodyFatLoading,
      changeBodyFatError,
      widgetMuscle,
      widgetProgressPhotos,
      loggedUserData,
      widgetBadges
    } = this.props;
    return (
      <React.Fragment>
        <div className="whitebox-body dashboard-body h-100">
          <div className="activity-title">
            <h2>Fithub</h2>
          </div>
          <div className="activity-header">
            <div className="exercise-navbar">
              <div className="tabs sub-tab">
                <div
                  className={cns("tab", {
                    active: fithubTab === "body"
                  })}
                  onClick={() => this.setState({ fithubTab: "body" })}
                >
                  <a href="#">Body</a>
                </div>
                <div
                  className={cns("tab", {
                    active: fithubTab === "photos"
                  })}
                  onClick={() => this.setState({ fithubTab: "photos" })}
                >
                  <a href="#">Photos</a>
                </div>
                <div
                  className={cns("tab", {
                    active: fithubTab === "exercise"
                  })}
                  onClick={() => this.setState({ fithubTab: "exercise" })}
                >
                  <a href="#">Exercise</a>
                </div>
                <div
                  className={cns("tab", {
                    active: fithubTab === "goals"
                  })}
                  onClick={() => this.setState({ fithubTab: "goals" })}
                >
                  <a href="#">Goals</a>
                </div>
              </div>
            </div>
            <div className="activity-body">
              {fithubTab === "body" && (
                <Scrollbars autoHide>
                  <FithubBody
                    userWidgets={userWidgets}
                    widgetBodyFat={widgetBodyFat}
                    changeBodyFatLoading={changeBodyFatLoading}
                    changeBodyFatError={changeBodyFatError}
                    requestBodyFatData={this.props.requestBodyFatData}
                    widgetMuscle={widgetMuscle}
                    requestGraphData={this.props.requestGraphData}
                  />
                </Scrollbars>
              )}

              {fithubTab === "photos" && (
                <Scrollbars autoHide>
                  <FithubPhotos
                    userWidgets={userWidgets}
                    widgetProgressPhotos={widgetProgressPhotos}
                    loggedUserData={loggedUserData}
                  />
                </Scrollbars>
              )}

              {fithubTab === "exercise" && (
                <Scrollbars autoHide>
                  <FithubExercise />
                </Scrollbars>
              )}

              {fithubTab === "goals" && (
                <Scrollbars autoHide>
                  <FithubGoals
                    userWidgets={userWidgets}
                    widgetBadges={widgetBadges}
                  />
                </Scrollbars>
              )}
              <ul className="workout-list display-workout-btn">
                <li className="workout-list-items-btn">
                  <a href="#" className="btn width-100-per">
                    <FontAwesomeIcon icon="plus" /> Tracking Items
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default FithubActivities;
