import React, { Component } from "react";
import { FaCircleONotch } from "react-icons/lib/fa";
import { Scrollbars } from "react-custom-scrollbars";
import NutritionActivityList from "./NutritionActivityList";
import { routeCodes } from "../../../../constants/routes";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cns from "classnames";
import NutritionStatsRightSidebar from "../../../Calendar/Nutritions/sidebar/NutritionStatsRightSidebar";

class TodayNutrition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "breakfast"
    };
  }
  render() {
    const { loading, history } = this.props;
    const { activeTab } = this.state;
    return (
      <React.Fragment>
        <div className="activity-body fithub-body dashboard-nutrition-body">
          <div className="exercise-navbar border-bottom">
            <div className="tabs sub-tab">
              <div
                className={cns("tab", { active: activeTab === "breakfast" })}
              >
                <a
                  href="#"
                  onClick={() => this.setState({ activeTab: "breakfast" })}
                >
                  Breakfast
                </a>
              </div>
              <div className={cns("tab", { active: activeTab === "lunch" })}>
                <a
                  href="#"
                  onClick={() => this.setState({ activeTab: "lunch" })}
                >
                  Lunch
                </a>
              </div>
              <div className={cns("tab", { active: activeTab === "dinner" })}>
                <a
                  href="#"
                  onClick={() => this.setState({ activeTab: "dinner" })}
                >
                  Dinner
                </a>
              </div>
              <div className={cns("tab", { active: activeTab === "snacks" })}>
                <a
                  href="#"
                  onClick={() => this.setState({ activeTab: "snacks" })}
                >
                  Snacks
                </a>
              </div>
              <div className={"tab ml-auto bg-stats"}>
                <a
                  href="#"
                  onClick={() => this.setState({ activeTab: "stats" })}
                >
                  <i className="fad fa-chart-area" />
                </a>
              </div>
            </div>
          </div>
          {loading && (
            <div className="loader" key={0}>
              <FaCircleONotch className="loader-spinner loader-spinner-icon mr-1" />
              Loading ...
            </div>
          )}
          <Scrollbars autoHide>
            {activeTab !== "stats" ? (
              <div className="nutrition-list">
                <NutritionActivityList />
                <NutritionActivityList />
              </div>
            ) : (
              <NutritionStatsRightSidebar />
            )}
          </Scrollbars>
          {!loading && (
            <ul className="workout-list display-workout-btn">
              <li
                className="workout-list-items-btn"
                onClick={() => history.push(routeCodes.CALENDAR_OVERVIEW)}
              >
                <a href="#" className="btn width-100-per">
                  <FontAwesomeIcon icon="plus" /> Add Nutrition
                </a>
              </li>
            </ul>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(TodayNutrition);
