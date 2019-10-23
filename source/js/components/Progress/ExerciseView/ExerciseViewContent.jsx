import React, { Component } from "react";
import ExerciseViewAreaGraph from "./ExerciseViewAreaGraph";

class ExerciseViewContent extends Component {
  render() {
    const { title } = this.props;
    return (
      <React.Fragment>
        <div className="exercise-content">
          <div className="content-title">
            <h3>{title}</h3>
          </div>
          <div className="content-graph p-3" style={{ borderRadius: "5px" }}>
            <ExerciseViewAreaGraph />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ExerciseViewContent;
