import React, { Component } from "react";

class ExerciseViewSidebar extends Component {
  render() {
    const { dataList = [], handleChangeActiveTab, activeTab } = this.props;
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
              {dataList.map((item, i) => (
                <li
                  className={activeTab === item ? "active" : ""}
                  onClick={() => handleChangeActiveTab(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ExerciseViewSidebar;
