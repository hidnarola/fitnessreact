import React, { Component } from "react";
import WorkoutsCreateLeftSidebar from "./WorkoutsCreateLeftSidebar";
import WorkoutsCreateContent from "./WorkoutsCreateContent";
import { connect } from "react-redux";
import {
  getExercisesNameRequest,
  getExerciseMeasurementRequest
} from "../../../actions/userScheduleWorkouts";
import { showPageLoader, hidePageLoader } from "../../../actions/pageLoader";
import { routeCodes } from "../../../constants/routes";
import { Link } from "react-router-dom";
import AddMetaDescription from "../../global/AddMetaDescription";
import FitnessHeader from "../../global/FitnessHeader";
import FitnessNav from "../../global/FitnessNav";

class WorkoutsCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <div className="fitness-nutrition">
          <AddMetaDescription>
            <title>Locker | Fitly</title>
          </AddMetaDescription>
          <FitnessHeader
            enableBackLink={true}
            routes={routeCodes.LOCKER_EXERCISE}
            text="locker"
          />
          <FitnessNav />
          <section className="body-wrap nutrition-todays-meal-section locker-section">
            <div className="tab-content">
              <div className="content active">
                <div className="body-head d-flex justify-content-start front-white-header with-tabs custome_header">
                  <div className="body-head-l p-3">
                    <div className="display-date">
                      <span className="date-text ml-4">Workout Creation</span>

                      <button className="btn btn-workouts-creation ml-auto">
                        Save Workout
                      </button>
                    </div>
                  </div>
                </div>
                <div className="body-content flex col-md-12 h-100 mt-3 locker">
                  <div className="nutrition-create">
                    <div className="meal-input">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Workout title"
                        name="workoutTitle"
                        defaultValue=""
                      />
                    </div>
                  </div>
                  <div className="row no-gutters">
                    <div className="col-md-3">
                      <WorkoutsCreateLeftSidebar />
                    </div>
                    <div className="col-md-9 workouts-bg">
                      <WorkoutsCreateContent
                        exerciseMeasurements={this.props.exerciseMeasurements}
                        exercises={this.props.exercises}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </React.Fragment>
    );
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getExercisesNameRequest());
    dispatch(getExerciseMeasurementRequest());
  }
  componentDidUpdate(prevProps, prevState) {
    const { dispatch, loading, exerciseMeasurements, exercises } = this.props;
    if (loading) {
      dispatch(showPageLoader());
    }
    if (!loading && prevProps.exercises !== exercises) {
      dispatch(hidePageLoader());
    }
    if (!loading && prevProps.exerciseMeasurements !== exerciseMeasurements) {
      dispatch(hidePageLoader());
    }
  }
}
const mapStateToProps = state => {
  const { userScheduleWorkouts } = state;
  return {
    exercises: userScheduleWorkouts.get("exercises"),
    exerciseMeasurements: userScheduleWorkouts.get("exerciseMeasurements"),
    loading: userScheduleWorkouts.get("loading")
  };
};

export default connect(mapStateToProps)(WorkoutsCreate);
