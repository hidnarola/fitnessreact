import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    getUsersWorkoutScheduleRequest,
    changeWorkoutMainType,
    getUserFirstWorkoutByDateRequest,
    getUserWorkoutCalendarListRequest,
    setTodaysWorkoutDate
} from '../../actions/userScheduleWorkouts';
import { routeCodes } from '../../constants/routes';
import { te, convertUnits } from '../../helpers/funs';
import FitnessHeader from '../global/FitnessHeader';
import FitnessNav from '../global/FitnessNav';
import moment from "moment";
import {
    SCHEDULED_WORKOUT_TYPE_WARMUP,
    SCHEDULED_WORKOUT_TYPE_EXERCISE,
    SCHEDULED_WORKOUT_TYPE_COOLDOWN,
    SCHEDULED_WORKOUT_TYPE_RESTDAY,
    MEASUREMENT_UNIT_GRAM,
    MEASUREMENT_UNIT_KILOGRAM
} from '../../constants/consts';
import cns from "classnames";
import ReactCalender from 'react-calendar/dist/entry.nostyle';
import { showPageLoader, hidePageLoader } from '../../actions/pageLoader';
import WorkoutExercisesViewReadonly from './WorkoutExercisesViewReadonly';

class ViewScheduleWorkout extends Component {
    constructor(props) {
        super(props);
        var logDate = new Date();
        logDate.setHours(0, 0, 0, 0);
        this.state = {
            loadWorkoutInit: false,
            logDate: logDate,
            firstWorkoutIdInit: false,
            forceGetUsersWorkoutScheduleRequest: false
        }
    }

    componentWillMount() {
        const { match, dispatch } = this.props;
        if (match && match.params && match.params.id) {
            let _id = match.params.id;
            let username = match.params.username ? match.params.username : null;
            dispatch(showPageLoader());
            dispatch(getUsersWorkoutScheduleRequest(_id, username));
            this.setState({ loadWorkoutInit: true });
        }
    }

    render() {
        const { workout, selectedWorkoutMainType, workoutsList, calendarList, workoutStat, match } = this.props;
        const { logDate } = this.state;
        return (
            <div className="fitness-body">
                <FitnessHeader />
                <FitnessNav />
                <section className="body-wrap workout-schedule-save">
                    <div className="body-head d-flex justify-content-start front-white-header">
                        <div className="body-head-l">
                            {(workout && workout.date && workout.type && workout.type === SCHEDULED_WORKOUT_TYPE_EXERCISE) &&
                                <h2>{`Workout - ${(workout && workout.date) ? moment(workout.date).format('DD/MM/YYYY') : 'DD/MM/YYYY'}`}</h2>
                            }
                            {(workout && workout.date && workout.type && workout.type === SCHEDULED_WORKOUT_TYPE_RESTDAY) &&
                                <h2>{`${(workout.title) ? workout.title : 'Rest Day'}`}</h2>
                            }
                            {(workout && workout.date && workout.type && workout.type === SCHEDULED_WORKOUT_TYPE_RESTDAY) &&
                                <p>{`${(workout.description) ? workout.description : 'Hey its rest day! Take total rest.'}`}</p>
                            }
                            {(!workout || !workout.date) &&
                                <h2>{`Workout - DD/MM/YYYY`}</h2>
                            }
                            {workout && Object.keys(workout).length > 0 && workout.type && workout.type === SCHEDULED_WORKOUT_TYPE_EXERCISE &&
                                <div className="body-head-l-btm">
                                    <a href="javascript:void(0)" className={cns('white-btn p-relative', { 'active': (selectedWorkoutMainType === SCHEDULED_WORKOUT_TYPE_WARMUP) })} onClick={() => this.handleWorkoutMainTypeChange(SCHEDULED_WORKOUT_TYPE_WARMUP)}>Warmup <span className="workout-types-count-badge">{workout && workout.warmup && workout.warmup.length}</span></a>
                                    <a href="javascript:void(0)" className={cns('white-btn p-relative', { 'active': (selectedWorkoutMainType === SCHEDULED_WORKOUT_TYPE_EXERCISE) })} onClick={() => this.handleWorkoutMainTypeChange(SCHEDULED_WORKOUT_TYPE_EXERCISE)}>Workout <span className="workout-types-count-badge">{workout && workout.exercise && workout.exercise.length}</span></a>
                                    <a href="javascript:void(0)" className={cns('white-btn p-relative', { 'active': (selectedWorkoutMainType === SCHEDULED_WORKOUT_TYPE_COOLDOWN) })} onClick={() => this.handleWorkoutMainTypeChange(SCHEDULED_WORKOUT_TYPE_COOLDOWN)}>Cooldown <span className="workout-types-count-badge">{workout && workout.cooldown && workout.cooldown.length}</span></a>
                                </div>
                            }
                        </div>
                        <div className="body-head-r">
                            <NavLink className="white-btn" to={routeCodes.PROFILECALENDAR.replace('{username}', match.params.username)}>
                                <span>Back</span>
                            </NavLink>
                        </div>
                    </div>
                    <div className="body-content d-flex row justify-content-start profilephoto-content">
                        <div className="col-md-9">
                            {workout && Object.keys(workout).length > 0 && workout.type && workout.type === SCHEDULED_WORKOUT_TYPE_EXERCISE &&
                                <div className="">
                                    <div className="whitebox-body profile-body">
                                        {selectedWorkoutMainType &&
                                            <div className="workout-main-types-view-wrapper">
                                                {selectedWorkoutMainType === SCHEDULED_WORKOUT_TYPE_WARMUP &&
                                                    <WorkoutExercisesViewReadonly exercises={workout.warmup} />
                                                }
                                                {selectedWorkoutMainType === SCHEDULED_WORKOUT_TYPE_EXERCISE &&
                                                    <WorkoutExercisesViewReadonly exercises={workout.exercise} />
                                                }
                                                {selectedWorkoutMainType === SCHEDULED_WORKOUT_TYPE_COOLDOWN &&
                                                    <WorkoutExercisesViewReadonly exercises={workout.cooldown} />
                                                }
                                            </div>
                                        }
                                    </div>
                                </div>
                            }
                        </div>

                        <div className="col-md-3">
                            {typeof workoutsList !== 'undefined' && workoutsList && workoutsList.length > 0 &&
                                <div className="white-box space-btm-20 todays-workout-box-wrapper">
                                    <div className="whitebox-head d-flex">
                                        <h3 className="title-h3 size-14">Today's Workouts</h3>
                                    </div>
                                    <div className="whitebox-body text-c">
                                        {workoutsList.map((o, i) => {
                                            let isActive = false;
                                            if (match && match.params && match.params.id && match.params.id === o._id) {
                                                isActive = true;
                                            }
                                            return (
                                                <TodaysWorkoutListCard key={i} workout={o} username={match.params.username} isActive={isActive} />
                                            );
                                        })}
                                    </div>
                                </div>
                            }

                            <div className="new-log-date-wrap log-date-wrap">
                                <button type="button" onClick={this.handleGoToToday}>Go To Today</button>
                                <ReactCalender
                                    name="log_date"
                                    onChange={this.onChangeLogDate}
                                    onActiveDateChange={this.onActiveDateChange}
                                    onClickMonth={this.onMonthClick}
                                    value={logDate}
                                    tileContent={({ date, view }) => {
                                        if (view !== 'month') {
                                            return '';
                                        }
                                        if (calendarList && calendarList.length > 0) {
                                            return _.map(calendarList, (o, key) => {
                                                let calDate = moment(date).format('YYYY-MM-DD');
                                                let logDate = moment(o.date).format('YYYY-MM-DD');
                                                if (calDate === logDate) {
                                                    return (<span key={key} className="react-calendar__tile--highlight"></span>)
                                                }
                                                return '';
                                            })
                                        }
                                    }}
                                />
                                <NavLink to={routeCodes.PROFILECALENDAR.replace('{username}', match.params.username)} className="new-log-date-wrap-view">View Calendar</NavLink>
                            </div>

                            {workout && Object.keys(workout).length > 0 && workout.type && workout.type === SCHEDULED_WORKOUT_TYPE_EXERCISE && workoutStat &&
                                <div className="white-box space-btm-20 padding-20">
                                    <div className="whitebox-head">
                                        <h3 className="title-h3 size-14 text-c">Workout Stats</h3>
                                    </div>
                                    <div className="whitebox-body">
                                        {typeof workoutStat.total_workout !== 'undefined' && workoutStat.total_workout > 0 &&
                                            <div className="workout-status">
                                                <div className="workoutstatus-top">
                                                    <h4>Total Exercises</h4>
                                                    <h5>{workoutStat.total_workout}</h5>
                                                </div>
                                            </div>
                                        }
                                        {!(typeof workoutStat.total_workout !== 'undefined' && workoutStat.total_workout > 0) &&
                                            <div className="workout-status">
                                                <div className="workoutstatus-top">
                                                    <h4>Total Exercises</h4>
                                                    <h5>0</h5>
                                                </div>
                                            </div>
                                        }
                                        {typeof workoutStat.total_reps !== 'undefined' && workoutStat.total_reps > 0 &&
                                            <div className="workout-status">
                                                <div className="workoutstatus-top">
                                                    <h4>Total Reps</h4>
                                                    <h5>{workoutStat.total_reps}</h5>
                                                </div>
                                            </div>
                                        }
                                        {!(typeof workoutStat.total_reps !== 'undefined' && workoutStat.total_reps > 0) &&
                                            <div className="workout-status">
                                                <div className="workoutstatus-top">
                                                    <h4>Total Reps</h4>
                                                    <h5>0</h5>
                                                </div>
                                            </div>
                                        }
                                        {typeof workoutStat.total_sets !== 'undefined' && workoutStat.total_sets > 0 &&
                                            <div className="workout-status">
                                                <div className="workoutstatus-top">
                                                    <h4>Total Sets</h4>
                                                    <h5>{workoutStat.total_sets}</h5>
                                                </div>
                                            </div>
                                        }
                                        {!(typeof workoutStat.total_sets !== 'undefined' && workoutStat.total_sets > 0) &&
                                            <div className="workout-status">
                                                <div className="workoutstatus-top">
                                                    <h4>Total Sets</h4>
                                                    <h5>0</h5>
                                                </div>
                                            </div>
                                        }
                                        {typeof workoutStat.total_weight_lifted !== 'undefined' && workoutStat.total_weight_lifted > 0 &&
                                            <div className="workout-status">
                                                <div className="workoutstatus-top">
                                                    <h4>Weight Lifted</h4>
                                                    <h5>
                                                        {convertUnits(MEASUREMENT_UNIT_GRAM, MEASUREMENT_UNIT_KILOGRAM, workoutStat.total_weight_lifted).toFixed(2)}
                                                        {MEASUREMENT_UNIT_KILOGRAM}
                                                    </h5>
                                                </div>
                                            </div>
                                        }
                                        {!(typeof workoutStat.total_weight_lifted !== 'undefined' && workoutStat.total_weight_lifted > 0) &&
                                            <div className="workout-status">
                                                <div className="workoutstatus-top">
                                                    <h4>Weight Lifted</h4>
                                                    <h5>
                                                        0
                                                    </h5>
                                                </div>
                                            </div>
                                        }
                                        {typeof workoutStat.muscle_work !== 'undefined' && workoutStat.muscle_work && workoutStat.muscle_work.length > 0 &&
                                            <div className="workout-status">
                                                <div className="workoutstatus-top">
                                                    <h4>Muscles Worked</h4>
                                                    <h5>{workoutStat.muscle_work.length}</h5>
                                                </div>
                                                <div className="workoutstatus-btm">
                                                    <p>
                                                        {workoutStat.muscle_work.join(', ')}
                                                    </p>
                                                </div>
                                            </div>
                                        }
                                        {!(typeof workoutStat.muscle_work !== 'undefined' && workoutStat.muscle_work && workoutStat.muscle_work.length > 0) &&
                                            <div className="workout-status">
                                                <div className="workoutstatus-top">
                                                    <h4>Muscles Worked</h4>
                                                    <h5>0</h5>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            workout,
            loading,
            error,
            history,
            dispatch,
            match,
            firstWorkoutLoading,
            firstWorkoutError,
            firstWorkoutId,
        } = this.props;
        const {
            loadWorkoutInit,
            firstWorkoutIdInit,
            forceGetUsersWorkoutScheduleRequest
        } = this.state;
        if (loadWorkoutInit && !loading) {
            dispatch(hidePageLoader());
        }
        if ((match && match.params && match.params.id && prevProps.match.params.id !== match.params.id) || forceGetUsersWorkoutScheduleRequest) {
            this.setState({ forceGetUsersWorkoutScheduleRequest: false });
            let _id = match.params.id;
            let username = match.params.username ? match.params.username : null;
            dispatch(showPageLoader());
            dispatch(getUsersWorkoutScheduleRequest(_id, username));
            this.setState({ loadWorkoutInit: true });
        }
        if (loadWorkoutInit && !loading && workout && Object.keys(workout).length <= 0) {
            this.setState({ loadWorkoutInit: false });
            history.push(routeCodes.PROFILECALENDAR.replace('{username}', match.params.username));
        } else if (loadWorkoutInit && !loading && workout && Object.keys(workout).length > 0) {
            this.setState({ loadWorkoutInit: false });
            if (workout.date) {
                var logDate = new Date(workout.date);
                logDate.setHours(0, 0, 0, 0);
                this.setState({ logDate: logDate });
            }
        }
        if (loadWorkoutInit && !loading && error && error.length > 0) {
            this.setState({ loadWorkoutInit: false });
            te("Something went wrong! please try again later.");
            history.push(routeCodes.PROFILECALENDAR.replace('{username}', match.params.username));
        }
        if (firstWorkoutIdInit && !firstWorkoutLoading) {
            this.setState({ firstWorkoutIdInit: false });
            if (firstWorkoutError && firstWorkoutError.length > 0) {
                te("Something went wrong! please try again later.");
            } else if (firstWorkoutId) {
                let username = match.params.username ? match.params.username : null;
                history.push(routeCodes.PROFILE_WORKOUT_DETAILS.replace(':username', username).replace(':id', firstWorkoutId));
            } else {
                history.push(routeCodes.PROFILECALENDAR.replace('{username}', match.params.username));
            }
            dispatch(hidePageLoader());
        }
    }

    handleWorkoutMainTypeChange = (mainType) => {
        const { dispatch } = this.props;
        dispatch(changeWorkoutMainType(mainType));
    }

    handleGoToToday = () => {
        const { logDate } = this.state;
        const { dispatch, match } = this.props;
        var date = new Date();
        date.setHours(0, 0, 0, 0);
        if (moment(logDate).format('YYYY-MM-DD') !== moment(date).format('YYYY-MM-DD')) {
            var _date = moment(date).startOf('day').utc();
            var requestData = {
                date: _date,
            };
            let username = match.params.username ? match.params.username : null;
            this.setState({ logDate: date, firstWorkoutIdInit: true, forceGetUsersWorkoutScheduleRequest: true });
            dispatch(showPageLoader());
            dispatch(setTodaysWorkoutDate(requestData.date));
            dispatch(getUserFirstWorkoutByDateRequest(requestData, username));
        }
    }

    onChangeLogDate = (date) => {
        const { logDate } = this.state;
        const { dispatch, match } = this.props;
        if (moment(logDate).format('YYYY-MM-DD') !== moment(date).format('YYYY-MM-DD')) {
            var _date = moment(date).startOf('day').utc();
            var requestData = {
                date: _date,
            };
            let username = match.params.username ? match.params.username : null;
            this.setState({ logDate: date, firstWorkoutIdInit: true, forceGetUsersWorkoutScheduleRequest: true });
            dispatch(showPageLoader());
            dispatch(setTodaysWorkoutDate(requestData.date));
            dispatch(getUserFirstWorkoutByDateRequest(requestData, username));
        }
    }

    onActiveDateChange = (obj) => {
        const { dispatch, match } = this.props;
        if (obj.view === "month") {
            let date = obj.activeStartDate;
            let now = new Date();
            let requestData = {};
            if (now.getMonth() === date.getMonth() && now.getFullYear() === date.getFullYear()) {
                this.setState({ logDate: now });
                requestData = {
                    date: moment(now).startOf('day').utc(),
                }
            } else {
                this.setState({ logDate: date });
                requestData = {
                    date: moment(date).startOf('day').utc(),
                }
            }
            let username = match.params.username ? match.params.username : null;
            dispatch(getUserWorkoutCalendarListRequest(requestData, username));
        }
    }

    onMonthClick = (date) => {
        const { dispatch, match } = this.props;
        let now = new Date();
        let requestData = {};
        if (now.getMonth() === date.getMonth() && now.getFullYear() === date.getFullYear()) {
            this.setState({ logDate: now });
            requestData = {
                date: now,
            }
        } else {
            this.setState({ logDate: date });
            requestData = {
                date: date,
            }
        }
        let username = match.params.username ? match.params.username : null;
        dispatch(getUserWorkoutCalendarListRequest(requestData, username));
    }
}

const mapStateToProps = (state) => {
    const { userScheduleWorkouts } = state;
    return {
        workout: userScheduleWorkouts.get('workout'),
        loading: userScheduleWorkouts.get('loading'),
        error: userScheduleWorkouts.get('error'),
        selectedWorkoutMainType: userScheduleWorkouts.get('selectedWorkoutMainType'),
        workoutsList: userScheduleWorkouts.get('workoutsList'),
        calendarList: userScheduleWorkouts.get('calendarList'),
        workoutStat: userScheduleWorkouts.get('workoutStat'),
        firstWorkoutLoading: userScheduleWorkouts.get('firstWorkoutLoading'),
        firstWorkoutId: userScheduleWorkouts.get('firstWorkoutId'),
        firstWorkoutError: userScheduleWorkouts.get('firstWorkoutError'),
    };
}

export default connect(
    mapStateToProps,
)(ViewScheduleWorkout);

class TodaysWorkoutListCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCompleted: false,
        }
    }

    componentWillMount() {
        const { workout } = this.props;
        if (workout && typeof workout.isCompleted !== 'undefined') {
            this.setState({ isCompleted: (workout.isCompleted) ? true : false });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { workout } = this.props;
        if (workout && typeof workout.isCompleted !== 'undefined' && prevProps.workout.isCompleted !== workout.isCompleted) {
            this.setState({ isCompleted: (workout.isCompleted) ? true : false });
        }
    }

    render() {
        const { workout, username, isActive } = this.props;
        return (
            <div className={cns('todays-workout-list-card', { active: isActive })}>
                <NavLink to={routeCodes.PROFILE_WORKOUT_DETAILS.replace(':username', username).replace(':id', workout._id)}>{workout.title}</NavLink>
            </div>
        );
    }
}