import React, { Component } from "react";
import AddMetaDescription from "../../global/AddMetaDescription";
import FitnessHeader from "../../global/FitnessHeader";
import FitnessNav from "../../global/FitnessNav";

class WorkoutPlanCreate extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="fitness-nutrition">
          <AddMetaDescription>
            <title>Locker | Fitly</title>
          </AddMetaDescription>
          <FitnessHeader />
          <FitnessNav />
          <section className="body-wrap nutrition-todays-meal-section locker-section">
            <div className={"tab-content"}>
              <div className="content active">
                <div className="body-head d-flex justify-content-start front-white-header with-tabs custome_header">
                  <div className="body-head-l p-3">
                    <div className="display-date">
                      <span className="date-text ml-4">
                        Workout Plan Creation
                      </span>

                      <button className="btn btn-workouts-creation ml-auto">
                        Save Plan
                      </button>
                    </div>
                  </div>
                </div>
                <div className="body-content flex col-md-12 h-100 mt-3 locker" />
              </div>
            </div>
          </section>
        </div>
      </React.Fragment>
    );
  }
}

export default WorkoutPlanCreate;
