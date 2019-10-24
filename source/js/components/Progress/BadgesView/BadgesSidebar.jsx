import React, { Component } from "react";

class BadgesSidebar extends Component {
  render() {
    const {
      badgesList,
      selectedViewList,
      handleChangeStatus,
      handleChangeState
    } = this.props;
    return (
      <React.Fragment>
        <div className="exerciseview-sidebar h-100">
          <div className="serving-select p-2 width-100-per">
            <select
              className="form-control"
              value={selectedViewList}
              onChange={e =>
                handleChangeState("selectedViewList", e.target.value)
              }
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="inCompleted">Incompleted</option>
            </select>
          </div>
          <div className="progress-exercise-list">
            <ul>
              {badgesList.length > 0 ? (
                badgesList.map((item, i) => (
                  <li key={i} style={{ textTransform: "captilize" }}>
                    {item.title}
                    <div className="custom_check">
                      <input
                        type="checkbox"
                        id={item.title}
                        name={item.title}
                        checked={item.checked}
                        onChange={() => handleChangeStatus(i)}
                      />
                      <label className="mb-0" htmlFor={item.title} />
                    </div>
                  </li>
                ))
              ) : (
                <li>No Tracking Found</li>
              )}
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BadgesSidebar;
