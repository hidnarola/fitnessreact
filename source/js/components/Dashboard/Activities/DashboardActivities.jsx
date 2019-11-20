import React, { Component } from "react";
import cns from "classnames";
import { Scrollbars } from "react-custom-scrollbars";
import ActivityFeed from "./ActivityFeed";
import { WIDGET_ACTIVITY_FEED } from "../../../constants/consts";
import ActivityYours from "./ActivityYours";
import { FaCircleONotch } from "react-icons/lib/fa";

class DashboardActivities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activityTab: "following"
    };
  }
  render() {
    const { activityTab } = this.state;
    const { loading, userWidgets } = this.props;
    return (
      <React.Fragment>
        <div className="whitebox-body dashboard-body ml-3 mr-3 h-100 dashboard-middle">
          <div className="activity-title">
            <h2>Activity</h2>
          </div>
          <div className="activity-header">
            <div className="exercise-navbar">
              <div className="tabs sub-tab">
                <div
                  className={cns("tab", {
                    active: activityTab === "following"
                  })}
                  onClick={() => this.setState({ activityTab: "following" })}
                >
                  <a href="javascript:void(0)">Following</a>
                </div>
                <div
                  className={cns("tab", {
                    active: activityTab === "yours"
                  })}
                  onClick={() => this.setState({ activityTab: "yours" })}
                >
                  <a href="javascript:void(0)">Yours</a>
                </div>
                <div
                  className={cns("tab", {
                    active: activityTab === "discover"
                  })}
                  onClick={() => this.setState({ activityTab: "discover" })}
                >
                  <a href="javascript:void(0)">Discover</a>
                </div>
              </div>
            </div>
          </div>
          <div className="activity-body">
            {loading && (
              <div className="loader" key={0}>
                <FaCircleONotch className="loader-spinner loader-spinner-icon mr-1" />
                Loading ...
              </div>
            )}
            {!loading &&
              activityTab === "following" &&
              userWidgets &&
              typeof userWidgets[WIDGET_ACTIVITY_FEED] !== "undefined" &&
              userWidgets[WIDGET_ACTIVITY_FEED] === 1 && (
                <Scrollbars autoHide>
                  <ActivityFeed />
                </Scrollbars>
              )}
            {activityTab === "yours" && (
              <Scrollbars
                autoHide
                className="white-box"
                style={{
                  padding: "10px"
                }}
              >
                <ActivityYours key="1" activityTab={activityTab} />
              </Scrollbars>
            )}
            {activityTab === "discover" && (
              <Scrollbars
                autoHide
                className="white-box"
                style={{
                  padding: "10px"
                }}
              >
                <ActivityYours key="2" activityTab={activityTab} />
              </Scrollbars>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DashboardActivities;
