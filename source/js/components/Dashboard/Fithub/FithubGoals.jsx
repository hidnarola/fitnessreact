import React, { Component } from "react";

import { WIDGET_BADGES } from "../../../constants/consts";
import WidgetBadgesCard from "../../Common/WidgetBadgesCard";
import BadgesCard from "../../Progress/BadgesView/BadgesCard";

class FithubGoals extends Component {
  render() {
    const { userWidgets, widgetBadges } = this.props;
    let newWidgetBadges = widgetBadges;
    return (
      <React.Fragment>
        {/* {userWidgets &&
          typeof userWidgets[WIDGET_BADGES] !== "undefined" &&
          userWidgets[WIDGET_BADGES] === 1 && (
            <div className="col-md-12 col-sm-12 col-xs-12 h-100">
              <WidgetBadgesCard badges={widgetBadges} />
            </div>
          )} */}
        <div className="badgesView">
          <div className="badges-body">
            {newWidgetBadges &&
              newWidgetBadges.map((item, index) => {
                item.isCompleted = 1;
                return (
                  <div className="col-md-12 col-sm-12 col-xs-12">
                    <BadgesCard badges={item} isDashboard={true} />
                  </div>
                );
              })}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default FithubGoals;
