import React, { Component } from "react";
import {
  WIDGET_BODY_FAT,
  WIDGETS_TYPE_DASHBOARD,
  WIDGET_MUSCLE
} from "../../../constants/consts";
import WidgetBodyFatCard from "../../Common/WidgetBodyFatCard";
import WidgetMuscleCard from "../../Common/WidgetMuscleCard";
import WidgetMuscleCardNew from "../../Common/WidgetMuscleCardNew";

class FithubBody extends Component {
  render() {
    const {
      userWidgets,
      widgetBodyFat,
      changeBodyFatLoading,
      changeBodyFatError,
      requestBodyFatData,
      widgetMuscle,
      requestGraphData
    } = this.props;
    console.log("===========widgetMuscle===========");
    console.log("widgetMuscle", widgetMuscle);
    console.log("==========================");
    return (
      <React.Fragment>
        {userWidgets &&
          typeof userWidgets[WIDGET_BODY_FAT] !== "undefined" &&
          userWidgets[WIDGET_BODY_FAT] && (
            <div className="col-md-12 col-sm-12 col-xs-12">
              <WidgetBodyFatCard
                type={WIDGETS_TYPE_DASHBOARD}
                userWidgets={userWidgets}
                bodyFat={widgetBodyFat}
                changeBodyFatLoading={changeBodyFatLoading}
                changeBodyFatError={changeBodyFatError}
                requestBodyFatData={requestBodyFatData}
              />
            </div>
          )}
        {/* {userWidgets &&
          userWidgets[WIDGET_MUSCLE] &&
          userWidgets[WIDGET_MUSCLE].length > 0 && (
            <div className="col-md-12 col-sm-12 col-xs-12 row dashboard-muscle-wrapper">
              <WidgetMuscleCard
                type={WIDGETS_TYPE_DASHBOARD}
                userWidgets={userWidgets}
                muscle={widgetMuscle}
                requestGraphData={this.props.requestGraphData}
                bodyWrapperClass="col-md-12 col-sm-12 col-xs-12"
              />
            </div>
          )} */}
        {widgetMuscle &&
          Object.keys(widgetMuscle).length > 0 &&
          Object.keys(widgetMuscle).map((key, index) => (
            <div className="col-md-12 col-sm-12 col-xs-12" key={index}>
              <WidgetMuscleCardNew
                graphData={widgetMuscle[key]}
                title={key}
                cardKey={`muscle-${key}`}
              />
            </div>
          ))}
      </React.Fragment>
    );
  }
}

export default FithubBody;
