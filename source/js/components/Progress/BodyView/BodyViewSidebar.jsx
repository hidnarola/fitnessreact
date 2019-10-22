import React, { Component } from "react";

class BodyViewSidebar extends Component {
  render() {
    const { activeSidebarTab, handleChangeSidebarTab } = this.props;
    return (
      <React.Fragment>
        <div className="exerciseview-sidebar h-100">
          <div className="serving-select p-2 width-100-per">
            <select className="form-control">
              <option>This month</option>
              <option>Last month</option>
              <option>Last 3 months</option>
              <option>Last 6 months</option>
              <option>Last year</option>
            </select>
          </div>
          <div className="subtitle">Exercises with data for period:</div>
          <div className="progress-exercise-list">
            <ul>
              <li
                className={activeSidebarTab === "neck" ? "active" : ""}
                onClick={() => handleChangeSidebarTab("neck")}
              >
                Neck
              </li>
              <li
                className={activeSidebarTab === "chest" ? "active" : ""}
                onClick={() => handleChangeSidebarTab("chest")}
              >
                Chest
              </li>
              <li
                className={activeSidebarTab === "body fat" ? "active" : ""}
                onClick={() => handleChangeSidebarTab("body fat")}
              >
                Body Fat
              </li>
              <li
                className={activeSidebarTab === "quadricep" ? "active" : ""}
                onClick={() => handleChangeSidebarTab("quadricep")}
              >
                Quadricep
              </li>
              <li
                className={activeSidebarTab === "upper arm" ? "active" : ""}
                onClick={() => handleChangeSidebarTab("upper arm")}
              >
                Upper arm
              </li>
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BodyViewSidebar;
