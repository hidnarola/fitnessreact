import React, { Component } from 'react';
import { connect } from 'react-redux';
import FitnessHeader from '../components/global/FitnessHeader';
import FitnessNav from '../components/global/FitnessNav';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import SweetAlert from 'react-bootstrap-sweetalert';
import {
  setSelectedSlotFromCalendar,
  getUsersWorkoutSchedulesRequest,
  copyUserWorkoutSchedule,
  getProgramsNameRequest,
  userAssignProgramRequest,
  deleteUsersBulkWorkoutScheduleRequest,
  completeUsersBulkWorkoutScheduleRequest,
  pasteUsersWorkoutScheduleRequest,
  addUserWorkoutTitleRequest,
  setScheduleWorkoutsState,
  cutUserWorkoutSchedule,
  setDatainIdb,
} from '../actions/userScheduleWorkouts';
import { NavLink } from 'react-router-dom';
import { routeCodes } from '../constants/routes';
import _ from 'lodash';
import {
  SCHEDULED_WORKOUT_TYPE_RESTDAY,
  SCHEDULED_WORKOUT_TYPE_EXERCISE,
  CALENDER_PROGRAMS,
  CALENDER_WORKOUTS,
  SCHEDULED_MEAL,
  CALENDER_MEALS,
  SCHEDULED_BODY_MEASUREMENT,
  SCHEDULED_FITNESS_TEST,
  CALENDER_BODY_MEASUREMENT,
} from '../constants/consts';
import {
  ts,
  te,
  prepareDropdownOptionsData,
  capitalizeFirstLetter,
  getElementOffsetRelativeToBody,
  isOnline,
  tw,
  connectIDB,
} from '../helpers/funs';
import { FaCopy, FaTrash, FaPencil, FaEye } from 'react-icons/lib/fa';
import cns from 'classnames';
import AddWorkoutTitleForm from '../components/ScheduleWorkout/AddWorkoutTitleForm';
import ReactTooltip from 'react-tooltip';
import { showPageLoader, hidePageLoader } from '../actions/pageLoader';
import SelectAssignProgramForm from '../components/ScheduleWorkout/SelectAssignProgramForm';
import CreateProgramFromCalendarForm from '../components/ScheduleWorkout/CreateProgramFromCalendarForm';
import {
  createUserProgrramFromCalendarRequest,
  appendUserProgramFromCalendarRequest,
} from '../actions/userPrograms';
import AppendProgramFromCalendarForm from '../components/ScheduleWorkout/AppendProgramFromCalendarForm';
import $ from 'jquery';
import { IDB_TBL_CALENDER, IDB_READ_WRITE, IDB_READ } from '../constants/idb';
import AddMetaDescription from '../components/global/AddMetaDescription';
import {
  getUserMealsLogDatesRequest,
  userMealUpdateRequest,
  copyUserMealSchedule,
  cutUserMealSchedule,
  setScheduleMealsState,
  setMealDatainIdb,
} from '../actions/user_meal';
import {
  getUserBodyMeasurementLogDatesRequest,
  cutUserBodyMeasurementSchedule,
  updateUserBodyMeasurementRequest,
  setUserBodyMeasurementState,
  copyUserBodyMeasurementSchedule,
  pasteUserBodyMeasurementRequest,
  setBodyMeasurementDatainIdb,
} from '../actions/userBodyMeasurement';
import { getUserFitnessTestsLogDatesRequest } from '../actions/userFitnessTests';
import Toolbar from 'react-big-calendar/lib/Toolbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Bars1 from '../../assets/svg/bars-duotone1.svg';
import Bars2 from '../../assets/svg/bars-duotone2.svg';

let dragEventActive = false;
let dragEventCardOutside = false;
let dragEventId = null;
let dragEventDate = null;
let dragEventCardX = null;
let dragEventCardY = null;
let dragEventType = null;
let dragEventMealID = null;
let dragEventDetailID = null;

let calendarArea = null;

let hardResetContainer = false;

class ScheduleWorkoutCalendarPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSelectEventAlert: false,
      workoutEvents: [],
      workoutPasteAction: false,
      deleteWorkoutAlert: false,
      selectedWorkoutId: null,
      selectedWorkoutDate: null,
      deleteWorkoutActionInit: false,
      showProgramAssignAlert: false,
      deleteBulkActionAlert: false,
      deleteBulkActionInit: false,
      completeBulkActionAlert: false,
      completeBulkActionInit: false,
      incompleteBulkActionAlert: false,
      incompleteBulkActionInit: false,
      showAddWorkoutTitleAlert: false,
      completeWorkoutActionInit: false,
      addWorkoutTitleInit: false,
      addRestDayInit: false,
      calendarViewDate: null,
      selectAllChecked: false,
      showCreateProgram: false,
      showAppendProgram: false,
      display_all_exercises: true,
      display_all_nutrition: true,
      display_all_logs: true,
      cuurentTab: '#weekview',
      isActiveCalendarList: false,
      isActiveView: '#list',
      calendarView: 'week',
      isActiveCardEdit: false,
    };
    this.iDB;
  }
  handleChangeActiveCalendarList = (status, tab) => {
    this.setState({ isActiveCalendarList: status, isActiveView: tab });
  };
  handleCalendarTabView = tab => {
    this.setState({ calendarView: tab });
  };
  handleEditCard = () => {
    this.setState({ isActiveCardEdit: !this.state.isActiveCardEdit });
  };
  render() {
    const {
      showSelectEventAlert,
      workoutEvents,
      deleteWorkoutAlert,
      showProgramAssignAlert,
      deleteBulkActionAlert,
      completeBulkActionAlert,
      incompleteBulkActionAlert,
      showAddWorkoutTitleAlert,
      selectAllChecked,
      showCreateProgram,
      showAppendProgram,
      display_all_exercises,
      display_all_logs,
      display_all_nutrition,
      isActiveCalendarList,
      isActiveView,
      calendarView,
      isActiveCardEdit,
    } = this.state;
    const {
      dispatch,
      selectedSlot,
      programs,
      errorTitle,
      cutWorkout,
      cutWorkoutData,
      mealLoading,
      cutMeal,
      cutMealData,
      cutBodyMeasurement,
      cutBodyMeasurementData,
    } = this.props;
    var selectedSlotStateDate = null;
    if (selectedSlot) {
      selectedSlotStateDate = selectedSlot.start;
    }
    var programOptions = prepareDropdownOptionsData(programs, '_id', 'name');
    var selectedEvents = _.filter(workoutEvents, [
      'isSelectedForBulkAction',
      true,
    ]);
    mealLoading ? dispatch(showPageLoader()) : dispatch(hidePageLoader());

    return (
      <div className="fitness-body">
        <AddMetaDescription>
          <title>Calendar | Fitly</title>
        </AddMetaDescription>
        <FitnessHeader />
        <FitnessNav />
        <section className="body-wrap nutrition-todays-meal-section">
          <div className="body-head d-flex justify-content-start front-white-header custome_header">
            {/* <div className="body-head-l">
                            <h2>Calendar</h2>
                            <p>Your goal choice shapes how your fitness assistant will ceate your meal and exercise plans, it’s important that you set goals which are achieveable. Keep updating your profile and your fitness assistant will keep you on track and meeting the goals you’ve set out for yourself.</p>
                        </div> */}
            <div className="body-head-l d-flex flex-wrap align-items-center pl-4 pr-4">
              <h2 className="sm-cal-title">Calendar</h2>
              <div className="custom_check_wrap ml-auto d-flex flex-wrap align-items-center mb-0">
                <h5 className="mr-2">Display : </h5>
                <div className="custom_check mb-0">
                  <input
                    type="checkbox"
                    id={'display_all_exercises'}
                    name={'display_all_exercises'}
                    checked={display_all_exercises}
                    onChange={() =>
                      this.handleChangeCheckbox('display_all_exercises')
                    }
                  />
                  <label className="mb-0" htmlFor="display_all_exercises">
                    Exercise
                  </label>
                </div>
                <div className="custom_check mb-0">
                  <input
                    type="checkbox"
                    id={'display_all_nutrition'}
                    name={'display_all_nutrition'}
                    checked={display_all_nutrition}
                    onChange={() =>
                      this.handleChangeCheckbox('display_all_nutrition')
                    }
                  />
                  <label className="mb-0" htmlFor="display_all_nutrition">
                    Nutrition
                  </label>
                </div>
                <div className="custom_check mb-0">
                  <input
                    type="checkbox"
                    id={'display_all_logs'}
                    name={'display_all_logs'}
                    checked={display_all_logs}
                    onChange={() =>
                      this.handleChangeCheckbox('display_all_logs')
                    }
                  />
                  <label className="mb-0" htmlFor="display_all_logs">
                    Logs
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div
            className="body-content d-flex row justify-content-start profilephoto-content"
            data-for="custom-cut-workout-wrap"
            data-tip
          >
            <div className="col-md-12">
              <div id="cal-panel-wrap">
                <div className="profile-body">
                  {selectedEvents && selectedEvents.length > 0 && (
                    <div className="fixed-btm-bar d-flex">
                      <div className="fixed-btm-bar-l d-flex">
                        <div className="custom_check">
                          <input
                            type="checkbox"
                            id={'select_all_workouts'}
                            name={'select_all_workouts'}
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
                          data-for="create-program-tooltip"
                          data-tip="Create program"
                          onClick={() =>
                            this.setState({ showCreateProgram: true })
                          }
                        >
                          <i className="icon-add_box"></i>{' '}
                        </a>
                        <a
                          href="javascript:void(0)"
                          data-for="append-program-tooltip"
                          data-tip="Append program"
                          onClick={() =>
                            this.setState({ showAppendProgram: true })
                          }
                        >
                          <i className="icon-playlist_add"></i>{' '}
                        </a>
                        <a
                          href="javascript:void(0)"
                          data-for="event-bulk-delete-tooltip"
                          data-tip="Delete"
                          onClick={() =>
                            this.setState({ deleteBulkActionAlert: true })
                          }
                        >
                          <i className="icon-delete_forever"></i>{' '}
                        </a>
                        <a
                          href="javascript:void(0)"
                          data-for="event-bulk-complete-tooltip"
                          data-tip="Mark as complete"
                          onClick={() =>
                            this.setState({ completeBulkActionAlert: true })
                          }
                        >
                          <i className="icon-check_circle"></i>
                        </a>
                        <a
                          href="javascript:void(0)"
                          data-for="event-bulk-incomplete-tooltip"
                          data-tip="Mark as incomplete"
                          onClick={() =>
                            this.setState({ incompleteBulkActionAlert: true })
                          }
                        >
                          <i className="icon-cancel"></i>
                        </a>
                      </div>
                      <ReactTooltip
                        id="create-program-tooltip"
                        place="top"
                        type="info"
                        effect="solid"
                      />
                      <ReactTooltip
                        id="append-program-tooltip"
                        place="top"
                        type="dark"
                        effect="solid"
                      />
                      <ReactTooltip
                        id="event-bulk-delete-tooltip"
                        place="top"
                        type="error"
                        effect="solid"
                      />
                      <ReactTooltip
                        id="event-bulk-complete-tooltip"
                        place="top"
                        type="success"
                        effect="solid"
                      />
                      <ReactTooltip
                        id="event-bulk-incomplete-tooltip"
                        place="top"
                        type="warning"
                        effect="solid"
                      />
                    </div>
                  )}

                  <BigCalendar
                    popup={true}
                    popupOffset={20}
                    selectable={true}
                    localizer={BigCalendar.momentLocalizer(moment)}
                    defaultView={BigCalendar.Views.WEEK}
                    className="workout-calender"
                    events={workoutEvents}
                    onView={() => {}}
                    views={[BigCalendar.Views.MONTH, BigCalendar.Views.WEEK]}
                    onNavigate={this.handleNavigation}
                    onSelectEvent={event => {}}
                    onSelectSlot={this.onSelectSlot}
                    components={{
                      event: CustomEventsCard(
                        isActiveCalendarList,
                        isActiveCardEdit,
                        this.handleEditCard,
                      ),
                      toolbar: CustomBars(
                        isActiveCalendarList,
                        this.handleChangeActiveCalendarList,
                        isActiveView,
                        this.handleCalendarTabView,
                        calendarView,
                      ),
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          {cutWorkout && (
            <ReactTooltip
              id="custom-cut-workout-wrap"
              place="top"
              type="dark"
              effect="float"
            >
              <CustomEventCardView event={cutWorkoutData} />
            </ReactTooltip>
          )}
          {cutMeal && (
            <ReactTooltip
              id="custom-cut-workout-wrap"
              place="top"
              type="dark"
              effect="float"
            >
              <CustomEventCardView event={cutMealData} />
            </ReactTooltip>
          )}
          {cutBodyMeasurement && (
            <ReactTooltip
              id="custom-cut-workout-wrap"
              place="top"
              type="dark"
              effect="float"
            >
              <CustomEventCardView event={cutBodyMeasurementData} />
            </ReactTooltip>
          )}
          <div
            id="custom-drag-workout-wrap"
            style={{ position: 'absolute', minWidth: 178 }}
          ></div>
        </section>
        <SweetAlert
          type="default"
          title={`Select event for - ${
            selectedSlotStateDate
              ? moment(selectedSlotStateDate).format('DD/MM/YYYY')
              : ''
          }`}
          onCancel={this.cancelSelectedSlotAction}
          onConfirm={() => {}}
          btnSize="sm"
          cancelBtnBsStyle="danger"
          show={showSelectEventAlert}
          showConfirm={false}
          showCancel={true}
          closeOnClickOutside={false}
        >
          <SelectEventView
            selectedSlotStateDate={selectedSlotStateDate}
            copiedMealId={this.props.copiedMealId}
            copiedWorkout={this.props.copiedWorkout}
            copiedBodyMeasurement={this.props.copiedBodyMeasurement}
            handleAddWorkout={this.handleAddWorkout}
            handleNewRestDay={this.handleNewRestDay}
            handlePaste={this.handlePaste}
            handlePasteMeal={this.handlePasteMeal}
            handlePasteBodyMeasurement={this.handlePasteBodyMeasurement}
            handleSelectProgramToAssign={this.handleSelectProgramToAssign}
          />
        </SweetAlert>

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
          You will not be able to recover it!
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
          You will not be able to recover it!
        </SweetAlert>

        <SweetAlert
          show={completeBulkActionAlert}
          success
          showCancel
          confirmBtnText="Yes, complete them!"
          confirmBtnBsStyle="success"
          cancelBtnBsStyle="default"
          title="Are you sure?"
          onConfirm={() => this.handleCompleteBulkWorkoutSchedule(1)}
          onCancel={() => this.setState({ completeBulkActionAlert: false })}
        >
          This will mark all workouts as completed
        </SweetAlert>

        <SweetAlert
          show={incompleteBulkActionAlert}
          warning
          showCancel
          confirmBtnText="Yes, incomplete them!"
          confirmBtnBsStyle="warning"
          cancelBtnBsStyle="default"
          title="Are you sure?"
          onConfirm={() => this.handleCompleteBulkWorkoutSchedule(0)}
          onCancel={() => this.setState({ incompleteBulkActionAlert: false })}
        >
          This will mark all workouts as incompleted
        </SweetAlert>
        <SweetAlert
          type="default"
          title={`Select program start from - ${
            selectedSlotStateDate
              ? moment(selectedSlotStateDate).format('DD/MM/YYYY')
              : ''
          }`}
          onConfirm={() => {}}
          show={showProgramAssignAlert}
          showConfirm={false}
          showCancel={false}
          closeOnClickOutside={false}
        >
          <SelectAssignProgramForm
            options={programOptions}
            onSubmit={this.handleAssignProgram}
            onCancel={this.handleCancelProgramAssignAlert}
          />
        </SweetAlert>

        <SweetAlert
          type="default"
          title={`Add workout for - ${
            selectedSlotStateDate
              ? moment(selectedSlotStateDate).format('DD/MM/YYYY')
              : ''
          }`}
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

        <SweetAlert
          type="default"
          title="Create program"
          showConfirm={false}
          showCancel={false}
          onConfirm={() => {}}
          show={showCreateProgram}
          closeOnClickOutside={false}
        >
          <CreateProgramFromCalendarForm
            onSubmit={this.createProgram}
            onCancel={() => this.setState({ showCreateProgram: false })}
          />
        </SweetAlert>

        <SweetAlert
          type="default"
          title="Append to program"
          showConfirm={false}
          showCancel={false}
          onConfirm={() => {}}
          show={showAppendProgram}
          closeOnClickOutside={false}
        >
          <AppendProgramFromCalendarForm
            onSubmit={this.appendProgram}
            onCancel={() => this.setState({ showAppendProgram: false })}
          />
        </SweetAlert>
      </div>
    );
  }

  componentDidMount() {
    connectIDB()().then(connection => {
      this.handleIDBOpenSuccess(connection);
    });
    document.addEventListener('keyup', this.handleKeyUp, true);
    document.addEventListener('mousemove', this.handleMouseMove, true);
    document.addEventListener('mouseup', this.handleMouseUp, true);
    if (isOnline()) {
      const { dispatch } = this.props;
      dispatch(showPageLoader());
      var today = moment()
        .startOf('day')
        .utc();
      this.setState({ calendarViewDate: today.local() });
      if (isOnline()) {
        this.getWorkoutSchedulesByMonth(today);
        dispatch(getProgramsNameRequest());
      }
    }
  }

  handleIDBOpenSuccess = connection => {
    this.iDB = connection.result;
    if (!isOnline()) {
      // get data from iDB
      this.getWorkoutsDataFromIDB();
      this.getMealsDataFromIDB();
      this.getBodyMeasurementDataFromIDB();
      this.getProgramsDataFromIDB();
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const {
      workouts,
      loading,
      error,
      assignProgramLoading,
      assignProgramError,
      loadingTitle,
      workoutTitle,
      errorTitle,
      history,
      dispatch,
      createFromCalendarLoading,
      createFromCalendarStatus,
      appendFromCalendarLoading,
      appendFromCalendarStatus,
      cutWorkout,
      loadingPrograms,
      logDates,
      mealLoading,
      cutMeal,
      cutMealData,
      cutMealDetailId,
      bodyLogDates,
      loadingLogDates,
      cutBodyMeasurement,
      bodyMeasurementLoading,
      bodyMeasurementError,
      userFitnessTestsLogdates,
      userFitnessTestsLoading,
    } = this.props;
    const {
      workoutPasteAction,
      deleteWorkoutActionInit,
      selectedWorkoutId,
      deleteBulkActionInit,
      completeBulkActionInit,
      incompleteBulkActionInit,
      completeWorkoutActionInit,
      addRestDayInit,
      addWorkoutTitleInit,
      workoutEvents,
      display_all_logs,
      display_all_nutrition,
      display_all_exercises,
    } = this.state;
    if (!loadingPrograms && prevProps.loadingPrograms !== loadingPrograms) {
      // store programs in iDB names
      this.storeProgramDataInIDB();
    }

    if (
      !bodyMeasurementLoading &&
      prevProps.bodyMeasurementError !== bodyMeasurementError
    ) {
      te(bodyMeasurementError[0]);
      //this.getWorkoutSchedulesByMonth();
    }

    console.log('prevState', prevState);
    console.log('CurrrentState', this.state);

    if (
      prevState.display_all_exercises !== display_all_exercises ||
      prevState.display_all_nutrition !== display_all_nutrition ||
      prevState.display_all_logs !== display_all_logs ||
      ((!loading && prevProps.workouts !== workouts) ||
        (!mealLoading && prevProps.logDates !== logDates) ||
        (!loadingLogDates && prevProps.bodyLogDates !== bodyLogDates) ||
        (!userFitnessTestsLoading &&
          prevProps.userFitnessTestsLogdates !== userFitnessTestsLogdates))
    ) {
      var newWorkouts = [];
      display_all_exercises &&
        _.forEach(workouts, (workout, index) => {
          var newWorkout = {
            id: workout._id,
            // title: (workout.title) ? workout.title : `Workout on ${(workout.date) ? moment(workout.date).format('DD/MM/YYYY') : ''}`,
            title:
              workout.type === SCHEDULED_WORKOUT_TYPE_RESTDAY
                ? 'Rest Day'
                : 'Workout',
            start: workout.date,
            end: workout.date,
            allDay: true,
            isCompleted: workout.isCompleted ? workout.isCompleted : 0,
            exercises:
              workout.exercises && workout.exercises.length > 0
                ? workout.exercises
                : [],
            exerciseType: workout.type ? workout.type : null,
            totalExercises: workout.totalExercises ? workout.totalExercises : 0,
            meta: workout,
            description: workout.description ? workout.description : '',
            isSelectedForBulkAction: false,
            isCut: cutWorkout === workout._id,
            isCutEnable: cutWorkout ? true : false,
            handleCut: workoutEvent =>
              this.handleCut(workout._id, workoutEvent),
            handleCopy: () => this.handleCopy(workout._id),
            handleDelete: () =>
              this.showDeleteConfirmation(workout._id, workout.date),
            handleCompleteWorkout: () =>
              this.handleCompleteWorkout(workout._id),
            handleSelectForBulkAction: () =>
              this.handleSelectForBulkAction(workout._id),
          };
          newWorkouts.push(newWorkout);
        });

      display_all_nutrition &&
        _.forEach(logDates, (mealsLog, index1) => {
          _.forEach(mealsLog.meals, (meal, index) => {
            var mealDate = moment(mealsLog.date).format('DD/MM/YYYY');
            var todayDate = moment(new Date()).format('DD/MM/YYYY');
            var newMeal = {
              id: `${index1}${index}`,
              meal_id: mealsLog._id,
              mealDetail_id: meal._id,
              title: `Meal`,
              start: mealsLog.date,
              end: mealsLog.date,
              allDay: true,
              isCompleted: 0,
              exercises: [],
              exerciseType: SCHEDULED_MEAL,
              totalExercises: 0,
              meta: meal,
              description: meal.title,
              isSelectedForBulkAction: false,
              isCut: cutMealDetailId === meal._id,
              isCutEnable: cutMealDetailId ? true : false,
              handleCut: mealEvent => this.handleCut(meal._id, mealEvent),
              handleCopy: () =>
                this.handleCopy(mealsLog._id, meal._id, SCHEDULED_MEAL),
              handleDelete: () =>
                this.showDeleteConfirmation(meal._id, mealsLog.date),
              handleCompleteWorkout: () => this.handleCompleteWorkout(meal._id),
              handleSelectForBulkAction: () =>
                this.handleSelectForBulkAction(meal._id),
            };
            newWorkouts.push(newMeal);
          });
        });

      display_all_logs &&
        _.forEach(bodyLogDates, (bodyLog, index) => {
          var newBodyMesurement = {
            id: bodyLog._id,
            title: 'Body Measurement',
            start: bodyLog.logDate,
            end: bodyLog.logDate,
            allDay: true,
            isCompleted: 0,
            exercises: [],
            exerciseType: SCHEDULED_BODY_MEASUREMENT,
            totalExercises: 0,
            meta: bodyLog,
            description: '',
            isSelectedForBulkAction: false,
            isCut: cutBodyMeasurement === bodyLog._id,
            isCutEnable: cutBodyMeasurement ? true : false,
            handleCut: bodyEvent => this.handleCut(bodyLog._id, bodyEvent),
            handleCopy: () =>
              this.handleCopy(bodyLog._id, null, SCHEDULED_BODY_MEASUREMENT),
            handleDelete: () =>
              this.showDeleteConfirmation(bodyLog._id, bodyLog.logDate),
            handleCompleteWorkout: () =>
              this.handleCompleteWorkout(bodyLog._id),
            handleSelectForBulkAction: () =>
              this.handleSelectForBulkAction(bodyLog._id),
          };
          newWorkouts.push(newBodyMesurement);
        });

      display_all_logs &&
        _.forEach(userFitnessTestsLogdates, (fitnessTest, index) => {
          var newWorkout = {
            id: fitnessTest.id,
            title: 'Fitness Test',
            start: fitnessTest.logdate,
            end: fitnessTest.logdate,
            allDay: true,
            isCompleted: 0,
            exercises: [],
            exerciseType: SCHEDULED_FITNESS_TEST,
            totalExercises: 0,
            meta: fitnessTest,
            description: 'Fitness Test',
          };
          newWorkouts.push(newWorkout);
        });

      this.setState({ workoutEvents: newWorkouts });
      this.resetDragContainer();
      // store workouts in iDB
      if (isOnline()) {
        this.storeWorkoutDataInIDB();
        this.storeMealDataInIDB();
        this.storeBodyMeasurementDataInIDB();
      }
    }

    if (
      (cutWorkout && prevProps.cutWorkout !== cutWorkout) ||
      (cutMeal && prevProps.cutMeal !== cutMeal) ||
      (cutBodyMeasurement &&
        prevProps.cutBodyMeasurement !== cutBodyMeasurement)
    ) {
      var newWorkouts = [];
      display_all_exercises &&
        _.forEach(workouts, (workout, index) => {
          var newWorkout = {
            id: workout._id,
            title: workout.title
              ? workout.title
              : `Workout on ${
                  workout.date ? moment(workout.date).format('DD/MM/YYYY') : ''
                }`,
            start: workout.date,
            end: workout.date,
            allDay: true,
            isCompleted: workout.isCompleted ? workout.isCompleted : 0,
            exercises:
              workout.exercises && workout.exercises.length > 0
                ? workout.exercises
                : [],
            exerciseType: workout.type ? workout.type : null,
            totalExercises: workout.totalExercises ? workout.totalExercises : 0,
            meta: workout,
            description: workout.description ? workout.description : '',
            isSelectedForBulkAction: false,
            isCut: cutWorkout === workout._id,
            isCutEnable: cutWorkout ? true : false,
            handleCut: workoutEvent =>
              this.handleCut(workout._id, workoutEvent),
            handleCopy: () => this.handleCopy(workout._id),
            handleDelete: () =>
              this.showDeleteConfirmation(workout._id, workout.date),
            handleCompleteWorkout: () =>
              this.handleCompleteWorkout(workout._id),
            handleSelectForBulkAction: () =>
              this.handleSelectForBulkAction(workout._id),
          };
          newWorkouts.push(newWorkout);
        });
      display_all_nutrition &&
        _.forEach(logDates, (mealsLog, index1) => {
          console.log('MEALS===', mealsLog);
          _.forEach(mealsLog.meals, (meal, index) => {
            var mealDate = moment(mealsLog.date).format('DD/MM/YYYY');
            var todayDate = moment(new Date()).format('DD/MM/YYYY');
            var newMeal = {
              id: `${index1}${index}`,
              meal_id: mealsLog._id,
              mealDetail_id: meal._id,
              title: `${meal.meals_type}`,
              start: mealsLog.date,
              end: mealsLog.date,
              allDay: true,
              isCompleted: 0,
              exercises: [],
              exerciseType: SCHEDULED_MEAL,
              totalExercises: 0,
              meta: meal,
              description: meal.title,
              isSelectedForBulkAction: false,
              isCut: cutMealDetailId === meal._id,
              isCutEnable: cutMealDetailId ? true : false,
              handleCut: mealEvent => this.handleCut(meal._id, mealEvent),
              handleCopy: () =>
                this.handleCopy(mealsLog._id, meal._id, SCHEDULED_MEAL),
              handleDelete: () =>
                this.showDeleteConfirmation(meal._id, mealsLog.date),
              handleCompleteWorkout: () => this.handleCompleteWorkout(meal._id),
              handleSelectForBulkAction: () =>
                this.handleSelectForBulkAction(meal._id),
            };
            newWorkouts.push(newMeal);
          });
        });

      display_all_logs &&
        _.forEach(bodyLogDates, (bodyLog, index) => {
          var newBodyMesurement = {
            id: bodyLog._id,
            title: 'Body Measurement',
            start: bodyLog.logDate,
            end: bodyLog.logDate,
            allDay: true,
            isCompleted: 0,
            exercises: [],
            exerciseType: SCHEDULED_BODY_MEASUREMENT,
            totalExercises: 0,
            meta: bodyLog,
            description: '',
            isSelectedForBulkAction: false,
            isCut: cutBodyMeasurement === bodyLog._id,
            isCutEnable: cutBodyMeasurement ? true : false,
            handleCut: bodyEvent => this.handleCut(bodyLog._id, bodyEvent),
            handleCopy: () => this.handleCopy(bodyLog._id),
            handleDelete: () =>
              this.showDeleteConfirmation(bodyLog._id, bodyLog.logDate),
            handleCompleteWorkout: () =>
              this.handleCompleteWorkout(bodyLog._id),
            handleSelectForBulkAction: () =>
              this.handleSelectForBulkAction(bodyLog._id),
          };
          newWorkouts.push(newBodyMesurement);
        });

      display_all_logs &&
        _.forEach(userFitnessTestsLogdates, (fitnessTest, index) => {
          var newWorkout = {
            id: fitnessTest.id,
            title: 'Fitness Test',
            start: fitnessTest.logdate,
            end: fitnessTest.logdate,
            allDay: true,
            isCompleted: 0,
            exercises: [],
            exerciseType: SCHEDULED_FITNESS_TEST,
            totalExercises: 0,
            meta: fitnessTest,
            description: 'Fitness Test',
          };
          newWorkouts.push(newWorkout);
        });

      this.setState({ workoutEvents: newWorkouts });
    }

    if (workoutPasteAction && !loading) {
      this.setState({ workoutPasteAction: false });
      this.getWorkoutSchedulesByMonth();
      this.cancelSelectedSlotAction();
      const newWorkoutState = { cutWorkout: null, cutWorkoutData: null };
      const newMealState = {
        cutMeal: null,
        cutMealData: null,
        cutMealDetailId: null,
      };
      const newBodyMesurementState = {
        cutBodyMeasurement: null,
        cutBodyMeasurementData: null,
      };
      dispatch(hidePageLoader());
      if (error && error.length > 0) {
        te('Something went wrong! please try again later.');
      } else {
        ts('Workout pasted!');
      }
      dispatch(setScheduleMealsState(newMealState));
      dispatch(setScheduleWorkoutsState(newWorkoutState));
      dispatch(setUserBodyMeasurementState(newBodyMesurementState));
    }
    if (deleteWorkoutActionInit && selectedWorkoutId && !loading) {
      this.setState({
        deleteWorkoutActionInit: false,
        selectedWorkoutId: null,
        selectedWorkoutDate: null,
      });
      dispatch(hidePageLoader());
      this.getWorkoutSchedulesByMonth();
      if (error.length <= 0) {
        ts('Workout deleted successfully!');
      } else {
        te('Cannot delete workout. Please try again later!');
      }
    }
    if (deleteBulkActionInit && !loading) {
      this.setState({ deleteBulkActionInit: false });
      dispatch(hidePageLoader());
      this.getWorkoutSchedulesByMonth();
      if (error.length <= 0) {
        ts('Workouts deleted successfully!');
      } else {
        te('Cannot delete workouts. Please try again later!');
      }
    }
    if (completeWorkoutActionInit && !loading) {
      this.setState({ completeWorkoutActionInit: false });
      this.getWorkoutSchedulesByMonth();
      if (error && error.length > 0) {
        te('Cannot complete workout. Please try again later!');
      }
    }
    if (completeBulkActionInit && !loading) {
      this.setState({ completeBulkActionInit: false });
      this.getWorkoutSchedulesByMonth();
      if (error.length <= 0) {
        ts('Workouts completed successfully!');
      } else {
        te('Cannot complete workouts. Please try again later!');
      }
    }

    if (incompleteBulkActionInit && !loading) {
      this.setState({ incompleteBulkActionInit: false });
      this.getWorkoutSchedulesByMonth();
      if (error.length <= 0) {
        ts('Workouts incompleted successfully!');
      } else {
        te('Cannot incomplete workouts. Please try again later!');
      }
    }
    if (
      !assignProgramLoading &&
      prevProps.assignProgramLoading !== assignProgramLoading
    ) {
      this.getWorkoutSchedulesByMonth();
      this.handleCancelProgramAssignAlert();
      dispatch(hidePageLoader());
      if (assignProgramError && assignProgramError.length <= 0) {
        ts('Program assigned successfully!');
      } else {
        te('Something went wrong! please try again later.');
      }
    }
    if (addRestDayInit && !loadingTitle) {
      this.setState({ addRestDayInit: false });
      this.getWorkoutSchedulesByMonth();
      this.cancelSelectedSlotAction();
      dispatch(hidePageLoader());
      if (errorTitle && errorTitle.length > 0) {
        te('Something went wrong! please try again later.');
      } else {
        ts('Rest day added!');
      }
    }
    if (addWorkoutTitleInit && !loadingTitle) {
      this.setState({ addWorkoutTitleInit: false });
      dispatch(hidePageLoader());
      if (errorTitle && errorTitle.length <= 0) {
        var _id = workoutTitle._id;
        let url = routeCodes.SAVE_SCHEDULE_WORKOUT.replace(':id', _id);
        history.push(url);
      }
    }
    if (
      !createFromCalendarLoading &&
      prevProps.createFromCalendarLoading !== createFromCalendarLoading
    ) {
      if (
        createFromCalendarStatus &&
        prevProps.createFromCalendarStatus !== createFromCalendarStatus
      ) {
        if (isOnline()) {
          this.getWorkoutSchedulesByMonth();
          this.setState({ showCreateProgram: false });
          dispatch(getProgramsNameRequest());
          ts('Program created!');
        } else {
          // get data from iDB
          this.getProgramsDataFromIDB();
        }
      }
      dispatch(hidePageLoader());
    }
    if (
      !appendFromCalendarLoading &&
      prevProps.appendFromCalendarLoading !== appendFromCalendarLoading
    ) {
      if (
        appendFromCalendarStatus &&
        prevProps.appendFromCalendarStatus !== appendFromCalendarStatus
      ) {
        this.getWorkoutSchedulesByMonth();
        this.setState({ showAppendProgram: false });
        ts('Program appended!');
      }
      dispatch(hidePageLoader());
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKeyUp, true);
    document.removeEventListener('mousemove', this.handleMouseMove, true);
    document.removeEventListener('mouseup', this.handleMouseUp, true);

    try {
      const idbs = [IDB_TBL_CALENDER];
      if (isOnline()) {
        const transaction = this.iDB.transaction(idbs, IDB_READ_WRITE);
        if (transaction) {
          const osCalender = transaction.objectStore(IDB_TBL_CALENDER);
          osCalender.clear();
        }
      }
      this.iDB.close();
    } catch (error) {}
  }

  getWorkoutsDataFromIDB = () => {
    const { dispatch } = this.props;
    const idbTbls = [IDB_TBL_CALENDER];
    try {
      const transaction = this.iDB.transaction(idbTbls, IDB_READ);
      if (transaction) {
        const osCalender = transaction.objectStore(IDB_TBL_CALENDER);
        const iDBGetReq = osCalender.get(CALENDER_WORKOUTS);
        iDBGetReq.onsuccess = event => {
          const {
            target: { result },
          } = event;
          if (result) {
            const resultObj = JSON.parse(result.data);
            const data = { workouts: resultObj, error: [] };
            dispatch(setDatainIdb(data));
          } else {
            const data = { workouts: [], error: [] };
            dispatch(setDatainIdb(data));
          }
        };
      }
    } catch (error) {
      const data = { workouts: [], error: [] };
      dispatch(setDatainIdb(data));
    }
  };

  getMealsDataFromIDB = () => {
    const { dispatch } = this.props;
    const idbTbls = [IDB_TBL_CALENDER];
    try {
      const transaction = this.iDB.transaction(idbTbls, IDB_READ);
      if (transaction) {
        const osCalender = transaction.objectStore(IDB_TBL_CALENDER);
        const iDBGetReq = osCalender.get(CALENDER_MEALS);
        iDBGetReq.onsuccess = event => {
          const {
            target: { result },
          } = event;
          if (result) {
            const resultObj = JSON.parse(result.data);
            const data = { meals: resultObj, error: [] };
            dispatch(setMealDatainIdb(data));
          } else {
            const data = { meals: [], error: [] };
            dispatch(setMealDatainIdb(data));
          }
        };
      }
    } catch (error) {
      const data = { meals: [], error: [] };
      dispatch(setMealDatainIdb(data));
    }
  };

  getBodyMeasurementDataFromIDB = () => {
    const { dispatch } = this.props;
    const idbTbls = [IDB_TBL_CALENDER];
    try {
      const transaction = this.iDB.transaction(idbTbls, IDB_READ);
      if (transaction) {
        const osCalender = transaction.objectStore(IDB_TBL_CALENDER);
        const iDBGetReq = osCalender.get(CALENDER_BODY_MEASUREMENT);
        iDBGetReq.onsuccess = event => {
          const {
            target: { result },
          } = event;
          if (result) {
            const resultObj = JSON.parse(result.data);
            const data = { body_measurement: resultObj, error: [] };
            dispatch(setBodyMeasurementDatainIdb(data));
          } else {
            const data = { body_measurement: [], error: [] };
            dispatch(setBodyMeasurementDatainIdb(data));
          }
        };
      }
    } catch (error) {
      const data = { body_measurement: [], error: [] };
      dispatch(setBodyMeasurementDatainIdb(data));
    }
  };

  getProgramsDataFromIDB = () => {
    const { dispatch } = this.props;
    const idbTbls = [IDB_TBL_CALENDER];
    try {
      const transaction = this.iDB.transaction(idbTbls, IDB_READ);
      if (transaction) {
        const osCalender = transaction.objectStore(IDB_TBL_CALENDER);
        const iDBGetReq = osCalender.get(CALENDER_PROGRAMS);
        iDBGetReq.onsuccess = event => {
          const {
            target: { result },
          } = event;
          if (result) {
            const resultObj = JSON.parse(result.data);
            const data = { programs: resultObj, error: [] };
            dispatch(setDatainIdb(data));
          } else {
            const data = { programs: [], error: [] };
            dispatch(setDatainIdb(data));
          }
        };
      }
    } catch (error) {
      const data = { programs: [], error: [] };
      dispatch(setDatainIdb(data));
    }
  };

  storeProgramDataInIDB = () => {
    const { programs } = this.props;
    try {
      const idbData = {
        type: CALENDER_PROGRAMS,
        data: JSON.stringify(programs),
      };
      const transaction = this.iDB.transaction(
        [IDB_TBL_CALENDER],
        IDB_READ_WRITE,
      );
      const objectStore = transaction.objectStore(IDB_TBL_CALENDER);
      const iDBGetReq = objectStore.get(CALENDER_PROGRAMS);
      iDBGetReq.onsuccess = event => {
        const {
          target: { result },
        } = event;
        if (result) {
          objectStore.put(idbData);
        } else {
          objectStore.add(idbData);
        }
      };
    } catch (error) {}
  };

  storeWorkoutDataInIDB = () => {
    const { workouts } = this.props;
    try {
      const idbData = {
        type: CALENDER_WORKOUTS,
        data: JSON.stringify(workouts),
      };
      const transaction = this.iDB.transaction(
        [IDB_TBL_CALENDER],
        IDB_READ_WRITE,
      );
      const objectStore = transaction.objectStore(IDB_TBL_CALENDER);
      const iDBGetReq = objectStore.get(CALENDER_WORKOUTS);
      iDBGetReq.onsuccess = event => {
        const {
          target: { result },
        } = event;
        if (result) {
          objectStore.put(idbData);
        } else {
          objectStore.add(idbData);
        }
      };
    } catch (error) {}
  };
  storeMealDataInIDB = () => {
    const { logDates } = this.props;
    console.log('Store Data in IDB', logDates);
    try {
      const idbData = { type: CALENDER_MEALS, data: JSON.stringify(logDates) };
      const transaction = this.iDB.transaction(
        [IDB_TBL_CALENDER],
        IDB_READ_WRITE,
      );
      const objectStore = transaction.objectStore(IDB_TBL_CALENDER);
      const iDBGetReq = objectStore.get(CALENDER_MEALS);
      iDBGetReq.onsuccess = event => {
        const {
          target: { result },
        } = event;
        if (result) {
          objectStore.put(idbData);
        } else {
          objectStore.add(idbData);
        }
      };
    } catch (error) {}
  };

  storeBodyMeasurementDataInIDB = () => {
    const { bodyLogDates } = this.props;
    console.log('Store Data in IDB', bodyLogDates);
    try {
      const idbData = {
        type: CALENDER_BODY_MEASUREMENT,
        data: JSON.stringify(bodyLogDates),
      };
      const transaction = this.iDB.transaction(
        [IDB_TBL_CALENDER],
        IDB_READ_WRITE,
      );
      const objectStore = transaction.objectStore(IDB_TBL_CALENDER);
      const iDBGetReq = objectStore.get(CALENDER_BODY_MEASUREMENT);
      iDBGetReq.onsuccess = event => {
        const {
          target: { result },
        } = event;
        if (result) {
          objectStore.put(idbData);
        } else {
          objectStore.add(idbData);
        }
      };
    } catch (error) {}
  };

  handleKeyUp = e => {
    if (e && typeof e.keyCode !== 'undefined' && e.keyCode === 27) {
      this.resetCutData();
      if (dragEventId) {
        const selectedCard = $(`#workout-card-${dragEventId}`);
        this.resetDragContainer();
        selectedCard.removeClass('opacity-0');
        selectedCard.css({ opacity: '1' });
      }
    }
  };

  handleMouseMove = e => {
    if (dragEventActive && dragEventId) {
      const workoutCalendarWrapper = $('.workout-calender');
      const scrollLeft =
        window.pageXOffset || document.documentElement.scrollLeft;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (workoutCalendarWrapper && workoutCalendarWrapper[0]) {
        calendarArea = getElementOffsetRelativeToBody(
          workoutCalendarWrapper[0],
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
          $('#cal-panel-wrap').css({ boxShadow: '0 0 10px 1px #da6d6d' });
        } else {
          dragEventCardOutside = false;
          $('#cal-panel-wrap').css({ boxShadow: 'none' });
        }
      }
      const customDragWrap = $('#custom-drag-workout-wrap');
      customDragWrap.css({
        top: dragEventCardY + e.clientY,
        left: dragEventCardX + e.clientX,
      });
    }
  };

  handleMouseUp = e => {
    console.log('KEY UPP CALL');
    if (dragEventActive && dragEventId) {
      const workoutCalendarWrapper = $('.workout-calender');
      hardResetContainer = true;
      setTimeout(() => {
        if (hardResetContainer) {
          this.changeAllWorkoutCheckedStatus();
          hardResetContainer = false;
          const selectedCard = $(`#workout-card-${dragEventId}`);
          this.resetDragContainer();
          selectedCard.removeClass('opacity-0');
          selectedCard.css({ opacity: '1' });
        }
      }, 500);
      if (workoutCalendarWrapper && workoutCalendarWrapper[0]) {
        calendarArea = getElementOffsetRelativeToBody(
          workoutCalendarWrapper[0],
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
          selectedCard.removeClass('opacity-0');
          selectedCard.css({ opacity: '1' });
        }
      }
    }
  };

  onSelectSlot = async slotInfo => {
    if (isOnline()) {
      console.log('ON SelectSlot Call', slotInfo);
      const {
        dispatch,
        cutWorkout,
        cutMeal,
        cutMealDetailId,
        cutBodyMeasurement,
        copiedWorkout,
        copiedBodyMeasurement,
        copiedMealId,
      } = this.props;

      if (dragEventId) {
        hardResetContainer = false;
        if (dragEventCardOutside) {
          this.resetDragContainer();
        } else {
          console.log('dragEventId', dragEventId);
          console.log('dragEventType', dragEventType);
          dragEventActive = false;
          const eventDate = moment(dragEventDate);
          const startDay = moment(slotInfo.start).startOf('day');
          const endDay = moment(slotInfo.end).startOf('day');
          let considerDate = startDay;
          if (eventDate.diff(endDay, 'days') < 0) {
            considerDate = endDay;
          }
          var date = moment.utc(considerDate);
          var requestData = {
            exerciseId: dragEventId,
            date: date,
          };
          if (
            dragEventType !== SCHEDULED_MEAL &&
            dragEventType !== SCHEDULED_BODY_MEASUREMENT
          ) {
            dispatch(pasteUsersWorkoutScheduleRequest(requestData, 'cut'));
            this.setState({ workoutPasteAction: true });
          }
          if (dragEventType === SCHEDULED_MEAL) {
            var reqData = {
              meal_id: dragEventMealID,
              date: date,
            };
            await dispatch(
              userMealUpdateRequest(dragEventDetailID, reqData, res => {
                this.setState({ workoutPasteAction: true });
              }),
            );
          }
          if (dragEventType === SCHEDULED_BODY_MEASUREMENT) {
            var requestData = {
              measurementId: dragEventId,
              logDate: date,
            };
            await dispatch(
              updateUserBodyMeasurementRequest(requestData, res => {
                this.setState({ workoutPasteAction: true });
              }),
            );
          }
        }
      } else if (cutWorkout) {
        console.log('CUTWORKOUT ====', cutWorkout);
        console.log('dragEventType', dragEventType);
        var startDay = moment(slotInfo.start).startOf('day');
        var date = moment.utc(startDay);
        var requestData = {
          exerciseId: cutWorkout,
          date: date,
        };
        dispatch(pasteUsersWorkoutScheduleRequest(requestData, 'cut'));
        this.setState({ workoutPasteAction: true });
      } else if (cutMeal && cutMealDetailId) {
        var startDay = moment(slotInfo.start).startOf('day');
        var date = moment.utc(startDay);
        var requestData = {
          meal_id: cutMeal,
          date: date,
        };
        await dispatch(
          userMealUpdateRequest(cutMealDetailId, requestData, res => {
            this.setState({ workoutPasteAction: true });
          }),
        );
      } else if (cutBodyMeasurement) {
        var startDay = moment(slotInfo.start).startOf('day');
        var date = moment.utc(startDay);
        var requestData = {
          measurementId: cutBodyMeasurement,
          logDate: date,
        };
        dispatch(updateUserBodyMeasurementRequest(requestData));
        this.setState({ workoutPasteAction: true });
      } else if (copiedWorkout || copiedMealId || copiedBodyMeasurement) {
        this.setState({ showSelectEventAlert: true });
        dispatch(setSelectedSlotFromCalendar(slotInfo));
      } else {
        this.props.history.push(routeCodes.CALENDAR_OVERVIEW);
      }
    } else {
      tw('You are offline, please check your internet connection');
    }
  };

  resetCutData = () => {
    console.log('CUT RESET');
    const { dispatch, cutWorkout, cutMeal, cutBodyMeasurement } = this.props;
    if (cutWorkout) {
      this.getWorkoutSchedulesByMonth();
      const newWorkoutState = { cutWorkout: null, cutWorkoutData: null };
      dispatch(setScheduleWorkoutsState(newWorkoutState));
    }
    if (cutMeal) {
      this.getWorkoutSchedulesByMonth();
      const newWorkoutState = {
        cutMeal: null,
        cutMealData: null,
        cutMealDetailId: null,
      };
      dispatch(setScheduleWorkoutsState(newWorkoutState));
    }
    if (cutBodyMeasurement) {
      this.getWorkoutSchedulesByMonth();
      const newWorkoutState = {
        cutBodyMeasurement: null,
        cutBodyMeasurementData: null,
      };
      dispatch(setScheduleWorkoutsState(newWorkoutState));
    }
  };

  resetDragContainer = () => {
    const dragPlaceholder = $('#custom-drag-workout-wrap');
    dragPlaceholder.html('');
    dragEventActive = false;
    dragEventCardOutside = false;
    dragEventId = null;
    dragEventDate = null;
    dragEventCardX = null;
    dragEventCardY = null;
    dragEventType = null;
    dragEventDetailID = null;
    dragEventMealID = null;
    $('#cal-panel-wrap').css({ boxShadow: 'none' });
  };

  cancelSelectedSlotAction = () => {
    const { dispatch } = this.props;
    this.setState({
      showSelectEventAlert: false,
    });
    dispatch(setSelectedSlotFromCalendar(null));
  };

  getWorkoutSchedulesByMonth = (date = null) => {
    const { calendarViewDate } = this.state;
    let _date = null;
    if (date) {
      _date = date;
      this.setState({ calendarViewDate: _date.local() });
    } else if (calendarViewDate) {
      _date = calendarViewDate;
    } else {
      _date = moment()
        .startOf('day')
        .utc();
      this.setState({ calendarViewDate: _date.local() });
    }
    const { dispatch } = this.props;
    var requestObj = { date: _date };
    var requestData = {
      logDate: _date,
    };
    var today = moment()
      .startOf('day')
      .utc();
    if (isOnline()) {
      dispatch(getUsersWorkoutSchedulesRequest(requestObj, null));
      dispatch(getUserMealsLogDatesRequest(requestData));
      dispatch(getUserBodyMeasurementLogDatesRequest(requestData));
      dispatch(getUserFitnessTestsLogDatesRequest(today));
    } else {
      // get data from iDB
      this.getWorkoutsDataFromIDB();
      this.getMealsDataFromIDB();
      this.getBodyMeasurementDataFromIDB();
    }
  };

  handleNavigation = date => {
    const { dispatch } = this.props;
    var momentDate = moment(date).startOf('day');
    var day = moment.utc(momentDate);
    this.setState({ calendarViewDate: day.local() });
    this.getWorkoutSchedulesByMonth(day);
  };

  handleNewRestDay = () => {
    const { selectedSlot, dispatch } = this.props;
    var startDay = moment(selectedSlot.start).startOf('day');
    var date = moment.utc(startDay);
    var requestData = {
      title: 'Rest Day',
      description: 'Hey its rest day! Take total rest.',
      type: SCHEDULED_WORKOUT_TYPE_RESTDAY,
      date: date,
    };
    this.setState({ addRestDayInit: true });
    dispatch(addUserWorkoutTitleRequest(requestData));
    dispatch(showPageLoader());
  };

  handleCut = (_id, workout) => {
    if (isOnline()) {
      console.log('HANDLE CUT', _id, workout);
      const { dispatch } = this.props;
      if (_id) {
        dragEventType = workout.exerciseType;
        if (dragEventType === SCHEDULED_MEAL) {
          dragEventDetailID = workout.mealDetail_id;
          dragEventMealID = workout.meal_id;
          dispatch(
            cutUserMealSchedule(dragEventMealID, dragEventDetailID, workout),
          );
          ts('Meal cut!');
        } else if (dragEventType === SCHEDULED_BODY_MEASUREMENT) {
          dispatch(cutUserBodyMeasurementSchedule(_id, workout));
          ts('Body Measurement cut!');
        } else {
          dispatch(cutUserWorkoutSchedule(_id, workout));
          ts('Workout cut!');
        }
      }
    } else {
      tw('You are offline, please check your internet connection');
    }
  };

  handleCopy = (_id, mealDetail_id = null, eventType = null) => {
    if (isOnline()) {
      console.log('COPY CALL');
      const { dispatch } = this.props;
      if (_id) {
        if (mealDetail_id !== null && eventType === SCHEDULED_MEAL) {
          dispatch(copyUserMealSchedule(_id, mealDetail_id));
          ts('Meal copied!');
        } else if (eventType === SCHEDULED_BODY_MEASUREMENT) {
          dispatch(copyUserBodyMeasurementSchedule(_id));
          ts('Body Measurement copied!');
        } else {
          dispatch(copyUserWorkoutSchedule(_id));
          ts('Workout copied!');
        }
      }
    } else {
      tw('You are offline, please check your internet connection');
    }
  };

  handlePaste = () => {
    console.log('PASTE CALL');
    console.log('Event Type', dragEventType);
    const { copiedWorkout, selectedSlot, dispatch } = this.props;
    if (copiedWorkout) {
      var startDay = moment(selectedSlot.start).startOf('day');
      var date = moment.utc(startDay);
      var requestData = {
        exerciseId: copiedWorkout,
        date: date,
      };
      dispatch(pasteUsersWorkoutScheduleRequest(requestData));
      this.setState({ workoutPasteAction: true });
      dispatch(showPageLoader());
    } else {
      te('There is no workout copied!');
    }
  };
  handlePasteBodyMeasurement = () => {
    const { copiedBodyMeasurement, dispatch, selectedSlot } = this.props;
    console.log('Copy Body MEasurement', copiedBodyMeasurement);
    if (copiedBodyMeasurement) {
      var startDay = moment(selectedSlot.start).startOf('day');
      var date = moment.utc(startDay);
      var requestData = {
        measurementId: copiedBodyMeasurement,
        logDate: date,
      };
      dispatch(
        pasteUserBodyMeasurementRequest(requestData, res => {
          this.setState({ workoutPasteAction: true });
        }),
      );
    } else {
      te('There is no body measurement copied!');
    }
  };

  handlePasteMeal = async () => {
    const {
      selectedSlot,
      dispatch,
      copiedMealId,
      copiedMealDetailId,
    } = this.props;
    if (copiedMealId && copiedMealDetailId) {
      var startDay = moment(selectedSlot.start).startOf('day');
      var date = moment.utc(startDay);
      var requestData = {
        meal_id: copiedMealId,
        date: date,
        status: 'paste',
      };
      await dispatch(
        userMealUpdateRequest(copiedMealDetailId, requestData, res => {
          this.setState({ workoutPasteAction: true });
        }),
      );
      dispatch(showPageLoader());
    } else {
      te('There is no meal copied!');
    }
  };

  showDeleteConfirmation = (id, date, type = 'workout') => {
    this.setState({
      deleteWorkoutAlert: true,
      selectedWorkoutId: id,
      selectedWorkoutDate: date,
    });
  };

  handleCancelDelete = () => {
    this.setState({
      deleteWorkoutAlert: false,
      selectedWorkoutId: null,
      selectedWorkoutDate: null,
    });
  };

  handleDeleteWorkoutSchedule = () => {
    console.log('DELETE CALL');
    const { dispatch } = this.props;
    const { selectedWorkoutId } = this.state;
    if (selectedWorkoutId) {
      var requestData = {
        exerciseIds: [selectedWorkoutId],
      };
      dispatch(showPageLoader());
      dispatch(deleteUsersBulkWorkoutScheduleRequest(requestData));
      this.setState({
        deleteWorkoutAlert: false,
        deleteWorkoutActionInit: true,
      });
    }
  };

  handleCompleteWorkout = _id => {
    const { dispatch, loading } = this.props;
    const { workoutEvents } = this.state;
    var workouts = Object.assign([], workoutEvents);
    var selectedWorkout = _.find(workouts, ['id', _id]);
    if (selectedWorkout && !loading) {
      var isCompleted =
        typeof selectedWorkout.isCompleted !== 'undefined'
          ? selectedWorkout.isCompleted === 0
            ? 1
            : 0
          : 1;
      var workout = Object.assign({}, selectedWorkout);
      workout.isCompleted = isCompleted;
      var index = _.findIndex(workouts, ['id', _id]);
      workouts[index] = workout;
      this.setState({
        workoutEvents: workouts,
      });
      var requestData = {
        exerciseIds: [_id],
        isCompleted: isCompleted,
      };
      this.setState({ completeWorkoutActionInit: true });
      dispatch(completeUsersBulkWorkoutScheduleRequest(requestData));
    }
  };

  handleSelectProgramToAssign = () => {
    this.setState({
      showProgramAssignAlert: true,
      showSelectEventAlert: false,
    });
  };

  handleCancelProgramAssignAlert = () => {
    const { dispatch } = this.props;
    this.setState({ showProgramAssignAlert: false });
    dispatch(setSelectedSlotFromCalendar(null));
  };

  handleAssignProgram = data => {
    let selectedProgramIdToAssign = data.program_id ? data.program_id : '';
    const { selectedSlot, dispatch } = this.props;
    var date = selectedSlot ? selectedSlot.start : null;
    var programId = selectedProgramIdToAssign
      ? selectedProgramIdToAssign.value
      : null;
    if (date && programId) {
      var requestData = { programId, date };
      dispatch(userAssignProgramRequest(requestData));
      dispatch(showPageLoader());
    }
  };

  handleSelectForBulkAction = _id => {
    const { workoutEvents, calendarViewDate } = this.state;
    var workouts = Object.assign([], workoutEvents);
    var selectedWorkout = _.find(workouts, ['id', _id]);
    if (selectedWorkout) {
      var isSelectedForBulkAction =
        typeof selectedWorkout.isSelectedForBulkAction !== 'undefined'
          ? selectedWorkout.isSelectedForBulkAction === false
            ? true
            : false
          : true;
      var workout = Object.assign({}, selectedWorkout);
      workout.isSelectedForBulkAction = isSelectedForBulkAction;
      var index = _.findIndex(workouts, ['id', _id]);
      workouts[index] = workout;
      let selectAllChecked = false;
      let calendarViewMonth = calendarViewDate.format('M');
      let totalEventDaysCount = 0;
      let selectedEventDaysCount = 0;
      _.forEach(workouts, (o, i) => {
        let eventMonth = moment(o.start).format('M');
        if (calendarViewMonth === eventMonth) {
          if (o.isSelectedForBulkAction) {
            selectedEventDaysCount++;
          }
          totalEventDaysCount++;
        }
      });
      if (selectedEventDaysCount >= totalEventDaysCount) {
        selectAllChecked = true;
      }
      this.setState({
        workoutEvents: workouts,
        selectAllChecked: selectAllChecked,
      });
    }
  };

  handleDeleteBulkWorkoutSchedule = () => {
    const { dispatch } = this.props;
    const { workoutEvents } = this.state;
    var selectedEvents = _.filter(workoutEvents, [
      'isSelectedForBulkAction',
      true,
    ]);
    var selectedIds = _.map(selectedEvents, 'id');
    var requestData = {
      exerciseIds: selectedIds,
    };
    dispatch(showPageLoader());
    dispatch(deleteUsersBulkWorkoutScheduleRequest(requestData));
    this.setState({ deleteBulkActionInit: true, deleteBulkActionAlert: false });
  };

  handleCompleteBulkWorkoutSchedule = isCompleted => {
    const { dispatch } = this.props;
    const { workoutEvents } = this.state;
    var selectedEvents = _.filter(workoutEvents, [
      'isSelectedForBulkAction',
      true,
    ]);
    let today = moment()
      .startOf('day')
      .utc();
    var selectedIds = [];
    _.forEach(selectedEvents, obj => {
      let eventDate = moment(obj.start)
        .startOf('day')
        .utc();
      if (eventDate <= today) {
        if (
          typeof obj.totalExercises !== 'undefined' &&
          obj.totalExercises > 0
        ) {
          selectedIds.push(obj.id);
        }
      }
    });
    var requestData = {
      exerciseIds: selectedIds,
      isCompleted: isCompleted,
    };
    dispatch(completeUsersBulkWorkoutScheduleRequest(requestData));
    if (isCompleted === 1) {
      this.setState({
        completeBulkActionInit: true,
        completeBulkActionAlert: false,
      });
    } else if (isCompleted === 0) {
      this.setState({
        incompleteBulkActionInit: true,
        incompleteBulkActionAlert: false,
      });
    }
  };

  handleAddWorkout = () => {
    this.setState({
      showSelectEventAlert: false,
      showAddWorkoutTitleAlert: true,
    });
  };

  handleAddWorkoutTitleCancel = () => {
    const { dispatch } = this.props;
    this.setState({
      showSelectEventAlert: false,
      showAddWorkoutTitleAlert: false,
    });
    dispatch(setSelectedSlotFromCalendar(null));
    let stateData = { errorTitle: [] };
    dispatch(setScheduleWorkoutsState(stateData));
  };

  handleSelectAll = e => {
    let selectStatus = e.target.checked;
    this.changeAllWorkoutCheckedStatus(selectStatus);
  };
  handleChangeCheckbox = name => {
    this.setState({ [name]: !this.state[name], workoutEvents: [] });
  };

  changeAllWorkoutCheckedStatus = checked => {
    const { workoutEvents, calendarViewDate } = this.state;
    let calendarViewMonth = calendarViewDate.format('M');
    let newWorkouts = [];
    _.forEach(workoutEvents, (o, i) => {
      let eventMonth = moment(o.start).format('M');
      let newObj = Object.assign({}, o);
      if (calendarViewMonth === eventMonth) {
        newObj.isSelectedForBulkAction = checked;
      }
      newWorkouts.push(newObj);
    });
    this.setState({ workoutEvents: newWorkouts, selectAllChecked: checked });
  };

  handleAddTitleSubmit = data => {
    const { selectedSlot, dispatch } = this.props;
    var startDay = moment(selectedSlot.start).startOf('day');
    var date = moment.utc(startDay);
    var requestData = {
      title:
        data.title && data.title.trim()
          ? capitalizeFirstLetter(data.title.trim())
          : '',
      description:
        data.description && data.description.trim()
          ? capitalizeFirstLetter(data.description.trim())
          : '',
      type: SCHEDULED_WORKOUT_TYPE_EXERCISE,
      date: date,
    };
    this.setState({ addWorkoutTitleInit: true });
    dispatch(addUserWorkoutTitleRequest(requestData));
    dispatch(showPageLoader());
  };

  createProgram = data => {
    const { dispatch } = this.props;
    const { workoutEvents } = this.state;
    const selectedEvents = _.filter(workoutEvents, [
      'isSelectedForBulkAction',
      true,
    ]);
    const selectedIds = _.map(selectedEvents, 'id');
    const requestData = {
      selectedIds,
      goal: data.goal && data.goal.value ? data.goal.value : '',
      level: data.level && data.level.value ? data.level.value : '',
      privacy:
        data.privacy && typeof data.privacy.value !== 'undefined'
          ? data.privacy.value
          : '',
      title: data.title ? data.title : '',
    };
    dispatch(showPageLoader());
    dispatch(createUserProgramFromCalendarRequest(requestData));
  };

  appendProgram = data => {
    const { dispatch } = this.props;
    const { workoutEvents } = this.state;
    const selectedEvents = _.filter(workoutEvents, [
      'isSelectedForBulkAction',
      true,
    ]);
    const selectedIds = _.map(selectedEvents, 'id');
    const requestData = {
      selectedIds,
      programId:
        data.program_id && data.program_id.value ? data.program_id.value : '',
    };
    dispatch(showPageLoader());
    dispatch(appendUserProgramFromCalendarRequest(requestData));
  };
}

const mapStateToProps = state => {
  const {
    userBodyMeasurement,
    userScheduleWorkouts,
    userPrograms,
    userFitnessTests,
    userMeal,
  } = state;
  return {
    selectedSlot: userScheduleWorkouts.get('slotInfo'),
    workouts: userScheduleWorkouts.get('workouts'),
    workout: userScheduleWorkouts.get('workout'),
    loading: userScheduleWorkouts.get('loading'),
    error: userScheduleWorkouts.get('error'),
    cutWorkout: userScheduleWorkouts.get('cutWorkout'),
    cutWorkoutData: userScheduleWorkouts.get('cutWorkoutData'),
    copiedWorkout: userScheduleWorkouts.get('copiedWorkout'),
    programs: userScheduleWorkouts.get('programs'),
    loadingPrograms: userScheduleWorkouts.get('loadingPrograms'),
    assignProgramLoading: userScheduleWorkouts.get('assignProgramLoading'),
    assignProgram: userScheduleWorkouts.get('assignProgram'),
    assignProgramError: userScheduleWorkouts.get('assignProgramError'),
    loadingTitle: userScheduleWorkouts.get('loadingTitle'),
    workoutTitle: userScheduleWorkouts.get('workoutTitle'),
    errorTitle: userScheduleWorkouts.get('errorTitle'),
    createFromCalendarLoading: userPrograms.get('createFromCalendarLoading'),
    createFromCalendarStatus: userPrograms.get('createFromCalendarStatus'),
    appendFromCalendarLoading: userPrograms.get('appendFromCalendarLoading'),
    appendFromCalendarStatus: userPrograms.get('appendFromCalendarStatus'),
    logDates: userMeal.get('logDates'),
    mealLoading: userMeal.get('loading'),
    copiedMealDetailId: userMeal.get('copiedMealDetailId'),
    copiedMealId: userMeal.get('copiedMealId'),
    cutMeal: userMeal.get('cutMeal'),
    cutMealData: userMeal.get('cutMealData'),
    cutMealDetailId: userMeal.get('cutMealDetailId'),
    bodyLogDates: userBodyMeasurement.get('logDates'),
    loadingLogDates: userBodyMeasurement.get('loadingLogDates'),
    errorLogDates: userBodyMeasurement.get('errorLogDates'),
    cutBodyMeasurement: userBodyMeasurement.get('cutBodyMeasurement'),
    cutBodyMeasurementData: userBodyMeasurement.get('cutBodyMeasurementData'),
    copiedBodyMeasurement: userBodyMeasurement.get('copiedBodyMeasurement'),
    bodyMeasurementLoading: userBodyMeasurement.get('loading'),
    bodyMeasurementError: userBodyMeasurement.get('updateMeasurementError'),
    userFitnessTestsLogdates: userFitnessTests.get('userFitnessTestsLogdates'),
    userFitnessTestsLoading: userFitnessTests.get('loading'),
  };
};

export default connect(mapStateToProps)(ScheduleWorkoutCalendarPage);

class SelectEventView extends Component {
  render() {
    const {
      handleAddWorkout,
      handleNewRestDay,
      handlePaste,
      handlePasteMeal,
      handleSelectProgramToAssign,
      copiedWorkout,
      copiedMealId,
      selectedSlotStateDate,
      handlePasteBodyMeasurement,
      copiedBodyMeasurement,
    } = this.props;
    const today = new Date().toISOString();
    const date = new Date(selectedSlotStateDate).toISOString();
    const encode = encodeURIComponent(`date=${date}`);
    return (
      <div className="row">
        <div className="popup-link-wrap">
          <div className="popup-link">
            <button
              type="button"
              onClick={handleAddWorkout}
              className="btn btn-primary"
            >
              Add Workout
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
              onClick={handleSelectProgramToAssign}
              className="btn btn-primary"
            >
              Assign Program
            </button>
          </div>
          {copiedWorkout && (
            <div className="popup-link">
              <button
                type="button"
                onClick={handlePaste}
                className="btn btn-primary"
                disabled={copiedWorkout ? false : true}
              >
                Paste Workout
              </button>
            </div>
          )}
          <div className="popup-link">
            <NavLink
              to={`${routeCodes.NUTRITION}?${encode}`}
              className="btn btn-primary"
            >
              Add Meal
            </NavLink>
          </div>
          {copiedMealId && (
            <div className="popup-link">
              <button
                type="button"
                onClick={handlePasteMeal}
                className="btn btn-primary"
                disabled={copiedMealId ? false : true}
              >
                Paste Meal
              </button>
            </div>
          )}

          {date <= today && (
            <React.Fragment>
              <div className="popup-link">
                <NavLink
                  to={`${routeCodes.BODY}?${encode}`}
                  className="btn btn-primary"
                >
                  Add Body Measurement
                </NavLink>
              </div>
              {copiedBodyMeasurement && (
                <div className="popup-link">
                  <button
                    type="button"
                    onClick={handlePasteBodyMeasurement}
                    className="btn btn-primary"
                    disabled={copiedBodyMeasurement ? false : true}
                  >
                    Paste Body Measurement
                  </button>
                </div>
              )}
            </React.Fragment>
          )}
          <div className="popup-link">
            <NavLink
              to={`${routeCodes.CALENDAR_OVERVIEW}?${encode}`}
              className="btn btn-primary"
            >
              Day Overview
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

const CustomEventsCard = (
  isActiveCalendarList,
  isActiveCardEdit,
  handleEditCard,
) => {
  return class CustomEventCard extends Component {
    state = {
      isActive: false,
    };

    componentDidUpdate(prevProps, prevState) {
      if (prevState.isActive !== this.state.isActive) {
        this.setState({ isActive: this.state.isActive });
      }
    }
    handleChange = state => {
      this.setState({ isActive: !this.state.isActive });
    };
    render() {
      const { isActive, test = 'dummy' } = this.state;
      const { event } = this.props;
      let today = moment().utc();
      let yesturday = moment().subtract('1', 'day');
      let eventDate = moment(event.start);
      let cardClassName = '';
      let showCompleteSwitch = false;

      // if (today > eventDate) {
      if (
        event.isCompleted === 1 &&
        event.exerciseType === SCHEDULED_WORKOUT_TYPE_EXERCISE
      ) {
        cardClassName = 'w-c-blue';
      } else if (
        event.isCompleted === 0 &&
        event.exerciseType === SCHEDULED_WORKOUT_TYPE_EXERCISE
      ) {
        cardClassName = 'w-c-blue';
      } else if (
        event.isCompleted === 0 &&
        event.exerciseType === SCHEDULED_MEAL
      ) {
        cardClassName = 'w-c-greendark';
      } else if (
        event.isCompleted === 0 &&
        event.exerciseType === SCHEDULED_BODY_MEASUREMENT
      ) {
        cardClassName = 'w-c-greenlight';
      } else if (
        event.isCompleted === 0 &&
        event.exerciseType === SCHEDULED_FITNESS_TEST
      ) {
        cardClassName = 'w-c-red';
      }
      showCompleteSwitch = true;
      // }
      const date = new Date(eventDate).toISOString();
      const encode = encodeURIComponent(`date=${date}`);

      return (
        <div
          id={`workout-card-${event.id}`}
          className={cns(
            `fadeIn big-calendar-custom-month-event-view-card ${cardClassName}`,
            {
              'restday w-c-blue':
                event.exerciseType === SCHEDULED_WORKOUT_TYPE_RESTDAY,
              'loss-opacity': event.isCut,
              'disable-overlay': event.isCutEnable,
              'opacity-0': dragEventId === event.id,
              'w-c-darkgreen': event.exerciseType === SCHEDULED_MEAL,
              'past-body w-c-darkorange':
                event.exerciseType === SCHEDULED_FITNESS_TEST,
            },
          )}
        >
          <div className="big-calendar-custom-month-event-view-card-header">
            <div
              className={isActive ? 'calendar-icon active' : 'calendar-icon'}
            >
              <a
                href="javascript:void(0)"
                data-tip="Cut"
                onClick={e => {
                  e.stopPropagation();
                  event.handleCut(event);
                }}
              >
                <FontAwesomeIcon icon="cut" />
              </a>
              <a
                href="javascript:void(0)"
                data-tip="Copy"
                onClick={event.handleCopy}
              >
                <FontAwesomeIcon icon="copy" />
              </a>

              {event.exerciseType !== SCHEDULED_MEAL && (
                <a
                  href="javascript:void(0)"
                  data-tip="Delete"
                  data-for="event-delete-tooltip"
                  onClick={event.handleDelete}
                  title=""
                >
                  <FontAwesomeIcon icon="trash-alt" />
                </a>
              )}
            </div>
            <div className="calendar-top">
              <div
                className="custom_check p-relative"
                onClick={event.handleSelectForBulkAction}
              >
                {
                  <input
                    type="checkbox"
                    id={`complete_workout_schedule_${event.id}`}
                    name={`complete_workout_schedule_${event.id}`}
                    checked={event.isSelectedForBulkAction}
                    onChange={() => {}}
                  />
                }
                <label>
                  <h5>{event.title}</h5>
                </label>
              </div>

              <div
                className={isActive ? 'dropdown open' : 'dropdown'}
                onClick={this.handleChange.bind(this)}
              >
                <FontAwesomeIcon icon={isActive ? 'times' : 'ellipsis-h'} />
              </div>
            </div>
            {}
          </div>
          <div
            className={cns('big-calendar-custom-month-event-view-card-body', {
              'w-c-brb': !showCompleteSwitch,
              'list-cal': !isActiveCalendarList,
              // 'animated slideInDown': isActiveCalendarList
            })}
            onMouseDown={e => this.handleMouseDown(e, event)}
            onMouseUp={this.handleMouseUp}
            onClick={e => e.stopPropagation()}
          >
            {event.description && (
              <div>
                <p>{event.description}</p>
              </div>
            )}
            {/* {(event.exerciseType === SCHEDULED_WORKOUT_TYPE_EXERCISE) &&
                                <a href="javascript:void(0)" data-tip="Copy" onClick={event.handleCopy} title=""><FaCopy /></a>
                            }
                            {(event.exerciseType === SCHEDULED_WORKOUT_TYPE_EXERCISE) &&
                                <NavLink to={routeCodes.SAVE_SCHEDULE_WORKOUT.replace(':id', event.id)} data-tip="Details" title=""><FaEye /></NavLink>
                            }
                            {(event.exerciseType === SCHEDULED_WORKOUT_TYPE_EXERCISE) &&
                                <NavLink to={routeCodes.SAVE_SCHEDULE_WORKOUT.replace(':id', event.id)} data-tip="Change" title=""><FaPencil /></NavLink>
                            }
                            {(event.exerciseType === SCHEDULED_MEAL) &&
                                <a href="javascript:void(0)" data-tip="Copy" onClick={event.handleCopy} title=""><FaCopy /></a>
                            }
                            {(event.exerciseType === SCHEDULED_MEAL) &&

                                <NavLink to={`${routeCodes.NUTRITION_VIEW}/${event.mealDetail_id}`} data-tip="Details" title=""><FaEye /></NavLink>
                            }
                            {(event.exerciseType === SCHEDULED_MEAL) &&
                                <NavLink to={`${routeCodes.NUTRITION_EDIT}/${event.mealDetail_id}`} data-tip="Change" title=""><FaPencil /></NavLink>
                            }

                            {(event.exerciseType === SCHEDULED_BODY_MEASUREMENT) &&
                                <a href="javascript:void(0)" data-tip="Copy" onClick={event.handleCopy} title=""><FaCopy /></a>
                            }
                            {(event.exerciseType === SCHEDULED_BODY_MEASUREMENT) &&
                                <NavLink to={`${routeCodes.BODY}?${encode}`} data-tip="Details" title=""><FaEye /></NavLink>
                            } */}

            {/* {(event.exerciseType === SCHEDULED_BODY_MEASUREMENT) &&
                                <NavLink to={routeCodes.SAVE_SCHEDULE_WORKOUT.replace(':id', event.id)} data-tip="Change" title=""><FaPencil /></NavLink>
                            } */}
            {/* {(event.exerciseType === SCHEDULED_FITNESS_TEST) &&
                                <NavLink to={routeCodes.EXERCISEFITNESS} data-tip="Details" title=""><FaEye /></NavLink>
                            } */}

            {/* {
                            event.exerciseType !== SCHEDULED_MEAL && event.exerciseType !== SCHEDULED_BODY_MEASUREMENT && event.exerciseType !== SCHEDULED_FITNESS_TEST && <a href="javascript:void(0)" data-tip="Delete" data-for="event-delete-tooltip" onClick={event.handleDelete} title=""><FaTrash /></a>} */}
          </div>
          {event.exerciseType === SCHEDULED_WORKOUT_TYPE_EXERCISE &&
            showCompleteSwitch &&
            typeof event.totalExercises !== 'undefined' &&
            event.totalExercises > 0 && (
              <div className="big-calendar-custom-month-event-view-card-footer">
                <div className="switch-wrap">
                  <small>Workout Completed</small>
                  <div
                    className="material-switch"
                    onClick={event.handleCompleteWorkout}
                  >
                    <input
                      id={`complete_switch_${event.id}`}
                      name={`complete_switch_${event.id}`}
                      checked={event.isCompleted}
                      onChange={() => {}}
                      type="checkbox"
                    />
                    <label
                      htmlFor={`complete_switch_${event.id}`}
                      className="label-default"
                    ></label>
                  </div>
                </div>
              </div>
            )}

          <ReactTooltip place="top" type="dark" effect="solid" />
          <ReactTooltip
            id="event-delete-tooltip"
            place="top"
            type="error"
            effect="solid"
          />
        </div>
      );
    }

    handleMouseDown = (e, event) => {
      console.log('MOUSE DOWN CALL', event);
      const selectedCard = $(`#workout-card-${event.id}`);
      const dragPlaceholder = $('#custom-drag-workout-wrap');
      const offsets = selectedCard.offset();
      const offsetLeft = offsets && offsets.left ? offsets.left : 0;
      const offsetRight = offsets && offsets.top ? offsets.top : 0;
      const eventCardX = offsetLeft - e.clientX;
      const eventCardY = offsetRight - e.clientY;
      dragPlaceholder.html(selectedCard.parent().html());
      dragPlaceholder.css({
        top: eventCardY + e.clientY,
        left: eventCardX + e.clientX,
      });
      dragEventActive = true;
      dragEventCardOutside = false;
      dragEventId = event.id;
      dragEventDate = event.start;
      dragEventCardX = eventCardX;
      dragEventCardY = eventCardY;
      dragEventType = event.exerciseType;
      dragEventMealID =
        event.exerciseType === SCHEDULED_MEAL ? event.meal_id : null;
      dragEventDetailID =
        event.exerciseType === SCHEDULED_MEAL ? event.mealDetail_id : null;
      $('#cal-panel-wrap').css({ boxShadow: 'none' });
      // selectedCard.css({ opacity: "0" });
    };

    handleMouseUp = e => {
      const selectedCard = $(`#workout-card-${dragEventId}`);
      const dragPlaceholder = $('#custom-drag-workout-wrap');
      dragPlaceholder.html('');
      dragEventActive = false;
      dragEventCardOutside = false;
      dragEventId = null;
      dragEventDate = null;
      dragEventCardX = null;
      dragEventCardY = null;
      $('#cal-panel-wrap').css({ boxShadow: 'none' });
      selectedCard.removeClass('opacity-0');
      selectedCard.css({ opacity: '1' });
    };
  };
};

class CustomEventCardView extends Component {
  render() {
    const { event } = this.props;
    let today = moment().utc();
    let yesturday = moment().subtract('1', 'day');
    let eventDate = moment(event.start);
    let cardClassName = '';
    let showCompleteSwitch = false;
    // if (today > eventDate) {

    if (
      event.isCompleted === 1 &&
      event.exerciseType === SCHEDULED_WORKOUT_TYPE_EXERCISE
    ) {
      cardClassName = 'w-c-blue';
    } else if (
      event.isCompleted === 0 &&
      event.exerciseType === SCHEDULED_WORKOUT_TYPE_EXERCISE
    ) {
      cardClassName = 'w-c-blue';
    } else if (
      event.isCompleted === 0 &&
      event.exerciseType === SCHEDULED_MEAL
    ) {
      cardClassName = 'w-c-greendark';
    } else if (
      event.isCompleted === 0 &&
      event.exerciseType === SCHEDULED_BODY_MEASUREMENT
    ) {
      cardClassName = 'w-c-greenlight';
    } else if (
      event.isCompleted === 0 &&
      event.exerciseType === SCHEDULED_FITNESS_TEST
    ) {
      cardClassName = 'w-c-red';
    }
    showCompleteSwitch = true;
    // }
    return (
      <div
        className={cns(
          `cut-workout-wrap big-calendar-custom-month-event-view-card ${cardClassName}`,
          {
            'restday w-c-orange':
              event.exerciseType === SCHEDULED_WORKOUT_TYPE_RESTDAY,
            'opacity-0': dragEventId === event.id,
            'w-c-greendark': event.exerciseType === SCHEDULED_MEAL,
            'w-c-greenlight': event.exerciseType === SCHEDULED_BODY_MEASUREMENT,
            'past-body w-c-darkorange':
              event.exerciseType === SCHEDULED_FITNESS_TEST,
          },
        )}
      >
        <div className="big-calendar-custom-month-event-view-card-header">
          <div className="calendar-top">
            <div className="custom_check p-relative">
              <input
                type="checkbox"
                id={`cut-complete_workout_schedule_${event.id}`}
                name={`cut-complete_workout_schedule_${event.id}`}
                checked={event.isSelectedForBulkAction}
              />
              <label>
                <h5>{event.title}</h5>
              </label>
              {/* <a href="javascript:void(0)" className="workout-cut-card-btn">
                <i className="icon-flip_to_front"></i>
              </a>
              <div
                href="javascript:void(0)"
                className="calendar-custom-drag-handle"
              >
                <i className="icon-open_with"></i>
              </div> */}
            </div>

            <div className="dropdown">
              <FontAwesomeIcon icon="ellipsis-h" />
            </div>
          </div>

          <div
            className={cns('big-calendar-custom-month-event-view-card-body', {
              'w-c-brb': !showCompleteSwitch,
            })}
          >
            {event.description && (
              <div>
                <p>{event.description}</p>
              </div>
            )}
            {/* {(event.exerciseType === SCHEDULED_WORKOUT_TYPE_EXERCISE) &&
                            <a href="javascript:void(0)" title=""><FaCopy /></a>
                        }
                        {(event.exerciseType === SCHEDULED_WORKOUT_TYPE_EXERCISE) &&
                            <a href="javascript:void(0)" title=""><FaEye /></a>
                        }
                        {(event.exerciseType === SCHEDULED_WORKOUT_TYPE_EXERCISE) &&
                            <a href="javascript:void(0)" title=""><FaPencil /></a>
                        }
                        <a href="javascript:void(0)" title=""><FaTrash /></a> */}
          </div>
        </div>
        {event.exerciseType === SCHEDULED_WORKOUT_TYPE_EXERCISE &&
          showCompleteSwitch &&
          typeof event.totalExercises !== 'undefined' &&
          event.totalExercises > 0 && (
            <div className="big-calendar-custom-month-event-view-card-footer">
              <div className="switch-wrap">
                <small>Workout Completed</small>
                <div className="material-switch">
                  <input
                    id={`cut-complete_switch_${event.id}`}
                    name={`cut-complete_switch_${event.id}`}
                    checked={event.isCompleted}
                    type="checkbox"
                  />
                  <label
                    htmlFor={`cut-complete_switch_${event.id}`}
                    className="label-default"
                  ></label>
                </div>
              </div>
            </div>
          )}
      </div>
    );
  }
}

const CustomBars = (
  isActiveCalendarList,
  handleChangeActiveList,
  isActiveView,
  handleCalendarTabView,
  calendarView,
) => {
  return class CustomToolbar extends Toolbar {
    constructor(props) {
      super(props);
    }

    handleChange = (tab, active) => {
      handleChangeActiveList(active, tab);
    };
    render() {
      return (
        <div className="rbc-toolbar">
          <div className="rbc-btn-group">
            <button
              type="button"
              className={calendarView === 'month' ? 'rbc-active' : ''}
              onClick={() => this.view('month')}
            >
              Month
            </button>
            <button
              type="button"
              className={calendarView === 'week' ? 'rbc-active' : ''}
              onClick={() => this.view('week')}
            >
              Week
            </button>
          </div>

          <div className="liststyle-navbar d-flex flex-wrap ml-auto align-items-center">
            <h4>list style</h4>
            <div className="tabs ml-4 mr-4 align-items-center">
              <div className={isActiveView === '#list' ? 'tab active' : 'tab'}>
                <a
                  href="#list"
                  onClick={() => this.handleChange('#list', false)}
                  id={'list'}
                >
                  <Bars1 />
                </a>
              </div>
              <div
                className={isActiveView === '#collaps' ? 'tab active' : 'tab'}
              >
                <a
                  href="#collaps"
                  onClick={() => this.handleChange('#collaps', true)}
                  id={'collaps'}
                >
                  <Bars2 />
                </a>
              </div>
            </div>
          </div>

          <span className="nextprev-button">
            <button
              type="button"
              className="back-btn"
              onClick={() => this.navigate('PREV')}
            >
              <FontAwesomeIcon icon="arrow-left" />
            </button>
            <span className="rbc-toolbar-label">{this.props.label}</span>
            <button
              type="button"
              className="next-btn"
              onClick={() => this.navigate('NEXT')}
            >
              <FontAwesomeIcon icon="arrow-right" />
            </button>
          </span>
        </div>
      );
    }

    navigate = action => {
      console.log(action);

      this.props.onNavigate(action);
    };

    view = action => {
      this.props.onViewChange(action);
      handleCalendarTabView(action);
    };
  };
};
