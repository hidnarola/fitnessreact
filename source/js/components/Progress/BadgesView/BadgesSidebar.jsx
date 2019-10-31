import React, { Component } from "react";
import { FITLY_MANAGEMENT, YOU } from "../../../constants/consts";

class BadgesSidebar extends Component {
  render() {
    const {
      badgesList,
      selectedViewList,
      selectedUserViewList,
      handleChangeStatus,
      handleChangeState,
      personalGoalsList
    } = this.props;
    return (
      <React.Fragment>
        <div className="exerciseview-sidebar h-100">
          <div>
            <h2>Created By :</h2>
            <div className="serving-select p-2 width-100-per">
              <select
                className="form-control"
                value={selectedUserViewList}
                onChange={e =>
                  handleChangeState("selectedUserViewList", e.target.value)
                }
              >
                <option value="you">You</option>
                <option value="management">Fitly Management</option>
              </select>
            </div>
          </div>
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
              {badgesList.length > 0 &&
                selectedUserViewList === FITLY_MANAGEMENT &&
                badgesList.map((item, i) => (
                  <li key={i} style={{ textTransform: "captilize" }}>
                    {item.title}
                    <div className="custom_check">
                      <input
                        type="checkbox"
                        id={item.title}
                        name={item.title}
                        checked={item.checked}
                        onChange={e => handleChangeStatus("badgesList", i)}
                      />
                      <label className="mb-0" htmlFor={item.title} />
                    </div>
                  </li>
                ))}

              {personalGoalsList.length > 0 &&
                selectedUserViewList === YOU &&
                personalGoalsList.map((item, i) => (
                  <li key={i} style={{ textTransform: "captilize" }}>
                    {item.title}
                    <div className="custom_check">
                      <input
                        type="checkbox"
                        id={item.title}
                        name={item.title}
                        checked={item.checked}
                        onChange={() => handleChangeStatus("personal", i)}
                      />
                      <label className="mb-0" htmlFor={item.title} />
                    </div>
                  </li>
                ))}

              {((selectedUserViewList === YOU &&
                personalGoalsList.length === 0) ||
                (selectedUserViewList === FITLY_MANAGEMENT &&
                  badgesList.length === 0)) && <li>No Tracking Found</li>}
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BadgesSidebar;
