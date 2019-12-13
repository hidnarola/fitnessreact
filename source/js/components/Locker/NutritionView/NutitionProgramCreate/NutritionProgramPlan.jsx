import React, { Component } from "react";
import AddMetaDescription from "../../../global/AddMetaDescription";
import FitnessHeader from "../../../global/FitnessHeader";
import FitnessNav from "../../../global/FitnessNav";
import { connect } from "react-redux";
import {
  getUserNutritionProgramPlansDetailsRequest,
  pasteUserNutritionMealsRequest,
  deleteUserNutritionProgramsMealsRequest
} from "../../../../actions/userNutritionPrograms";
import { showPageLoader, hidePageLoader } from "../../../../actions/pageLoader";
import { Link, NavLink, withRouter } from "react-router-dom";
import { routeCodes } from "../../../../constants/routes";
import cns from "classnames";
import ReactTooltip from "react-tooltip";
import { Scrollbars } from "react-custom-scrollbars";
import {
  SCHEDULED_WORKOUT_TYPE_RESTDAY,
  SCHEDULED_WORKOUT_TYPE_EXERCISE,
  SCHEDULED_WORKOUT_TYPE_WARMUP,
  SCHEDULED_MEAL
} from "../../../../constants/consts";
import { FaCopy, FaTrash, FaPencil, FaEye } from "react-icons/lib/fa";
import $ from "jquery";
import SweetAlert from "react-bootstrap-sweetalert";
import {
  setSelectedDayForProgram,
  cutUserProgramWorkoutSchedule,
  copyUserProgramWorkoutSchedule,
  pasteUsersProgramWorkoutScheduleRequest,
  setUserProgramState
} from "../../../../actions/userPrograms";
import {
  ts,
  te,
  getElementOffsetRelativeToBody
} from "../../../../helpers/funs";
import _ from "lodash";
import CommonCustomSweetAlert from "../../../Common/CommonCustomSweetAlert";
import NutritionProgramMealList from "./NutritionProgramMealList";

let dragEventActive = false;
let dragEventCardOutside = false;
let dragEventId = null;
let dragEventCardX = null;
let dragEventCardY = null;

let calendarArea = null;

let hardResetContainer = false;

class NutritionProgramPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      program: null,
      workouts: [],
      totalDays: 7,
      showSelectEventAlert: false,
      workoutPasteAction: false,
      deleteWorkoutAlert: false,
      deleteWorkoutActionInit: false,
      selectedWorkoutIdss: null,
      deleteWeekAlert: false,
      deleteWeekActionInit: false,
      selectedWorkoutIds: [],
      deleteBulkActionAlert: false,
      deleteBulkActionInit: false,
      showAddWorkoutTitleAlert: false,
      addWorkoutTitleInit: false,
      addRestDayInit: false,
      selectAllChecked: false,
      showAddMealTitleAlert: false,
      activeViewTab: "grid"
    };
  }
  componentDidMount() {
    const { dispatch, match } = this.props;
    this.getProgramsDetails();
    document.addEventListener("keyup", this.handleKeyUp, true);
    document.addEventListener("mousemove", this.handleMouseMove, true);
    document.addEventListener("mouseup", this.handleMouseUp, true);
  }
  getProgramsDetails = () => {
    const { match, dispatch } = this.props;
    if (match && match.params && match.params.id) {
      dispatch(showPageLoader());
      dispatch(
        getUserNutritionProgramPlansDetailsRequest(match.params.id, res => {
          dispatch(hidePageLoader());
        })
      );
    }
  };
  render() {
    const {
      program,
      selectedDay,
      cutWorkoutData,
      cutWorkout,
      match
    } = this.props;
    const {
      totalDays,
      workouts,
      showSelectEventAlert,
      deleteWorkoutAlert,
      deleteWeekAlert,
      deleteBulkActionAlert,
      showAddWorkoutTitleAlert,
      selectAllChecked,
      activeViewTab,
      showAddMealTitleAlert
    } = this.state;
    var selectedEvents = _.filter(workouts, ["isSelectedForBulkAction", true]);
    console.log("===========CutWorkout And DATA RENDER===========");
    console.log("CutWorkout And DATA RENDER", cutWorkoutData, cutWorkout);
    console.log("==========================");
    var programID = null;
    if (match && match.params && match.params.id) {
      programID = match.params.id;
    }
    return (
      <React.Fragment>
        <div className="fitness-body">
          <AddMetaDescription>
            <title>Fitly</title>
          </AddMetaDescription>
          <FitnessHeader enableBackLink={false} />
          <FitnessNav />
          <section className="body-wrap nutrition-todays-meal-section locker-section">
            <div className="tab-content">
              <div className="content active">
                <div className="body-head d-flex justify-content-start front-white-header with-tabs custome_header">
                  <div className="body-head-l p-3">
                    <div className="display-date">
                      <span className="date-text ml-4">
                        Meal Plan {program && `- ${program.name}`}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="overview-navbar overview-calendar-navbar">
                  <div className="ov-tabs">
                    <div className="ov-tab">
                      <Link
                        to={
                          program
                            ? `${
                                routeCodes.LOCKER_NUTRITION_PROGRAM_MASTER_SAVE
                              }/${program._id}`
                            : ""
                        }
                      >
                        Overview
                      </Link>
                    </div>
                    <div className="ov-tab active">
                      <Link to={"#"}>Plan</Link>
                    </div>
                    <div className="ov-tab ml-auto active">
                      <a href="#">View</a>
                    </div>
                    <div className="ov-tab">
                      <div className="tabs ov-sub-tabs">
                        <div
                          className={cns("tab", {
                            active: activeViewTab === "columns"
                          })}
                          onClick={() =>
                            this.setState({ activeViewTab: "columns" })
                          }
                        >
                          <a href="#">
                            <i className="fad fa-bars" />
                          </a>
                        </div>
                        <div
                          className={cns("tab", {
                            active: activeViewTab === "grid"
                          })}
                          onClick={() =>
                            this.setState({ activeViewTab: "grid" })
                          }
                        >
                          <a href="#">
                            <i className="fad fa-th" />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="ov-tab">
                      <div className="total-day-list">{`< Day 1 - ${totalDays} >`}</div>
                    </div>
                  </div>
                </div>
                <div className="body-content flex col-md-12 h-100 mt-3 locker">
                  <div className="p-unset">
                    <div
                      id="cal-panel-wrap"
                      className={cns(
                        "space-btm-20 my-custom-calendar my-workoutplan-calendar",
                        { active: activeViewTab === "columns" }
                      )}
                    >
                      <div
                        className="profile-body programs-table-wrapper workouts-programs-table"
                        data-for="custom-cut-workout-wrap"
                        data-tip
                      >
                        {selectedEvents &&
                          selectedEvents.length > 0 && (
                            <div className="fixed-btm-bar d-flex">
                              <div className="fixed-btm-bar-l d-flex">
                                <div className="custom_check">
                                  <input
                                    type="checkbox"
                                    id={"select_all_workouts"}
                                    name={"select_all_workouts"}
                                    checked={selectAllChecked}
                                    onChange={this.handleSelectAll}
                                  />
                                  <label htmlFor="select_all_workouts">
                                    Select All
                                  </label>
                                </div>
                                <div className="count-leadeboard bg-pink">
                                  {selectedEvents.length}
                                </div>
                              </div>
                              <div className="fixed-btm-bar-c">
                                <a
                                  href="javascript:void(0)"
                                  data-for="event-bulk-delete-tooltip"
                                  data-tip="Delete"
                                  onClick={() =>
                                    this.setState({
                                      deleteBulkActionAlert: true
                                    })
                                  }
                                >
                                  <i className="icon-delete_forever" />{" "}
                                </a>
                              </div>
                              <ReactTooltip
                                id="event-bulk-delete-tooltip"
                                place="top"
                                type="error"
                                effect="solid"
                              />
                            </div>
                          )}
                        <Scrollbars horizontal autoHide>
                          <CustomDaysCalendarView
                            programId={program ? program._id : null}
                            totalDays={totalDays}
                            workouts={workouts}
                            handleSelectDayAction={this.handleSelectDayAction}
                            handleCut={this.handleCut}
                            handleCopy={this.handleCopy}
                            handleDelete={this.showDeleteConfirmation}
                            handleSelectedForBulk={this.handleSelectedForBulk}
                            exerciseMeasurements={
                              this.props.exerciseMeasurements
                                ? this.props.exerciseMeasurements
                                : []
                            }
                            activeViewTab={activeViewTab}
                          />
                          {activeViewTab === "grid" && (
                            <div className="d-flex flex-wrap align-items-center width-100-per">
                              <button
                                className="btn btn-workouts-creation d-flex align-items-center justify-content-center"
                                style={{ borderRadius: "5px" }}
                                onClick={this.handleAddWeek}
                              >
                                <i className="icon-add_box mr-2" /> Add Week
                              </button>
                              {totalDays > 7 && (
                                <button
                                  className="btn btn-workouts-creation d-flex align-items-center justify-content-center ml-auto"
                                  style={{
                                    background: "#fe676d",
                                    borderRadius: "5px"
                                  }}
                                  onClick={this.handleShowDeleteWeekAlert}
                                >
                                  <i className="icon-delete_forever mr-2" />{" "}
                                  Delete Week
                                </button>
                              )}
                            </div>
                          )}
                        </Scrollbars>
                      </div>
                      {cutWorkout && (
                        <React.Fragment>
                          {console.log("CUTWORKOUT CALL", cutWorkout)}
                          <ReactTooltip
                            id="custom-cut-workout-wrap"
                            place="top"
                            type="dark"
                            effect="float"
                          >
                            <CustomEventCardView event={cutWorkoutData} />
                          </ReactTooltip>
                        </React.Fragment>
                      )}
                      <div
                        id="custom-drag-workout-wrap"
                        style={{ position: "absolute", minWidth: 178 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <SweetAlert
            custom
            customClass="common-custom-alert-box"
            type="default"
            title={undefined}
            onCancel={() => ""}
            onConfirm={() => {}}
            btnSize="sm"
            cancelBtnBsStyle="danger"
            show={showSelectEventAlert}
            showConfirm={false}
            showCancel={false}
            closeOnClickOutside={false}
          >
            <CommonCustomSweetAlert
              title={`Select event for - Day ${selectedDay}`}
              handleCloseAlert={() => this.cancelSelectDayAction()}
            >
              <SelectEventView
                handleShowAlertAddMealTitle={this.handleShowAlertAddMealTitle}
                handleNewRestDay={this.handleNewRestDay}
                handlePaste={this.handlePaste}
              />
            </CommonCustomSweetAlert>
          </SweetAlert>
          {/* <SweetAlert
            customClass="sweetalert-responsive"
            type="default"
            title={`Select event for - Day ${selectedDay}`}
            onCancel={this.cancelSelectDayAction}
            onConfirm={() => {}}
            btnSize="sm"
            cancelBtnBsStyle="danger"
            show={showSelectEventAlert}
            showConfirm={false}
            showCancel={true}
            closeOnClickOutside={false}
          >
            <SelectEventView
              handleShowAlertAddMealTitle={this.handleShowAlertAddMealTitle}
              handleNewRestDay={this.handleNewRestDay}
              handlePaste={this.handlePaste}
            />
          </SweetAlert> */}

          <SweetAlert
            show={deleteWorkoutAlert}
            danger
            showCancel
            confirmBtnText="Yes, delete it!"
            confirmBtnBsStyle="danger"
            cancelBtnBsStyle="default"
            title="Are you sure?"
            onConfirm={this.handleDeleteWorkoutSchedule}
            onCancel={this.handleCancelDelete}
          >
            You will not be able to recover this file!
          </SweetAlert>

          <SweetAlert
            show={deleteWeekAlert}
            danger
            showCancel
            confirmBtnText="Yes, delete it!"
            confirmBtnBsStyle="danger"
            cancelBtnBsStyle="default"
            title="Are you sure?"
            onConfirm={() => this.handleDeleteWeek()}
            onCancel={() => this.handleCancelDeleteWeek()}
          >
            You will not be able to recover this file!
          </SweetAlert>

          <SweetAlert
            show={deleteBulkActionAlert}
            danger
            showCancel
            confirmBtnText="Yes, delete it!"
            confirmBtnBsStyle="danger"
            cancelBtnBsStyle="default"
            title="Are you sure?"
            onConfirm={this.handleDeleteBulkWorkoutSchedule}
            onCancel={() => this.setState({ deleteBulkActionAlert: false })}
          >
            You will not be able to recover this file!
          </SweetAlert>

          <SweetAlert
            custom
            type="default"
            customClass={"common-custom-alert-box"}
            title={undefined}
            onConfirm={() => {}}
            btnSize="sm"
            cancelBtnBsStyle="danger"
            confirmBtnBsStyle="success"
            show={showAddMealTitleAlert}
            showConfirm={false}
            showCancel={false}
            closeOnClickOutside={true}
          >
            <CommonCustomSweetAlert
              title={`Add Meal for - Day ${selectedDay}`}
              handleCloseAlert={() =>
                this.setState({
                  showAddMealTitleAlert: false,
                  showSelectEventAlert: true
                })
              }
            >
              <SelectMealTypeView
                selectedDay={selectedDay}
                programID={programID}
              />
            </CommonCustomSweetAlert>
          </SweetAlert>
        </div>
      </React.Fragment>
    );
  }
  componentDidUpdate(prevProps, prevState) {
    const {
      dispatch,
      loading,
      program,
      cutWorkout,
      error,
      history,
      match
    } = this.props;
    const { workoutPasteAction } = this.state;
    if (!loading && program && prevProps.program !== program) {
      console.log("===========ProgramDetails===========");
      console.log("ProgramDetails", program);
      console.log("==========================");
      var prog = {
        description: program.description,
        name: program.name,
        type: program.type,
        userId: program.userId,
        _id: program._id
      };
      var works = program.programs ? program.programs : [];
      var meals = program.programs;
      var lastDay = 1;
      var newWorks = [];
      if (works && works.length > 0) {
        works = _.orderBy(works, ["day"], ["asc"]);
        console.log("WORKS====Display=====");
        console.log("WORKS====Display=====", works);
        lastDay = works[works.length - 1].day;
        lastDay++;
        console.log("===========worksdetails===========");
        console.log("worksdetails", works);
        console.log("==========================");
        works &&
          works.length > 0 &&
          works.forEach(works => {
            works.type = SCHEDULED_MEAL;
            works.meals &&
              works.meals.length > 0 &&
              works.meals.forEach(meal => {
                newWorks.push({
                  ...meal,
                  type: SCHEDULED_MEAL,
                  isSelectedForBulkAction: false,
                  isCut: cutWorkout === meal._id ? true : false,
                  isCutEnable: cutWorkout ? true : false
                });
              });
          });
      }
      var getNumberOfWeek = Math.ceil(lastDay / 7);
      var totalDaysToGenerate = getNumberOfWeek * 7;
      console.log("===========works Display===========");
      console.log("works Display", works, newWorks, prog);
      console.log("==========================");
      if (prog) {
        this.setState({
          program: prog,
          workouts: newWorks,
          totalDays: totalDaysToGenerate
        });
      } else {
        te("Something went wrong! please try again later.");
        history.push(routeCodes.PROGRAMS);
      }
      this.resetDragContainer();
    }
    if (cutWorkout && prevProps.cutWorkout !== cutWorkout) {
      console.log("CUT WORKOUT CALL DID MOUNT");
      var prog = {
        description: program.description,
        name: program.name,
        type: program.type,
        userId: program.userId,
        _id: program._id
      };
      var works = program.programs ? program.programs : [];
      var lastDay = 1;
      var newWorks = [];
      if (works && works.length > 0) {
        works = _.orderBy(works, ["day"], ["asc"]);
        lastDay = works[works.length - 1].day;
        lastDay++;
        console.log("===========worksdetails===========");
        console.log("worksdetails", works);
        console.log("==========================");
        works &&
          works.length > 0 &&
          works.forEach(works => {
            works.type = SCHEDULED_MEAL;
            works.meals &&
              works.meals.length > 0 &&
              works.meals.forEach(meal => {
                newWorks.push({
                  ...meal,
                  type: SCHEDULED_MEAL,
                  isSelectedForBulkAction: false,
                  isCut: cutWorkout === meal._id ? true : false,
                  isCutEnable: cutWorkout ? true : false
                });
              });
          });
      }
      var getNumberOfWeek = Math.ceil(lastDay / 7);
      var totalDaysToGenerate = getNumberOfWeek * 7;
      if (prog) {
        this.setState({
          program: prog,
          workouts: newWorks,
          totalDays: totalDaysToGenerate
        });
      } else {
        te("Something went wrong! please try again later.");
        history.push(routeCodes.LOCKER_NUTRITION);
      }
    }
    if (workoutPasteAction && !loading) {
      this.setState({ workoutPasteAction: false });
      dispatch(getUserNutritionProgramPlansDetailsRequest(match.params.id));
      this.cancelSelectDayAction();
      const newWorkoutState = { cutWorkout: null, cutWorkoutData: null };
      dispatch(setUserProgramState(newWorkoutState));
      dispatch(hidePageLoader());
      if (error && error.length > 0) {
        te("Something went wrong! please try again later.");
      } else {
        ts("Workout pasted!");
      }
    }
  }
  componentWillUnmount() {
    const { dispatch } = this.props;
    let stateData = { copiedWorkout: null };
    dispatch(setUserProgramState(stateData));
    document.removeEventListener("keyup", this.handleKeyUp, true);
    document.removeEventListener("mousemove", this.handleMouseMove, true);
    document.removeEventListener("mouseup", this.handleMouseUp, true);
  }
  handleAddWeek = () => {
    this.setState({
      totalDays: this.state.totalDays + 7
    });
  };

  handleShowDeleteWeekAlert = () => {
    const { totalDays, workouts } = this.state;
    var start = totalDays - 7;
    var end = totalDays;
    var selectedWorkoutIds = [];
    for (let day = start; day < end; day++) {
      var filterWorkouts = _.filter(workouts, { day: day });
      if (filterWorkouts && filterWorkouts.length > 0) {
        _.forEach(filterWorkouts, (o, i) => {
          selectedWorkoutIds.push(o._id);
        });
      }
    }
    this.setState({
      selectedWorkoutIds: selectedWorkoutIds,
      deleteWeekAlert: true
    });
  };

  handleCancelDeleteWeek = () => {
    this.setState({
      selectedWorkoutIds: [],
      deleteWeekAlert: false
    });
  };

  handleDeleteWeek = () => {
    const { dispatch } = this.props;
    const { selectedWorkoutIds, totalDays } = this.state;
    if (selectedWorkoutIds && selectedWorkoutIds.length > 0) {
      var requestData = {
        mealIds: selectedWorkoutIds
      };
      dispatch(
        deleteUserNutritionProgramsMealsRequest(requestData, res => {
          res && res.status === 1 && ts("Week deleted successfully!");
          res && this.getProgramsDetails();
        })
      );
      this.setState({ deleteWeekAlert: false, deleteWeekActionInit: true });
    } else {
      this.setState({
        deleteWeekAlert: false,
        selectedWorkoutIds: [],
        totalDays: totalDays - 7
      });
      ts("Week deleted successfully!");
    }
  };

  handleSelectAll = e => {
    let selectStatus = e.target.checked;
    this.changeAllWorkoutCheckedStatus(selectStatus);
  };
  changeAllWorkoutCheckedStatus = checked => {
    const workoutEvents = this.state.workouts;
    let newWorkouts = [];
    _.forEach(workoutEvents, (o, i) => {
      let newObj = Object.assign({}, o);
      newObj.isSelectedForBulkAction = checked;
      newWorkouts.push(newObj);
    });
    this.setState({ workouts: newWorkouts, selectAllChecked: checked });
  };
  handleSelectDayAction = day => {
    const { dispatch, cutWorkout } = this.props;
    console.log("SELECT DAY ACTION CALL", cutWorkout);
    if (dragEventId) {
      hardResetContainer = false;
      if (dragEventCardOutside) {
        this.resetDragContainer();
      } else {
        dragEventActive = false;
        var requestData = {
          day: day - 1
        };
        dispatch(
          pasteUserNutritionMealsRequest(dragEventId, requestData, "cut")
        );
        this.setState({ workoutPasteAction: true });
        dispatch(showPageLoader());
      }
    } else if (cutWorkout) {
      var requestData = {
        day: day - 1
      };
      dispatch(pasteUserNutritionMealsRequest(cutWorkout, requestData, "cut"));
      this.setState({ workoutPasteAction: true });
      dispatch(showPageLoader());
    } else {
      this.setState({ showSelectEventAlert: true });
      dispatch(setSelectedDayForProgram(day));
    }
  };
  cancelSelectDayAction = () => {
    const { dispatch } = this.props;
    this.setState({
      showSelectEventAlert: false
    });
    dispatch(setSelectedDayForProgram(null));
  };
  handleSelectedForBulk = _id => {
    const workoutEvents = this.state.workouts;
    var workouts = Object.assign([], workoutEvents);
    var selectedWorkout = _.find(workouts, ["_id", _id]);
    if (selectedWorkout) {
      var isSelectedForBulkAction =
        typeof selectedWorkout.isSelectedForBulkAction !== "undefined"
          ? selectedWorkout.isSelectedForBulkAction === false
            ? true
            : false
          : true;
      var workout = Object.assign({}, selectedWorkout);
      workout.isSelectedForBulkAction = isSelectedForBulkAction;
      var index = _.findIndex(workouts, ["_id", _id]);
      workouts[index] = workout;
      let selectAllChecked = false;
      let totalEventDaysCount = workouts.length;
      let selectedEventDaysCount = 0;
      _.forEach(workouts, (o, i) => {
        if (o.isSelectedForBulkAction) {
          selectedEventDaysCount++;
        }
      });
      if (selectedEventDaysCount >= totalEventDaysCount) {
        selectAllChecked = true;
      }
      this.setState({
        workouts: workouts,
        selectAllChecked: selectAllChecked
      });
    }
  };
  handleCut = (_id, workout) => {
    const { dispatch } = this.props;
    if (_id) {
      dispatch(cutUserProgramWorkoutSchedule(_id, workout));
      ts("Workout cut!");
    }
  };

  handleCopy = _id => {
    const { dispatch } = this.props;
    if (_id) {
      dispatch(copyUserProgramWorkoutSchedule(_id));
      ts("Workout copied!");
    }
  };

  handlePaste = () => {
    const { copiedWorkout, selectedDay, dispatch } = this.props;
    if (copiedWorkout) {
      var requestData = {
        meal_id: copiedWorkout,
        day: selectedDay - 1
      };
      dispatch(
        pasteUserNutritionMealsRequest(null, requestData, "copy", res => {
          res && res.status === 1 && this.getProgramsDetails();
        })
      );
      this.setState({ workoutPasteAction: true });
      dispatch(showPageLoader());
    } else {
      te("There is no workout copied!");
    }
  };
  resetDragContainer = () => {
    const dragPlaceholder = $("#custom-drag-workout-wrap");
    dragPlaceholder.html("");
    dragEventActive = false;
    dragEventCardOutside = false;
    dragEventId = null;
    dragEventCardX = null;
    dragEventCardY = null;
    $("#cal-panel-wrap").css({ boxShadow: "none" });
  };
  handleKeyUp = e => {
    if (e && typeof e.keyCode !== "undefined" && e.keyCode === 27) {
      this.resetCutData();
      if (dragEventId) {
        const selectedCard = $(`#workout-card-${dragEventId}`);
        this.resetDragContainer();
        selectedCard.removeClass("opacity-0");
        selectedCard.css({ opacity: "1" });
      }
    }
  };

  handleMouseMove = e => {
    if (dragEventActive && dragEventId) {
      const workoutCalendarWrapper = $(".program-save-custom-days-wrapper");
      const scrollLeft =
        window.pageXOffset || document.documentElement.scrollLeft;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (workoutCalendarWrapper && workoutCalendarWrapper[0]) {
        calendarArea = getElementOffsetRelativeToBody(
          workoutCalendarWrapper[0]
        );
      }
      if (calendarArea) {
        if (
          e.clientX + scrollLeft <= calendarArea.left ||
          e.clientX + scrollLeft >= calendarArea.left + calendarArea.width ||
          e.clientY + scrollTop <= calendarArea.top ||
          e.clientY + scrollTop >= calendarArea.top + calendarArea.height
        ) {
          dragEventCardOutside = true;
          $("#cal-panel-wrap").css({ boxShadow: "0 0 10px 1px #da6d6d" });
        } else {
          dragEventCardOutside = false;
          $("#cal-panel-wrap").css({ boxShadow: "none" });
        }
      }
      const customDragWrap = $("#custom-drag-workout-wrap");
      customDragWrap.css({
        top: dragEventCardY + e.clientY,
        left: dragEventCardX + e.clientX
      });
    }
  };

  handleMouseUp = e => {
    if (dragEventActive && dragEventId) {
      const workoutCalendarWrapper = $(".program-save-custom-days-wrapper");
      hardResetContainer = true;
      setTimeout(() => {
        if (hardResetContainer) {
          this.changeAllWorkoutCheckedStatus();
          hardResetContainer = false;
          const selectedCard = $(`#workout-card-${dragEventId}`);
          this.resetDragContainer();
          selectedCard.removeClass("opacity-0");
          selectedCard.css({ opacity: "1" });
        }
      }, 500);
      if (workoutCalendarWrapper && workoutCalendarWrapper[0]) {
        calendarArea = getElementOffsetRelativeToBody(
          workoutCalendarWrapper[0]
        );
      }
      if (calendarArea) {
        const scrollLeft =
          window.pageXOffset || document.documentElement.scrollLeft;
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        if (
          e.clientX + scrollLeft <= calendarArea.left ||
          e.clientX + scrollLeft >= calendarArea.left + calendarArea.width ||
          e.clientY + scrollTop <= calendarArea.top ||
          e.clientY + scrollTop >= calendarArea.top + calendarArea.height
        ) {
          e.stopPropagation();
          const selectedCard = $(`#workout-card-${dragEventId}`);
          this.resetDragContainer();
          selectedCard.removeClass("opacity-0");
          selectedCard.css({ opacity: "1" });
        }
      }
    }
  };
  resetCutData = () => {
    const { dispatch, cutWorkout } = this.props;
    if (cutWorkout) {
      const newWorkoutState = { cutWorkout: null, cutWorkoutData: null };
      dispatch(setUserProgramState(newWorkoutState));
    }
  };
  handleShowAlertAddMealTitle = () => {
    this.setState({ showSelectEventAlert: false, showAddMealTitleAlert: true });
  };
  handleDeleteBulkWorkoutSchedule = () => {
    const { dispatch } = this.props;
    const workoutEvents = this.state.workouts;
    var selectedEvents = _.filter(workoutEvents, [
      "isSelectedForBulkAction",
      true
    ]);
    var selectedIds = _.map(selectedEvents, "_id");
    var requestData = {
      mealIds: selectedIds
    };
    dispatch(
      deleteUserNutritionProgramsMealsRequest(requestData, res => {
        res && res.status === 1 && ts("Week deleted successfully!");
        res && this.getProgramsDetails();
      })
    );
    this.setState({ deleteBulkActionInit: true, deleteBulkActionAlert: false });
  };
}
const mapStateToProps = state => {
  const { userNutritionPrograms, userPrograms } = state;
  return {
    loading: userNutritionPrograms.get("loading"),
    program: userNutritionPrograms.get("program"),
    error: userNutritionPrograms.get("error"),
    selectedDay: userPrograms.get("selectedDay"),
    cutWorkout: userPrograms.get("cutWorkout"),
    cutWorkoutData: userPrograms.get("cutWorkoutData"),
    copiedWorkout: userPrograms.get("copiedWorkout")
  };
};

export default connect(mapStateToProps)(withRouter(NutritionProgramPlan));

class CustomDaysCalendarView extends Component {
  render() {
    const {
      totalDays,
      workouts,
      handleSelectDayAction,
      handleCut,
      handleCopy,
      handleDelete,
      handleSelectedForBulk
    } = this.props;
    var rows = totalDays / 7;
    var rowsObj = [];
    for (let index = 1; index <= rows; index++) {
      rowsObj.push(
        <CustomDaysCalendarRow
          rowNumber={index}
          key={index}
          workouts={workouts}
          handleSelectDayAction={handleSelectDayAction}
          handleCut={handleCut}
          handleCopy={handleCopy}
          handleDelete={handleDelete}
          handleSelectedForBulk={handleSelectedForBulk}
          exerciseMeasurements={this.props.exerciseMeasurements}
          activeViewTab={this.props.activeViewTab}
          programId={this.props.programId}
        />
      );
    }
    return (
      <div className="custome-table-edit-wrapper">
        <Scrollbars horizontal vertical autoHide>
          <div className="program-save-custom-days-wrapper">
            <div className="block-border-div" />
            <div className="block-border-div" />
            <div className="block-border-div" />
            <div className="block-border-div" />
            <div className="block-border-div" />
            <div className="block-border-div" />
            {rowsObj}
          </div>
        </Scrollbars>
      </div>
    );
  }
}

class CustomDaysCalendarRow extends Component {
  render() {
    const {
      rowNumber,
      workouts,
      handleSelectDayAction,
      handleCut,
      handleCopy,
      handleDelete,
      handleSelectedForBulk
    } = this.props;
    var end = rowNumber * 7;
    var start = end - (7 - 1);
    var blockObj = [];
    for (let index = start; index <= end; index++) {
      blockObj.push(
        <CustomDaysCalendarBlock
          blockNumber={index}
          key={index}
          workouts={workouts}
          handleSelectDayAction={handleSelectDayAction}
          handleCut={handleCut}
          handleCopy={handleCopy}
          handleDelete={handleDelete}
          handleSelectedForBulk={handleSelectedForBulk}
          exerciseMeasurements={this.props.exerciseMeasurements}
          activeViewTab={this.props.activeViewTab}
          programId={this.props.programId}
        />
      );
    }
    return <div className="program-save-custom-days-row">{blockObj}</div>;
  }
}

class CustomDaysCalendarBlock extends Component {
  render() {
    const {
      blockNumber,
      workouts,
      handleSelectDayAction,
      handleSelectedForBulk,
      handleCut,
      handleCopy,
      handleDelete
    } = this.props;
    var findDay = blockNumber - 1;
    var events = _.filter(workouts, { day: findDay });
    console.log("===========workouts Day===========");
    console.log("workouts Day", workouts);
    console.log("==========================");
    return (
      <div
        className="program-save-custom-days-block"
        onMouseUp={this.handleCardMouseUp}
        onClick={() => handleSelectDayAction(blockNumber)}
      >
        <div className="program-save-custom-days-block-title d-flex width-100-per">
          <span className="display-day">Day</span>
          <span className="ml-auto">{blockNumber}</span>
        </div>
        {this.props.activeViewTab === "grid" && (
          <div className="program-save-custom-days-block-content">
            {events &&
              events.length > 0 && (
                <React.Fragment>
                  {events.map((e, i) => {
                    return (
                      <CustomDaysCalendarBlockCard
                        key={i}
                        e={e}
                        i={i}
                        handleSelectedForBulk={handleSelectedForBulk}
                        handleCut={handleCut}
                        handleCopy={handleCopy}
                        handleDelete={handleDelete}
                        exerciseMeasurements={this.props.exerciseMeasurements}
                        activeViewTab={this.props.activeViewTab}
                        programId={this.props.programId}
                      />
                    );
                  })}
                </React.Fragment>
              )}
          </div>
        )}
        {this.props.activeViewTab === "columns" && (
          <div className="program-save-custom-days-block-content h-100">
            <Scrollbars autoHide>
              {events &&
                events.length > 0 && (
                  <React.Fragment>
                    {events.map((e, i) => {
                      return (
                        <CustomDaysCalendarBlockCard
                          key={i}
                          e={e}
                          i={i}
                          handleSelectedForBulk={handleSelectedForBulk}
                          handleCut={handleCut}
                          handleCopy={handleCopy}
                          handleDelete={handleDelete}
                          exerciseMeasurements={this.props.exerciseMeasurements}
                          activeViewTab={this.props.activeViewTab}
                          programId={this.props.programId}
                        />
                      );
                    })}
                  </React.Fragment>
                )}
            </Scrollbars>
          </div>
        )}
      </div>
    );
  }

  handleCardMouseUp = e => {
    if (dragEventActive && dragEventId) {
      const { blockNumber, handleSelectDayAction } = this.props;
      handleSelectDayAction(blockNumber);
    }
  };
}

class CustomDaysCalendarBlockCard extends Component {
  constructor(props) {
    super(props);
    this.checkbox = React.createRef();
    this.state = {
      showWorkoutDeleteAlert: false,
      deleteExerciseId: null,
      activeTab: SCHEDULED_WORKOUT_TYPE_WARMUP,
      warmupList: [],
      workoutList: [],
      cooldownList: [],
      isActiveToolsTab: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const { e } = this.props;
    if (e.isSelectedForBulkAction !== nextProps.e.isSelectedForBulkAction) {
      if (typeof nextProps.e.isSelectedForBulkAction !== "undefined") {
        this.checkbox.current.checked = nextProps.e.isSelectedForBulkAction;
      }
    }
  }
  componentDidMount() {
    const { e } = this.props;
    let { warmupList, workoutList, cooldownList } = this.state;
    e &&
      e.exercise &&
      e.exercise.length > 0 &&
      e.exercise.forEach(item => {
        item.type === "warmup" && warmupList.push(item);
        item.type === "exercise" && workoutList.push(item);
        item.type === "cooldown" && cooldownList.push(item);
      });
    this.setState({ warmupList, workoutList, cooldownList });
  }

  render() {
    const { e, exerciseMeasurements, activeViewTab } = this.props;
    const {
      showWorkoutDeleteAlert,
      activeTab,
      warmupList,
      workoutList,
      cooldownList,
      isActiveToolsTab
    } = this.state;
    console.log("===========  ===========");
    console.log("Workouts Card DATA", e);
    console.log("==========================");
    return (
      <React.Fragment>
        {activeViewTab === "grid" &&
          (e && (
            <div
              className="program-event-block-main-wrapper"
              onClick={event => {
                event.preventDefault();
                event.stopPropagation();
              }}
            >
              <div
                id={`workout-card-${e._id}`}
                className={cns("program-event-block-wrapper", {
                  restday: e.type === SCHEDULED_WORKOUT_TYPE_RESTDAY,
                  "loss-opacity": e.isCut,
                  "disable-overlay": e.isCutEnable,
                  "opacity-0": dragEventId === e._id
                })}
                onClick={event => {
                  event.preventDefault();
                  event.stopPropagation();
                }}
              >
                <div
                  className={cns("meal-card-block", {
                    "meal-h": e.type === SCHEDULED_MEAL
                  })}
                >
                  {isActiveToolsTab && (
                    <div
                      className={cns("meal-card-block-header mb-1", {
                        "meal-h": e.type === SCHEDULED_MEAL
                      })}
                      style={{ padding: "5px 10px", fontSize: "16px" }}
                    >
                      <i
                        className="fad fa-cut ml-auto mr-3 cursor-pointer"
                        data-tip="Cut"
                        onClick={event => this.handleCutEvent(event, e._id, e)}
                      />
                      <i
                        className="fad fa-copy mr-2"
                        data-tip="Copy"
                        onClick={event => this.handleCopyEvent(event, e._id)}
                      />
                    </div>
                  )}
                  <div
                    className={cns("meal-card-block-header", {
                      "meal-h": e.type === SCHEDULED_MEAL
                    })}
                  >
                    <div className="meal-title cursor-pointer">Meal</div>
                    <div
                      className={cns("tool-menu cursor-pointer", {
                        "is-active": isActiveToolsTab
                      })}
                    >
                      <i
                        className={cns("display-tools", {
                          "fa fa-ellipsis-h": !isActiveToolsTab,
                          "fad fa-times": isActiveToolsTab
                        })}
                        onClick={() => this.handleToogleToolsTab()}
                      />
                    </div>
                    <div
                      className="pull-left custom_check p-relative ml-auto"
                      onClick={event => this.handleCheckChange(event, e._id)}
                    >
                      <input
                        type="checkbox"
                        id={`complete_workout_schedule_${e._id}`}
                        ref={this.checkbox}
                      />
                      <label className="d-flex align-items-center m-0 bg-meal" />
                    </div>
                  </div>
                  <div className="meal-card-block-body">
                    <div className="program-title">
                      {e.title ? e.title : ""}
                    </div>
                    <div className="program-description">
                      {e.description ? e.description : ""}
                    </div>
                  </div>
                </div>
              </div>
              <ReactTooltip place="top" type="dark" effect="solid" />
              <ReactTooltip
                id="event-delete-tooltip"
                place="top"
                type="error"
                effect="solid"
              />
              {/* <div
                id={`workout-card-${e._id}`}
                className={cns("program-event-block-wrapper", {
                  restday: e.type === SCHEDULED_WORKOUT_TYPE_RESTDAY,
                  "loss-opacity": e.isCut,
                  "disable-overlay": e.isCutEnable,
                  "opacity-0": dragEventId === e._id
                })}
                onClick={event => {
                  event.preventDefault();
                  event.stopPropagation();
                }}
              >
                <div className="program-event-block-title">
                  <div
                    className="pull-left custom_check p-relative"
                    onClick={event => this.handleCheckChange(event, e._id)}
                  >
                    <input
                      type="checkbox"
                      id={`complete_workout_schedule_${e._id}`}
                      ref={this.checkbox}
                    />
                    <label>
                      <h5 className="">{e.title ? e.title : ""}</h5>
                    </label>
                    <a
                      href="javascript:void(0)"
                      data-tip="Cut"
                      className="workout-cut-card-btn"
                      onClick={event => this.handleCutEvent(event, e._id, e)}
                    >
                      <i className="icon-flip_to_front" />
                    </a>
                    <div
                      className="calendar-custom-drag-handle"
                      onMouseDown={event => this.handleMouseDown(event, e)}
                      onMouseUp={this.handleMouseUp}
                      onClick={event => {
                        event.stopPropagation();
                      }}
                    >
                      <i className="icon-open_with" />
                    </div>
                  </div>
                </div>
                <div className="program-event-block-content">
                  <p>{e.description ? e.description : ""}</p>
                  {e.type === SCHEDULED_MEAL && (
                    <a
                      href="javascript:void(0)"
                      data-tip="Copy"
                      onClick={event => this.handleCopyEvent(event, e._id)}
                    >
                      <FaCopy />
                    </a>
                  )}
                  {e.type === SCHEDULED_MEAL && (
                    <NavLink
                      to={routeCodes.SAVE_PROGRAM_SCHEDULE_WORKOUT.replace(
                        ":id",
                        e.programId
                      ).replace(":workout_id", e._id)}
                      data-tip="Details"
                      title=""
                    >
                      <FaEye />
                    </NavLink>
                  )}
                  {e.type === SCHEDULED_WORKOUT_TYPE_EXERCISE && (
                    <NavLink
                      to={routeCodes.SAVE_PROGRAM_SCHEDULE_WORKOUT.replace(
                        ":id",
                        e.programId
                      ).replace(":workout_id", e._id)}
                      data-tip="Change"
                      title=""
                    >
                      <FaPencil />
                    </NavLink>
                  )}
                  <a
                    href="javascript:void(0)"
                    data-tip="Delete"
                    data-for="event-delete-tooltip"
                    onClick={event => this.handleDeleteEvent(event, e._id)}
                  >
                    <FaTrash />
                  </a>
                </div>
                <ReactTooltip place="top" type="dark" effect="solid" />
                <ReactTooltip
                  id="event-delete-tooltip"
                  place="top"
                  type="error"
                  effect="solid"
                />
              </div> */}
            </div>
          ))}
        {activeViewTab === "columns" && <NutritionProgramMealList />}
      </React.Fragment>
      // <div className="program-event-block-main-wrapper">
      //   <div
      //     id={`workout-card-${e._id}`}
      //     className={cns("program-event-block-wrapper", {
      //       restday: e.type === SCHEDULED_WORKOUT_TYPE_RESTDAY,
      //       "loss-opacity": e.isCut,
      //       "disable-overlay": e.isCutEnable,
      //       "opacity-0": dragEventId === e._id
      //     })}
      //     onClick={event => {
      //       event.preventDefault();
      //       event.stopPropagation();
      //     }}
      //   >
      //     <div className="program-event-block-title">
      //       <div
      //         className="pull-left custom_check p-relative"
      //         onClick={event => this.handleCheckChange(event, e._id)}
      //       >
      //         <input
      //           type="checkbox"
      //           id={`complete_workout_schedule_${e._id}`}
      //           ref={this.checkbox}
      //         />
      //         <label>
      //           <h5 className="">{e.title ? e.title : ""}</h5>
      //         </label>
      //         <a
      //           href="javascript:void(0)"
      //           data-tip="Cut"
      //           className="workout-cut-card-btn"
      //           onClick={event => this.handleCutEvent(event, e._id, e)}
      //         >
      //           <i className="icon-flip_to_front" />
      //         </a>
      //         <div
      //           className="calendar-custom-drag-handle"
      //           onMouseDown={event => this.handleMouseDown(event, e)}
      //           onMouseUp={this.handleMouseUp}
      //           onClick={event => {
      //             event.stopPropagation();
      //           }}
      //         >
      //           <i className="icon-open_with" />
      //         </div>
      //       </div>
      //     </div>
      //     <div className="program-event-block-content">
      //       <p>{e.description ? e.description : ""}</p>
      //       {e.type === SCHEDULED_WORKOUT_TYPE_EXERCISE && (
      //         <a
      //           href="javascript:void(0)"
      //           data-tip="Copy"
      //           onClick={event => this.handleCopyEvent(event, e._id)}
      //         >
      //           <FaCopy />
      //         </a>
      //       )}
      //       {e.type === SCHEDULED_WORKOUT_TYPE_EXERCISE && (
      //         <NavLink
      //           to={routeCodes.SAVE_PROGRAM_SCHEDULE_WORKOUT.replace(
      //             ":id",
      //             e.programId
      //           ).replace(":workout_id", e._id)}
      //           data-tip="Details"
      //           title=""
      //         >
      //           <FaEye />
      //         </NavLink>
      //       )}
      //       {e.type === SCHEDULED_WORKOUT_TYPE_EXERCISE && (
      //         <NavLink
      //           to={routeCodes.SAVE_PROGRAM_SCHEDULE_WORKOUT.replace(
      //             ":id",
      //             e.programId
      //           ).replace(":workout_id", e._id)}
      //           data-tip="Change"
      //           title=""
      //         >
      //           <FaPencil />
      //         </NavLink>
      //       )}
      //       <a
      //         href="javascript:void(0)"
      //         data-tip="Delete"
      //         data-for="event-delete-tooltip"
      //         onClick={event => this.handleDeleteEvent(event, e._id)}
      //       >
      //         <FaTrash />
      //       </a>
      //     </div>
      //     <ReactTooltip place="top" type="dark" effect="solid" />
      //     <ReactTooltip
      //       id="event-delete-tooltip"
      //       place="top"
      //       type="error"
      //       effect="solid"
      //     />
      //   </div>
      // </div>
    );
  }
  handleToogleToolsTab = () => {
    this.setState({ isActiveToolsTab: !this.state.isActiveToolsTab });
  };
  handleCutEvent = (e, _id, event) => {
    const { handleCut } = this.props;
    e.stopPropagation();
    handleCut(_id, event);
  };

  handleCopyEvent = (e, _id) => {
    const { handleCopy } = this.props;
    e.stopPropagation();
    handleCopy(_id);
  };

  handleDeleteEvent = (e, _id) => {
    const { handleDelete } = this.props;
    e.stopPropagation();
    handleDelete(_id);
  };

  handleCheckChange = (e, _id) => {
    const { handleSelectedForBulk } = this.props;
    e.stopPropagation();
    handleSelectedForBulk(_id);
  };

  handleMouseDown = (e, event) => {
    const selectedCard = $(`#workout-card-${event._id}`);
    const dragPlaceholder = $("#custom-drag-workout-wrap");
    const offsets = selectedCard.offset();
    const offsetLeft = offsets && offsets.left ? offsets.left : 0;
    const offsetRight = offsets && offsets.top ? offsets.top : 0;
    const eventCardX = offsetLeft - e.clientX;
    const eventCardY = offsetRight - e.clientY;
    dragPlaceholder.html(selectedCard.parent().html());
    dragPlaceholder.css({
      top: eventCardY + e.clientY,
      left: eventCardX + e.clientX
    });
    dragEventActive = true;
    dragEventCardOutside = false;
    dragEventId = event._id;
    dragEventCardX = eventCardX;
    dragEventCardY = eventCardY;
    $("#cal-panel-wrap").css({ boxShadow: "none" });
    selectedCard.css({ opacity: "0" });
  };

  handleMouseUp = e => {
    const selectedCard = $(`#workout-card-${dragEventId}`);
    const dragPlaceholder = $("#custom-drag-workout-wrap");
    dragPlaceholder.html("");
    dragEventActive = false;
    dragEventCardOutside = false;
    dragEventId = null;
    dragEventCardX = null;
    dragEventCardY = null;
    $("#cal-panel-wrap").css({ boxShadow: "none" });
    selectedCard.removeClass("opacity-0");
    selectedCard.css({ opacity: "1" });
  };
}

class CustomEventCardView extends Component {
  render() {
    const e = this.props.event;
    console.log("CUT WORKOUT CALL CARD", e);
    return (
      <div className="program-event-block-main-wrapper">
        <div
          className={cns("meal-card-block", {
            "meal-h": e.type === SCHEDULED_MEAL
          })}
        >
          <div
            className={cns("meal-card-block-header", {
              "meal-h": e.type === SCHEDULED_MEAL
            })}
          >
            <div className="meal-title cursor-pointer">Meal</div>
            <i
              className="fa fa-ellipsis-h ml-auto"
              style={{ fontSize: "16px" }}
            />

            <div
              className="pull-left custom_check p-relative m-0 d-flex"
              style={{ background: "none" }}
            >
              <input
                type="checkbox"
                id={`complete_workout_schedule_${e._id}`}
                ref={this.checkbox}
              />
              <label className="d-flex align-items-center m-0 bg-meal" />
            </div>
          </div>
          <div className="meal-card-block-body">
            <div className="program-title">{e.title ? e.title : ""}</div>
            <div className="program-description">
              {e.description ? e.description : ""}
            </div>
          </div>
        </div>
        {/* <div className="program-event-block-title">
          <div className="pull-left custom_check p-relative">
            <input
              type="checkbox"
              id={`cut-complete_workout_schedule_${e._id}`}
              name={`cut-complete_workout_schedule_${e._id}`}
              checked={e.isSelectedForBulkAction}
            />
            <label>
              <h5 className="">{e.title ? e.title : ""}</h5>
            </label>
            <a href="javascript:void(0)" className="workout-cut-card-btn">
              <i className="icon-flip_to_front" />
            </a>
            <div
              href="javascript:void(0)"
              className="calendar-custom-drag-handle"
            >
              <i className="icon-open_with" />
            </div>
          </div>
        </div>
        <div className="program-event-block-content">
          <p>{e.description ? e.description : ""}</p>
          {e.type === SCHEDULED_WORKOUT_TYPE_EXERCISE && (
            <a href="javascript:void(0)">
              <FaCopy />
            </a>
          )}
          {e.type === SCHEDULED_WORKOUT_TYPE_EXERCISE && (
            <a href="javascript:void(0)">
              <FaEye />
            </a>
          )}
          {e.type === SCHEDULED_WORKOUT_TYPE_EXERCISE && (
            <a href="javascript:void(0)">
              <FaPencil />
            </a>
          )}
          <a href="javascript:void(0)">
            <FaTrash />
          </a>
        </div> */}
      </div>
    );
  }
}

class SelectEventView extends Component {
  render() {
    const {
      handleNewRestDay,
      handlePaste,
      handleShowAlertAddMealTitle
    } = this.props;
    return (
      <div className="program-select-event-view row justify-content-center">
        <div className="popup-link-wrap">
          <div className="popup-link">
            <button
              type="button"
              onClick={handleShowAlertAddMealTitle}
              className="btn btn-primary"
            >
              Add New Meal
            </button>
          </div>
          <div className="popup-link">
            <button
              type="button"
              onClick={handleNewRestDay}
              className="btn btn-primary"
            >
              Make Rest Day
            </button>
          </div>
          <div className="popup-link">
            <button
              type="button"
              onClick={handlePaste}
              className="btn btn-primary"
            >
              Paste Workout
            </button>
          </div>
        </div>
      </div>
    );
  }
}

class SelectMealTypeView extends Component {
  render() {
    const { history, selectedDay, programID } = this.props;
    const day = parseInt(selectedDay) - 1;
    return (
      <div className="program-select-event-view row justify-content-center">
        <h3>Which type of meal you want to add ?</h3>
        <div className="popup-link-wrap">
          <div className="popup-link">
            <Link
              to={`${
                routeCodes.LOCKER_NUTRITION_PROGRAM_MEAL_CREATE
              }/${programID}/${day}/breakfast`}
              className="btn btn-primary"
            >
              BreakFast
            </Link>
          </div>
          <div className="popup-link">
            <Link
              to={`${
                routeCodes.LOCKER_NUTRITION_PROGRAM_MEAL_CREATE
              }/${programID}/${day}/lunch`}
              className="btn btn-primary"
            >
              Lunch
            </Link>
          </div>
          <div className="popup-link">
            <Link
              to={`${
                routeCodes.LOCKER_NUTRITION_PROGRAM_MEAL_CREATE
              }/${programID}/${day}/dinner`}
              className="btn btn-primary"
            >
              Dinner
            </Link>
          </div>
          <div className="popup-link">
            <Link
              to={`${
                routeCodes.LOCKER_NUTRITION_PROGRAM_MEAL_CREATE
              }/${programID}/${day}/snacks`}
              className="btn btn-primary"
            >
              Snacks
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
