import React, { Component } from 'react';
import { connect } from 'react-redux';
import FitnessHeader from '../components/global/FitnessHeader';
import FitnessNav from '../components/global/FitnessNav';
import { routeCodes } from '../constants/routes';
import { NavLink } from "react-router-dom";
import moment from "moment";
import { showPageLoader, hidePageLoader } from '../actions/pageLoader';
import { getUserFirstWorkoutByDateRequest, addUserWorkoutTitleRequest, setTodaysWorkoutDate, getUserWorkoutCalendarListRequest, setScheduleWorkoutsState, setDatainIdb } from '../actions/userScheduleWorkouts';
import { te, capitalizeFirstLetter, connectIDB, isOnline, tw } from '../helpers/funs';
import SweetAlert from "react-bootstrap-sweetalert";
import AddWorkoutTitleForm from '../components/ScheduleWorkout/AddWorkoutTitleForm';
import { SCHEDULED_WORKOUT_TYPE_EXERCISE, SCHEDULED_WORKOUT_TYPE_RESTDAY, EXERCISE_MESUREMENT, EXERCISE_CALENDER } from '../constants/consts';
import ReactCalender from 'react-calendar/dist/entry.nostyle';
import { IDB_TBL_EXERCISE, IDB_TBL_EXERCISE_DATA, IDB_READ_WRITE, IDB_READ } from '../constants/idb';

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
            nodataInDb: false
        }
        this.iDB;
    }

    render() {
        const { showAddWorkoutTitleAlert, loadWorkoutsInit, logDate, nodataInDb } = this.state;
        const { todaysWorkoutDate, firstWorkoutLoading, firstWorkoutError, firstWorkoutId, calendarList, errorTitle } = this.props;
        var date = todaysWorkoutDate;
        return (
            <div className='stat-page'>
                <FitnessHeader />
                <FitnessNav />
                {console.log(!loadWorkoutsInit, !firstWorkoutLoading)}
                {((!loadWorkoutsInit && !firstWorkoutLoading) || nodataInDb) &&
                    <section className="body-wrap starts-body">
                        <div className="body-head d-flex justify-content-start front-white-header">
                            <div className="body-head-l">
                                <h2>Workout - {(date) ? moment(date).local().format('DD/MM/YYYY') : ''}</h2>
                                <p>You have no workout scheduled for the day.</p>
                            </div>
                            <div className="body-head-r">
                                <NavLink
                                    className='pink-btn'
                                    onClick={(e) => { !isOnline() && this.userOfflineMessage(e) }}
                                    to={routeCodes.EXERCISEFITNESS}
                                >
                                    <span>Fitness Tests</span>
                                </NavLink>
                                <NavLink
                                    className="white-btn"
                                    onClick={(e) => { !isOnline() && this.userOfflineMessage(e) }}
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
                                            onClick={(e) => { !isOnline() && this.userOfflineMessage(e) }}
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
                                    <NavLink to={routeCodes.SCHEDULE_WORKOUT} onClick={(e) => { !isOnline() && this.userOfflineMessage(e) }} className="new-log-date-wrap-view">View Calendar</NavLink>
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
                        errorArr={errorTitle}
                    />
                </SweetAlert>

            </div>
        );
    }

    componentDidMount() {

        connectIDB()().then((connection) => {
            this.handleIDBOpenSuccess(connection);
        });

        if (isOnline()) {
            // call online dispatchs 
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
            dispatch(getUserWorkoutCalendarListRequest(requestData));
            dispatch(getUserFirstWorkoutByDateRequest(requestData));
        }
    }

    userOfflineMessage = (e) => {
        e.preventDefault();
        tw("You are offline, please check your internet connection");
    }

    handleIDBOpenSuccess = (connection) => {
        this.iDB = connection.result;
        if (!isOnline()) {
            console.log("handleIDBOpenSuccess offline");
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
            // get data from db function
            // find firstWorkoutId from iDB
            try {
                const transaction = this.iDB.transaction(IDB_TBL_EXERCISE, IDB_READ);
                if (transaction) {
                    const osExerciseData = transaction.objectStore(IDB_TBL_EXERCISE);
                    console.log('osExerciseData => ', osExerciseData);
                    const isoDate = logDate.setHours(0, 0, 0, 0);
                    console.log('isoDate => ', isoDate);
                    if (osExerciseData) {
                        console.log('osExerciseData => ', osExerciseData);
                        const iDBGetReq = osExerciseData.get(isoDate);
                        iDBGetReq.onsuccess = (event) => {
                            const { target: { result } } = event;
                            console.log('result => ', result);
                            if (result) {
                                dispatch(setDatainIdb({ firstWorkoutId: result.firstWorkoutId }))
                                this.setState({ loadWorkoutsInit: true, nodataInDb: false });
                            } else {
                                this.setState({ loadWorkoutsInit: false, nodataInDb: true });
                            }
                        }
                    }
                }
            } catch (e) {
                console.log("ERROR => ", e);
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('componentDidUpdate => ');
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
            loadingCalender
        } = this.props;
        console.log('loadWorkoutsInit => ', loadWorkoutsInit);
        console.log('!firstWorkoutLoading => ', !firstWorkoutLoading);
        console.log('firstWorkoutId => ', firstWorkoutId);
        if (loadWorkoutsInit && !firstWorkoutLoading) {
            this.setState({ loadWorkoutsInit: false });
            if (firstWorkoutError && firstWorkoutError.length > 0) {
                te(firstWorkoutError[0]);
            } else if (firstWorkoutId) {
                console.log('here => ');
                history.push(routeCodes.SAVE_SCHEDULE_WORKOUT.replace(':id', firstWorkoutId));
            }
            dispatch(hidePageLoader());
        }
        if (addWorkoutTitleInit && !loadingTitle) {
            this.setState({ addWorkoutTitleInit: false });
            dispatch(hidePageLoader());
            if (errorTitle && errorTitle.length <= 0 && workoutTitle) {
                this.handleAddWorkoutTitleCancel();
                var workoutTitleId = workoutTitle._id;
                history.push(routeCodes.SAVE_SCHEDULE_WORKOUT.replace(':id', workoutTitleId));
            }
        }
        if (addRestDayInit && !loadingTitle) {
            this.setState({ addRestDayInit: false });
            dispatch(hidePageLoader());
            if (errorTitle && errorTitle.length <= 0 && workoutTitle) {
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
        if (!loadingCalender && prevProps.loadingCalender !== loadingCalender) {
            // set calender data in db
            this.setCalenderDataInDb()
        }
        if (!firstWorkoutLoading && prevProps.firstWorkoutLoading !== firstWorkoutLoading) {
            // set firstworkout data in exercise table (IDB_TBL_EXERCISE)
            this.setfirstWorkoutDataInDb(firstWorkoutId)
        }
    }

    setCalenderDataInDb = () => {
        const { calendarList } = this.props;
        try {
            const idbData = { type: EXERCISE_CALENDER, data: calendarList };
            const transaction = this.iDB.transaction([IDB_TBL_EXERCISE_DATA], IDB_READ_WRITE);
            const objectStore = transaction.objectStore(IDB_TBL_EXERCISE_DATA);
            const iDBGetReq = objectStore.get(EXERCISE_CALENDER);
            iDBGetReq.onsuccess = (event) => {
                const { target: { result } } = event;
                if (result) {
                    objectStore.put(idbData);
                } else {
                    objectStore.add(idbData);
                }
            }
        } catch (error) {
        }
    }

    setfirstWorkoutDataInDb = (firstWorkoutId) => {
        const { logDate } = this.state;
        const transaction = this.iDB.transaction([IDB_TBL_EXERCISE], IDB_READ_WRITE);
        if (transaction) {
            const objectStore = transaction.objectStore(IDB_TBL_EXERCISE);
            if (objectStore) {
                const iDBGetReq = objectStore.get((logDate.setHours(0, 0, 0, 0)));
                iDBGetReq.onsuccess = (event) => {
                    const { target: { result } } = event;
                    if (firstWorkoutId !== null) {
                        if (result) {
                            console.log("store null in DB1");
                            console.log("1 ======>", (logDate.setHours(0, 0, 0, 0)), firstWorkoutId);
                            objectStore.put({ firstWorkoutId: firstWorkoutId, logDate: (logDate.setHours(0, 0, 0, 0)) });
                        } else {
                            console.log("store null in DB2");
                            console.log("2 ======>", (logDate.setHours(0, 0, 0, 0)), firstWorkoutId);
                            objectStore.add({ firstWorkoutId: firstWorkoutId, logDate: (logDate.setHours(0, 0, 0, 0)) });
                        }
                    }
                }
            }
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
        if (isOnline()) {
            this.setState({ showAddWorkoutTitleAlert: true });
        } else {
            tw("You are offline, please check your internet connection");
        }
    }

    handleAddWorkoutTitleCancel = () => {
        const { dispatch } = this.props;
        this.setState({ showAddWorkoutTitleAlert: false });
        let stateData = { errorTitle: [] }
        dispatch(setScheduleWorkoutsState(stateData));
    }

    handleAddTitleSubmit = (data) => {
        const { dispatch, todaysWorkoutDate } = this.props;
        var date = todaysWorkoutDate;
        if (!date) {
            date = moment().startOf('day').utc();
        }
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

    handleNewRestDay = () => {
        if (isOnline()) {
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
            dispatch(showPageLoader());
        } else {
            tw("You are offline, please check your internet connection");
        }
    }

    getFirstWorkoutId = (logDate) => {
        const { dispatch, history } = this.props;
        try {
            const transaction = this.iDB.transaction(IDB_TBL_EXERCISE, IDB_READ);
            if (transaction) {
                const osExerciseData = transaction.objectStore(IDB_TBL_EXERCISE);
                console.log('osExerciseData => ', osExerciseData);
                const isoDate = logDate;
                console.log('isoDate => ', isoDate);
                if (osExerciseData) {
                    console.log('osExerciseData [e]=> ', osExerciseData);
                    const iDBGetReq = osExerciseData.get(isoDate.setHours(0, 0, 0, 0));
                    iDBGetReq.onsuccess = (event) => {
                        const { target: { result } } = event;
                        console.log('result [e]=> ', result);
                        if (result) {
                            this.setState({ logDate });
                            history.push(routeCodes.SAVE_SCHEDULE_WORKOUT.replace(':id', result.firstWorkoutId));
                            // dispatch(setDatainIdb({ firstWorkoutId: result.firstWorkoutId }))

                            // this.setState({ loadWorkoutsInit: true });
                        } else {
                            tw("You are offline, please check your internet connection");
                            // this.setState({nodataInDb: true})
                            // history.push(routeCodes.SCHEDULE_WORKOUT);
                        }
                    }
                }
            }
        } catch (e) {
            console.log("ERROR getFirstWorkoutId => ", e);
        }
    }

    handleGoToToday = () => {
        console.log("on Exercise.jsx handleGoToToday")
        const { logDate } = this.state;
        const { dispatch } = this.props;
        var date = new Date();
        date.setHours(0, 0, 0, 0);
        if (moment(logDate).format('YYYY-MM-DD') !== moment(date).format('YYYY-MM-DD')) {
            var _date = moment(date).startOf('day').utc();
            var requestData = {
                date: _date,
            };
            if (isOnline()) {
                this.setState({ logDate: date, firstWorkoutIdInit: true });
                dispatch(showPageLoader());
                dispatch(setTodaysWorkoutDate(requestData.date));
                dispatch(getUserFirstWorkoutByDateRequest(requestData));
                dispatch(getUserWorkoutCalendarListRequest(requestData));
            } else {

                this.getFirstWorkoutId(date)
            }
        }
    }

    onChangeLogDate = (date) => {
        console.log("on Exercise.jsx onChnageLogDate")
        const { logDate } = this.state;
        const { dispatch } = this.props;
        if (moment(logDate).format('YYYY-MM-DD') !== moment(date).format('YYYY-MM-DD')) {
            var _date = moment(date).startOf('day').utc();
            var requestData = {
                date: _date,
            };
            if (isOnline()) {
                this.setState({ logDate: date, firstWorkoutIdInit: true });
                dispatch(showPageLoader());
                dispatch(setTodaysWorkoutDate(requestData.date));
                dispatch(getUserFirstWorkoutByDateRequest(requestData));
            } else {
                this.getFirstWorkoutId(date)
            }
        }
    }

    onActiveDateChange = (obj) => {
        console.log("exercise.jsx onActivedatechange")
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
            if (isOnline()) {
                dispatch(getUserWorkoutCalendarListRequest(requestData));
            } else {
                tw("You are offline, please check your internet connection");
            }
        }
    }

    onMonthClick = (date) => {
        console.log("on Exercise.jsx onMonthClick")
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
        if (isOnline()) {
            dispatch(getUserWorkoutCalendarListRequest(requestData));
        } else {
            tw("You are offline, please check your internet connection");
        }
    }


    componentWillUnmount() {
        try {
            this.iDB.close();
        } catch (error) { }
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
        loadingCalender: userScheduleWorkouts.get('loadingCalender'),
    };
}

export default connect(
    mapStateToProps,
)(Exercise);