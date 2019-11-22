import React, { Component } from "react";
import { connect } from "react-redux";
import { routeCodes } from "../../../constants/routes";
import { withRouter } from "react-router-dom";
import cns from "classnames";
import TodayWorkout from "./Workouts/TodayWorkout";
import TodayNutrition from "./Nutrition/TodayNutrition";
import TodayLogsActivity from "./Logs/TodayLogsActivity";
import TodayPhotos from "./Photos/TodayPhotos";

class TodaysActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "exercise"
    };
  }
  render() {
    const {
      loading,
      workouts,
      history,
      user_meals,
      loading_user_meals,
      todayProgressPhotos,
      loadingProgressPhotos,
      measurement,
      measurementloading
    } = this.props;
    const { activeTab } = this.state;
    return (
      <React.Fragment>
        <div className="whitebox-body dashboard-body h-100 dashboard-sidebar">
          <div className="activity-title">
            <h2>Today</h2>
          </div>
          <div className="activity-header">
            <div className="exercise-navbar">
              <div className="tabs sub-tab">
                <div
                  className={cns("tab", { active: activeTab === "exercise" })}
                >
                  <a
                    href="#"
                    onClick={() => this.setState({ activeTab: "exercise" })}
                  >
                    Exercise
                  </a>
                </div>
                <div
                  className={cns("tab", { active: activeTab === "nutrition" })}
                >
                  <a
                    href="#"
                    onClick={() => this.setState({ activeTab: "nutrition" })}
                  >
                    Nutrition
                  </a>
                </div>
                <div className={cns("tab", { active: activeTab === "logs" })}>
                  <a
                    href="#"
                    onClick={() => this.setState({ activeTab: "logs" })}
                  >
                    Logs
                  </a>
                </div>
                <div className={cns("tab", { active: activeTab === "photos" })}>
                  <a
                    href="#"
                    onClick={() => this.setState({ activeTab: "photos" })}
                  >
                    Photos
                  </a>
                </div>
              </div>
            </div>
          </div>
          {activeTab === "exercise" && (
            <TodayWorkout loading={loading} workouts={workouts} />
          )}
          {activeTab === "nutrition" && (
            <TodayNutrition
              loading={loading_user_meals}
              user_meals={user_meals}
              recentMeals={this.props.recentMeals}
              authuserId={this.props.authuserId}
            />
          )}
          {activeTab === "logs" && (
            <TodayLogsActivity
              loading={measurementloading}
              measurement={measurement}
            />
          )}
          {activeTab === "photos" && (
            <TodayPhotos
              loading={loadingProgressPhotos}
              todayProgressPhotos={todayProgressPhotos}
            />
          )}
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(withRouter(TodaysActivity));
