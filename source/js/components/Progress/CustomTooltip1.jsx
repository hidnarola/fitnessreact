import React, { Component } from "react";

class CustomTooltip1 extends Component {
  render() {
    const { payload, label, active, valueLabel, valueUnit } = this.props;
    let payloadValue = "";
    let payloadName = "";
    if (payload && payload.length > 0) {
      payloadValue = payload[0].value;
      payloadName = payload[0].name;
    }
    console.log("===========payload===========");
    console.log(payload);
    console.log("==========================");
    if (active) {
      return (
        payload[0].payload.name !== null && (
          <div className="custom-graph-tooltip-wrapper">
            <ul>
              <li>
                <strong>Date : </strong> <span>{label}</span>
              </li>
              <li>
                <strong>{payloadName} : </strong>{" "}
                <span>
                  {payloadValue}
                  {valueUnit ? valueUnit : ""}
                </span>
              </li>
            </ul>
          </div>
        )
      );
    }
    return null;
  }
}

export default CustomTooltip1;
