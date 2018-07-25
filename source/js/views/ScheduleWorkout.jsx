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
    getExercisesNameRequest,
    addUsersWorkoutScheduleRequest,
    copyUserWorkoutSchedule,
    deleteUsersWorkoutScheduleRequest,
    changeUsersWorkoutScheduleCompleteRequest,
    selectUsersWorkoutScheduleForEdit,
    getProgramsNameRequest,
    userAssignProgramRequest,
    deleteUsersBulkWorkoutScheduleRequest,
    completeUsersBulkWorkoutScheduleRequest,
    pasteUsersWorkoutScheduleRequest,
} from '../actions/userScheduleWorkouts';
import { NavLink } from "react-router-dom";
import { routeCodes } from '../constants/routes';
import _ from "lodash";
import { SCHEDULED_WORKOUT_TYPE_RESTDAY, SCHEDULED_WORKOUT_TYPE_EXERCISE, MEASUREMENT_UNIT_KILOGRAM, MEASUREMENT_UNIT_KILOMETER } from '../constants/consts';
import { ts, te, prepareDropdownOptionsData } from '../helpers/funs';
import { FaCopy, FaTrash, FaPencil, FaEye } from 'react-icons/lib/fa'
import ScheduleWorkoutDetailsModal from '../components/ScheduleWorkout/ScheduleWorkoutDetailsModal';
import cns from "classnames";
import Select from 'react-select';
import AddWorkoutTitleForm from '../components/ScheduleWorkout/AddWorkoutTitleForm';
import { submit } from "redux-form";

BigCalendar.momentLocalizer(moment);

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
            selectedWorkoutForView: null,
            showWorkoutScheduleDetailsModal: false,
            showProgramAssignAlert: false,
            selectedProgramIdToAssign: null,
            deleteBulkActionAlert: false,
            deleteBulkActionInit: false,
            completeBulkActionAlert: false,
            completeBulkActionInit: false,
            incompleteBulkActionAlert: false,
            incompleteBulkActionInit: false,
            showAddWorkoutTitleAlert: false,
        }
    }

    componentWillMount() {
        const { dispatch } = this.props;
        var today = moment().startOf('day').utc();
        this.getWorkoutSchedulesByMonth(today);
        // dispatch(getExercisesNameRequest());
        dispatch(getProgramsNameRequest());
    }

    render() {
        const {
            showSelectEventAlert,
            workoutEvents,
            deleteWorkoutAlert,
            showWorkoutScheduleDetailsModal,
            selectedWorkoutForView,
            showProgramAssignAlert,
            selectedProgramIdToAssign,
            deleteBulkActionAlert,
            completeBulkActionAlert,
            incompleteBulkActionAlert,
            showAddWorkoutTitleAlert,
        } = this.state;
        const {
            selectedSlot,
            programs,
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
                    <div className="body-head d-flex justify-content-start">
                        <div className="body-head-l">
                            <h2>Workouts</h2>
                            <p>Your goal choice shapes how your fitness assistant will ceate your meal and exercise plans, it’s important that you set goals which are achieveable. Keep updating your profile and your fitness assistant will keep you on track and meeting the goals you’ve set out for yourself.</p>
                        </div>
                    </div>
                    <div className="body-content d-flex row justify-content-start profilephoto-content">
                        <div className="col-md-12">
                            <div className="white-box space-btm-20">
                                <div className="whitebox-body profile-body">
                                    {selectedEvents && selectedEvents.length > 0 &&
                                        <div className="fixed-btm-bar d-flex">
                                            <div className="fixed-btm-bar-l d-flex">
                                                <div className="custom_check">
                                                    <input
                                                        type="checkbox"
                                                        id={'select_all_workouts'}
                                                        name={'select_all_workouts'}
                                                    />
                                                    <label htmlFor="select_all_workouts">Select All</label>
                                                </div>
                                                <div className="count-leadeboard bg-pink">{selectedEvents.length}</div>
                                            </div>
                                            <div className="fixed-btm-bar-c">
                                                <a href="javascript:void(0)" onClick={() => this.setState({ deleteBulkActionAlert: true })}><i className="icon-delete_forever"></i> </a>
                                                <a href="javascript:void(0)" onClick={() => this.setState({ completeBulkActionAlert: true })}><i className="icon-check_circle"></i></a>
                                                <a href="javascript:void(0)" onClick={() => this.setState({ incompleteBulkActionAlert: true })}><i className="icon-cancel"></i></a>
                                            </div>
                                        </div>
                                    }
                                    <BigCalendar
                                        selectable={true}
                                        defaultView={BigCalendar.Views.MONTH}
                                        className="workout-calender"
                                        events={workoutEvents}
                                        onView={() => console.log('on View')}
                                        views={[BigCalendar.Views.MONTH]}
                                        onNavigate={this.handleNavigation}
                                        onSelectEvent={(event) => {
                                            console.log('event => ', event);
                                        }}
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
                </section>
                <SweetAlert
                    type="default"
                    title={`Select event for - ${(selectedSlotStateDate) ? moment(selectedSlotStateDate).format('MM/DD/YYYY') : ''}`}
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
                    warning
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
                    show={deleteBulkActionAlert}
                    warning
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
                    danger
                    showCancel
                    confirmBtnText="Yes, incomplete them!"
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title="Are you sure?"
                    onConfirm={() => this.handleCompleteBulkWorkoutSchedule(0)}
                    onCancel={() => this.setState({ incompleteBulkActionAlert: false })}
                >
                    This will mark all workouts as incompleted
                </SweetAlert>

                <SweetAlert
                    type="default"
                    title={`Select program start from - ${(selectedSlotStateDate) ? moment(selectedSlotStateDate).format('MM/DD/YYYY') : ''}`}
                    onCancel={this.handleCancelProgramAssignAlert}
                    onConfirm={this.handleAssignProgram}
                    btnSize="sm"
                    cancelBtnBsStyle="danger"
                    confirmBtnBsStyle="success"
                    show={showProgramAssignAlert}
                    showConfirm={true}
                    showCancel={true}
                    closeOnClickOutside={false}
                >
                    <Select
                        id="program_id"
                        name="program_id"
                        value={selectedProgramIdToAssign}
                        options={programOptions}
                        placeholder="Select Program"
                        onChange={this.handleProgramAssignChange}
                        multi={false}
                        clearable={true}
                    />
                </SweetAlert>

                <SweetAlert
                    type="default"
                    title={`Add workout for - ${(selectedSlotStateDate) ? moment(selectedSlotStateDate).format('MM/DD/YYYY') : ''}`}
                    onCancel={this.handleAddWorkoutTitleCancel}
                    onConfirm={this.handleAddWorkoutTitleSubmit}
                    btnSize="sm"
                    cancelBtnBsStyle="danger"
                    confirmBtnBsStyle="success"
                    show={showAddWorkoutTitleAlert}
                    showConfirm={true}
                    showCancel={true}
                    closeOnClickOutside={false}
                >
                    <AddWorkoutTitleForm />
                </SweetAlert>

                <ScheduleWorkoutDetailsModal
                    show={showWorkoutScheduleDetailsModal}
                    handleClose={this.handleCloseWorkoutScheduleDetailsModal}
                    workout={selectedWorkoutForView}
                />

            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            workouts,
            workout,
            loading,
            selectedSlot,
            error,
            assignProgramLoading,
            assignProgram,
            assignProgramError,
        } = this.props;
        const {
            workoutPasteAction,
            deleteWorkoutActionInit,
            selectedWorkoutDate,
            selectedWorkoutId,
            deleteBulkActionInit,
            completeBulkActionInit,
            incompleteBulkActionInit,
        } = this.state;
        if (!loading && prevProps.workouts !== workouts) {
            var newWorkouts = [];
            _.forEach(workouts, (workout, index) => {
                var newWorkout = {
                    id: workout._id,
                    title: (workout.title) ? workout.title : `Workout on ${(workout.date) ? moment(workout.date).format('MM/DD/YYYY') : ''}`,
                    start: workout.date,
                    end: workout.date,
                    allDay: true,
                    isCompleted: (workout.isCompleted) ? workout.isCompleted : 0,
                    exercises: (workout.exercises && workout.exercises.length > 0) ? workout.exercises : [],
                    exerciseType: (workout.type) ? workout.type : null,
                    meta: workout,
                    description: (workout.description) ? workout.description : '',
                    isSelectedForBulkAction: false,
                    handleCopy: () => this.handleCopy(workout._id),
                    handleDelete: () => this.showDeleteConfirmation(workout._id, workout.date),
                    handleViewWorkout: () => this.handleViewWorkout(workout._id),
                    handleCompleteWorkout: () => this.handleCompleteWorkout(workout._id),
                    handleSelectForBulkAction: () => this.handleSelectForBulkAction(workout._id),
                }
                newWorkouts.push(newWorkout);
            });
            this.setState({ workoutEvents: newWorkouts });
        }
        if (!loading && workout && prevProps.workout !== workout) {
            var startDay = moment(selectedSlot.start).startOf('day');
            var date = moment.utc(startDay);
            this.getWorkoutSchedulesByMonth(date);
            this.cancelSelectedSlotAction();
            if (workoutPasteAction) {
                ts('Workout pasted!');
                this.setState({ workoutPasteAction: false });
            }
        }
        if (deleteWorkoutActionInit && selectedWorkoutId && !loading) {
            this.setState({ deleteWorkoutActionInit: false, selectedWorkoutId: null, selectedWorkoutDate: null });
            var startDay = moment(selectedWorkoutDate).startOf('day');
            this.getWorkoutSchedulesByMonth(startDay);
            if (error.length <= 0) {
                ts('Workout deleted successfully!');
            } else {
                te('Cannot delete workout. Please try again later!');
            }
        }
        if (deleteBulkActionInit && !loading) {
            this.setState({ deleteBulkActionInit: false });
            var today = moment().startOf('day').utc();
            this.getWorkoutSchedulesByMonth(today);
            if (error.length <= 0) {
                ts('Workouts deleted successfully!');
            } else {
                te('Cannot delete workouts. Please try again later!');
            }
        }
        if (completeBulkActionInit && !loading) {
            this.setState({ completeBulkActionInit: false });
            var today = moment().startOf('day').utc();
            this.getWorkoutSchedulesByMonth(today);
            if (error.length <= 0) {
                ts('Workouts completed successfully!');
            } else {
                te('Cannot complete workouts. Please try again later!');
            }
        }

        if (incompleteBulkActionInit && !loading) {
            this.setState({ incompleteBulkActionInit: false });
            var today = moment().startOf('day').utc();
            this.getWorkoutSchedulesByMonth(today);
            if (error.length <= 0) {
                ts('Workouts incompleted successfully!');
            } else {
                te('Cannot incomplete workouts. Please try again later!');
            }
        }

        if (!assignProgramLoading && prevProps.assignProgram !== assignProgram) {
            var startDay = moment(selectedSlot.start).startOf('day');
            this.getWorkoutSchedulesByMonth(startDay);
            this.handleCancelProgramAssignAlert();
            if (assignProgramError && assignProgramError.length <= 0) {
                ts('Program assigned successfully!');
            } else {
                te(assignProgramError[0]);
            }
        }
    }

    onSelectSlot = (slotInfo) => {
        const { dispatch } = this.props;
        this.setState({
            showSelectEventAlert: true,
        });
        dispatch(setSelectedSlotFromCalendar(slotInfo));
    }

    cancelSelectedSlotAction = () => {
        const { dispatch } = this.props;
        this.setState({
            showSelectEventAlert: false,
        });
        dispatch(setSelectedSlotFromCalendar(null));
    }

    getWorkoutSchedulesByMonth = (date) => {
        this.setState({ workoutEvents: [] });
        const {
            dispatch
        } = this.props;
        var requestObj = { date }
        dispatch(getUsersWorkoutSchedulesRequest(requestObj));
    }

    handleNavigation = (date) => {
        var momentDate = moment(date).startOf('day');
        var day = moment.utc(momentDate);
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
            exercises: [],
        };
        dispatch(addUsersWorkoutScheduleRequest(requestData));
    }

    handleCopy = (_id) => {
        const { dispatch } = this.props;
        if (_id) {
            dispatch(copyUserWorkoutSchedule(_id));
            ts('Workout copied!');
        }
    }

    handleViewWorkout = (_id) => {
        const { workoutEvents } = this.state;
        var workout = _.find(workoutEvents, ['id', _id]);
        if (workout) {
            this.setState({
                selectedWorkoutForView: workout.meta,
                showWorkoutScheduleDetailsModal: true,
            });
        }
    }

    handleCloseWorkoutScheduleDetailsModal = () => {
        this.setState({
            showWorkoutScheduleDetailsModal: false,
            selectedWorkoutForView: null,
        });
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
            dispatch(deleteUsersWorkoutScheduleRequest(selectedWorkoutId));
            this.setState({ deleteWorkoutAlert: false, deleteWorkoutActionInit: true });
        }
    }

    handleCompleteWorkout = (_id) => {
        const { dispatch } = this.props;
        const { workoutEvents } = this.state;
        var workouts = Object.assign([], workoutEvents);
        var selectedWorkout = _.find(workouts, ['id', _id]);
        if (selectedWorkout) {
            var isCompleted = (typeof selectedWorkout.isCompleted !== 'undefined') ? (selectedWorkout.isCompleted === 0) ? 1 : 0 : 1;
            var workout = Object.assign({}, selectedWorkout);
            workout.isCompleted = isCompleted;
            var index = _.findIndex(workouts, ['id', _id]);
            workouts[index] = workout;
            this.setState({
                workoutEvents: workouts,
            });
            dispatch(changeUsersWorkoutScheduleCompleteRequest(_id, isCompleted));
        }
    }

    handleSelectProgramToAssign = () => {
        this.setState({
            showProgramAssignAlert: true,
            showSelectEventAlert: false,
        });
    }

    handleCancelProgramAssignAlert = () => {
        const { dispatch } = this.props;
        this.setState({
            showProgramAssignAlert: false,
            selectedProgramIdToAssign: null,
        });
        dispatch(setSelectedSlotFromCalendar(null));
    }

    handleProgramAssignChange = (value) => {
        this.setState({
            selectedProgramIdToAssign: value,
        });
    }

    handleAssignProgram = () => {
        const { selectedProgramIdToAssign } = this.state;
        const {
            selectedSlot,
            dispatch,
        } = this.props;
        var date = (selectedSlot) ? selectedSlot.start : null;
        var programId = (selectedProgramIdToAssign) ? selectedProgramIdToAssign.value : null;
        if (date && programId) {
            var requestData = {
                programId,
                date,
            }
            dispatch(userAssignProgramRequest(requestData));
        }

    }

    handleSelectForBulkAction = (_id) => {
        const { workoutEvents } = this.state;
        var workouts = Object.assign([], workoutEvents);
        var selectedWorkout = _.find(workouts, ['id', _id]);
        if (selectedWorkout) {
            var isSelectedForBulkAction = (typeof selectedWorkout.isSelectedForBulkAction !== 'undefined') ? (selectedWorkout.isSelectedForBulkAction === false) ? true : false : true;
            var workout = Object.assign({}, selectedWorkout);
            workout.isSelectedForBulkAction = isSelectedForBulkAction;
            var index = _.findIndex(workouts, ['id', _id]);
            workouts[index] = workout;
            this.setState({
                workoutEvents: workouts,
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
        dispatch(deleteUsersBulkWorkoutScheduleRequest(requestData));
        this.setState({ deleteBulkActionInit: true, deleteBulkActionAlert: false });
    }

    handleCompleteBulkWorkoutSchedule = (isCompleted) => {
        const { dispatch } = this.props;
        const { workoutEvents } = this.state;
        var selectedEvents = _.filter(workoutEvents, ['isSelectedForBulkAction', true]);
        let today = moment().utc();
        var selectedIds = [];
        _.forEach(selectedEvents, (obj) => {
            let eventDate = moment(obj.start);
            if (eventDate <= today) {
                selectedIds.push(obj.id);
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
        this.setState({
            showSelectEventAlert: false,
            showAddWorkoutTitleAlert: true,
        });
    }

    handleAddWorkoutTitleCancel = () => {
        const { dispatch } = this.props;
        this.setState({
            showSelectEventAlert: false,
            showAddWorkoutTitleAlert: false,
        });
        dispatch(setSelectedSlotFromCalendar(null));
    }

    handleAddWorkoutTitleSubmit = () => {
        const { dispatch } = this.props;
        dispatch(submit('add_workout_title_form'));
    }
}

const mapStateToProps = (state) => {
    const { userScheduleWorkouts } = state;
    return {
        selectedSlot: userScheduleWorkouts.get('slotInfo'),
        workouts: userScheduleWorkouts.get('workouts'),
        workout: userScheduleWorkouts.get('workout'),
        loading: userScheduleWorkouts.get('loading'),
        error: userScheduleWorkouts.get('error'),
        copiedWorkout: userScheduleWorkouts.get('copiedWorkout'),
        programs: userScheduleWorkouts.get('programs'),
        assignProgramLoading: userScheduleWorkouts.get('assignProgramLoading'),
        assignProgram: userScheduleWorkouts.get('assignProgram'),
        assignProgramError: userScheduleWorkouts.get('assignProgramError'),
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
        let titleClassName = '';
        let showCompleteSwitch = false;
        if (today > eventDate) {
            if (event.isCompleted === 1) {
                titleClassName = 'color-completed';
            } else if (event.isCompleted === 0 && yesturday > eventDate && event.exerciseType === SCHEDULED_WORKOUT_TYPE_EXERCISE) {
                titleClassName = 'color-in-completed';
            }
            showCompleteSwitch = true;
        }
        return (
            <div className={cns('big-calendar-custom-month-event-view-card', { 'restday': (event.exerciseType === SCHEDULED_WORKOUT_TYPE_RESTDAY) })}>
                <div className="big-calendar-custom-month-event-view-card-header">
                    <div className="pull-left custom_check" onClick={event.handleSelectForBulkAction}>
                        <input
                            type="checkbox"
                            id={`complete_workout_schedule_${event.id}`}
                            name={`complete_workout_schedule_${event.id}`}
                            checked={event.isSelectedForBulkAction}
                            onChange={() => { }}
                        />
                        <label><h5 className={titleClassName}>{event.title}</h5></label>
                    </div>
                    <div className="big-calendar-custom-month-event-view-card-body">
                        {event.description &&
                            <div className={titleClassName}><p>{event.description}</p></div>
                        }
                        {(event.exerciseType === SCHEDULED_WORKOUT_TYPE_EXERCISE) &&
                            <a href="javascript:void(0)" onClick={event.handleCopy}><FaCopy /></a>
                        }
                        {(event.exerciseType === SCHEDULED_WORKOUT_TYPE_EXERCISE) &&
                            <a href="javascript:void(0)" onClick={event.handleViewWorkout}><FaEye /></a>
                        }
                        {(event.exerciseType === SCHEDULED_WORKOUT_TYPE_EXERCISE) &&
                            <NavLink to={routeCodes.SAVE_SCHEDULE_WORKOUT.replace(':id', event.id)}><FaPencil /></NavLink>
                        }
                        <a href="javascript:void(0)" onClick={event.handleDelete}><FaTrash /></a>
                    </div>
                </div>
                {event.exerciseType === SCHEDULED_WORKOUT_TYPE_EXERCISE && showCompleteSwitch &&
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
            </div>
        );
    }
}