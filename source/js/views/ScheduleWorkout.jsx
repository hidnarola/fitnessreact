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
} from '../actions/userScheduleWorkouts';
import { NavLink } from "react-router-dom";
import { routeCodes } from '../constants/routes';
import _ from "lodash";
import ReactHtmlParser from "react-html-parser";
import { SCHEDULED_WORKOUT_TYPE_RESTDAY, SCHEDULED_WORKOUT_TYPE_EXERCISE, MEASUREMENT_UNIT_KILOGRAM, MEASUREMENT_UNIT_KILOMETER } from '../constants/consts';
import { ts, te } from '../helpers/funs';
import { FaCopy, FaTrash } from 'react-icons/lib/fa'
import ScheduleWorkoutDetailsModal from '../components/ScheduleWorkout/ScheduleWorkoutDetailsModal';

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
        }
    }

    componentWillMount() {
        const { dispatch } = this.props;
        var today = moment().startOf('day').utc();
        this.getWorkoutSchedulesByMonth(today);
        dispatch(getExercisesNameRequest());
    }

    render() {
        const {
            showSelectEventAlert,
            workoutEvents,
            deleteWorkoutAlert,
            showWorkoutScheduleDetailsModal,
            selectedWorkoutForView,
        } = this.state;
        const {
            selectedSlot,
        } = this.props;
        var selectedSlotStateDate = null;
        if (selectedSlot) {
            selectedSlotStateDate = selectedSlot.start;
        }
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
                        handleNewRestDay={this.handleNewRestDay}
                        handlePaste={this.handlePaste}
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
        } = this.props;
        const {
            workoutPasteAction,
            deleteWorkoutActionInit,
            selectedWorkoutDate,
            selectedWorkoutId,
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
                    handleCopy: () => this.handleCopy(workout._id),
                    handleDelete: () => this.showDeleteConfirmation(workout._id, workout.date),
                    handleViewWorkout: () => this.handleViewWorkout(workout._id),
                    handleCompleteWorkout: () => this.handleCompleteWorkout(workout._id),
                    handleSelectWorkoutForEdit: () => this.handleSelectWorkoutForEdit(workout._id),
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
            description: '',
            type: SCHEDULED_WORKOUT_TYPE_RESTDAY,
            date: date,
            exercises: [],
        };
        dispatch(addUsersWorkoutScheduleRequest(requestData));
    }

    handleCopy = (_id) => {
        const { dispatch } = this.props;
        const { workoutEvents } = this.state;
        var workout = _.find(workoutEvents, ['id', _id]);
        if (workout) {
            dispatch(copyUserWorkoutSchedule(workout.meta));
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
            var exercises = [];
            var copiedExercises = copiedWorkout.exercises;
            _.forEach(copiedExercises, (exercise, index) => {
                var exerciseObj = {
                    exerciseId: exercise.exercise._id,
                    type: exercise.type,
                    reps: (exercise.reps) ? exercise.reps : null,
                    sets: (exercise.sets) ? exercise.sets : null,
                    weight: (exercise.weight) ? exercise.weight : null,
                    weightUnits: (exercise.weightUnits) ? exercise.weightUnits : MEASUREMENT_UNIT_KILOGRAM,
                    distance: (exercise.distance) ? exercise.distance : null,
                    distanceUnits: (exercise.distanceUnits) ? exercise.distanceUnits : MEASUREMENT_UNIT_KILOMETER,
                    restTime: (exercise.restTime) ? exercise.restTime : null,
                    oneSetTimer: (exercise.oneSetTimer) ? exercise.oneSetTimer : null,
                    sequence: (exercise.sequence) ? exercise.sequence : null,
                };
                exercises.push(exerciseObj);
            });
            var startDay = moment(selectedSlot.start).startOf('day');
            var date = moment.utc(startDay);
            var requestData = {
                title: copiedWorkout.title,
                description: copiedWorkout.description,
                type: SCHEDULED_WORKOUT_TYPE_EXERCISE,
                date: date,
                exercises: exercises,
            };
            dispatch(addUsersWorkoutScheduleRequest(requestData));
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

    handleSelectWorkoutForEdit = (_id) => {
        const { workoutEvents } = this.state;
        const { dispatch, history } = this.props;
        var workout = _.find(workoutEvents, ['id', _id]);
        if (workout) {
            dispatch(selectUsersWorkoutScheduleForEdit(workout.meta));
            history.push(routeCodes.CHANGE_SCHEDULE_WORKOUT);
        }
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
    };
}

export default connect(
    mapStateToProps,
)(ScheduleWorkout);

class SelectEventView extends Component {
    render() {
        const { handleNewRestDay, handlePaste } = this.props;
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="col-md-6 pull-left">
                        <NavLink
                            to={routeCodes.ADD_SCHEDULE_WORKOUT}
                            className="btn btn-primary"
                        >
                            Add Workout
                        </NavLink>
                    </div>
                    <div className="col-md-6 pull-left">
                        <button type="button" onClick={handleNewRestDay} className="btn btn-primary">Make Rest Day</button>
                    </div>
                    <div className="col-md-6 pull-left">
                        <button type="button" className="btn btn-primary">Assign Program</button>
                    </div>
                    <div className="col-md-6 pull-left">
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
        return (
            <div className="big-calendar-custom-month-event-view-card">
                <div className="pull-left custom_check" onClick={event.handleCompleteWorkout}>
                    <input
                        type="checkbox"
                        id={`complete_workout_schedule_${event.id}`}
                        name={`complete_workout_schedule_${event.id}`}
                        checked={event.isCompleted}
                        onChange={() => { }}
                    />
                    <label><h5>{event.title}</h5></label>
                </div>
                {/* <h5>{event.title}</h5> */}
                {event.description && ReactHtmlParser(event.description)}
                <a href="javascript:void(0)" onClick={event.handleCopy}><FaCopy /></a>
                <a href="javascript:void(0)" onClick={event.handleDelete}><FaTrash /></a>
                <a href="javascript:void(0)" onClick={event.handleViewWorkout}>View</a>
                <a href="javascript:void(0)" onClick={event.handleSelectWorkoutForEdit}>Edit</a>
            </div>
        );
    }
}