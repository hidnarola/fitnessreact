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
    getExercisesNameRequest
} from '../actions/userScheduleWorkouts';
import { NavLink } from "react-router-dom";
import { routeCodes } from '../constants/routes';
import _ from "lodash";

BigCalendar.momentLocalizer(moment);

class ScheduleWorkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSelectEventAlert: false,
            workoutEvents: [],
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
                    <SelectEventView />
                </SweetAlert>

            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            workouts,
            loading,
        } = this.props;
        if (!loading && prevProps.workouts !== workouts) {
            var newWorkouts = [];
            _.forEach(workouts, (workout, index) => {
                if (workout._id && workout.exercises && workout.exercises.length > 0) {
                    var newWorkout = {
                        id: workout._id,
                        title: (workout.title) ? workout.title : `Workout on ${workout.date}`,
                        start: workout.date,
                        end: workout.date,
                        allDay: true,
                        exercises: (workout.exercises && workout.exercises.length > 0) ? workout.exercises : [],
                        meta: workout,
                        description: (workout.description) ? workout.description : '',
                    }
                    newWorkouts.push(newWorkout);
                }
            });
            this.setState({ workoutEvents: newWorkouts });
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
}

const mapStateToProps = (state) => {
    const { userScheduleWorkouts } = state;
    return {
        selectedSlot: userScheduleWorkouts.get('slotInfo'),
        workouts: userScheduleWorkouts.get('workouts'),
        loading: userScheduleWorkouts.get('loading'),
    };
}

export default connect(
    mapStateToProps,
)(ScheduleWorkout);

class SelectEventView extends Component {
    render() {
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
                        <button type="button" className="btn btn-primary">Make Rest Day</button>
                    </div>
                    <div className="col-md-6 pull-left">
                        <button type="button" className="btn btn-primary">Assign Program</button>
                    </div>
                    <div className="col-md-6 pull-left">
                        <button type="button" className="btn btn-primary">Paste Workout</button>
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
                <h5>{event.title}</h5>
                {event.description &&
                    <p>{event.description}</p>
                }
            </div>
        );
    }
}