import React, { Component } from "react";
import { ButtonToolbar, Dropdown, MenuItem } from "react-bootstrap";
import { FaPencil, FaTrash } from "react-icons/lib/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CaledarDayWorkoutAdvanceView from "./CaledarDayWorkoutAdvanceView";
import CalendarDayWorkoutView from "./CalendarDayWorkoutView";
import CalendarNewWorkoutView from "./CalendarNewWorkoutView";

class CalendarNewWorkoutList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdvanceView: false
    };
  }
  handelChange = view => {
    if (view === "advanceView") {
      this.setState({ isAdvanceView: true });
    } else {
      this.setState({ isAdvanceView: false });
    }
  };
  render() {
    const { isAdvanceView } = this.state;
    const {
      workout,
      handleSubmitExercise,
      type,
      handleRemoveSingleWorkout,
      workoutIndex
    } = this.props;
    console.log("===========this.props===========");
    console.log(this.props.workout);
    console.log("==========================");
    const {
      exerciseObj,
      sets,
      setsDetails,
      field1,
      field2
    } = workout.exercises[0];
    return (
      <React.Fragment>
        <div className="excercise-boxs">
          <div className="excercise-number">
            <span />
          </div>
          <div className="excercise-right">
            <div className="topbar-title">
              <h3>{exerciseObj.label}</h3>
              <div role="toolbar" className="btn-toolbar ml-auto">
                <button
                  className="btn btn-save border-left border-right"
                  onClick={() =>
                    handleSubmitExercise(this.props.workoutIndex, type)
                  }
                >
                  Save
                  <i className="fad fa-save" />
                </button>

                <button
                  type="button"
                  className="timline-post-del-btn"
                  onClick={() => handleRemoveSingleWorkout(workoutIndex, type)}
                >
                  <FontAwesomeIcon icon="trash-alt" />
                </button>
              </div>
            </div>
            {isAdvanceView ? (
              <CaledarDayWorkoutAdvanceView />
            ) : (
              <CalendarNewWorkoutView
                sets={sets}
                restTime={1}
                restTimeUnit={"second"}
                setsDetails={setsDetails}
                field1Options={field1}
                field2Options={field2}
                exerciseType={exerciseObj.cat}
                workoutIndex={this.props.workoutIndex}
                handleChangeInput={this.props.handleChangeInput}
                handleChangeSetsDetails={this.props.handleChangeSetsDetails}
                type={type}
              />
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CalendarNewWorkoutList;
{
  /* <div className="switch-wrap">
                  <small>Advanced View</small>
                  <div className="material-switch">
                    <input
                      id={'ex' + index}
                      type="checkbox"
                      checked={isAdvanceView}
                      onChange={this.handelChange}
                    />
                    <label
                      htmlFor={'ex' + index}
                      className="label-default"
                    ></label>
                  </div>
                </div> */
}
{
  /* <ButtonToolbar className="boxing-icon border-right">
                  <Dropdown id={`workout-actions-1`} pullRight>
                    <Dropdown.Toggle noCaret>
                      <i className="icon-more_horiz" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <MenuItem
                        eventKey="1"
                        onClick={() => this.handelChange("advanceView")}
                      >
                        Advance Display
                      </MenuItem>
                      <MenuItem
                        eventKey="2"
                        onClick={() => this.handelChange("normalView")}
                      >
                        Move Exercise
                      </MenuItem>
                    </Dropdown.Menu>
                  </Dropdown>
                </ButtonToolbar> */
}
