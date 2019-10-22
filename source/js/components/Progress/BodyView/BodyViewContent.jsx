import React, { Component } from "react";
import BodyViewAreaGraph from "./BodyViewAreaGraph";

class BodyViewContent extends Component {
  render() {
    const { activeSidebarTab } = this.props;
    return (
      <React.Fragment>
        <div className="exercise-content">
          <div className="content-title">
            <h3>{activeSidebarTab}</h3>
          </div>
          <div className="content-graph p-3" style={{ borderRadius: "5px" }}>
            <BodyViewAreaGraph />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BodyViewContent;
