import React, { Component } from "react";
import { FaCircleONotch } from "react-icons/lib/fa";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip
} from "recharts";
import NoRecordFound from "./NoRecordFound";
import ErrorCloud from "svg/error-cloud.svg";
import { Scrollbars } from "react-custom-scrollbars";
import cns from "classnames";

class WidgetMuscleCardNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "graph"
    };
  }
  render() {
    const { activeTab } = this.state;
    const { graphData, title, cardKey } = this.props;
    let data = null;
    data = graphData;
    return (
      <React.Fragment>
        <div className="white-box space-btm-30 dashboard-bodyfat-card">
          {data &&
            data.loading && (
              <div className="text-c">
                <FaCircleONotch className="loader-spinner fs-50" />
              </div>
            )}
          {data &&
            !data.loading &&
            data.graphData &&
            data.graphData.length > 0 && (
              <div className="graybox-body bodyfat-graph p-0">
                <div className="graph-header d-flex flex-wrap align-items-center width-100-per">
                  <i className="fad fa-cog" />
                  <p className="display-title">{title} - Last Month</p>
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
                      data={data.graphData}
                      connectNulls={true}
                      margin={{
                        top: 60,
                        right: 0,
                        left: 0,
                        bottom: 0
                      }}
                    >
                      <defs>
                        <linearGradient
                          id={cardKey}
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="8%"
                            stopColor="#9625a9"
                            stopOpacity={1}
                          />
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
                        fill={`url(#${cardKey})`}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
                {activeTab === "table" && (
                  <div className="display-tabls h-100">
                    <Scrollbars autoHide>
                      <ul className="list-graph-details">
                        {data &&
                          data.graphData.length > 0 &&
                          data.graphData.map((item, index) => (
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
          {data &&
            !data.loading &&
            (!data.graphData || data.graphData.length <= 0) &&
            (!data.error || data.error.length <= 0) && <NoRecordFound />}

          {data &&
            !data.loading &&
            data.error &&
            data.error.length > 0 && (
              <div className="server-error-wrapper">
                <ErrorCloud />
                <h4>Something went wrong! please try again.</h4>
              </div>
            )}
        </div>
      </React.Fragment>
    );
  }
}

export default WidgetMuscleCardNew;

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
