import React, { Component } from "react";

import { WIDGET_BADGES } from "../../../constants/consts";
import WidgetBadgesCard from "../../Common/WidgetBadgesCard";

class FithubGoals extends Component {
  render() {
    const { userWidgets, widgetBadges } = this.props;
    return (
      <React.Fragment>
        {userWidgets &&
          typeof userWidgets[WIDGET_BADGES] !== "undefined" &&
          userWidgets[WIDGET_BADGES] === 1 && (
            <div className="col-md-12 col-sm-12 col-xs-12 h-100">
              <WidgetBadgesCard badges={widgetBadges} />
            </div>
          )}
      </React.Fragment>
    );
  }
}

export default FithubGoals;
