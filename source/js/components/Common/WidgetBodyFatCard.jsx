import React, { Component } from "react";
import { connect } from "react-redux";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip
} from "recharts";
import DateRangePicker from "react-daterange-picker";
import {
  WIDGET_BODY_FAT,
  WIDGETS_TYPE_TIMELINE,
  FRIENDSHIP_STATUS_SELF,
  WIDGETS_TYPE_DASHBOARD
} from "../../constants/consts";
import moment from "moment";
import { FaCircleONotch } from "react-icons/lib/fa";
import ErrorCloud from "svg/error-cloud.svg";
import NoRecordFound from "./NoRecordFound";
import DateRangePickerCustomPeriod from "./DateRangePickerCustomPeriod";
import { isOnline, tw } from "../../helpers/funs";
import cns from "classnames";
import { Scrollbars } from "react-custom-scrollbars";

class WidgetBodyFatCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCalendar: false,
      activeTab: "graph"
    };
  }

  render() {
    const {
      bodyFat,
      userWidgets,
      changeBodyFatLoading,
      changeBodyFatError,
      type,
      profile
    } = this.props;
    const { showCalendar, activeTab } = this.state;
    let dateRange = null;
    if (
      userWidgets &&
      typeof userWidgets[WIDGET_BODY_FAT] !== "undefined" &&
      userWidgets[WIDGET_BODY_FAT]
    ) {
      let start = userWidgets[WIDGET_BODY_FAT].start;
      let end = userWidgets[WIDGET_BODY_FAT].end;
      dateRange = moment.range(start, end);
    }
    console.log("===========bodyFat===========");
    console.log("bodyFat", bodyFat);
    console.log("==========================");
    return (
      <div className="white-box space-btm-30 dashboard-bodyfat-card">
        {/* <div className="whitebox-head d-flex">
          <h3 className="title-h3">Body Fat</h3>
          {((type === WIDGETS_TYPE_TIMELINE &&
            profile &&
            profile.friendshipStatus &&
            profile.friendshipStatus === FRIENDSHIP_STATUS_SELF) ||
            type === WIDGETS_TYPE_DASHBOARD) && (
            <div className="whitebox-head-r">
              <a
                href="javascript:void(0)"
                onClick={this.toggleCalendar}
                className="icon-date_range"
              />
            </div>
          )}
          {((type === WIDGETS_TYPE_TIMELINE &&
            profile &&
            profile.friendshipStatus &&
            profile.friendshipStatus === FRIENDSHIP_STATUS_SELF) ||
            type === WIDGETS_TYPE_DASHBOARD) &&
            showCalendar && (
              <div className="bodyfat-date-range-picker custom_date_pdl">
                <DateRangePickerCustomPeriod
                  dateRange={dateRange}
                  changeCallback={this.handleCustomDateRange}
                />
                <DateRangePicker
                  firstOfWeek={1}
                  numberOfCalendars={1}
                  selectionType="range"
                  value={dateRange}
                  onSelect={this.handleTimeDateRange}
                  className="progress-date-range"
                />
              </div>
            )}
        </div> */}

        {changeBodyFatLoading && (
          <div className="text-c">
            <FaCircleONotch className="loader-spinner fs-50" />
          </div>
        )}
        {!changeBodyFatLoading &&
          bodyFat &&
          bodyFat.length > 0 && (
            <div className="graybox-body bodyfat-graph p-0">
              <div className="graph-header d-flex flex-wrap align-items-center width-100-per">
                <i className="fad fa-cog" />
                <p className="display-title">Body Fat - Last Month</p>
                <div className="tabs ml-auto">
                  <div
                    className={cns("tab", { active: activeTab === "graph" })}
                  >
                    <a
                      href="#"
                      onClick={() => this.setState({ activeTab: "graph" })}
                    >
                      <i className="fad fa-chart-area" />
                    </a>
                  </div>
                  <div
                    className={cns("tab", { active: activeTab === "table" })}
                  >
                    <a
                      href="#"
                      onClick={() => this.setState({ activeTab: "table" })}
                    >
                      <i className="fad fa-table" />
                    </a>
                  </div>
                </div>
              </div>
              {activeTab === "graph" && (
                <ResponsiveContainer>
                  <AreaChart
                    data={bodyFat}
                    connectNulls={true}
                    margin={{
                      top: 10,
                      right: 0,
                      left: 0,
                      bottom: 0
                    }}
                  >
                    <defs>
                      <linearGradient
                        id="bodyFatArea"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="8%" stopColor="#9625a9" stopOpacity={1} />
                        <stop
                          offset="92%"
                          stopColor="#1808b3"
                          stopOpacity={1}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="date"
                      hide={true}
                      axisLine={false}
                      tickLine={false}
                      mirror={false}
                      interval="preserveStartEnd"
                      tick={{ stroke: "#000", strokeWidth: 1 }}
                    />
                    <YAxis hide={true} />
                    <Tooltip
                      content={
                        <CustomTooltip valueLabel="Body Fat" valueUnit="%" />
                      }
                    />
                    <Area
                      type="monotone"
                      dataKey="count"
                      activeDot={{
                        stroke: "#46E9C5",
                        strokeWidth: 2,
                        fill: "#fff"
                      }}
                      stroke="none"
                      fill="url(#bodyFatArea)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
              {activeTab === "table" && (
                <div className="display-tabls h-100">
                  <Scrollbars autoHide>
                    <ul className="list-graph-details">
                      {bodyFat &&
                        bodyFat.length > 0 &&
                        bodyFat.map((item, index) => (
                          <li className="list-graph-items" key={index}>
                            <span>{item.date}</span>
                            <span className="ml-auto">{item.count} kg</span>
                          </li>
                        ))}
                    </ul>
                  </Scrollbars>
                </div>
              )}
            </div>
          )}
        {!changeBodyFatLoading &&
          (!bodyFat || bodyFat.length <= 0) &&
          changeBodyFatError &&
          changeBodyFatError.length <= 0 && <NoRecordFound />}
        {!changeBodyFatLoading &&
          changeBodyFatError &&
          changeBodyFatError.length > 0 && (
            <div className="server-error-wrapper">
              <ErrorCloud />
              <h4>Something went wrong! please try again.</h4>
            </div>
          )}
      </div>
    );
  }

  toggleCalendar = () => {
    const { showCalendar } = this.state;
    if (isOnline()) {
      this.setState({ showCalendar: !showCalendar });
    } else {
      tw("You are offline, please check your internet connection");
    }
  };

  handleTimeDateRange = (range, state) => {
    const { requestBodyFatData } = this.props;
    let requestData = {
      start: range.start,
      end: range.end
    };
    requestBodyFatData(requestData);
    this.toggleCalendar();
  };

  handleCustomDateRange = (start, end) => {
    const { requestBodyFatData } = this.props;
    let requestData = { start, end };
    requestBodyFatData(requestData);
    this.toggleCalendar();
  };
}

const mapStateToProps = state => {
  const { profile } = state;
  return {
    profile: profile.get("profile")
  };
};

export default connect(mapStateToProps)(WidgetBodyFatCard);

class CustomTooltip extends Component {
  render() {
    const { payload, label, active, valueLabel, valueUnit } = this.props;
    let payloadValue = "";
    if (payload && payload.length > 0) {
      payloadValue = payload[0].value;
    }
    if (active) {
      return (
        <div className="custom-graph-tooltip-wrapper">
          <ul>
            <li>
              <strong>Date : </strong> <span>{label}</span>
            </li>
            <li>
              <strong>{valueLabel ? valueLabel : "Data"} : </strong>{" "}
              <span>
                {payloadValue}
                {valueUnit ? valueUnit : ""}
              </span>
            </li>
          </ul>
        </div>
      );
    }
    return null;
  }
}
