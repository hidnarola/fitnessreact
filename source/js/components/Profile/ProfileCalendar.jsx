import React, { Component } from 'react';
import { connect } from 'react-redux';
import BigCalendar from 'react-big-calendar';
import moment from "moment";
import { getUsersWorkoutSchedulesRequest } from '../../actions/userScheduleWorkouts';
import { NavLink } from "react-router-dom";
import { routeCodes } from '../../constants/routes';
import _ from "lodash";
import { SCHEDULED_WORKOUT_TYPE_RESTDAY, SCHEDULED_WORKOUT_TYPE_EXERCISE } from '../../constants/consts';
import { FaEye } from 'react-icons/lib/fa'
import cns from "classnames";
import ReactTooltip from "react-tooltip";

BigCalendar.momentLocalizer(moment);

class ProfileCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSelectEventAlert: false,
            workoutEvents: [],
            calendarViewDate: null
        }
    }

    componentWillMount() {
        var today = moment().startOf('day').utc();
        this.setState({ calendarViewDate: today.local() });
        this.getWorkoutSchedulesByMonth(today);
    }

    render() {
        const { workoutEvents } = this.state;
        return (
            <div className="white-box space-btm-20">
                <div className="whitebox-body profile-body">
                    <BigCalendar
                        selectable={true}
                        defaultView={BigCalendar.Views.MONTH}
                        className="workout-calender"
                        events={workoutEvents}
                        onView={() => { }}
                        views={[BigCalendar.Views.MONTH]}
                        onNavigate={this.handleNavigation}
                        onSelectEvent={(event) => { }}
                        popup={true}
                        popupOffset={50}
                        components={{
                            event: CustomEventCard,
                        }}
                    />
                </div>
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const { workouts, loading } = this.props;
        if (!loading && prevProps.workouts !== workouts) {
            var newWorkouts = [];
            _.forEach(workouts, (workout) => {
                var newWorkout = {
                    id: workout._id,
                    title: (workout.title) ? workout.title : `Workout on ${(workout.date) ? moment(workout.date).format('DD/MM/YYYY') : ''}`,
                    start: workout.date,
                    end: workout.date,
                    isCompleted: (workout.isCompleted) ? workout.isCompleted : 0,
                    exercises: (workout.exercises && workout.exercises.length > 0) ? workout.exercises : [],
                    exerciseType: (workout.type) ? workout.type : null,
                    totalExercises: (workout.totalExercises) ? workout.totalExercises : 0,
                    meta: workout,
                    description: (workout.description) ? workout.description : '',
                }
                newWorkouts.push(newWorkout);
            });
            this.setState({ workoutEvents: newWorkouts });
        }
    }

    getWorkoutSchedulesByMonth = (date = null) => {
        const { calendarViewDate } = this.state;
        const { dispatch, profile } = this.props;
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
        var requestObj = { date: _date }
        dispatch(getUsersWorkoutSchedulesRequest(requestObj, profile.username));
    }

    handleNavigation = (date) => {
        var momentDate = moment(date).startOf('day');
        var day = moment.utc(momentDate);
        this.setState({ calendarViewDate: day.local() });
        this.getWorkoutSchedulesByMonth(day);
    }
}

const mapStateToProps = (state) => {
    const { userScheduleWorkouts } = state;
    return {
        workouts: userScheduleWorkouts.get('workouts'),
        loading: userScheduleWorkouts.get('loading')
    };
}

export default connect(
    mapStateToProps,
)(ProfileCalendar);

class CustomEventCard extends Component {
    render() {
        const { event } = this.props;
        let today = moment().utc();
        let yesturday = moment().subtract('1', 'day');
        let eventDate = moment(event.start);
        let titleClassName = '';
        if (today > eventDate) {
            if (event.isCompleted === 1 && event.exerciseType === SCHEDULED_WORKOUT_TYPE_EXERCISE) {
                titleClassName = 'color-completed';
            } else if (event.isCompleted === 0 && yesturday > eventDate && event.exerciseType === SCHEDULED_WORKOUT_TYPE_EXERCISE) {
                titleClassName = 'color-in-completed';
            }
        }
        return (
            <div className={cns('big-calendar-custom-month-event-view-card', { 'restday': (event.exerciseType === SCHEDULED_WORKOUT_TYPE_RESTDAY) })} title="">
                <div className="big-calendar-custom-month-event-view-card-header">
                    <div className="pull-left custom_check">
                        <label><h5 className={titleClassName}>{event.title}</h5></label>
                    </div>
                    <div className="big-calendar-custom-month-event-view-card-body">
                        {event.description &&
                            <div className={titleClassName}><p>{event.description}</p></div>
                        }
                        {(event.exerciseType === SCHEDULED_WORKOUT_TYPE_EXERCISE) &&
                            <NavLink to={routeCodes.SAVE_SCHEDULE_WORKOUT.replace(':id', event.id)} data-tip="Details" title=""><FaEye /></NavLink>
                        }
                    </div>
                </div>
                <ReactTooltip place="top" type="dark" effect="solid" />
            </div>
        );
    }
}