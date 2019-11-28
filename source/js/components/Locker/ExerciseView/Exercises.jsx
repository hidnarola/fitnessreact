import React, { Component } from "react";
import cns from "classnames";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { SelectField_ReactSelect } from "../../../helpers/FormControlHelper";
import { BADGES_TASKS } from "../../../constants/consts";
import { getExercisesNameRequest } from "../../../actions/userScheduleWorkouts";
import { hidePageLoader, showPageLoader } from "../../../actions/pageLoader";
import { prepareExerciseOptions } from "../../../helpers/funs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ExercisesList from "./ExercisesList";
import LockerHeader from "../LockerHeader";
import { Scrollbars } from "react-custom-scrollbars";

class Exercises extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercisesTab: "favourites"
    };
    this.tabList = ["Favourites", "Created", "All"];
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(showPageLoader());
    dispatch(getExercisesNameRequest());
  }
  render() {
    const { exercisesTab } = this.state;
    const { exercises } = this.props;
    let optionsList = [];
    if (exercisesTab === "all") {
      optionsList = exercises ? prepareExerciseOptions(exercises) : [];
    } else if (exercisesTab === "favourites") {
      optionsList = [];
    } else {
      optionsList = [];
    }
    return (
      <React.Fragment>
        <div className="whitebox-body dashboard-body  h-100 locker">
          <div className="locker-header">
            <h3 className="locker-title">Exercises</h3>
          </div>
          <LockerHeader
            exercisesTab={exercisesTab}
            optionsList={optionsList}
            handleChangeTab={this.handleChangeTab}
            tabList={this.tabList}
          />
          <div className="locker-body full-body">
            <Scrollbars autoHide>
              <div className="locker-exercise-list">
                <ul className="locker-exercise-items">
                  <ExercisesList />
                  <ExercisesList />
                  <ExercisesList />
                  <ExercisesList />
                  <ExercisesList />
                  <ExercisesList />
                  <ExercisesList />
                </ul>
              </div>
            </Scrollbars>
          </div>
        </div>
      </React.Fragment>
    );
  }
  componentDidUpdate(prevProps, prevState) {
    const { dispatch, exercisesLoading, exercises } = this.props;
    if (!exercisesLoading && prevProps.exercises !== exercises) {
      dispatch(hidePageLoader());
    }
  }
  handleChangeTab = tab => {
    this.setState({ exercisesTab: tab });
  };
}

Exercises = reduxForm({
  form: "exercises_form"
})(Exercises);

const mapStateToProps = state => {
  const { userScheduleWorkouts } = state;
  return {
    exercisesLoading: userScheduleWorkouts.get("exercisesLoading"),
    exercises: userScheduleWorkouts.get("exercises")
  };
};

export default connect(mapStateToProps)(Exercises);
