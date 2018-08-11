import React, { Component } from 'react';
import { connect } from 'react-redux';
import FitnessHeader from '../components/global/FitnessHeader';
import FitnessNav from '../components/global/FitnessNav';
import { routeCodes } from '../constants/routes';
import { NavLink } from "react-router-dom";
import moment from "moment";
import { showPageLoader, hidePageLoader } from '../actions/pageLoader';
import { getUserFirstWorkoutByDateRequest, addUserWorkoutTitleRequest, setTodaysWorkoutDate, getUserWorkoutCalendarListRequest } from '../actions/userScheduleWorkouts';
import { te } from '../helpers/funs';
import SweetAlert from "react-bootstrap-sweetalert";
import AddWorkoutTitleForm from '../components/ScheduleWorkout/AddWorkoutTitleForm';
import { SCHEDULED_WORKOUT_TYPE_EXERCISE, SCHEDULED_WORKOUT_TYPE_RESTDAY } from '../constants/consts';
import ReactCalender from 'react-calendar/dist/entry.nostyle';

class Exercise extends Component {
    constructor(props) {
        super(props);
        var logDate = new Date();
        logDate.setHours(0, 0, 0, 0);
        this.state = {
            loadWorkoutsInit: false,
            showAddWorkoutTitleAlert: false,
            addWorkoutTitleInit: false,
            addRestDayInit: false,
            logDate: logDate,
            firstWorkoutIdInit: false,
        }
    }

    componentWillMount() {
        const { dispatch, todaysWorkoutDate } = this.props;
        var date = todaysWorkoutDate;
        if (!date) {
            date = moment().startOf('day').utc();
            dispatch(setTodaysWorkoutDate(date));
        }
        var logDate = new Date(date);
        logDate.setHours(0, 0, 0, 0);
        this.setState({ logDate: logDate });
        var requestData = {
            date: date,
        };
        this.setState({ loadWorkoutsInit: true });
        dispatch(showPageLoader());
        dispatch(getUserFirstWorkoutByDateRequest(requestData));
        dispatch(getUserWorkoutCalendarListRequest(requestData));
    }

    render() {
        const { showAddWorkoutTitleAlert, loadWorkoutsInit, logDate } = this.state;
        const { todaysWorkoutDate, firstWorkoutLoading, firstWorkoutError, firstWorkoutId, calendarList } = this.props;
        var date = todaysWorkoutDate;
        return (
            <div className='stat-page'>
                <FitnessHeader />
                <FitnessNav />
                {!loadWorkoutsInit && !firstWorkoutLoading &&
                    <section className="body-wrap starts-body">
                        <div className="body-head d-flex justify-content-start">
                            <div className="body-head-l">
                                <h2>Workout - {(date) ? moment(date).local().format('DD/MM/YYYY') : ''}</h2>
                                <p>You have no workout scheduled for the day.</p>
                            </div>
                            <div className="body-head-r">
                                <NavLink
                                    activeClassName='pink-btn'
                                    className='green-blue-btn'
                                    to={routeCodes.EXERCISEFITNESS}
                                >
                                    <span>Fitness Tests</span>
                                </NavLink>
                                <NavLink
                                    className="white-btn"
                                    to={routeCodes.PROGRAMS}
                                >
                                    <span>Manage Programs</span>
                                </NavLink>
                            </div>
                        </div>
                        
                        <div className="body-content d-flex row justify-content-start profilephoto-content">
                            <div className="col-md-9">
                                <div className="white-exercise-block">
                                    {(typeof firstWorkoutId === 'undefined' || !firstWorkoutId) &&
                                        <a href="javascript:void(0)" onClick={this.handleAddWorkout}>Add Workout</a>
                                    }
                                    {(typeof firstWorkoutId === 'undefined' || !firstWorkoutId) &&
                                        <a href="javascript:void(0)" onClick={this.handleNewRestDay}>Make Rest Day</a>
                                    }
                                    {(typeof firstWorkoutId === 'undefined' || !firstWorkoutId) &&
                                        <NavLink
                                            to={routeCodes.SCHEDULE_WORKOUT}
                                        >
                                            <span>View Calendar</span>
                                        </NavLink>
                                    }
                                    {typeof firstWorkoutError !== 'undefined' && firstWorkoutError && firstWorkoutError.length > 0 &&
                                        <a href="javascript:void(0)" onClick={this.refresh}>Refresh</a>
                                    }
                                </div>
                            </div>
                            <div className="col-md-3">
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
                                    <NavLink to={routeCodes.SCHEDULE_WORKOUT} className="new-log-date-wrap-view">View Calendar</NavLink>
                                </div>
                            </div>
                        </div>

                    </section>
                }

                <SweetAlert
                    type="default"
                    title={`Add workout for - ${(date) ? moment(date).local().format('DD/MM/YYYY') : ''}`}
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
                    />
                </SweetAlert>

            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const { loadWorkoutsInit, addWorkoutTitleInit, addRestDayInit, firstWorkoutIdInit } = this.state;
        const {
            firstWorkoutLoading,
            dispatch,
            firstWorkoutError,
            firstWorkoutId,
            history,
            loadingTitle,
            workoutTitle,
            errorTitle,
        } = this.props;
        if (loadWorkoutsInit && !firstWorkoutLoading) {
            this.setState({ loadWorkoutsInit: false });
            if (firstWorkoutError && firstWorkoutError.length > 0) {
                te(firstWorkoutError[0]);
            } else if (firstWorkoutId) {
                history.push(routeCodes.SAVE_SCHEDULE_WORKOUT.replace(':id', firstWorkoutId));
            }
            dispatch(hidePageLoader());
        }
        if (addWorkoutTitleInit && !loadingTitle) {
            this.setState({ addWorkoutTitleInit: false });
            this.handleAddWorkoutTitleCancel();
            if (errorTitle && errorTitle.length > 0) {
                te(errorTitle[0]);
            } else if (workoutTitle) {
                var workoutTitleId = workoutTitle._id;
                history.push(routeCodes.SAVE_SCHEDULE_WORKOUT.replace(':id', workoutTitleId));
            } else {
                te('Something went wrong! Please try after sometime');
            }
        }
        if (addRestDayInit && !loadingTitle) {
            this.setState({ addRestDayInit: false });
            if (errorTitle && errorTitle.length > 0) {
                te(errorTitle[0]);
            } else if (workoutTitle) {
                var workoutTitleId = workoutTitle._id;
                history.push(routeCodes.SAVE_SCHEDULE_WORKOUT.replace(':id', workoutTitleId));
            } else {
                te('Something went wrong! Please try after sometime');
            }
        }
        if (firstWorkoutIdInit && !firstWorkoutLoading) {
            this.setState({ firstWorkoutIdInit: false });
            if (firstWorkoutError && firstWorkoutError.length > 0) {
                te(firstWorkoutError[0]);
            } else if (firstWorkoutId) {
                history.push(routeCodes.SAVE_SCHEDULE_WORKOUT.replace(':id', firstWorkoutId));
            }
            dispatch(hidePageLoader());
        }
    }

    refresh = () => {
        const { dispatch, todaysWorkoutDate } = this.props;
        var date = todaysWorkoutDate;
        if (!date) {
            date = moment().startOf('day').utc();
        }
        var requestData = {
            date: date,
        };
        this.setState({ loadWorkoutsInit: true });
        dispatch(showPageLoader());
        dispatch(getUserFirstWorkoutByDateRequest(requestData));
    }

    handleAddWorkout = () => {
        this.setState({ showAddWorkoutTitleAlert: true });
    }

    handleAddWorkoutTitleCancel = () => {
        this.setState({ showAddWorkoutTitleAlert: false });
    }

    handleAddTitleSubmit = (data) => {
        const { dispatch, todaysWorkoutDate } = this.props;
        var date = todaysWorkoutDate;
        if (!date) {
            date = moment().startOf('day').utc();
        }
        var requestData = {
            title: data.title,
            description: (data.description) ? data.description : '',
            type: SCHEDULED_WORKOUT_TYPE_EXERCISE,
            date: date,
        }
        this.setState({ addWorkoutTitleInit: true });
        dispatch(addUserWorkoutTitleRequest(requestData));
    }

    handleNewRestDay = () => {
        const { dispatch, todaysWorkoutDate } = this.props;
        var date = todaysWorkoutDate;
        if (!date) {
            date = moment().startOf('day').utc();
        }
        var requestData = {
            title: 'Rest Day',
            description: 'Hey its rest day! Take total rest.',
            type: SCHEDULED_WORKOUT_TYPE_RESTDAY,
            date: date,
        };
        this.setState({ addRestDayInit: true });
        dispatch(addUserWorkoutTitleRequest(requestData));
    }

    handleGoToToday = () => {
        const { logDate } = this.state;
        const { dispatch } = this.props;
        var date = new Date();
        date.setHours(0, 0, 0, 0);
        if (moment(logDate).format('YYYY-MM-DD') !== moment(date).format('YYYY-MM-DD')) {
            var _date = moment(date).startOf('day').utc();
            var requestData = {
                date: _date,
            };
            this.setState({ logDate: date, firstWorkoutIdInit: true });
            dispatch(showPageLoader());
            dispatch(setTodaysWorkoutDate(requestData.date));
            dispatch(getUserFirstWorkoutByDateRequest(requestData));
        }
    }

    onChangeLogDate = (date) => {
        const { logDate } = this.state;
        const { dispatch } = this.props;
        if (moment(logDate).format('YYYY-MM-DD') !== moment(date).format('YYYY-MM-DD')) {
            var _date = moment(date).startOf('day').utc();
            var requestData = {
                date: _date,
            };
            this.setState({ logDate: date, firstWorkoutIdInit: true });
            dispatch(showPageLoader());
            dispatch(setTodaysWorkoutDate(requestData.date));
            dispatch(getUserFirstWorkoutByDateRequest(requestData));
        }
    }

    onActiveDateChange = (obj) => {
        const { dispatch } = this.props;
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
            dispatch(getUserWorkoutCalendarListRequest(requestData));
        }
    }

    onMonthClick = (date) => {
        const { dispatch } = this.props;
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
        dispatch(getUserWorkoutCalendarListRequest(requestData));
    }

}

const mapStateToProps = (state) => {
    const { userScheduleWorkouts } = state;
    return {
        firstWorkoutLoading: userScheduleWorkouts.get('firstWorkoutLoading'),
        firstWorkoutId: userScheduleWorkouts.get('firstWorkoutId'),
        firstWorkoutError: userScheduleWorkouts.get('firstWorkoutError'),
        loadingTitle: userScheduleWorkouts.get('loadingTitle'),
        workoutTitle: userScheduleWorkouts.get('workoutTitle'),
        errorTitle: userScheduleWorkouts.get('errorTitle'),
        todaysWorkoutDate: userScheduleWorkouts.get('todaysWorkoutDate'),
        calendarList: userScheduleWorkouts.get('calendarList'),
    };
}

export default connect(
    mapStateToProps,
)(Exercise);