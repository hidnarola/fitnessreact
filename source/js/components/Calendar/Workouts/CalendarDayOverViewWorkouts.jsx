import React, { Component } from "react";
import CalendarDayOverViewWorkoutsList from "./CalendarDayOverViewWorkoutsList";

import {
  completeUsersBulkWorkoutScheduleRequest,
  getUserFirstWorkoutByDateRequest,
  getUsersWorkoutScheduleRequest,
  addUserWorkoutTitleRequest,
  setScheduleWorkoutsState,
  addUsersWorkoutScheduleRequest,
  deleteUserWholeExerciseRequest
} from "../../../actions/userScheduleWorkouts";
import { connect } from "react-redux";
import {
  isOnline,
  capitalizeFirstLetter,
  prepareFieldsOptions,
  ts
} from "../../../helpers/funs";
import { hidePageLoader, showPageLoader } from "../../../actions/pageLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Star from "../../../../assets/svg/star.svg";
import { Link } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import SweetAlert from "react-bootstrap-sweetalert";
import CalendarDayNoteList from "./CalendarDayNoteList";
import CalendarDayWorkoutRightSidebar from "./CalendarDayWorkoutRightSidebar";
import CalendarDayRecentWorkoutList from "./CalendarDayRecentWorkoutList";
import CalendarDayStatsList from "./CalendarDayStatsList";
import WorkoutHeader from "./Header/WorkoutHeader";
import WorkoutNav from "./Header/WorkoutNav";
import CalendarDayFitnessTestList from "../FitnessTest/CalendarDayFitnessTestList";
import CalendarDayFitnessTestQuickAdd from "../FitnessTest/CalendarDayFitnessTestQuickAdd";
import CalendarDayFitnessTestAddList from "../FitnessTest/CalendarDayFitnessTestAddList";
import AddWorkoutTitleForm from "../../ScheduleWorkout/AddWorkoutTitleForm";
import moment from "moment";
import { SCHEDULED_WORKOUT_TYPE_EXERCISE } from "../../../constants/consts";
import CalendarNewWorkoutList from "./CalendarNewWorkoutList";

class CalendarDayOverViewWorkouts extends Component {
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
    const {
      completeWorkout,
      isActiveQuickTab,
      cuurentTab,
      isActiveWorkoutTab,
      workout,
      workoutsList,
      showAddWorkoutTitleAlert,
      newSingleWarmup,
      newSingleCooldown,
      newSingleWorkout,
      showWorkoutDeleteAlert
    } = this.state;
    let { index = 1, logDate, errorTitle } = this.props;

    console.log("===========Workout State===========");
    console.log(this.state.workout);
    console.log("==========================");

    return (
      <React.Fragment>
        <div className="body-content workouts-bg">
          <div className="row justify-content-start no-gutters">
            <div className="col-xs-12 col-md-3">
              <div className="overview white-box width-100-per p-0 border-right">
                <div className="overview-header d-flex align-items-center">
                  <h3 className="title-h3 size-14">Today's Workouts</h3>
                </div>
                <div className="workout-body">
                  <ul className="workout-list">
                    {workoutsList.map((workout, index) => (
                      <li
                        key={index}
                        className={
                          isActiveWorkoutTab === `#workout${index + 1}`
                            ? "workout-list-items active d-flex"
                            : "workout-list-items d-flex"
                        }
                      >
                        <div className="workout-content width-100-per">
                          <div
                            className="title"
                            onClick={() =>
                              this.handleChangeWorkoutTab(
                                `#workout${index + 1}`,
                                workout._id
                              )
                            }
                          >
                            {workout.title}
                          </div>
                          <div className="is-complete">
                            <div className="workout-switch-wrap">
                              <small>Workout complete</small>
                              <div className="material-switch ml-auto">
                                <input
                                  id={"workout" + index}
                                  type="checkbox"
                                  checked={completeWorkout}
                                  onChange={() =>
                                    this.handleCompleteWorkout(workout)
                                  }
                                />
                                <label
                                  htmlFor={"workout" + index}
                                  className="label-default"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}

                    <li
                      className="workout-list-items-btn"
                      onClick={() =>
                        this.setState({ showAddWorkoutTitleAlert: true })
                      }
                    >
                      <a href="#" className="btn width-100-per">
                        <FontAwesomeIcon icon="plus" /> Add Workout
                      </a>
                    </li>
                    <SweetAlert
                      type="default"
                      title={`Add workout for - ${moment(logDate)
                        .local()
                        .format("DD/MM/YYYY")}`}
                      onConfirm={() => {}}
                      btnSize="sm"
                      cancelBtnBsStyle="danger"
                      confirmBtnBsStyle="success"
                      show={showAddWorkoutTitleAlert}
                      showConfirm={false}
                      showCancel={false}
                      closeOnClickOutside={false}
                    >
                      <AddWorkoutTitleForm
                        onSubmit={this.handleAddTitleSubmit}
                        onCancel={this.handleAddWorkoutTitleCancel}
                        errorArr={errorTitle}
                      />
                    </SweetAlert>
                  </ul>
                </div>
              </div>
            </div>
            {/* <div
              className={
                isActiveQuickTab ? 'col-xs-12 col-md-6' : 'col-xs-12 col-md-6'
              }
            > */}
            <div className="col-xs-12 col-md-9">
              <div className="white-box width-100-per p-0">
                {/* <WorkoutHeader
                  index={index}
                  completeWorkout={completeWorkout}
                  workout={this.props.workout}
                  handleCompleteWorkout={this.handleCompleteWorkout}
                /> */}
                {cuurentTab !== `#stats` ? (
                  <WorkoutNav
                    cuurentTab={cuurentTab}
                    isActiveQuickTab={isActiveQuickTab}
                    handleChangeTab={this.handleChangeTab}
                    handleSetActiveQuickTab={this.handleSetActiveQuickTab}
                  />
                ) : (
                  ""
                )}

                <div className="row no-gutters h-exercise">
                  <div
                    className={
                      isActiveQuickTab
                        ? "col-xs-12 col-md-7"
                        : "col-xs-12 col-md-8"
                    }
                  >
                    <div className={"exercise-tabs tab-content"}>
                      {cuurentTab === `#warmup` && (
                        <div
                          className={
                            cuurentTab === `#warmup`
                              ? "content active"
                              : "content"
                          }
                        >
                          <Scrollbars autoHide>
                            {workout &&
                              workout.warmup.length > 0 &&
                              workout.warmup.map((warmup, i) => (
                                <CalendarDayOverViewWorkoutsList
                                  workout={warmup}
                                  key={i}
                                  index={i}
                                  exerciseId={warmup._id}
                                  showWorkoutDeleteAlert={
                                    showWorkoutDeleteAlert
                                  }
                                  handleCancelWorkoutDeleteAlert={
                                    this.handleCancelWorkoutDeleteAlert
                                  }
                                  handleDeleteWorkoutSchedule={
                                    this.handleDeleteWorkoutSchedule
                                  }
                                  handleInitDeleteAlert={
                                    this.handleInitDeleteAlert
                                  }
                                  handleAddSetDetails={this.handleAddSetDetails}
                                />
                              ))}
                            {newSingleWarmup.map((item, index) => (
                              <CalendarNewWorkoutList
                                workout={item}
                                workoutIndex={index}
                                handleChangeInput={this.handleChangeInput}
                                handleChangeSetsDetails={
                                  this.handleChangeSetsDetails
                                }
                                handleSubmitExercise={this.handleSubmitExercise}
                                handleRemoveSingleWorkout={
                                  this.handleRemoveSingleWorkout
                                }
                                handleAddSetDetails={this.handleAddSetDetails}
                                handleRemoveSetDetails={
                                  this.handleRemoveSetDetails
                                }
                                handleChangeAdvanceSetDetsils={
                                  this.handleChangeAdvanceSetDetsils
                                }
                                type="warmup"
                              />
                            ))}
                            {workout &&
                              workout.warmup.length === 0 &&
                              newSingleWarmup.length === 0 && (
                                <div className="display-no-workout">
                                  No Exercise Found
                                </div>
                              )}
                          </Scrollbars>
                        </div>
                      )}
                      {cuurentTab === `#workout` && (
                        <div
                          className={
                            cuurentTab === `#workout`
                              ? "content active"
                              : "content"
                          }
                        >
                          <Scrollbars autoHide>
                            {workout &&
                              workout.exercise.length > 0 &&
                              workout.exercise.map((exercise, ei) => (
                                <CalendarDayOverViewWorkoutsList
                                  workout={exercise}
                                  exerciseId={exercise._id}
                                  key={ei}
                                  index={ei}
                                  showWorkoutDeleteAlert={
                                    showWorkoutDeleteAlert
                                  }
                                  handleCancelWorkoutDeleteAlert={
                                    this.handleCancelWorkoutDeleteAlert
                                  }
                                  handleDeleteWorkoutSchedule={
                                    this.handleDeleteWorkoutSchedule
                                  }
                                  handleInitDeleteAlert={
                                    this.handleInitDeleteAlert
                                  }
                                />
                              ))}
                            {newSingleWorkout.map((item, index) => (
                              <CalendarNewWorkoutList
                                workout={item}
                                workoutIndex={index}
                                handleChangeInput={this.handleChangeInput}
                                handleChangeSetsDetails={
                                  this.handleChangeSetsDetails
                                }
                                handleSubmitExercise={this.handleSubmitExercise}
                                handleRemoveSingleWorkout={
                                  this.handleRemoveSingleWorkout
                                }
                                type="workout"
                                handleAddSetDetails={this.handleAddSetDetails}
                                handleRemoveSetDetails={
                                  this.handleRemoveSetDetails
                                }
                                handleChangeAdvanceSetDetsils={
                                  this.handleChangeAdvanceSetDetsils
                                }
                              />
                            ))}
                            {workout &&
                              workout.exercise.length === 0 &&
                              newSingleWorkout.length === 0 && (
                                <div className="display-no-workout">
                                  No Exercise Found
                                </div>
                              )}
                          </Scrollbars>
                        </div>
                      )}
                      {cuurentTab === `#cooldown` && (
                        <div
                          className={
                            cuurentTab === `#cooldown`
                              ? "content active"
                              : "content"
                          }
                        >
                          <Scrollbars autoHide>
                            {workout &&
                              workout.cooldown.length > 0 &&
                              workout.cooldown.map((cooldown, index) => (
                                <CalendarDayOverViewWorkoutsList
                                  workout={cooldown}
                                  exerciseId={cooldown._id}
                                  key={index}
                                  index={index}
                                  showWorkoutDeleteAlert={
                                    showWorkoutDeleteAlert
                                  }
                                  handleCancelWorkoutDeleteAlert={
                                    this.handleCancelWorkoutDeleteAlert
                                  }
                                  handleDeleteWorkoutSchedule={
                                    this.handleDeleteWorkoutSchedule
                                  }
                                  handleInitDeleteAlert={
                                    this.handleInitDeleteAlert
                                  }
                                />
                              ))}
                            {newSingleCooldown.map((item, index) => (
                              <CalendarNewWorkoutList
                                workout={item}
                                workoutIndex={index}
                                handleChangeInput={this.handleChangeInput}
                                handleChangeSetsDetails={
                                  this.handleChangeSetsDetails
                                }
                                handleSubmitExercise={this.handleSubmitExercise}
                                handleRemoveSingleWorkout={
                                  this.handleRemoveSingleWorkout
                                }
                                type="cooldown"
                                handleAddSetDetails={this.handleAddSetDetails}
                                handleRemoveSetDetails={
                                  this.handleRemoveSetDetails
                                }
                                handleChangeAdvanceSetDetsils={
                                  this.handleChangeAdvanceSetDetsils
                                }
                              />
                            ))}
                            {workout &&
                              workout.cooldown.length === 0 &&
                              newSingleCooldown.length === 0 && (
                                <div className="display-no-workout">
                                  No Exercise Found
                                </div>
                              )}
                          </Scrollbars>
                        </div>
                      )}
                      {cuurentTab === `#fitnesstest` && (
                        <div
                          className={
                            cuurentTab === `#notes`
                              ? "content active"
                              : "content"
                          }
                        >
                          <CalendarDayFitnessTestList />
                        </div>
                      )}

                      {cuurentTab === `#notes` && (
                        <div
                          className={
                            cuurentTab === `#notes`
                              ? "content active"
                              : "content"
                          }
                        >
                          <CalendarDayNoteList />
                        </div>
                      )}
                      {cuurentTab === `#stats` && (
                        <div
                          className={
                            cuurentTab === `#stats`
                              ? "content active"
                              : "content"
                          }
                        >
                          <CalendarDayStatsList
                            index={index}
                            handleChangeTab={this.handleChangeTab}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div
                    className={
                      isActiveQuickTab
                        ? "col-xs-12 col-md-5"
                        : "col-xs-12 col-md-4"
                    }
                  >
                    {this.displayRightSidebar(cuurentTab, isActiveQuickTab)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SweetAlert
          show={showWorkoutDeleteAlert}
          danger
          showCancel
          confirmBtnText="Yes, delete it!"
          confirmBtnBsStyle="danger"
          cancelBtnBsStyle="default"
          title="Are you sure?"
          onConfirm={() => this.handleDeleteWorkoutSchedule()}
          onCancel={() => this.handleCancelWorkoutDeleteAlert()}
        >
          You will not be able to recover it!
        </SweetAlert>
      </React.Fragment>
    );
  }
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
  handleSubmitExercise = async index => {
    let {
      newSingleWarmup,
      newSingleWorkout,
      newSingleCooldown,
      workout,
      cuurentTab
    } = this.state;
    let { logDate, dispatch } = this.props;
    let exerciseType;
    let data = [];
    if (cuurentTab === "#warmup") {
      exerciseType = "warmup";
      data = newSingleWarmup[index].exercises.map(
        ({ field1, field2, field3, ...rest }) => ({ ...rest })
      );
    } else if (cuurentTab === "#workout") {
      exerciseType = "exercise";
      data = newSingleWorkout[index].exercises.map(
        ({ field1, field2, field3, ...rest }) => ({ ...rest })
      );
    } else if (cuurentTab === "#cooldown") {
      exerciseType = "cooldown";
      data = newSingleCooldown[index].exercises.map(
        ({ field1, field2, field3, ...rest }) => ({ ...rest })
      );
    }
    let requestData = {
      exercises: data,
      date: new Date(logDate).toISOString(),
      sequence: workout.warmup.length + 1,
      subType: "exercise",
      type: exerciseType,
      userWorkoutsId: workout._id
    };
    await dispatch(
      addUsersWorkoutScheduleRequest(requestData, res => {
        ts("Workout successfully added");
        if (cuurentTab === "#warmup") {
          newSingleWarmup.splice(index, 1);
        } else if (cuurentTab === "#workout") {
          newSingleWorkout.splice(index, 1);
        } else if (cuurentTab === "#cooldown") {
          newSingleCooldown.splice(index, 1);
        }
        this.setState({ newSingleWarmup, newSingleWorkout, newSingleCooldown });
      })
    );
  };
  handleInitDeleteAlert = id => {
    this.setState({ showWorkoutDeleteAlert: true, deleteExerciseId: id });
  };
  handleDeleteWorkoutSchedule = async () => {
    let { workout, deleteExerciseId } = this.state;
    const { dispatch } = this.props;
    console.log("===========exerciseId===========");
    console.log(deleteExerciseId);
    console.log("==========================");
    if (deleteExerciseId) {
      let requestData = {
        exerciseIds: [deleteExerciseId],
        parentId: workout._id
      };
      await dispatch(
        deleteUserWholeExerciseRequest(requestData, res => {
          ts("Your exercise successfully remove");
          this.setState({
            showWorkoutDeleteAlert: false,
            deleteExerciseId: null
          });
        })
      );
    }
  };
  handleCancelWorkoutDeleteAlert = () => {
    this.setState({ showWorkoutDeleteAlert: false });
  };
  componentDidMount() {
    const { index, workout, logDate, dispatch } = this.props;
    // const complete = workout.isCompleted === 0 ? false : true;
    this.setState({ cuurentTab: `#warmup`, completeWorkout: false });
    this.getWorkouts();
  }

  componentDidUpdate(prevProps, prevState) {
    const { completeWorkoutActionInit, addWorkoutTitleInit } = this.state;
    const { dispatch, workout, workoutsList, loading, logDate } = this.props;
    console.log("===========workoutList===========");
    console.log(workoutsList);
    console.log("==========================");
    if (!loading) {
      dispatch(hidePageLoader());
    }
    if (!loading && prevProps.workout !== workout) {
      this.setState({ workout });
    }
    if (!loading && prevProps.workoutsList !== workoutsList) {
      this.setState({ workoutsList });
      if (workoutsList.length === 0) {
        this.setState({ workout: null });
      }
      console.log("===========this.state.workoutsList===========");
      console.log(this.state.workoutsList);
      console.log("==========================");
    }
    if (prevProps.logDate !== logDate) {
      this.getWorkouts();
    }
    if (prevState.addWorkoutTitleInit !== addWorkoutTitleInit) {
      this.getWorkouts();
      dispatch(hidePageLoader());
      this.setState({ showAddWorkoutTitleAlert: false });
    }
  }

  getWorkouts = () => {
    const { dispatch, logDate } = this.props;

    const requestData = {
      date: logDate
    };
    dispatch(
      getUserFirstWorkoutByDateRequest(requestData, null, res => {
        const { workout_id } = res;
        if (workout_id !== null) {
          dispatch(getUsersWorkoutScheduleRequest(workout_id));
        } else {
          this.setState({ workoutsList: [], workout: null });
        }
      })
    );
  };
  handleChangeWorkoutTab = (workoutTab, id) => {
    const { dispatch } = this.props;
    this.setState({ isActiveWorkoutTab: workoutTab });
    dispatch(getUsersWorkoutScheduleRequest(id));
  };

  handleCompleteWorkout = workout => {
    if (isOnline()) {
      const { dispatch, loading, workout } = this.props;
      if (workout && workout._id && !loading) {
        var isCompleted =
          typeof workout.isCompleted !== "undefined"
            ? workout.isCompleted === 0
              ? 1
              : 0
            : 1;
        var requestData = {
          exerciseIds: [workout._id],
          isCompleted: isCompleted
        };
        this.setState({
          completeWorkoutActionInit: true,
          completeWorkout: !this.state.completeWorkout
        });

        dispatch(
          completeUsersBulkWorkoutScheduleRequest(requestData, res => {
            const { dispatch } = this.props;
            dispatch(hidePageLoader());
          })
        );
      }
    } else {
      tw("You are offline, please check your internet connection");
    }
  };
  handleChangeTab = tab => {
    this.setState({ cuurentTab: tab });
  };
  handleSetActiveQuickTab = tab => {
    this.setState({ isActiveQuickTab: tab });
  };
  handleAddTitleSubmit = data => {
    const { dispatch, workout, logDate } = this.props;
    var date =
      workout && workout.date
        ? workout.date
        : moment(logDate)
            .startOf("day")
            .utc();
    if (!date) {
      date = moment()
        .startOf("day")
        .utc();
    }
    var requestData = {
      title:
        data.title && data.title.trim()
          ? capitalizeFirstLetter(data.title.trim())
          : "",
      description:
        data.description && data.description.trim()
          ? capitalizeFirstLetter(data.description.trim())
          : "",
      type: SCHEDULED_WORKOUT_TYPE_EXERCISE,
      date: date
    };
    this.setState({ addWorkoutTitleInit: true });
    dispatch(addUserWorkoutTitleRequest(requestData));
    dispatch(showPageLoader());
  };
  handleAddWorkoutTitleCancel = () => {
    const { dispatch } = this.props;
    this.setState({ showAddWorkoutTitleAlert: false });
    let stateData = { errorTitle: [] };
    dispatch(setScheduleWorkoutsState(stateData));
  };

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
            logDate={this.props.logDate}
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
}
const mapStateToProps = state => {
  const { userScheduleWorkouts } = state;
  return {
    workout: userScheduleWorkouts.get("workout"),
    workoutsList: userScheduleWorkouts.get("workoutsList"),
    loading: userScheduleWorkouts.get("loading"),
    error: userScheduleWorkouts.get("error"),
    errorTitle: userScheduleWorkouts.get("errorTitle")
  };
};
export default connect(mapStateToProps)(CalendarDayOverViewWorkouts);
