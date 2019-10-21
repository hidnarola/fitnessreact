import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import ExerciseViewSidebar from "./ExerciseViewSidebar";
import ExerciseViewContent from "./ExerciseViewContent";

class ExerciseView extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="body-content exerciseview">
          <div className="exercise-navbar">
            <div className="tabs sub-tab">
              <div className="tab active">
                <Link to="#">Strength</Link>
              </div>
              <div className="tab">
                <Link to="#">Endurance</Link>
              </div>
              <div className="tab">
                <Link to="#">Mobility</Link>
              </div>
              <div className="tab">
                <Link to="#">Fitness Tests</Link>
              </div>
            </div>
          </div>
          <div className="whitebox-body exerciseview-body">
            <div className="row no-gutters h-100">
              <div className="col-xs-12 col-md-3">
                <ExerciseViewSidebar />
              </div>
              <div className="col-xs-12 col-md-9">
                <ExerciseViewContent />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ExerciseView;
