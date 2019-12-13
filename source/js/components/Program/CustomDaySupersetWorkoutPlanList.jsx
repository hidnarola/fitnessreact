import React, { Component } from "react";
import { ButtonToolbar, DropdownButton, MenuItem } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomDaySupersetExerciseList from "./CustomDaySupersetExerciseList";
import { routeCodes } from "../../constants/routes";
import { withRouter } from "react-router-dom";

class CustomDaySupersetWorkoutPlanList extends Component {
  render() {
    const { workout, index } = this.props;
    console.log("===========superset Workout Display===========");
    console.log("superset Workout Display", workout);
    console.log("==========================");
    let exerciseIndex = 97;
    return (
      <React.Fragment>
        <div className="wp-superset-exercise-box mb-3">
          <div className="wp-superset-exercise-header">
            <span>{index + 1}.</span>
            <h3 onClick={() => this.handleClickWorkoutTitle(workout._id)}>
              Superset
            </h3>
            <ButtonToolbar className="workoutplan-toolbar ml-auto mr-3">
              <DropdownButton
                className="workoutplan-btn d-flex align-items-center"
                title={<i className="fad fa-ellipsis-h" />}
                id="dropdown-size-medium"
                pullRight
              >
                <MenuItem eventKey="1"> Edit </MenuItem>
                <MenuItem eventKey="2"> Copy </MenuItem>
                <MenuItem eventKey="3"> Cut </MenuItem>
              </DropdownButton>
            </ButtonToolbar>
            <button className="btn btn-delete">
              <i className="fad fa-trash" />
            </button>
          </div>
          <div className="wp-superset-exercise-content">
            <div className="row no-gutters border-down">
              <div className="col-md-4 border-right">
                <span className="wp-title">Sets :</span>
              </div>
              <div className="col-md-8 col-sm-12">
                <div className="row no-gutters">
                  <div className="col-md-6">
                    <div className="serving-boxs width-100-per m-0">
                      <button className="btn btn-minus">
                        <FontAwesomeIcon icon="minus" />
                      </button>
                      <input
                        type="number"
                        className="form-control"
                        defaultValue={"3"}
                      />
                      <button className="btn btn-plus">
                        <FontAwesomeIcon icon="plus" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row no-gutters border-down">
              <div className="col-md-4 border-right">
                <span className="wp-title">Rest :</span>
              </div>
              <div className="col-md-8 col-sm-12">
                <div className="row no-gutters">
                  <div className="col-md-6 border-right">
                    <div className="serving-boxs width-100-per m-0">
                      <button className="btn btn-minus">
                        <FontAwesomeIcon icon="minus" />
                      </button>
                      <input
                        type="number"
                        className="form-control"
                        defaultValue={"3"}
                      />
                      <button className="btn btn-plus">
                        <FontAwesomeIcon icon="plus" />
                      </button>
                    </div>
                  </div>
                  <div className="col-md-6 border-right">
                    <div className="serving-select width-100-per">
                      <select className="form-control" defaultValue={"second"}>
                        <option value="second">Seconds</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {workout &&
              workout.exercises &&
              workout.exercises.length > 0 &&
              workout.exercises.map((item, index) => (
                <CustomDaySupersetExerciseList
                  exerciseIndex={exerciseIndex + index}
                  exerciseItems={item}
                  key={index}
                  exerciseMeasurements={this.props.exerciseMeasurements}
                />
              ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
  handleClickWorkoutTitle = workoutid => {
    const { programId, history, workout, workoutId } = this.props;
    var program_id = programId;
    var workout_id = workoutId;
    let url = routeCodes.SAVE_PROGRAM_SCHEDULE_WORKOUT.replace(
      ":id",
      program_id
    );
    url = url.replace(":workout_id", workout_id);
    history.push(url);
  };
}

export default withRouter(CustomDaySupersetWorkoutPlanList);
