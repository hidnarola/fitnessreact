import React, { Component } from 'react';
import { connect } from 'react-redux';
import FitnessHeader from '../components/global/FitnessHeader';
import FitnessNav from '../components/global/FitnessNav';
import BigCalendar from 'react-big-calendar';
import moment from "moment";
import SweetAlert from "react-bootstrap-sweetalert";
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
} from '../actions/userScheduleWorkouts';
import { NavLink } from "react-router-dom";
import { routeCodes } from '../constants/routes';
import _ from "lodash";
import { SCHEDULED_WORKOUT_TYPE_RESTDAY, SCHEDULED_WORKOUT_TYPE_EXERCISE } from '../constants/consts';
import { ts, te, prepareDropdownOptionsData, capitalizeFirstLetter, getElementOffsetRelativeToBody } from '../helpers/funs';
import { FaCopy, FaTrash, FaPencil, FaEye } from 'react-icons/lib/fa'
import cns from "classnames";
import AddWorkoutTitleForm from '../components/ScheduleWorkout/AddWorkoutTitleForm';
import ReactTooltip from "react-tooltip";
import { showPageLoader, hidePageLoader } from '../actions/pageLoader';
import SelectAssignProgramForm from '../components/ScheduleWorkout/SelectAssignProgramForm';
import CreateProgramFromCalendarForm from '../components/ScheduleWorkout/CreateProgramFromCalendarForm';
import { createUserProgramFromCalendarRequest, appendUserProgramFromCalendarRequest } from '../actions/userPrograms';
import AppendProgramFromCalendarForm from '../components/ScheduleWorkout/AppendProgramFromCalendarForm';
import $ from "jquery";

let dragEventActive = false;
let dragEventCardOutside = false;
let dragEventId = null;
let dragEventDate = null;
let dragEventCardX = null;
let dragEventCardY = null;

let calendarArea = null;

let hardResetContainer = false;

class ScheduleWorkout extends Component {
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
            showAppendProgram: false
        }
    }

    componentWillMount() {
        const { dispatch } = this.props;
        var today = moment().startOf('day').utc();
        this.setState({ calendarViewDate: today.local() });
        this.getWorkoutSchedulesByMonth(today);
        dispatch(getProgramsNameRequest());
    }

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
            showAppendProgram
        } = this.state;
        const {
            selectedSlot,
            programs,
            errorTitle,
            cutWorkout,
            cutWorkoutData
        } = this.props;
        var selectedSlotStateDate = null;
        if (selectedSlot) {
            selectedSlotStateDate = selectedSlot.start;
        }
        var programOptions = prepareDropdownOptionsData(programs, '_id', 'name');
        var selectedEvents = _.filter(workoutEvents, ['isSelectedForBulkAction', true]);
        return (
            <div className="fitness-body">
                <FitnessHeader />
                <FitnessNav />
                <section className="body-wrap">
                    <div className="body-head d-flex justify-content-start front-white-header">
                        <div className="body-head-l">
                            <h2>Workouts</h2>
                            <p>Your goal choice shapes how your fitness assistant will ceate your meal and exercise plans, it’s important that you set goals which are achieveable. Keep updating your profile and your fitness assistant will keep you on track and meeting the goals you’ve set out for yourself.</p>
                        </div>
                        <div className="body-head-r">
                            <NavLink
                                className="white-btn"
                                to={routeCodes.EXERCISE}
                            >
                                <span>Back</span>
                                <i className="icon-arrow_back"></i>
                            </NavLink>
                        </div>
                    </div>
                    <div className="body-content d-flex row justify-content-start profilephoto-content" data-for="custom-cut-workout-wrap" data-tip>
                        <div className="col-md-12">
                            <div id="cal-panel-wrap" className="white-box space-btm-20">
                                <div className="whitebox-body profile-body">
                                    {selectedEvents && selectedEvents.length > 0 &&
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
                                                    <label htmlFor="select_all_workouts">Select All</label>
                                                </div>
                                                <div className="count-leadeboard bg-pink">{selectedEvents.length}</div>
                                            </div>
                                            <div className="fixed-btm-bar-c">
                                                <a href="javascript:void(0)" data-for="create-program-tooltip" data-tip="Create program" onClick={() => this.setState({ showCreateProgram: true })}><i className="icon-add_box"></i> </a>
                                                <a href="javascript:void(0)" data-for="append-program-tooltip" data-tip="Append program" onClick={() => this.setState({ showAppendProgram: true })}><i className="icon-playlist_add"></i> </a>
                                                <a href="javascript:void(0)" data-for="event-bulk-delete-tooltip" data-tip="Delete" onClick={() => this.setState({ deleteBulkActionAlert: true })}><i className="icon-delete_forever"></i> </a>
                                                <a href="javascript:void(0)" data-for="event-bulk-complete-tooltip" data-tip="Mark as complete" onClick={() => this.setState({ completeBulkActionAlert: true })}><i className="icon-check_circle"></i></a>
                                                <a href="javascript:void(0)" data-for="event-bulk-incomplete-tooltip" data-tip="Mark as incomplete" onClick={() => this.setState({ incompleteBulkActionAlert: true })}><i className="icon-cancel"></i></a>
                                            </div>
                                            <ReactTooltip id='create-program-tooltip' place="top" type="info" effect="solid" />
                                            <ReactTooltip id='append-program-tooltip' place="top" type="dark" effect="solid" />
                                            <ReactTooltip id='event-bulk-delete-tooltip' place="top" type="error" effect="solid" />
                                            <ReactTooltip id='event-bulk-complete-tooltip' place="top" type="success" effect="solid" />
                                            <ReactTooltip id='event-bulk-incomplete-tooltip' place="top" type="warning" effect="solid" />
                                        </div>
                                    }
                                    <BigCalendar
                                        selectable={true}
                                        localizer={BigCalendar.momentLocalizer(moment)}
                                        defaultView={BigCalendar.Views.MONTH}
                                        className="workout-calender"
                                        events={workoutEvents}
                                        onView={() => { }}
                                        views={[BigCalendar.Views.MONTH]}
                                        onNavigate={this.handleNavigation}
                                        onSelectEvent={(event) => { }}
                                        onSelectSlot={this.onSelectSlot}
                                        popup={true}
                                        popupOffset={50}
                                        components={{
                                            event: CustomEventCard,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {cutWorkout &&
                        <ReactTooltip id="custom-cut-workout-wrap" place="top" type="dark" effect="float">
                            <CustomEventCardView event={cutWorkoutData} />
                        </ReactTooltip>
                    }
                    <div id="custom-drag-workout-wrap" style={{ position: 'absolute', minWidth: 178 }}></div>
                </section>
                <SweetAlert
                    type="default"
                    title={`Select event for - ${(selectedSlotStateDate) ? moment(selectedSlotStateDate).format('DD/MM/YYYY') : ''}`}
                    onCancel={this.cancelSelectedSlotAction}
                    onConfirm={() => { }}
                    btnSize="sm"
                    cancelBtnBsStyle="danger"
                    show={showSelectEventAlert}
                    showConfirm={false}
                    showCancel={true}
                    closeOnClickOutside={false}
                >
                    <SelectEventView
                        handleAddWorkout={this.handleAddWorkout}
                        handleNewRestDay={this.handleNewRestDay}
                        handlePaste={this.handlePaste}
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
                    title={`Select program start from - ${(selectedSlotStateDate) ? moment(selectedSlotStateDate).format('DD/MM/YYYY') : ''}`}
                    onConfirm={() => { }}
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
                    title={`Add workout for - ${(selectedSlotStateDate) ? moment(selectedSlotStateDate).format('DD/MM/YYYY') : ''}`}
                    onConfirm={() => { }}
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
                    onConfirm={() => { }}
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
                    onConfirm={() => { }}
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
            cutWorkout
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
        } = this.state;
        if (!loading && prevProps.workouts !== workouts) {
            var newWorkouts = [];
            _.forEach(workouts, (workout, index) => {
                var newWorkout = {
                    id: workout._id,
                    title: (workout.title) ? workout.title : `Workout on ${(workout.date) ? moment(workout.date).format('DD/MM/YYYY') : ''}`,
                    start: workout.date,
                    end: workout.date,
                    allDay: true,
                    isCompleted: (workout.isCompleted) ? workout.isCompleted : 0,
                    exercises: (workout.exercises && workout.exercises.length > 0) ? workout.exercises : [],
                    exerciseType: (workout.type) ? workout.type : null,
                    totalExercises: (workout.totalExercises) ? workout.totalExercises : 0,
                    meta: workout,
                    description: (workout.description) ? workout.description : '',
                    isSelectedForBulkAction: false,
                    isCut: (cutWorkout === workout._id),
                    isCutEnable: (cutWorkout) ? true : false,
                    handleCut: (workoutEvent) => this.handleCut(workout._id, workoutEvent),
                    handleCopy: () => this.handleCopy(workout._id),
                    handleDelete: () => this.showDeleteConfirmation(workout._id, workout.date),
                    handleCompleteWorkout: () => this.handleCompleteWorkout(workout._id),
                    handleSelectForBulkAction: () => this.handleSelectForBulkAction(workout._id),
                }
                newWorkouts.push(newWorkout);
            });
            this.setState({ workoutEvents: newWorkouts });
            this.resetDragContainer();
        }
        if (cutWorkout && prevProps.cutWorkout !== cutWorkout) {
            var newWorkouts = [];
            _.forEach(workouts, (workout, index) => {
                var newWorkout = {
                    id: workout._id,
                    title: (workout.title) ? workout.title : `Workout on ${(workout.date) ? moment(workout.date).format('DD/MM/YYYY') : ''}`,
                    start: workout.date,
                    end: workout.date,
                    allDay: true,
                    isCompleted: (workout.isCompleted) ? workout.isCompleted : 0,
                    exercises: (workout.exercises && workout.exercises.length > 0) ? workout.exercises : [],
                    exerciseType: (workout.type) ? workout.type : null,
                    totalExercises: (workout.totalExercises) ? workout.totalExercises : 0,
                    meta: workout,
                    description: (workout.description) ? workout.description : '',
                    isSelectedForBulkAction: false,
                    isCut: (cutWorkout === workout._id),
                    isCutEnable: (cutWorkout) ? true : false,
                    handleCut: (workoutEvent) => this.handleCut(workout._id, workoutEvent),
                    handleCopy: () => this.handleCopy(workout._id),
                    handleDelete: () => this.showDeleteConfirmation(workout._id, workout.date),
                    handleCompleteWorkout: () => this.handleCompleteWorkout(workout._id),
                    handleSelectForBulkAction: () => this.handleSelectForBulkAction(workout._id),
                }
                newWorkouts.push(newWorkout);
            });
            this.setState({ workoutEvents: newWorkouts });
        }
        if (workoutPasteAction && !loading) {
            this.setState({ workoutPasteAction: false });
            this.getWorkoutSchedulesByMonth();
            this.cancelSelectedSlotAction();
            const newWorkoutState = { cutWorkout: null, cutWorkoutData: null };
            dispatch(setScheduleWorkoutsState(newWorkoutState));
            dispatch(hidePageLoader());
            if (error && error.length > 0) {
                te('Something went wrong! please try again later.');
            } else {
                ts('Workout pasted!');
            }
        }
        if (deleteWorkoutActionInit && selectedWorkoutId && !loading) {
            this.setState({ deleteWorkoutActionInit: false, selectedWorkoutId: null, selectedWorkoutDate: null });
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
        if (!assignProgramLoading && prevProps.assignProgramLoading !== assignProgramLoading) {
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
        if (!createFromCalendarLoading && prevProps.createFromCalendarLoading !== createFromCalendarLoading) {
            if (createFromCalendarStatus && prevProps.createFromCalendarStatus !== createFromCalendarStatus) {
                this.getWorkoutSchedulesByMonth();
                this.setState({ showCreateProgram: false });
                dispatch(getProgramsNameRequest());
                ts('Program created!');
            }
            dispatch(hidePageLoader());
        }
        if (!appendFromCalendarLoading && prevProps.appendFromCalendarLoading !== appendFromCalendarLoading) {
            if (appendFromCalendarStatus && prevProps.appendFromCalendarStatus !== appendFromCalendarStatus) {
                this.getWorkoutSchedulesByMonth();
                this.setState({ showAppendProgram: false });
                ts('Program appended!');
            }
            dispatch(hidePageLoader());
        }
    }

    componentDidMount() {
        document.addEventListener("keyup", this.handleKeyUp, true);
        document.addEventListener("mousemove", this.handleMouseMove, true);
        document.addEventListener("mouseup", this.handleMouseUp, true);
    }

    componentWillUnmount() {
        document.removeEventListener('keyup', this.handleKeyUp, true);
        document.removeEventListener('mousemove', this.handleMouseMove, true);
        document.removeEventListener('mouseup', this.handleMouseUp, true);
    }

    handleKeyUp = (e) => {
        if (e && typeof e.keyCode !== 'undefined' && e.keyCode === 27) {
            this.resetCutData();
            if (dragEventId) {
                const selectedCard = $(`#workout-card-${dragEventId}`);
                this.resetDragContainer();
                selectedCard.removeClass("opacity-0");
                selectedCard.css({ opacity: "1" });
            }
        }
    }

    handleMouseMove = (e) => {
        if (dragEventActive && dragEventId) {
            const workoutCalendarWrapper = $(".workout-calender");
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (workoutCalendarWrapper && workoutCalendarWrapper[0]) {
                calendarArea = getElementOffsetRelativeToBody(workoutCalendarWrapper[0]);
            }
            if (calendarArea) {
                if ((e.clientX + scrollLeft) <= calendarArea.left ||
                    (e.clientX + scrollLeft) >= (calendarArea.left + calendarArea.width) ||
                    (e.clientY + scrollTop) <= calendarArea.top ||
                    (e.clientY + scrollTop) >= (calendarArea.top + calendarArea.height)
                ) {
                    dragEventCardOutside = true;
                    $('#cal-panel-wrap').css({ boxShadow: "0 0 10px 1px #da6d6d" });
                } else {
                    dragEventCardOutside = false;
                    $('#cal-panel-wrap').css({ boxShadow: "none" });
                }
            }
            const customDragWrap = $('#custom-drag-workout-wrap');
            customDragWrap.css({ top: (dragEventCardY + e.clientY), left: (dragEventCardX + e.clientX) });
        }
    }

    handleMouseUp = (e) => {
        if (dragEventActive && dragEventId) {
            const workoutCalendarWrapper = $(".workout-calender");
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
                calendarArea = getElementOffsetRelativeToBody(workoutCalendarWrapper[0]);
            }
            if (calendarArea) {
                const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                if ((e.clientX + scrollLeft) <= calendarArea.left ||
                    (e.clientX + scrollLeft) >= (calendarArea.left + calendarArea.width) ||
                    (e.clientY + scrollTop) <= calendarArea.top ||
                    (e.clientY + scrollTop) >= (calendarArea.top + calendarArea.height)
                ) {
                    e.stopPropagation();
                    const selectedCard = $(`#workout-card-${dragEventId}`);
                    this.resetDragContainer();
                    selectedCard.removeClass("opacity-0");
                    selectedCard.css({ opacity: "1" });
                }
            }
        }
    }

    onSelectSlot = (slotInfo) => {
        const { dispatch, cutWorkout } = this.props;
        if (dragEventId) {
            hardResetContainer = false;
            if (dragEventCardOutside) {
                this.resetDragContainer();
            } else {
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
                dispatch(pasteUsersWorkoutScheduleRequest(requestData, 'cut'));
                this.setState({ workoutPasteAction: true });
                dispatch(showPageLoader());
            }
        } else if (cutWorkout) {
            var startDay = moment(slotInfo.start).startOf('day');
            var date = moment.utc(startDay);
            var requestData = {
                exerciseId: cutWorkout,
                date: date,
            };
            dispatch(pasteUsersWorkoutScheduleRequest(requestData, 'cut'));
            this.setState({ workoutPasteAction: true });
            dispatch(showPageLoader());
        } else {
            this.setState({ showSelectEventAlert: true });
            dispatch(setSelectedSlotFromCalendar(slotInfo));
        }
    }

    resetCutData = () => {
        const { dispatch, cutWorkout } = this.props;
        if (cutWorkout) {
            this.getWorkoutSchedulesByMonth();
            const newWorkoutState = { cutWorkout: null, cutWorkoutData: null };
            dispatch(setScheduleWorkoutsState(newWorkoutState));
        }
    }

    resetDragContainer = () => {
        const dragPlaceholder = $('#custom-drag-workout-wrap');
        dragPlaceholder.html('');
        dragEventActive = false;
        dragEventCardOutside = false;
        dragEventId = null;
        dragEventDate = null;
        dragEventCardX = null;
        dragEventCardY = null;
        $('#cal-panel-wrap').css({ boxShadow: "none" });
    }

    cancelSelectedSlotAction = () => {
        const { dispatch } = this.props;
        this.setState({
            showSelectEventAlert: false,
        });
        dispatch(setSelectedSlotFromCalendar(null));
    }

    getWorkoutSchedulesByMonth = (date = null) => {
        const { calendarViewDate } = this.state;
        let _date = null;
        if (date) {
            _date = date;
            this.setState({ calendarViewDate: _date.local() });
        } else if (calendarViewDate) {
            _date = calendarViewDate;
        } else {
            _date = moment().startOf('day').utc();
            this.setState({ calendarViewDate: _date.local() });
        }
        const {
            dispatch
        } = this.props;
        var requestObj = { date: _date }
        dispatch(getUsersWorkoutSchedulesRequest(requestObj));
    }

    handleNavigation = (date) => {
        var momentDate = moment(date).startOf('day');
        var day = moment.utc(momentDate);
        this.setState({ calendarViewDate: day.local() });
        this.getWorkoutSchedulesByMonth(day);
    }

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
    }

    handleCut = (_id, workout) => {
        const { dispatch } = this.props;
        if (_id) {
            dispatch(cutUserWorkoutSchedule(_id, workout));
            ts('Workout cut!');
        }
    }

    handleCopy = (_id) => {
        const { dispatch } = this.props;
        if (_id) {
            dispatch(copyUserWorkoutSchedule(_id));
            ts('Workout copied!');
        }
    }

    handlePaste = () => {
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
    }

    showDeleteConfirmation = (id, date) => {
        this.setState({
            deleteWorkoutAlert: true,
            selectedWorkoutId: id,
            selectedWorkoutDate: date,
        });
    }

    handleCancelDelete = () => {
        this.setState({
            deleteWorkoutAlert: false,
            selectedWorkoutId: null,
            selectedWorkoutDate: null,
        });
    }

    handleDeleteWorkoutSchedule = () => {
        const { dispatch } = this.props;
        const { selectedWorkoutId } = this.state;
        if (selectedWorkoutId) {
            var requestData = {
                exerciseIds: [selectedWorkoutId],
            };
            dispatch(showPageLoader());
            dispatch(deleteUsersBulkWorkoutScheduleRequest(requestData));
            this.setState({ deleteWorkoutAlert: false, deleteWorkoutActionInit: true });
        }
    }

    handleCompleteWorkout = (_id) => {
        const { dispatch, loading } = this.props;
        const { workoutEvents } = this.state;
        var workouts = Object.assign([], workoutEvents);
        var selectedWorkout = _.find(workouts, ['id', _id]);
        if (selectedWorkout && !loading) {
            var isCompleted = (typeof selectedWorkout.isCompleted !== 'undefined') ? (selectedWorkout.isCompleted === 0) ? 1 : 0 : 1;
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
    }

    handleSelectProgramToAssign = () => {
        this.setState({ showProgramAssignAlert: true, showSelectEventAlert: false });
    }

    handleCancelProgramAssignAlert = () => {
        const { dispatch } = this.props;
        this.setState({ showProgramAssignAlert: false });
        dispatch(setSelectedSlotFromCalendar(null));
    }

    handleAssignProgram = (data) => {
        let selectedProgramIdToAssign = (data.program_id) ? data.program_id : '';
        const { selectedSlot, dispatch } = this.props;
        var date = (selectedSlot) ? selectedSlot.start : null;
        var programId = (selectedProgramIdToAssign) ? selectedProgramIdToAssign.value : null;
        if (date && programId) {
            var requestData = { programId, date }
            dispatch(userAssignProgramRequest(requestData));
            dispatch(showPageLoader());
        }
    }

    handleSelectForBulkAction = (_id) => {
        const { workoutEvents, calendarViewDate } = this.state;
        var workouts = Object.assign([], workoutEvents);
        var selectedWorkout = _.find(workouts, ['id', _id]);
        if (selectedWorkout) {
            var isSelectedForBulkAction = (typeof selectedWorkout.isSelectedForBulkAction !== 'undefined') ? (selectedWorkout.isSelectedForBulkAction === false) ? true : false : true;
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
    }

    handleDeleteBulkWorkoutSchedule = () => {
        const { dispatch } = this.props;
        const { workoutEvents } = this.state;
        var selectedEvents = _.filter(workoutEvents, ['isSelectedForBulkAction', true]);
        var selectedIds = _.map(selectedEvents, 'id');
        var requestData = {
            exerciseIds: selectedIds,
        };
        dispatch(showPageLoader());
        dispatch(deleteUsersBulkWorkoutScheduleRequest(requestData));
        this.setState({ deleteBulkActionInit: true, deleteBulkActionAlert: false });
    }

    handleCompleteBulkWorkoutSchedule = (isCompleted) => {
        const { dispatch } = this.props;
        const { workoutEvents } = this.state;
        var selectedEvents = _.filter(workoutEvents, ['isSelectedForBulkAction', true]);
        let today = moment().startOf('day').utc();
        var selectedIds = [];
        _.forEach(selectedEvents, (obj) => {
            let eventDate = moment(obj.start).startOf('day').utc();
            if (eventDate <= today) {
                if (typeof obj.totalExercises !== 'undefined' && obj.totalExercises > 0) {
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
            this.setState({ completeBulkActionInit: true, completeBulkActionAlert: false });
        } else if (isCompleted === 0) {
            this.setState({ incompleteBulkActionInit: true, incompleteBulkActionAlert: false });
        }
    }

    handleAddWorkout = () => {
        this.setState({ showSelectEventAlert: false, showAddWorkoutTitleAlert: true });
    }

    handleAddWorkoutTitleCancel = () => {
        const { dispatch } = this.props;
        this.setState({ showSelectEventAlert: false, showAddWorkoutTitleAlert: false });
        dispatch(setSelectedSlotFromCalendar(null));
        let stateData = { errorTitle: [] }
        dispatch(setScheduleWorkoutsState(stateData));
    }

    handleSelectAll = (e) => {
        let selectStatus = e.target.checked;
        this.changeAllWorkoutCheckedStatus(selectStatus);
    }

    changeAllWorkoutCheckedStatus = (checked) => {
        const { workoutEvents, calendarViewDate } = this.state;
        let calendarViewMonth = calendarViewDate.format("M");
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
    }

    handleAddTitleSubmit = (data) => {
        const { selectedSlot, dispatch } = this.props;
        var startDay = moment(selectedSlot.start).startOf('day');
        var date = moment.utc(startDay);
        var requestData = {
            title: (data.title && data.title.trim()) ? capitalizeFirstLetter(data.title.trim()) : '',
            description: (data.description && data.description.trim()) ? capitalizeFirstLetter(data.description.trim()) : '',
            type: SCHEDULED_WORKOUT_TYPE_EXERCISE,
            date: date,
        }
        this.setState({ addWorkoutTitleInit: true });
        dispatch(addUserWorkoutTitleRequest(requestData));
        dispatch(showPageLoader());
    }

    createProgram = (data) => {
        const { dispatch } = this.props;
        const { workoutEvents } = this.state;
        const selectedEvents = _.filter(workoutEvents, ['isSelectedForBulkAction', true]);
        const selectedIds = _.map(selectedEvents, 'id');
        const requestData = {
            selectedIds,
            goal: data.goal && data.goal.value ? data.goal.value : '',
            level: data.level && data.level.value ? data.level.value : '',
            privacy: data.privacy && typeof data.privacy.value !== 'undefined' ? data.privacy.value : '',
            title: data.title ? data.title : ''
        };
        dispatch(showPageLoader());
        dispatch(createUserProgramFromCalendarRequest(requestData));
    }

    appendProgram = (data) => {
        const { dispatch } = this.props;
        const { workoutEvents } = this.state;
        const selectedEvents = _.filter(workoutEvents, ['isSelectedForBulkAction', true]);
        const selectedIds = _.map(selectedEvents, 'id');
        const requestData = {
            selectedIds,
            programId: data.program_id && data.program_id.value ? data.program_id.value : ''
        };
        dispatch(showPageLoader());
        dispatch(appendUserProgramFromCalendarRequest(requestData));
    }
}

const mapStateToProps = (state) => {
    const { userScheduleWorkouts, userPrograms } = state;
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
    };
}

export default connect(
    mapStateToProps,
)(ScheduleWorkout);

class SelectEventView extends Component {
    render() {
        const { handleAddWorkout, handleNewRestDay, handlePaste, handleSelectProgramToAssign } = this.props;
        return (
            <div className="row">
                <div className="popup-link-wrap">
                    <div className="popup-link">
                        <button type="button" onClick={handleAddWorkout} className="btn btn-primary">Add Workout</button>
                    </div>
                    <div className="popup-link">
                        <button type="button" onClick={handleNewRestDay} className="btn btn-primary">Make Rest Day</button>
                    </div>
                    <div className="popup-link">
                        <button type="button" onClick={handleSelectProgramToAssign} className="btn btn-primary">Assign Program</button>
                    </div>
                    <div className="popup-link">
                        <button type="button" onClick={handlePaste} className="btn btn-primary">Paste Workout</button>
                    </div>
                </div>
            </div>
        );
    }
}

class CustomEventCard extends Component {
    render() {
        const { event } = this.props;
        let today = moment().utc();
        let yesturday = moment().subtract('1', 'day');
        let eventDate = moment(event.start);
        let cardClassName = '';
        let showCompleteSwitch = false;
        if (today > eventDate) {
            if (event.isCompleted === 1 && event.exerciseType === SCHEDULED_WORKOUT_TYPE_EXERCISE) {
                cardClassName = 'w-c-green';
            } else if (event.isCompleted === 0 && yesturday > eventDate && event.exerciseType === SCHEDULED_WORKOUT_TYPE_EXERCISE) {
                cardClassName = 'w-c-pink';
            }
            showCompleteSwitch = true;
        }
        return (
            <div
                id={`workout-card-${event.id}`}
                className={
                    cns(`big-calendar-custom-month-event-view-card ${cardClassName}`, {
                        'restday w-c-orange': (event.exerciseType === SCHEDULED_WORKOUT_TYPE_RESTDAY),
                        'loss-opacity': event.isCut,
                        'disable-overlay': event.isCutEnable,
                        'opacity-0': dragEventId === event.id
                    })
                }
            >
                <div className="big-calendar-custom-month-event-view-card-header">
                    <div className="pull-left custom_check p-relative" onClick={event.handleSelectForBulkAction}>
                        <input
                            type="checkbox"
                            id={`complete_workout_schedule_${event.id}`}
                            name={`complete_workout_schedule_${event.id}`}
                            checked={event.isSelectedForBulkAction}
                            onChange={() => { }}
                        />
                        <label><h5>{event.title}</h5></label>
                        <a href="javascript:void(0)" data-tip="Cut" className="workout-cut-card-btn" onClick={(e) => { e.stopPropagation(); event.handleCut(event) }}><i className="icon-flip_to_front"></i></a>
                        <div className="calendar-custom-drag-handle" onMouseDown={(e) => this.handleMouseDown(e, event)} onMouseUp={this.handleMouseUp} onClick={(e) => e.stopPropagation()}><i className="icon-open_with"></i></div>
                    </div>
                    <div className={cns("big-calendar-custom-month-event-view-card-body", { "w-c-brb": !showCompleteSwitch })}>
                        {event.description &&
                            <div><p>{event.description}</p></div>
                        }
                        {(event.exerciseType === SCHEDULED_WORKOUT_TYPE_EXERCISE) &&
                            <a href="javascript:void(0)" data-tip="Copy" onClick={event.handleCopy} title=""><FaCopy /></a>
                        }
                        {(event.exerciseType === SCHEDULED_WORKOUT_TYPE_EXERCISE) &&
                            <NavLink to={routeCodes.SAVE_SCHEDULE_WORKOUT.replace(':id', event.id)} data-tip="Details" title=""><FaEye /></NavLink>
                        }
                        {(event.exerciseType === SCHEDULED_WORKOUT_TYPE_EXERCISE) &&
                            <NavLink to={routeCodes.SAVE_SCHEDULE_WORKOUT.replace(':id', event.id)} data-tip="Change" title=""><FaPencil /></NavLink>
                        }
                        <a href="javascript:void(0)" data-tip="Delete" data-for="event-delete-tooltip" onClick={event.handleDelete} title=""><FaTrash /></a>
                    </div>
                </div>
                {event.exerciseType === SCHEDULED_WORKOUT_TYPE_EXERCISE && showCompleteSwitch && typeof event.totalExercises !== 'undefined' && event.totalExercises > 0 &&
                    <div className="big-calendar-custom-month-event-view-card-footer">
                        <div className="switch-wrap">
                            <small>Workout Completed</small>
                            <div className="material-switch" onClick={event.handleCompleteWorkout}>
                                <input
                                    id={`complete_switch_${event.id}`}
                                    name={`complete_switch_${event.id}`}
                                    checked={event.isCompleted}
                                    onChange={() => { }}
                                    type="checkbox"
                                />
                                <label htmlFor={`complete_switch_${event.id}`} className="label-default"></label>
                            </div>
                        </div>
                    </div>
                }

                <ReactTooltip place="top" type="dark" effect="solid" />
                <ReactTooltip id='event-delete-tooltip' place="top" type="error" effect="solid" />
            </div>
        );
    }

    handleMouseDown = (e, event) => {
        const selectedCard = $(`#workout-card-${event.id}`);
        const dragPlaceholder = $('#custom-drag-workout-wrap');
        const offsets = selectedCard.offset();
        const offsetLeft = offsets && offsets.left ? offsets.left : 0;
        const offsetRight = offsets && offsets.top ? offsets.top : 0;
        const eventCardX = (offsetLeft - e.clientX);
        const eventCardY = (offsetRight - e.clientY);
        dragPlaceholder.html(selectedCard.parent().html());
        dragPlaceholder.css({ top: (eventCardY + e.clientY), left: (eventCardX + e.clientX) });
        dragEventActive = true;
        dragEventCardOutside = false;
        dragEventId = event.id;
        dragEventDate = event.start;
        dragEventCardX = eventCardX;
        dragEventCardY = eventCardY;
        $('#cal-panel-wrap').css({ boxShadow: "none" });
        selectedCard.css({ opacity: "0" });
    }

    handleMouseUp = (e) => {
        const selectedCard = $(`#workout-card-${dragEventId}`);
        const dragPlaceholder = $('#custom-drag-workout-wrap');
        dragPlaceholder.html('');
        dragEventActive = false;
        dragEventCardOutside = false;
        dragEventId = null;
        dragEventDate = null;
        dragEventCardX = null;
        dragEventCardY = null;
        $('#cal-panel-wrap').css({ boxShadow: "none" });
        selectedCard.removeClass("opacity-0");
        selectedCard.css({ opacity: "1" });
    }
}

class CustomEventCardView extends Component {
    render() {
        const { event } = this.props;
        let today = moment().utc();
        let yesturday = moment().subtract('1', 'day');
        let eventDate = moment(event.start);
        let cardClassName = '';
        let showCompleteSwitch = false;
        if (today > eventDate) {
            if (event.isCompleted === 1 && event.exerciseType === SCHEDULED_WORKOUT_TYPE_EXERCISE) {
                cardClassName = 'w-c-green';
            } else if (event.isCompleted === 0 && yesturday > eventDate && event.exerciseType === SCHEDULED_WORKOUT_TYPE_EXERCISE) {
                cardClassName = 'w-c-pink';
            }
            showCompleteSwitch = true;
        }
        return (
            <div
                className={
                    cns(`cut-workout-wrap big-calendar-custom-month-event-view-card ${cardClassName}`, {
                        'restday w-c-orange': (event.exerciseType === SCHEDULED_WORKOUT_TYPE_RESTDAY)
                    })
                }
            >
                <div className="big-calendar-custom-month-event-view-card-header">
                    <div className="pull-left custom_check p-relative">
                        <input
                            type="checkbox"
                            id={`cut-complete_workout_schedule_${event.id}`}
                            name={`cut-complete_workout_schedule_${event.id}`}
                            checked={event.isSelectedForBulkAction}
                        />
                        <label><h5>{event.title}</h5></label>
                        <a href="javascript:void(0)" className="workout-cut-card-btn"><i className="icon-flip_to_front"></i></a>
                        <div href="javascript:void(0)" className="calendar-custom-drag-handle"><i className="icon-open_with"></i></div>
                    </div>
                    <div className={cns("big-calendar-custom-month-event-view-card-body", { "w-c-brb": !showCompleteSwitch })}>
                        {event.description &&
                            <div><p>{event.description}</p></div>
                        }
                        {(event.exerciseType === SCHEDULED_WORKOUT_TYPE_EXERCISE) &&
                            <a href="javascript:void(0)" title=""><FaCopy /></a>
                        }
                        {(event.exerciseType === SCHEDULED_WORKOUT_TYPE_EXERCISE) &&
                            <a href="javascript:void(0)" title=""><FaEye /></a>
                        }
                        {(event.exerciseType === SCHEDULED_WORKOUT_TYPE_EXERCISE) &&
                            <a href="javascript:void(0)" title=""><FaPencil /></a>
                        }
                        <a href="javascript:void(0)" title=""><FaTrash /></a>
                    </div>
                </div>
                {event.exerciseType === SCHEDULED_WORKOUT_TYPE_EXERCISE && showCompleteSwitch && typeof event.totalExercises !== 'undefined' && event.totalExercises > 0 &&
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
                                <label htmlFor={`cut-complete_switch_${event.id}`} className="label-default"></label>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}