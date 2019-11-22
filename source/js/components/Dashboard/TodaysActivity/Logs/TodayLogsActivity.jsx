import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { FaCircleONotch } from "react-icons/lib/fa";
import NoRecordFound from "../../../Common/NoRecordFound";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router-dom";
import { routeCodes } from "../../../../constants/routes";
import LogsActivityList from "./LogsActivityList";
import noLogsFoundImg from "../../../../../assets/img/no-logs-found.png";

class TodayLogsActivity extends Component {
  render() {
    const { loading, history, measurement } = this.props;
    console.log("===========measurement Logs Activity===========");
    console.log("measurement Logs Activity", measurement);
    console.log("==========================");
    return (
      <React.Fragment>
        <div className="activity-body fithub-body">
          {loading && (
            <div className="loader" key={0}>
              <FaCircleONotch className="loader-spinner loader-spinner-icon mr-1" />
              Loading ...
            </div>
          )}
          <Scrollbars autoHide>
            {!loading &&
              (Object.keys(measurement).length > 0 ? (
                <ul className="workout-list">
                  {typeof measurement === "object" &&
                    measurement &&
                    Object.keys(measurement).map(
                      (mk, index) =>
                        mk !== "logDate" &&
                        mk !== "userId" &&
                        mk !== "_id" &&
                        mk !== "modifiedAt" &&
                        mk !== "createdAt" ? (
                          <LogsActivityList
                            history={history}
                            key={mk}
                            measurement={measurement[mk]}
                            measurementTitle={mk}
                          />
                        ) : (
                          ""
                        )
                    )}
                </ul>
              ) : (
                <div className="d-flex flex-wrap justify-content-center dashboard-record-not-found">
                  <img
                    src={noLogsFoundImg}
                    alt="NoWorkoutFound"
                    height="200px"
                  />
                  <h3 className="mt-5">You've not added</h3>
                  <h3> logs for today</h3>
                </div>
              ))}
          </Scrollbars>
          {!loading && (
            <ul className="workout-list display-workout-btn">
              <li
                className="workout-list-items-btn"
                onClick={() => history.push(routeCodes.CALENDAR_OVERVIEW)}
              >
                <a href="#" className="btn width-100-per">
                  <FontAwesomeIcon icon="plus" /> Add Workout
                </a>
              </li>
            </ul>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(TodayLogsActivity);
