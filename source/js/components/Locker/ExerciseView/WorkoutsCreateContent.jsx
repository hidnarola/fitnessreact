import React, { Component } from "react";
import WorkoutNav from "../../Calendar/Workouts/Header/WorkoutNav";
import { Scrollbars } from "react-custom-scrollbars";
import CalendarNewWorkoutList from "../../Calendar/Workouts/CalendarNewWorkoutList";
import CalendarDayWorkoutRightSidebar from "../../Calendar/Workouts/CalendarDayWorkoutRightSidebar";
import CalendarDayFitnessTestAddList from "../../Calendar/FitnessTest/CalendarDayFitnessTestAddList";
import CalendarDayFitnessTestQuickAdd from "../../Calendar/FitnessTest/CalendarDayFitnessTestQuickAdd";
import CalendarDayRecentWorkoutList from "../../Calendar/Workouts/CalendarDayRecentWorkoutList";
import { prepareFieldsOptions } from "../../../helpers/funs";
import NoWorkoutFound from "../../../../assets/img/no-workouts-found2.png";

class WorkoutsCreateContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cuurentTab: "#warmup",
      completeWorkout: false,
      completeWorkoutActionInit: false,
      isActiveQuickTab: false,
      isActiveWorkoutTab: "#workout1",
      workout: null,
      workoutsList: [],
      showAddWorkoutTitleAlert: false,
      addWorkoutTitleInit: false,
      showWorkoutDeleteAlert: false,
      newSingleWarmup: [],
      newSingleWorkout: [],
      newSingleCooldown: [],
      deleteExerciseId: null
    };
  }
  render() {
    const { cuurentTab, isActiveQuickTab, newSingleWarmup } = this.state;
    return (
      <React.Fragment>
        <div className="white-box width-100-per p-0">
          {cuurentTab !== `#stats` && (
            <WorkoutNav
              cuurentTab={cuurentTab}
              isActiveQuickTab={isActiveQuickTab}
              handleChangeTab={this.handleChangeTab}
              handleSetActiveQuickTab={this.handleSetActiveQuickTab}
            />
          )}
          <div className="row no-gutters h-exercise">
            <div
              className={
                isActiveQuickTab ? "col-xs-12 col-md-7" : "col-xs-12 col-md-8"
              }
            >
              <div className="exercise-tabs tab-content">
                {cuurentTab === `#warmup` && (
                  <div
                    className={
                      cuurentTab === `#warmup` ? "content active" : "content"
                    }
                  >
                    <Scrollbars autoHide>
                      {newSingleWarmup.map((item, index) => (
                        <CalendarNewWorkoutList
                          workout={item}
                          workoutIndex={index}
                          handleChangeInput={this.handleChangeInput}
                          handleChangeSetsDetails={this.handleChangeSetsDetails}
                          handleSubmitExercise={this.handleSubmitExercise}
                          handleRemoveSingleWorkout={
                            this.handleRemoveSingleWorkout
                          }
                          handleAddSetDetails={this.handleAddSetDetails}
                          handleRemoveSetDetails={this.handleRemoveSetDetails}
                          handleChangeAdvanceSetDetsils={
                            this.handleChangeAdvanceSetDetsils
                          }
                          type="warmup"
                        />
                      ))}
                      {newSingleWarmup.length === 0 && (
                        <div className="d-flex flex-wrap justify-content-center dashboard-record-not-found">
                          <img
                            src={NoWorkoutFound}
                            alt="NoWorkoutFound"
                            height="200px"
                            className="mb-5"
                          />
                          <h3 className="m-0 d-flex" style={{fontWeight: "600"}}>You've not added any</h3>
                          <h3 className="m-0 d-flex" style={{fontWeight: "600"}}> workouts for warmup</h3>
                        </div>
                      )}
                    </Scrollbars>
                  </div>
                )}
              </div>
            </div>
            <div
              className={
                isActiveQuickTab ? "col-xs-12 col-md-5" : "col-xs-12 col-md-4"
              }
            >
              {this.displayRightSidebar(cuurentTab, isActiveQuickTab)}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  displayRightSidebar = (cuurentTab, isActiveQuickTab) => {
    var rightSidebar = null;
    if (isActiveQuickTab) {
      if (cuurentTab !== `#fitnesstest`) {
        rightSidebar = (
          <CalendarDayWorkoutRightSidebar
            isActiveQuickTab={isActiveQuickTab}
            handleSetActiveQuickTab={this.handleSetActiveQuickTab}
            exercises={this.props.exercises}
            exerciseMeasurements={this.props.exerciseMeasurements}
            handleAddSingleWorkout={this.handleAddSingleWorkout}
            workouts={this.state.workout}
            cuurentTab={this.state.cuurentTab}
            logDate={this.props.logDate ? this.props.logDate : new Date()}
          />
        );
      } else {
        rightSidebar = <CalendarDayFitnessTestAddList />;
      }
    } else {
      if (cuurentTab === `#fitnesstest`) {
        rightSidebar = (
          <CalendarDayFitnessTestQuickAdd isActiveQuickTab={isActiveQuickTab} />
        );
      } else {
        rightSidebar = (
          <CalendarDayRecentWorkoutList
            isActiveQuickTab={isActiveQuickTab}
            handleSetActiveQuickTab={this.handleSetActiveQuickTab}
          />
        );
      }
    }
    return rightSidebar;
  };

  handleAddSingleWorkout = obj => {
    let {
      newSingleWarmup,
      newSingleWorkout,
      newSingleCooldown,
      cuurentTab
    } = this.state;
    const { exerciseMeasurements = [] } = this.props;
    let exercises = [];
    let exerciseDetail;
    let newWorkout;

    let cat = obj.cat ? obj.cat : "";
    let subCat = obj.subCat ? obj.subCat : "";
    console.log("cat => ", cat);
    console.log("subCat => ", subCat);
    let measObj = _.find(exerciseMeasurements, {
      category: cat,
      subCategory: subCat
    });
    console.log("measObj => ", measObj);

    exerciseDetail = {
      differentSets: 0,
      exerciseId: obj.value,
      exerciseObj: obj,
      // restTime: 2,
      // restTimeUnit: "second",
      sets: 1,
      setsDetails: [
        {
          field1: { value: 1, unit: "second" },
          field2: { value: 1, unit: "effort" },
          field3: null,
          restTime: 0,
          restTimeUnit: "second"
        }
      ],
      field1:
        measObj && measObj.field1 ? prepareFieldsOptions(measObj.field1) : [],
      field2:
        measObj && measObj.field2 ? prepareFieldsOptions(measObj.field2) : [],
      field3:
        measObj && measObj.field3 ? prepareFieldsOptions(measObj.field3) : []
    };
    exercises.push({ ...exerciseDetail });
    if (cuurentTab === "#warmup") {
      newSingleWarmup.push({ exercises: exercises });
      this.setState({ newSingleWarmup });
    } else if (cuurentTab === "#workout") {
      newSingleWorkout.push({ exercises: exercises });
      this.setState({ newSingleWorkout });
    } else {
      newSingleCooldown.push({ exercises: exercises });
      this.setState({ newSingleCooldown });
    }
  };

  handleChangeTab = tab => {
    this.setState({ cuurentTab: tab });
  };

  handleSetActiveQuickTab = tab => {
    this.setState({ isActiveQuickTab: tab });
  };

  handleRemoveSingleWorkout = (index, type) => {
    let { newSingleWarmup, newSingleWorkout, newSingleCooldown } = this.state;
    if (type === "warmup") {
      newSingleWarmup.splice(index, 1);
    } else if (type === "workout") {
      newSingleWorkout.splice(index, 1);
    } else if (type === "cooldown") {
      newSingleCooldown.splice(index, 1);
    }
    this.setState({ newSingleWarmup, newSingleWorkout, newSingleCooldown });
  };

  handleChangeInput = (
    workoutsListsIndex,
    exerciseIndex,
    fieldName,
    value,
    type
  ) => {
    let { newSingleWarmup, newSingleWorkout, newSingleCooldown } = this.state;
    if (type === "warmup") {
      newSingleWarmup[workoutsListsIndex].exercises[exerciseIndex][
        fieldName
      ] = value;
    } else if (type === "workout") {
      newSingleWorkout[workoutsListsIndex].exercises[exerciseIndex][
        fieldName
      ] = value;
    } else if (type === "cooldown") {
      newSingleCooldown[workoutsListsIndex].exercises[exerciseIndex][
        fieldName
      ] = value;
    }
    this.setState({ newSingleWarmup, newSingleWorkout, newSingleCooldown });
  };

  handleChangeSetsDetails = (
    workoutsListsIndex,
    exerciseIndex,
    setDetailIndex,
    fieldName,
    value,
    type
  ) => {
    let { newSingleWarmup, newSingleWorkout, newSingleCooldown } = this.state;
    if (type === "warmup") {
      newSingleWarmup[workoutsListsIndex].exercises[exerciseIndex].setsDetails[
        setDetailIndex
      ][fieldName] = value;
    } else if (type === "workout") {
      newSingleWorkout[workoutsListsIndex].exercises[exerciseIndex].setsDetails[
        setDetailIndex
      ][fieldName] = value;
    } else if (type === "cooldown") {
      newSingleCooldown[workoutsListsIndex].exercises[
        exerciseIndex
      ].setsDetails[setDetailIndex][fieldName] = value;
    }
    this.setState({ newSingleWarmup, newSingleWorkout, newSingleCooldown });
  };

  handleAddSetDetails = (
    workoutsListsIndex,
    exerciseIndex,
    type,
    timeUnit,
    speedUnit
  ) => {
    let { newSingleWarmup } = this.state;
    if (type === "warmup") {
      let setDetails =
        newSingleWarmup[workoutsListsIndex].exercises[exerciseIndex]
          .setsDetails;
      setDetails.push({
        field1: { value: 1, unit: timeUnit },
        field2: { value: 1, unit: speedUnit },
        field3: null,
        restTime: 0,
        restTimeUnit: "second"
      });
      console.log("===========setDetails===========");
      console.log(setDetails);
      console.log("==========================");
      this.setState({ newSingleWarmup });
    }
  };

  handleRemoveSetDetails = (
    workoutsListsIndex,
    exerciseIndex,
    type,
    setDetailIndex
  ) => {
    console.log("===========setDetailIndex===========");
    console.log(setDetailIndex);
    console.log("==========================");
    let { newSingleWarmup } = this.state;
    let setDetails =
      newSingleWarmup[workoutsListsIndex].exercises[exerciseIndex].setsDetails;
    setDetails.splice(setDetailIndex, 1);
    newSingleWarmup[workoutsListsIndex].exercises[exerciseIndex].setsDetails;
    this.setState({ newSingleWarmup });
  };

  handleChangeAdvanceSetDetsils = (
    workoutsListsIndex,
    exerciseIndex,
    fieldName,
    value,
    type
  ) => {
    let { newSingleWarmup } = this.state;
    if (type === "warmup") {
      newSingleWarmup[workoutsListsIndex].exercises[
        exerciseIndex
      ].setsDetails.forEach((item, i) => {
        item[fieldName]["unit"] = value;
      });
    }
    console.log("===========newSingleWarmup===========");
    console.log(newSingleWarmup);
    console.log("==========================");
    this.setState({ newSingleWarmup });
  };
}

export default WorkoutsCreateContent;
