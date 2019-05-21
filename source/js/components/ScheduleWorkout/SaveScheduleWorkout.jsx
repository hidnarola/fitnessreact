import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { initialize, reset } from 'redux-form';
import {
    getUsersWorkoutScheduleRequest,
    changeWorkoutMainType,
    getExercisesNameRequest,
    getExerciseMeasurementRequest,
    addUsersWorkoutScheduleRequest,
    updateUserWorkoutTitleRequest,
    changeUsersWorkoutFormAction,
    updateUsersWorkoutScheduleRequest,
    getUserFirstWorkoutByDateRequest,
    completeUsersBulkWorkoutScheduleRequest,
    getUserWorkoutCalendarListRequest,
    setTodaysWorkoutDate,
    deleteUsersBulkWorkoutScheduleRequest,
    getWorkoutsListByDateRequest,
    addUserWorkoutTitleRequest,
    setScheduleWorkoutsState,
    setDatainIdb
} from '../../actions/userScheduleWorkouts';
import { routeCodes } from '../../constants/routes';
import { te, prepareFieldsOptions, ts, convertUnits, capitalizeFirstLetter, connectIDB, isOnline, tw } from '../../helpers/funs';
import FitnessHeader from '../global/FitnessHeader';
import FitnessNav from '../global/FitnessNav';
import moment from "moment";
import {
    SCHEDULED_WORKOUT_TYPE_WARMUP,
    SCHEDULED_WORKOUT_TYPE_EXERCISE,
    SCHEDULED_WORKOUT_TYPE_COOLDOWN,
    SCHEDULED_WORKOUT_TYPE_SUPERSET,
    SCHEDULED_WORKOUT_TYPE_CIRCUIT,
    MEASUREMENT_UNIT_SECONDS,
    SCHEDULED_WORKOUT_TYPE_RESTDAY,
    MEASUREMENT_UNIT_GRAM,
    MEASUREMENT_UNIT_KILOGRAM,
    EXERCISE_NAMES,
    EXERCISE_CALENDER,
    EXERCISE_MESUREMENT
} from '../../constants/consts';
import SaveScheduleWorkoutForm from './SaveScheduleWorkoutForm';
import cns from "classnames";
import WorkoutExercisesView from './WorkoutExercisesView';
import UpdateScheduleWorkoutForm from './UpdateScheduleWorkoutForm';
import ReactCalender from 'react-calendar/dist/entry.nostyle';
import { showPageLoader, hidePageLoader } from '../../actions/pageLoader';
import SweetAlert from "react-bootstrap-sweetalert";
import UpdateWorkoutTitleForm from './UpdateWorkoutTitleForm';
import AddWorkoutTitleForm from './AddWorkoutTitleForm';
import { IDB_TBL_EXERCISE, IDB_TBL_EXERCISE_DATA, IDB_TBL_WORKOUT_DATA, IDB_READ_WRITE, IDB_READ } from '../../constants/idb';

class SaveScheduleWorkout extends Component {
    constructor(props) {
        super(props);
        var logDate = new Date();
        logDate.setHours(0, 0, 0, 0);
        this.state = {
            loadWorkoutInit: false,
            saveWorkoutActionInit: false,
            showUpdateTitleModal: false,
            updateTitleActionInit: false,
            updateWorkoutActionInit: false,
            logDate: logDate,
            firstWorkoutIdInit: false,
            completeWorkoutActionInit: false,
            selectedWorkoutIdForDelete: null,
            showWholeWorkoutDeleteAlert: false,
            deleteWorkoutActionInit: false,
            showAddWorkoutTitleAlert: false,
            addWorkoutTitleInit: false,
            forceGetUsersWorkoutScheduleRequest: false,
        }
        this.iDB;
    }

    render() {
        const {
            workout,
            selectedWorkoutMainType,
            workoutFormAction,
            selectedWorkoutForEdit,
            workoutsList,
            calendarList,
            workoutStat,
            match,
            errorTitle,
        } = this.props;
        const {
            logDate,
            showWholeWorkoutDeleteAlert,
            showUpdateTitleModal,
            completeWorkoutActionInit,
            showAddWorkoutTitleAlert,
        } = this.state;
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
                    <div className="body-content justify-content-start profilephoto-content">
                        <div className="row">
                            <div className="col-md-9 col-sm-12 col-xs-12">
                                {workout && Object.keys(workout).length > 0 && workout.type && workout.type === SCHEDULED_WORKOUT_TYPE_EXERCISE &&
                                    <div className="">
                                        <div className="whitebox-body profile-body">
                                            {selectedWorkoutMainType &&
                                                <div className="workout-main-types-view-wrapper">
                                                    {selectedWorkoutMainType === SCHEDULED_WORKOUT_TYPE_WARMUP &&
                                                        <WorkoutExercisesView
                                                            workoutType={SCHEDULED_WORKOUT_TYPE_WARMUP}
                                                            exercises={workout.warmup}
                                                        />
                                                    }
                                                    {selectedWorkoutMainType === SCHEDULED_WORKOUT_TYPE_EXERCISE &&
                                                        <WorkoutExercisesView
                                                            workoutType={SCHEDULED_WORKOUT_TYPE_EXERCISE}
                                                            exercises={workout.exercise}
                                                        />
                                                    }
                                                    {selectedWorkoutMainType === SCHEDULED_WORKOUT_TYPE_COOLDOWN &&
                                                        <WorkoutExercisesView
                                                            workoutType={SCHEDULED_WORKOUT_TYPE_COOLDOWN}
                                                            exercises={workout.cooldown}
                                                        />
                                                    }
                                                    {workoutFormAction && workoutFormAction === 'add' &&
                                                        <div className="add-workout-form-wrapper">
                                                            <SaveScheduleWorkoutForm onSubmit={this.handleSubmit} />
                                                        </div>
                                                    }
                                                    <div id="edit-workout-form">
                                                        {workoutFormAction && workoutFormAction === 'edit' &&
                                                            <div className="add-workout-form-wrapper">
                                                                <UpdateScheduleWorkoutForm
                                                                    onSubmit={this.handleUpdateSubmit}
                                                                    selectedWorkoutForEdit={selectedWorkoutForEdit}
                                                                />
                                                            </div>
                                                        }
                                                    </div>
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
                                            <div className="right-btn">
                                                <button type="button" onClick={this.handleAddWorkout}><i className="icon-add_circle"></i></button>
                                            </div>
                                        </div>
                                        <div className="whitebox-body text-c">
                                            {workoutsList.map((o, i) => {
                                                let isActive = false;
                                                if (match && match.params && match.params.id && match.params.id === o._id) {
                                                    isActive = true;
                                                }
                                                return (
                                                    <TodaysWorkoutListCard
                                                        key={i}
                                                        workout={o}
                                                        handleCompleteWorkout={this.handleCompleteWorkout}
                                                        handleWholeWorkoutDelete={this.handleShowWholeWorkoutDeleteAlert}
                                                        isActive={isActive}
                                                        openEditExerciseTitleModal={this.handleOpenEditExerciseTitleModal}
                                                        isCompleteSwitchUnderProcess={completeWorkoutActionInit}
                                                    />
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
                                    <NavLink to={routeCodes.SCHEDULE_WORKOUT} onClick={(e) => { !isOnline() && this.userOfflineMessage(e) }} className="new-log-date-wrap-view">View Calendar</NavLink>
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
                    </div>
                </section>
                <SweetAlert
                    show={showWholeWorkoutDeleteAlert}
                    danger
                    showCancel
                    confirmBtnText="Yes, delete it!"
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title="Are you sure?"
                    onConfirm={this.handleDeleteWholeWorkoutSchedule}
                    onCancel={this.handleCancelWholeWorkoutDeleteAlert}
                >
                    You will not be able to recover it!
                </SweetAlert>
                <SweetAlert
                    type="default"
                    title={`Update details`}
                    onConfirm={() => { }}
                    btnSize="sm"
                    cancelBtnBsStyle="danger"
                    confirmBtnBsStyle="success"
                    show={showUpdateTitleModal}
                    showConfirm={false}
                    showCancel={false}
                    closeOnClickOutside={false}
                >
                    <UpdateWorkoutTitleForm
                        onSubmit={this.handleTitleChangeSubmit}
                        onCancel={this.handleCloseEditExerciseTitleModal}
                        errorArr={errorTitle}
                    />
                </SweetAlert>

                <SweetAlert
                    type="default"
                    title={`Add workout for - ${(workout && workout.date) ? moment(workout.date).local().format('DD/MM/YYYY') : ''}`}
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
        })
            .catch((error) => {
                console.log("error", error)
            })
    }

    userOfflineMessage = (e) => {
        e.preventDefault();
        tw("You are offline, please check your internet connection");
    }

    onlineFunctions = () => {
        console.log("ONLINE FUNCTIONS")
        const { match, dispatch } = this.props;
        if (match && match.params && match.params.id) {
            let _id = match.params.id;
            // this.setfirstWorkoutDataInDb(_id)
            dispatch(showPageLoader());
            dispatch(getExerciseMeasurementRequest());
            dispatch(getUsersWorkoutScheduleRequest(_id));
            dispatch(getExercisesNameRequest());
            this.setState({ loadWorkoutInit: true });
        }
    }

    handleIDBOpenSuccess = (connection) => {
        this.iDB = connection.result;
        const { match } = this.props;
        if (!isOnline()) {
            console.log("OFLINEEEEEEE ")
            if (match && match.params && match.params.id) {
                let _id = match.params.id;
                this.getDataFromIDB(_id);
            }
        }
        if (isOnline()) {
            console.log("OFLINEEEEEEE else part ")
            this.onlineFunctions()
        }
    }

    getDataFromIDB = (firstWorkoutId) => {
        const { dispatch } = this.props;
        try {
            const transaction = this.iDB.transaction(IDB_TBL_WORKOUT_DATA, IDB_READ);
            if (transaction) {
                const osWorkoutData = transaction.objectStore(IDB_TBL_WORKOUT_DATA);
                if (osWorkoutData) {
                    console.log('osWorkoutData => ', osWorkoutData);
                    const iDBGetReq = osWorkoutData.get(firstWorkoutId);
                    iDBGetReq.onsuccess = (event) => {
                        const { target: { result } } = event;
                        console.log('result => ', result);
                        if (result) {
                            console.log('result => ', result);
                            dispatch(setDatainIdb({
                                firstWorkoutId: result.firstWorkoutId,
                                workout: result.workout,
                                workoutsList: result.workoutsList,
                                calendarList: result.calendarList,
                                workoutStat: result.workoutStat,
                                workoutWarmupSequence: result.workoutWarmupSequence,
                                workoutSequence: result.workoutSequence,
                                workoutCooldownSequence: result.workoutCooldownSequence
                            }))
                        }
                    }
                }
            }
        } catch (e) {
            console.log("ERROR => ", e);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            workout,
            loading,
            error,
            history,
            dispatch,
            loadingTitle,
            errorTitle,
            match,
            firstWorkoutLoading,
            firstWorkoutError,
            firstWorkoutId,
            workoutTitle,
            exercisesLoading,
            loadingCalender,
            exerciseMesurementLoading,
            workoutsList,
            calendarList,
            workoutStat,
            workoutWarmupSequence,
            workoutSequence,
            workoutCooldownSequence
        } = this.props;
        const {
            loadWorkoutInit,
            saveWorkoutActionInit,
            updateTitleActionInit,
            updateWorkoutActionInit,
            firstWorkoutIdInit,
            completeWorkoutActionInit,
            deleteWorkoutActionInit,
            addWorkoutTitleInit,
            forceGetUsersWorkoutScheduleRequest,
            logDate
        } = this.state;
        if (loadWorkoutInit && !loading) {
            dispatch(hidePageLoader());
        }
        if ((match && match.params && match.params.id && prevProps.match.params.id !== match.params.id) || forceGetUsersWorkoutScheduleRequest) {
            console.log("here")
            this.setState({ forceGetUsersWorkoutScheduleRequest: false });
            let _id = match.params.id;
            this.getDataFromIDB(_id);
            if (isOnline()) {
                dispatch(showPageLoader());
                dispatch(getUsersWorkoutScheduleRequest(_id));
                this.setState({ loadWorkoutInit: true });
            }
        }
        if (loadWorkoutInit && !loading && workout && Object.keys(workout).length <= 0) {
            this.setState({ loadWorkoutInit: false });
            history.push(routeCodes.SCHEDULE_WORKOUT);
        } else if (loadWorkoutInit && !loading && workout && Object.keys(workout).length > 0) {
            this.setState({ loadWorkoutInit: false });
            console.log("logDate ~~~>", logDate);
            console.log("workout.date ~~~>", workout.date);
            if (workout.date) {
                var logDate1 = new Date(workout.date);
                logDate.setHours(0, 0, 0, 0);
                this.setState({ logDate: new Date(workout.date) });
                this.setfirstWorkoutDataInDb();
            }
        }
        if (loadWorkoutInit && !loading && error && error.length > 0) {
            this.setState({ loadWorkoutInit: false });
            te("Something went wrong! please try again later.");
            history.push(routeCodes.SCHEDULE_WORKOUT);
        }
        if (saveWorkoutActionInit && !loading) {
            this.setState({ saveWorkoutActionInit: false });
            if (error && error.length > 0) {
                te("Something went wrong! please try again later.");
            } else {
                ts('Workout saved successfully!');
            }
            dispatch(hidePageLoader());
            dispatch(reset('save_schedule_workout_form'));
        }
        if (updateWorkoutActionInit && !loading) {
            this.setState({ updateWorkoutActionInit: false });
            if (error && error.length > 0) {
                te("Something went wrong! please try again later.");
            } else {
                ts('Workout updated successfully!');
            }
            dispatch(hidePageLoader());
            dispatch(reset('update_schedule_workout_form'));
            dispatch(changeUsersWorkoutFormAction('add', null));
        }
        if (updateTitleActionInit && !loadingTitle) {
            this.setState({ updateTitleActionInit: false });
            if (errorTitle && errorTitle.length <= 0) {
                ts('Updated!');
                this.handleCloseEditExerciseTitleModal();
                let date = (workout && workout.date) ? workout.date : null;
                if (date) {
                    let requestData = { date: date }
                    dispatch(getWorkoutsListByDateRequest(requestData));
                } else {
                    history.push(routeCodes.EXERCISE);
                }
            }
            dispatch(hidePageLoader());
        }
        if (firstWorkoutIdInit && !firstWorkoutLoading) {
            this.setState({ firstWorkoutIdInit: false });
            if (firstWorkoutError && firstWorkoutError.length > 0) {
                te("Something went wrong! please try again later.");
            } else if (firstWorkoutId) {
                history.push(routeCodes.SAVE_SCHEDULE_WORKOUT.replace(':id', firstWorkoutId));
            } else {
                history.push(routeCodes.EXERCISE);
            }
            dispatch(hidePageLoader());
        }
        if (completeWorkoutActionInit && !loading) {
            this.setState({ completeWorkoutActionInit: false });
            if (error && error.length > 0) {
                te("Something went wrong! please try again later.");
            }
            let date = (workout && workout.date) ? workout.date : null;
            if (date) {
                let requestData = { date: date }
                dispatch(getWorkoutsListByDateRequest(requestData));
            } else {
                history.push(routeCodes.EXERCISE);
            }
        }
        if (deleteWorkoutActionInit && !loading) {
            this.setState({ deleteWorkoutActionInit: false });
            this.handleCancelWholeWorkoutDeleteAlert();
            if (error && error.length > 0) {
                te('Cannot delete workout. Please try again later!');
            } else {
                ts('Workout deleted successfully!');
                history.push(routeCodes.EXERCISE);
            }
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
        if (!firstWorkoutLoading && prevProps.firstWorkoutLoading !== firstWorkoutLoading) {
            // set firstworkout data in exercise table (IDB_TBL_EXERCISE)
            // this.setfirstWorkoutDataInDb(firstWorkoutId);
        }
        if (!exercisesLoading && prevProps.exercisesLoading !== exercisesLoading) {
            this.setExerciseNameInIdb();
        }
        if (!loadingCalender && prevProps.loadingCalender !== loadingCalender) {
            // set calender data in db
            this.setCalenderDataInDb();
        }
        if (exerciseMesurementLoading && prevProps.exerciseMesurementLoading !== exerciseMesurementLoading) {
            // set exercise_mesurement details in iDB
            this.setMesurementDataInDb();
        }
        if (!loading && loading !== prevProps.loading) {
            // set workoutdata in DB workout_data IDB_TBL_WORKOUT_DATA
            this.setWorkoutDataInDb();
        }
    }

    setWorkoutDataInDb = () => {
        const { firstWorkoutId, workout, workoutsList, calendarList, workoutStat, workoutWarmupSequence, workoutSequence, workoutCooldownSequence } = this.props;
        try {
            const transaction = this.iDB.transaction([IDB_TBL_WORKOUT_DATA], IDB_READ_WRITE);
            if (transaction) {
                const objectStore = transaction.objectStore(IDB_TBL_WORKOUT_DATA);
                if (objectStore) {
                    const iDBGetReq = objectStore.get(firstWorkoutId);
                    iDBGetReq.onsuccess = (event) => {
                        const { target: { result } } = event;
                        if (result) {
                            objectStore.put({ firstWorkoutId, workout, workoutsList, calendarList, workoutStat, workoutWarmupSequence, workoutSequence, workoutCooldownSequence });
                        } else {
                            objectStore.add({ firstWorkoutId, workout, workoutsList, calendarList, workoutStat, workoutWarmupSequence, workoutSequence, workoutCooldownSequence });
                        }
                    }
                }
            }
        } catch (error) {
            console.log("ERROR =>", error);
        }
    }

    setMesurementDataInDb = () => {
        const { exerciseMeasurements } = this.props;
        try {
            const idbData = { type: EXERCISE_MESUREMENT, data: exerciseMeasurements };
            const transaction = this.iDB.transaction([IDB_TBL_EXERCISE_DATA], IDB_READ_WRITE);
            const objectStore = transaction.objectStore(IDB_TBL_EXERCISE_DATA);
            const iDBGetReq = objectStore.get(EXERCISE_MESUREMENT);
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

    setExerciseNameInIdb = () => {
        const { exercises } = this.props;
        try {
            const idbData = { type: EXERCISE_NAMES, data: exercises };
            const transaction = this.iDB.transaction([IDB_TBL_EXERCISE_DATA], IDB_READ_WRITE);
            const objectStore = transaction.objectStore(IDB_TBL_EXERCISE_DATA);
            const iDBGetReq = objectStore.get(EXERCISE_NAMES);
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

    setfirstWorkoutDataInDb = () => {
        // const { logDate } = this.state;
        const { workout, firstWorkoutId } = this.props;
        const transaction = this.iDB.transaction([IDB_TBL_EXERCISE], IDB_READ_WRITE);
        if (workout) {
            console.log("workout", workout);
            console.log("workout.date", workout.date);
        }

        // console.log("logDate 736 saveScheduleWorkout.jsx", logDate.toISOString());
        console.log("firstWorkoutId ~~>", firstWorkoutId);
        try {
            if (transaction) {
                const objectStore = transaction.objectStore(IDB_TBL_EXERCISE);
                if (objectStore) {
                    const iDBGetReq = objectStore.get((new Date(workout.date).setHours(0, 0, 0, 0)));
                    iDBGetReq.onsuccess = (event) => {
                        const { target: { result } } = event;
                        if (firstWorkoutId) {
                            if (result) {
                                console.log("put({ firstWorkoutId:1", firstWorkoutId);
                                objectStore.put({ firstWorkoutId: firstWorkoutId, logDate: ((new Date(workout.date)).setHours(0, 0, 0, 0)), here: 1 });
                            } else {
                                console.log("add({ firstWorkoutId:2", firstWorkoutId, ((new Date(workout.date)).setHours(0, 0, 0, 0)));
                                // alert(firstWorkoutId + logDate)  
                                objectStore.add({ firstWorkoutId: firstWorkoutId, logDate: ((new Date(workout.date)).setHours(0, 0, 0, 0)), here: 2 });
                            }
                        }
                    }
                }
            }
        } catch (e) {
            console.log("e =>", e);
        }
    }

    handleSubmit = (data) => {
        if (isOnline()) {
            const {
                dispatch,
                selectedWorkoutMainType,
                workoutWarmupSequence,
                workoutSequence,
                workoutCooldownSequence,
            } = this.props;
            var workoutType = (data.workout_type) ? data.workout_type : null;
            let requestData = null;
            if (workoutType && workoutType === SCHEDULED_WORKOUT_TYPE_EXERCISE) {
                requestData = this.prepareRequestDataForSingleWorkout(data);
            } else if (workoutType && workoutType === SCHEDULED_WORKOUT_TYPE_SUPERSET) {
                requestData = this.prepareRequestDataForSupersetWorkout(data);
            } else if (workoutType && workoutType === SCHEDULED_WORKOUT_TYPE_CIRCUIT) {
                requestData = this.prepareRequestDataForCircuitWorkout(data);
            }
            if (selectedWorkoutMainType === SCHEDULED_WORKOUT_TYPE_WARMUP) {
                requestData.sequence = (workoutWarmupSequence + 1);
            } else if (selectedWorkoutMainType === SCHEDULED_WORKOUT_TYPE_EXERCISE) {
                requestData.sequence = (workoutSequence + 1);
            } else if (selectedWorkoutMainType === SCHEDULED_WORKOUT_TYPE_COOLDOWN) {
                requestData.sequence = (workoutCooldownSequence + 1);
            }
            dispatch(showPageLoader());
            dispatch(addUsersWorkoutScheduleRequest(requestData));
            this.setState({ saveWorkoutActionInit: true });
        } else {
            tw("You are offline, please check your internet connection");
        }
    }

    handleUpdateSubmit = (data) => {
        const { dispatch, selectedWorkoutForEdit } = this.props;
        var workoutType = (selectedWorkoutForEdit && selectedWorkoutForEdit.subType) ? selectedWorkoutForEdit.subType : null;
        let requestData = null;
        if (workoutType && workoutType === SCHEDULED_WORKOUT_TYPE_EXERCISE) {
            requestData = this.prepareRequestDataForSingleWorkout(data);
        } else if (workoutType && workoutType === SCHEDULED_WORKOUT_TYPE_SUPERSET) {
            requestData = this.prepareRequestDataForSupersetWorkout(data);
        } else if (workoutType && workoutType === SCHEDULED_WORKOUT_TYPE_CIRCUIT) {
            requestData = this.prepareRequestDataForCircuitWorkout(data);
        }
        requestData._id = selectedWorkoutForEdit._id;
        dispatch(showPageLoader());
        dispatch(updateUsersWorkoutScheduleRequest(requestData));
        this.setState({ updateWorkoutActionInit: true });
    }

    handleWorkoutMainTypeChange = (mainType) => {
        const { dispatch } = this.props;
        dispatch(changeWorkoutMainType(mainType));
        dispatch(changeUsersWorkoutFormAction('add', null));
        dispatch(reset('update_schedule_workout_form'));
    }

    prepareRequestDataForSingleWorkout = (data) => {
        const {
            exerciseMeasurements,
            selectedWorkoutMainType,
            workout,
        } = this.props;
        let requestData = null;
        let workoutData = (data.workout_single) ? data.workout_single[0] : null;
        let workoutId = workout._id;
        if (workoutData) {
            let selectedExercise = (workoutData.exercise_id) ? workoutData.exercise_id : null;
            let advanceView = (workoutData.advance_view) ? workoutData.advance_view : false;
            if (selectedExercise) {
                let selectedExerciseMeasurementObj = null;
                let field1Options = [];
                let field2Options = [];
                let field3Options = [];
                let cat = (selectedExercise.cat) ? selectedExercise.cat : '';
                let subCat = (selectedExercise.subCat) ? selectedExercise.subCat : '';
                let measObj = _.find(exerciseMeasurements, { 'category': cat, 'subCategory': subCat });
                if (measObj) {
                    selectedExerciseMeasurementObj = measObj;
                    if (selectedExerciseMeasurementObj && selectedExerciseMeasurementObj.field1 && selectedExerciseMeasurementObj.field1.length > 0) {
                        field1Options = prepareFieldsOptions(selectedExerciseMeasurementObj.field1);
                    }
                    if (selectedExerciseMeasurementObj && selectedExerciseMeasurementObj.field2 && selectedExerciseMeasurementObj.field2.length > 0) {
                        field2Options = prepareFieldsOptions(selectedExerciseMeasurementObj.field2);
                    }
                    if (selectedExerciseMeasurementObj && selectedExerciseMeasurementObj.field3 && selectedExerciseMeasurementObj.field3.length > 0) {
                        field3Options = prepareFieldsOptions(selectedExerciseMeasurementObj.field3);
                    }
                }
                if (advanceView) {
                    let advanceViewDetails = (workoutData.advance_details) ? workoutData.advance_details : [];
                    if (advanceViewDetails && advanceViewDetails.length > 0) {
                        let sets = advanceViewDetails.length;
                        let setDetails = [];
                        _.forEach(advanceViewDetails, (o, i) => {
                            let field1Obj = null;
                            let field2Obj = null;
                            let field3Obj = null;
                            if (field1Options && field1Options.length > 0) {
                                field1Obj = {
                                    value: (o.field1_value) ? parseInt(o.field1_value) : 0,
                                    unit: (o.field1_unit) ? o.field1_unit : field1Options[0].value,
                                }
                            }
                            if (field2Options && field2Options.length > 0) {
                                field2Obj = {
                                    value: (o.field2_value) ? parseInt(o.field2_value) : 0,
                                    unit: (o.field2_unit) ? o.field2_unit : field2Options[0].value,
                                }
                            }
                            if (field3Options && field3Options.length > 0) {
                                field3Obj = {
                                    value: (o.field3_value) ? parseInt(o.field3_value) : 0,
                                    unit: (o.field3_unit) ? o.field3_unit : field3Options[0].value,
                                }
                            }
                            setDetails.push({
                                restTime: (o.rest_time && i < (sets - 1)) ? parseInt(o.rest_time) : 0,
                                restTimeUnit: (o.rest_time_unit) ? o.rest_time_unit : MEASUREMENT_UNIT_SECONDS,
                                field1: field1Obj,
                                field2: field2Obj,
                                field3: field3Obj,
                            });
                        });
                        requestData = {
                            type: selectedWorkoutMainType,
                            subType: SCHEDULED_WORKOUT_TYPE_EXERCISE,
                            userWorkoutsId: workoutId,
                            date: workout.date,
                            exercises: [
                                {
                                    exerciseId: selectedExercise.value,
                                    exerciseObj: selectedExercise,
                                    sets: parseInt(sets),
                                    differentSets: (advanceView) ? 1 : 0,
                                    setsDetails: setDetails,
                                }
                            ]
                        };
                    }
                } else {
                    let sets = (workoutData.sets) ? parseInt(workoutData.sets) : 0;
                    let restTime = (workoutData.rest_time && sets > 1) ? parseInt(workoutData.rest_time) : 0;
                    let restTimeUnit = (workoutData.rest_time_unit) ? workoutData.rest_time_unit : MEASUREMENT_UNIT_SECONDS;
                    let field1Obj = null;
                    let field2Obj = null;
                    let field3Obj = null;
                    if (field1Options && field1Options.length > 0) {
                        field1Obj = {
                            value: (workoutData.field1_value) ? parseInt(workoutData.field1_value) : 0,
                            unit: (workoutData.field1_unit) ? workoutData.field1_unit : field1Options[0].value,
                        }
                    }
                    if (field2Options && field2Options.length > 0) {
                        field2Obj = {
                            value: (workoutData.field2_value) ? parseInt(workoutData.field2_value) : 0,
                            unit: (workoutData.field2_unit) ? workoutData.field2_unit : field2Options[0].value,
                        }
                    }
                    if (field3Options && field3Options.length > 0) {
                        field3Obj = {
                            value: (workoutData.field3_value) ? parseInt(workoutData.field3_value) : 0,
                            unit: (workoutData.field3_unit) ? workoutData.field3_unit : field3Options[0].value,
                        }
                    }
                    requestData = {
                        type: selectedWorkoutMainType,
                        subType: SCHEDULED_WORKOUT_TYPE_EXERCISE,
                        userWorkoutsId: workoutId,
                        date: workout.date,
                        exercises: [
                            {
                                exerciseId: selectedExercise.value,
                                exerciseObj: selectedExercise,
                                sets: sets,
                                restTime: restTime,
                                restTimeUnit: restTimeUnit,
                                differentSets: (advanceView) ? 1 : 0,
                                setsDetails: [
                                    {
                                        field1: field1Obj,
                                        field2: field2Obj,
                                        field3: field3Obj,
                                    }
                                ]
                            }
                        ]
                    };
                }
            }
        }
        return requestData;
    }

    prepareRequestDataForSupersetWorkout = (data) => {
        const {
            exerciseMeasurements,
            selectedWorkoutMainType,
            workout,
        } = this.props;
        let requestData = null;
        let workoutDatas = (data.workout_superset) ? data.workout_superset : [];
        let workoutId = workout._id;
        if (workoutDatas && workoutDatas.length) {
            let sets = (data.superset_sets) ? parseInt(data.superset_sets) : 0;
            let restTime = (data.superset_rest_time && sets > 1) ? parseInt(data.superset_rest_time) : 0;
            let restTimeUnit = (data.superset_rest_time_unit) ? data.superset_rest_time_unit : MEASUREMENT_UNIT_SECONDS;
            let exercises = [];
            _.forEach(workoutDatas, (workoutData, index) => {
                let selectedExercise = (workoutData.exercise_id) ? workoutData.exercise_id : null;
                let advanceView = (workoutData.advance_view) ? workoutData.advance_view : false;
                if (selectedExercise) {
                    let selectedExerciseMeasurementObj = null;
                    let field1Options = [];
                    let field2Options = [];
                    let field3Options = [];
                    let cat = (selectedExercise.cat) ? selectedExercise.cat : '';
                    let subCat = (selectedExercise.subCat) ? selectedExercise.subCat : '';
                    let measObj = _.find(exerciseMeasurements, { 'category': cat, 'subCategory': subCat });
                    if (measObj) {
                        selectedExerciseMeasurementObj = measObj;
                        if (selectedExerciseMeasurementObj && selectedExerciseMeasurementObj.field1 && selectedExerciseMeasurementObj.field1.length > 0) {
                            field1Options = prepareFieldsOptions(selectedExerciseMeasurementObj.field1);
                        }
                        if (selectedExerciseMeasurementObj && selectedExerciseMeasurementObj.field2 && selectedExerciseMeasurementObj.field2.length > 0) {
                            field2Options = prepareFieldsOptions(selectedExerciseMeasurementObj.field2);
                        }
                        if (selectedExerciseMeasurementObj && selectedExerciseMeasurementObj.field3 && selectedExerciseMeasurementObj.field3.length > 0) {
                            field3Options = prepareFieldsOptions(selectedExerciseMeasurementObj.field3);
                        }
                    }
                    if (advanceView) {
                        let advanceViewDetails = (workoutData.advance_details) ? workoutData.advance_details : [];
                        if (advanceViewDetails && advanceViewDetails.length > 0) {
                            let setDetails = [];
                            _.forEach(advanceViewDetails, (o, i) => {
                                let field1Obj = null;
                                let field2Obj = null;
                                let field3Obj = null;
                                if (field1Options && field1Options.length > 0) {
                                    field1Obj = {
                                        value: (o.field1_value) ? parseInt(o.field1_value) : 0,
                                        unit: (o.field1_unit) ? o.field1_unit : field1Options[0].value,
                                    }
                                }
                                if (field2Options && field2Options.length > 0) {
                                    field2Obj = {
                                        value: (o.field2_value) ? parseInt(o.field2_value) : 0,
                                        unit: (o.field2_unit) ? o.field2_unit : field2Options[0].value,
                                    }
                                }
                                if (field3Options && field3Options.length > 0) {
                                    field3Obj = {
                                        value: (o.field3_value) ? parseInt(o.field3_value) : 0,
                                        unit: (o.field3_unit) ? o.field3_unit : field3Options[0].value,
                                    }
                                }
                                setDetails.push({
                                    field1: field1Obj,
                                    field2: field2Obj,
                                    field3: field3Obj,
                                });
                            });
                            let exeObj = {
                                exerciseId: selectedExercise.value,
                                exerciseObj: selectedExercise,
                                sets: sets,
                                restTime: restTime,
                                restTimeUnit: restTimeUnit,
                                differentSets: (advanceView) ? 1 : 0,
                                setsDetails: setDetails,
                            };
                            exercises.push(exeObj);
                        }
                    } else {
                        let field1Obj = null;
                        let field2Obj = null;
                        let field3Obj = null;
                        if (field1Options && field1Options.length > 0) {
                            field1Obj = {
                                value: (workoutData.field1_value) ? parseInt(workoutData.field1_value) : 0,
                                unit: (workoutData.field1_unit) ? workoutData.field1_unit : field1Options[0].value,
                            }
                        }
                        if (field2Options && field2Options.length > 0) {
                            field2Obj = {
                                value: (workoutData.field2_value) ? parseInt(workoutData.field2_value) : 0,
                                unit: (workoutData.field2_unit) ? workoutData.field2_unit : field2Options[0].value,
                            }
                        }
                        if (field3Options && field3Options.length > 0) {
                            field3Obj = {
                                value: (workoutData.field3_value) ? parseInt(workoutData.field3_value) : 0,
                                unit: (workoutData.field3_unit) ? workoutData.field3_unit : field3Options[0].value,
                            }
                        }
                        let exeObj = {
                            exerciseId: selectedExercise.value,
                            exerciseObj: selectedExercise,
                            sets: sets,
                            restTime: restTime,
                            restTimeUnit: restTimeUnit,
                            differentSets: (advanceView) ? 1 : 0,
                            setsDetails: [
                                {
                                    field1: field1Obj,
                                    field2: field2Obj,
                                    field3: field3Obj,
                                }
                            ]
                        };
                        exercises.push(exeObj);
                    }
                }
            });
            requestData = {
                type: selectedWorkoutMainType,
                subType: SCHEDULED_WORKOUT_TYPE_SUPERSET,
                userWorkoutsId: workoutId,
                date: workout.date,
                exercises: exercises,
            };
        }
        return requestData;
    }

    prepareRequestDataForCircuitWorkout = (data) => {
        const {
            exerciseMeasurements,
            selectedWorkoutMainType,
            workout,
        } = this.props;
        let requestData = null;
        let workoutDatas = (data.workout_circuit) ? data.workout_circuit : [];
        let workoutId = workout._id;
        if (workoutDatas && workoutDatas.length) {
            let sets = (data.circuit_sets) ? parseInt(data.circuit_sets) : 0;
            let restTime = (data.circuit_rest_time && sets > 1) ? parseInt(data.circuit_rest_time) : 0;
            let restTimeUnit = (data.circuit_rest_time_unit) ? data.circuit_rest_time_unit : MEASUREMENT_UNIT_SECONDS;
            let exercises = [];
            _.forEach(workoutDatas, (workoutData, index) => {
                let selectedExercise = (workoutData.exercise_id) ? workoutData.exercise_id : null;
                let advanceView = (workoutData.advance_view) ? workoutData.advance_view : false;
                if (selectedExercise) {
                    let selectedExerciseMeasurementObj = null;
                    let field1Options = [];
                    let field2Options = [];
                    let field3Options = [];
                    let cat = (selectedExercise.cat) ? selectedExercise.cat : '';
                    let subCat = (selectedExercise.subCat) ? selectedExercise.subCat : '';
                    let measObj = _.find(exerciseMeasurements, { 'category': cat, 'subCategory': subCat });
                    if (measObj) {
                        selectedExerciseMeasurementObj = measObj;
                        if (selectedExerciseMeasurementObj && selectedExerciseMeasurementObj.field1 && selectedExerciseMeasurementObj.field1.length > 0) {
                            field1Options = prepareFieldsOptions(selectedExerciseMeasurementObj.field1);
                        }
                        if (selectedExerciseMeasurementObj && selectedExerciseMeasurementObj.field2 && selectedExerciseMeasurementObj.field2.length > 0) {
                            field2Options = prepareFieldsOptions(selectedExerciseMeasurementObj.field2);
                        }
                        if (selectedExerciseMeasurementObj && selectedExerciseMeasurementObj.field3 && selectedExerciseMeasurementObj.field3.length > 0) {
                            field3Options = prepareFieldsOptions(selectedExerciseMeasurementObj.field3);
                        }
                    }
                    if (advanceView) {
                        let advanceViewDetails = (workoutData.advance_details) ? workoutData.advance_details : [];
                        if (advanceViewDetails && advanceViewDetails.length > 0) {
                            let setDetails = [];
                            _.forEach(advanceViewDetails, (o, i) => {
                                let field1Obj = null;
                                let field2Obj = null;
                                let field3Obj = null;
                                if (field1Options && field1Options.length > 0) {
                                    field1Obj = {
                                        value: (o.field1_value) ? parseInt(o.field1_value) : 0,
                                        unit: (o.field1_unit) ? o.field1_unit : field1Options[0].value,
                                    }
                                }
                                if (field2Options && field2Options.length > 0) {
                                    field2Obj = {
                                        value: (o.field2_value) ? parseInt(o.field2_value) : 0,
                                        unit: (o.field2_unit) ? o.field2_unit : field2Options[0].value,
                                    }
                                }
                                if (field3Options && field3Options.length > 0) {
                                    field3Obj = {
                                        value: (o.field3_value) ? parseInt(o.field3_value) : 0,
                                        unit: (o.field3_unit) ? o.field3_unit : field3Options[0].value,
                                    }
                                }
                                setDetails.push({
                                    field1: field1Obj,
                                    field2: field2Obj,
                                    field3: field3Obj,
                                });
                            });
                            let exeObj = {
                                exerciseId: selectedExercise.value,
                                exerciseObj: selectedExercise,
                                sets: sets,
                                restTime: restTime,
                                restTimeUnit: restTimeUnit,
                                differentSets: (advanceView) ? 1 : 0,
                                setsDetails: setDetails,
                            };
                            exercises.push(exeObj);
                        }
                    } else {
                        let field1Obj = null;
                        let field2Obj = null;
                        let field3Obj = null;
                        if (field1Options && field1Options.length > 0) {
                            field1Obj = {
                                value: (workoutData.field1_value) ? parseInt(workoutData.field1_value) : 0,
                                unit: (workoutData.field1_unit) ? workoutData.field1_unit : field1Options[0].value,
                            }
                        }
                        if (field2Options && field2Options.length > 0) {
                            field2Obj = {
                                value: (workoutData.field2_value) ? parseInt(workoutData.field2_value) : 0,
                                unit: (workoutData.field2_unit) ? workoutData.field2_unit : field2Options[0].value,
                            }
                        }
                        if (field3Options && field3Options.length > 0) {
                            field3Obj = {
                                value: (workoutData.field3_value) ? parseInt(workoutData.field3_value) : 0,
                                unit: (workoutData.field3_unit) ? workoutData.field3_unit : field3Options[0].value,
                            }
                        }
                        let exeObj = {
                            exerciseId: selectedExercise.value,
                            exerciseObj: selectedExercise,
                            sets: sets,
                            restTime: restTime,
                            restTimeUnit: restTimeUnit,
                            differentSets: (advanceView) ? 1 : 0,
                            setsDetails: [
                                {
                                    field1: field1Obj,
                                    field2: field2Obj,
                                    field3: field3Obj,
                                }
                            ]
                        };
                        exercises.push(exeObj);
                    }
                }
            });
            requestData = {
                type: selectedWorkoutMainType,
                subType: SCHEDULED_WORKOUT_TYPE_CIRCUIT,
                userWorkoutsId: workoutId,
                date: workout.date,
                exercises: exercises,
            };
        }
        return requestData;
    }

    handleCompleteWorkout = (workout) => {
        if (isOnline()) {
            const { dispatch, loading } = this.props;
            if (workout && workout._id && !loading) {
                var isCompleted = (typeof workout.isCompleted !== 'undefined') ? (workout.isCompleted === 0) ? 1 : 0 : 1;
                var requestData = {
                    exerciseIds: [workout._id],
                    isCompleted: isCompleted,
                };
                this.setState({ completeWorkoutActionInit: true });
                dispatch(completeUsersBulkWorkoutScheduleRequest(requestData));
            }
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
                    console.log('osExerciseData => ', osExerciseData);
                    const iDBGetReq = osExerciseData.get(isoDate.setHours(0, 0, 0, 0));
                    iDBGetReq.onsuccess = (event) => {
                        const { target: { result } } = event;
                        console.log('result => ', result);
                        if (result) {
                            history.push(routeCodes.SAVE_SCHEDULE_WORKOUT.replace(':id', result.firstWorkoutId));
                            this.setState({ logDate })
                        } else {
                            tw("You are offline, No data available");
                            this.setState({ loadWorkoutsInit: false, forceGetUsersWorkoutScheduleRequest: false });
                        }
                    }
                }
            }
        } catch (e) {
            console.log("ERROR getFirstWorkoutId => ", e);
        }
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
            if (isOnline()) {
                this.setState({ logDate: date, firstWorkoutIdInit: true, forceGetUsersWorkoutScheduleRequest: true });
                dispatch(showPageLoader());
                dispatch(setTodaysWorkoutDate(requestData.date));
                dispatch(getUserFirstWorkoutByDateRequest(requestData));
            } else {
                this.setState({ forceGetUsersWorkoutScheduleRequest: false });
                this.getFirstWorkoutId(date)
            }
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
            if (isOnline()) {
                console.log("online onCHangeLogdate")
                this.setState({ logDate: date, firstWorkoutIdInit: true, forceGetUsersWorkoutScheduleRequest: true });
                dispatch(showPageLoader());
                dispatch(setTodaysWorkoutDate(requestData.date));
                dispatch(getUserFirstWorkoutByDateRequest(requestData));
            } else {
                this.setState({ forceGetUsersWorkoutScheduleRequest: false });
                this.getFirstWorkoutId(date)
            }
        }
    }

    onActiveDateChange = (obj) => {
        console.log('onActiveDateChange => ');
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
        console.log('onMonthClick => ');
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

    handleShowWholeWorkoutDeleteAlert = (_id) => {
        if (isOnline()) {
            this.setState({ selectedWorkoutIdForDelete: _id, showWholeWorkoutDeleteAlert: true });
        } else {
            tw("You are offline, please check your internet connection");
        }
    }

    handleCancelWholeWorkoutDeleteAlert = (_id) => {
        this.setState({ selectedWorkoutIdForDelete: null, showWholeWorkoutDeleteAlert: false });
    }

    handleDeleteWholeWorkoutSchedule = () => {
        const { dispatch } = this.props;
        const { selectedWorkoutIdForDelete } = this.state;
        if (selectedWorkoutIdForDelete) {
            var requestData = {
                exerciseIds: [selectedWorkoutIdForDelete],
            };
            dispatch(deleteUsersBulkWorkoutScheduleRequest(requestData));
            this.setState({ deleteWorkoutActionInit: true });
            dispatch(changeUsersWorkoutFormAction('add', null));
            dispatch(reset('update_schedule_workout_form'));
        }
    }

    handleOpenEditExerciseTitleModal = (workout) => {
        if (isOnline()) {
            const { dispatch } = this.props;
            let formData = {
                id: workout._id,
                title: workout.title,
                description: workout.description,
            };
            dispatch(initialize('update_workout_title_form', formData));
            this.setState({ showUpdateTitleModal: true });
        } else {
            tw("You are offline, please check your internet connection");
        }
    }

    handleCloseEditExerciseTitleModal = () => {
        const { dispatch } = this.props;
        dispatch(reset('update_workout_title_form'));
        this.setState({ showUpdateTitleModal: false });
        let stateData = { errorTitle: [] }
        dispatch(setScheduleWorkoutsState(stateData));
    }

    handleTitleChangeSubmit = (data) => {
        const { dispatch } = this.props;
        let requestData = {
            title: (data.title && data.title.trim()) ? capitalizeFirstLetter(data.title.trim()) : '',
            description: (data.description && data.description.trim()) ? capitalizeFirstLetter(data.description.trim()) : '',
        }
        this.setState({ updateTitleActionInit: true });
        dispatch(showPageLoader());
        dispatch(updateUserWorkoutTitleRequest(data.id, requestData));
    }

    handleAddWorkout = () => {
        if (isOnline()) {
            this.setState({ showAddWorkoutTitleAlert: true });
        }
        else {
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
        const { dispatch, workout } = this.props;
        var date = workout.date;
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

    componentWillUnmount() {
        try {
            this.iDB.close();
        } catch (error) { }
    }

}

const mapStateToProps = (state) => {
    const { userScheduleWorkouts } = state;
    return {
        workout: userScheduleWorkouts.get('workout'),
        loading: userScheduleWorkouts.get('loading'),
        error: userScheduleWorkouts.get('error'),
        selectedWorkoutMainType: userScheduleWorkouts.get('selectedWorkoutMainType'),
        exerciseMeasurements: userScheduleWorkouts.get('exerciseMeasurements'),
        loadingTitle: userScheduleWorkouts.get('loadingTitle'),
        workoutTitle: userScheduleWorkouts.get('workoutTitle'),
        errorTitle: userScheduleWorkouts.get('errorTitle'),
        workoutFormAction: userScheduleWorkouts.get('workoutFormAction'),
        selectedWorkoutForEdit: userScheduleWorkouts.get('selectedWorkoutForEdit'),
        workoutWarmupSequence: userScheduleWorkouts.get('workoutWarmupSequence'),
        workoutSequence: userScheduleWorkouts.get('workoutSequence'),
        workoutCooldownSequence: userScheduleWorkouts.get('workoutCooldownSequence'),
        workoutsList: userScheduleWorkouts.get('workoutsList'),
        calendarList: userScheduleWorkouts.get('calendarList'),
        workoutStat: userScheduleWorkouts.get('workoutStat'),
        firstWorkoutLoading: userScheduleWorkouts.get('firstWorkoutLoading'),
        firstWorkoutId: userScheduleWorkouts.get('firstWorkoutId'),
        firstWorkoutError: userScheduleWorkouts.get('firstWorkoutError'),
        exercisesLoading: userScheduleWorkouts.get('exercisesLoading'),
        exercises: userScheduleWorkouts.get('exercises'),
        loadingCalender: userScheduleWorkouts.get('loadingCalender'),
        exerciseMesurementLoading: userScheduleWorkouts.get('exerciseMesurementLoading'),
    };
}

export default connect(
    mapStateToProps,
)(SaveScheduleWorkout);

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
        const {
            workout,
            handleCompleteWorkout,
            handleWholeWorkoutDelete,
            isActive,
            openEditExerciseTitleModal,
            isCompleteSwitchUnderProcess,
        } = this.props;
        const { isCompleted } = this.state;
        var today = moment().utc();
        var workoutDay = moment(workout.date);
        return (
            <div className={cns('todays-workout-list-card', { active: isActive })}>
                {workout.dayType === SCHEDULED_WORKOUT_TYPE_EXERCISE &&
                    <button type="button" className="edit-title-btn" onClick={() => openEditExerciseTitleModal(workout)}><i className="icon-mode_edit"></i></button>
                }
                <NavLink to={routeCodes.SAVE_SCHEDULE_WORKOUT.replace(':id', workout._id)}>{workout.title}</NavLink>
                <button type="button" onClick={() => handleWholeWorkoutDelete(workout._id)}><i className="icon-cancel"></i></button>
                {workoutDay <= today && workout.dayType && workout.dayType === SCHEDULED_WORKOUT_TYPE_EXERCISE && typeof workout.totalExercises !== 'undefined' && workout.totalExercises > 0 &&
                    <div className="switch-wrap">
                        <small>Workout complete</small>
                        <div className="material-switch">
                            <input
                                id={workout._id}
                                type="checkbox"
                                checked={isCompleted}
                                onChange={() => {
                                    if (isOnline()) {
                                        this.setState({ isCompleted: !isCompleted });
                                    }
                                    handleCompleteWorkout(workout);
                                }}
                                disabled={isCompleteSwitchUnderProcess}
                            />
                            <label htmlFor={workout._id} className="label-default"></label>
                        </div>
                    </div>
                }
            </div>
        );
    }
}