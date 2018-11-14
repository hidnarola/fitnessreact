import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { initialize, reset } from 'redux-form';
import {
    getUsersProgramWorkoutScheduleRequest,
    changeProgramWorkoutMainType,
    addUsersProgramWorkoutScheduleRequest,
    updateUserProgramWorkoutTitleRequest,
    updateUsersProgramWorkoutScheduleRequest,
    changeUsersProgramWorkoutFormAction,
    getWorkoutsListByProgramDayRequest,
    addUserProgramWorkoutTitleRequest,
    deleteUserProgramBulkExerciseRequest
} from '../../actions/userPrograms';
import {
    getExercisesNameRequest,
    getExerciseMeasurementRequest
} from '../../actions/userScheduleWorkouts';
import {
    SCHEDULED_WORKOUT_TYPE_WARMUP,
    SCHEDULED_WORKOUT_TYPE_EXERCISE,
    SCHEDULED_WORKOUT_TYPE_COOLDOWN,
    SCHEDULED_WORKOUT_TYPE_SUPERSET,
    SCHEDULED_WORKOUT_TYPE_CIRCUIT,
    MEASUREMENT_UNIT_SECONDS,
    SCHEDULED_WORKOUT_TYPE_RESTDAY
} from '../../constants/consts';
import _ from "lodash";
import cns from "classnames";
import FitnessHeader from '../global/FitnessHeader';
import FitnessNav from '../global/FitnessNav';
import SaveScheduleProgramWorkoutForm from './SaveScheduleProgramWorkoutForm';
import { prepareFieldsOptions, te, ts } from '../../helpers/funs';
import ProgramWorkoutExercisesView from './ProgramWorkoutExercisesView';
import { routeCodes } from '../../constants/routes';
import { showPageLoader, hidePageLoader } from '../../actions/pageLoader';
import SweetAlert from "react-bootstrap-sweetalert";
import UpdateWorkoutTitleForm from '../ScheduleWorkout/UpdateWorkoutTitleForm';
import AddWorkoutTitleForm from '../ScheduleWorkout/AddWorkoutTitleForm';
import UpdateScheduleProgramWorkoutForm from './UpdateScheduleProgramWorkoutForm';

class SaveScheduleProgramWorkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadWorkoutInit: false,
            saveWorkoutActionInit: false,
            updateTitleActionInit: false,
            updateWorkoutActionInit: false,
            showUpdateTitleModal: false,
            showAddWorkoutTitleAlert: false,
            addWorkoutTitleInit: false,
            selectedWorkoutIdForDelete: false,
            selectedProgramId: false,
            selectedProgramDay: false,
            showWholeWorkoutDeleteAlert: false,
            deleteWorkoutActionInit: false,
        }
    }

    componentWillMount() {
        const { match, dispatch } = this.props;
        if (match && match.params && match.params.id && match.params.workout_id) {
            let _id = match.params.id;
            let workoutId = match.params.workout_id;
            dispatch(getUsersProgramWorkoutScheduleRequest(workoutId));
            dispatch(getExercisesNameRequest());
            dispatch(getExerciseMeasurementRequest());
            this.setState({ loadWorkoutInit: true });
        }
    }

    render() {
        const {
            workout,
            selectedWorkoutMainType,
            workoutFormAction,
            selectedWorkoutForEdit,
            match,
            workoutsList,
            workoutStat
        } = this.props;
        const {
            showUpdateTitleModal,
            showAddWorkoutTitleAlert,
            showWholeWorkoutDeleteAlert
        } = this.state;
        return (
            <div className="fitness-body">
                <FitnessHeader />
                <FitnessNav />
                <section className="body-wrap">
                    <div className="body-head d-flex justify-content-start">
                        <div className="body-head-l">
                            {(workout && typeof workout.day !== 'undefined' && workout.type && workout.type === SCHEDULED_WORKOUT_TYPE_EXERCISE) &&
                                <h2>{`Workout - ${(workout && typeof workout.day !== 'undefined') ? `Day ${(workout.day + 1)}` : ''}`}</h2>
                            }
                            {(workout && typeof workout.day !== 'undefined' && workout.type && workout.type === SCHEDULED_WORKOUT_TYPE_RESTDAY) &&
                                <h2>{`${(workout.title) ? workout.title : 'Rest Day'}`}</h2>
                            }
                            {(workout && typeof workout.day !== 'undefined' && workout.type && workout.type === SCHEDULED_WORKOUT_TYPE_RESTDAY) &&
                                <p>{`${(workout.description) ? workout.description : 'Hey its rest day! Take total rest.'}`}</p>
                            }
                            {(!workout || typeof workout.day === 'undefined' || workout.day < 0) &&
                                <h2>{`Workout - Day 0`}</h2>
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
                                className='white-btn'
                                to={`${routeCodes.PROGRAM_SAVE}/${match.params.id}`}
                            >
                                <i className="icon-arrow_back"></i> Back
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
                                                    <ProgramWorkoutExercisesView
                                                        workoutType={SCHEDULED_WORKOUT_TYPE_WARMUP}
                                                        exercises={workout.warmup}
                                                        allowEdit={true}
                                                    />
                                                }
                                                {selectedWorkoutMainType === SCHEDULED_WORKOUT_TYPE_EXERCISE &&
                                                    <ProgramWorkoutExercisesView
                                                        workoutType={SCHEDULED_WORKOUT_TYPE_EXERCISE}
                                                        exercises={workout.exercise}
                                                        allowEdit={true}
                                                    />
                                                }
                                                {selectedWorkoutMainType === SCHEDULED_WORKOUT_TYPE_COOLDOWN &&
                                                    <ProgramWorkoutExercisesView
                                                        workoutType={SCHEDULED_WORKOUT_TYPE_COOLDOWN}
                                                        exercises={workout.cooldown}
                                                        allowEdit={true}
                                                    />
                                                }
                                                {workoutFormAction && workoutFormAction === 'add' &&
                                                    <div className="add-workout-form-wrapper">
                                                        <SaveScheduleProgramWorkoutForm onSubmit={this.handleSubmit} />
                                                    </div>
                                                }
                                                <div id="edit-workout-form">
                                                    {workoutFormAction && workoutFormAction === 'edit' &&
                                                        <div className="add-workout-form-wrapper">
                                                            <UpdateScheduleProgramWorkoutForm
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
                                            if (match && match.params && match.params.id && match.params.workout_id && match.params.workout_id === o._id) {
                                                isActive = true;
                                            }
                                            return (
                                                <TodaysWorkoutListCard
                                                    key={i}
                                                    workout={o}
                                                    handleWholeWorkoutDelete={this.handleShowWholeWorkoutDeleteAlert}
                                                    isActive={isActive}
                                                    openEditExerciseTitleModal={this.handleOpenEditExerciseTitleModal}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            }

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
                                                    <h5>0</h5>
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
                    />
                </SweetAlert>

                <SweetAlert
                    type="default"
                    title={`Add workout for - Day ${(workout && typeof workout.day !== 'undefined') ? (workout.day + 1) : ''}`}
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
        const {
            loading,
            error,
            loadingTitle,
            errorTitle,
            dispatch,
            match,
            workout,
            history,
            workoutTitle,
            remainingWorkouts
        } = this.props;
        const {
            loadWorkoutInit,
            saveWorkoutActionInit,
            updateTitleActionInit,
            updateWorkoutActionInit,
            addWorkoutTitleInit,
            deleteWorkoutActionInit,
            selectedProgramId
        } = this.state;
        if (loadWorkoutInit && !loading) {
            dispatch(hidePageLoader());
        }
        if (loadWorkoutInit && !loading && error && error.length > 0) {
            this.setState({ loadWorkoutInit: false });
            te('Something went wrong! please try later.');
            if (match && match.params && match.params.id) {
                history.push(`${routeCodes.PROGRAM_SAVE}/${match.params.id}`);
            } else {
                history.push(routeCodes.PROGRAMS);
            }
        }
        if (match && match.params && match.params.id && match.params.workout_id && prevProps.match.params.workout_id !== match.params.workout_id) {
            let _id = match.params.id;
            let workoutId = match.params.workout_id;
            dispatch(showPageLoader());
            dispatch(getUsersProgramWorkoutScheduleRequest(workoutId));
            this.setState({ loadWorkoutInit: true });

        }
        if (saveWorkoutActionInit && !loading) {
            this.setState({ saveWorkoutActionInit: false });
            if (error && error.length > 0) {
                te(error[0]);
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
            dispatch(changeUsersProgramWorkoutFormAction('add', null));
        }
        if (updateTitleActionInit && !loadingTitle) {
            this.setState({ updateTitleActionInit: false });
            if (errorTitle && errorTitle.length > 0) {
                te("Something went wrong! please try again later.");
            } else {
                ts('Updated!');
            }
            dispatch(hidePageLoader());
            this.handleCloseEditExerciseTitleModal();
            let programId = (workout && workout.programId) ? workout.programId : null;
            if (programId) {
                let day = (workout && typeof workout.day !== 'undefined') ? workout.day : null;
                if (day >= 0) {
                    let requestData = { day, programId };
                    dispatch(getWorkoutsListByProgramDayRequest(requestData));
                } else {
                    history.push(`${routeCodes.PROGRAM_SAVE}/${programId}`);
                }
            } else {
                history.push(routeCodes.PROGRAMS);
            }
        }
        if (deleteWorkoutActionInit && !loading) {
            this.setState({ deleteWorkoutActionInit: false });
            this.handleCancelWholeWorkoutDeleteAlert();
            if (error && error.length > 0) {
                te('Cannot delete workout. Please try again later!');
            } else {
                ts('Workout deleted successfully!');
                if (selectedProgramId && remainingWorkouts && remainingWorkouts.length > 0) {
                    history.push(routeCodes.SAVE_PROGRAM_SCHEDULE_WORKOUT.replace(':id', selectedProgramId).replace(':workout_id', remainingWorkouts[0]._id));
                } else {
                    if (selectedProgramId) {
                        history.push(`${routeCodes.PROGRAM_SAVE}/${selectedProgramId}`);
                    } else {
                        history.push(routeCodes.PROGRAMS);
                    }
                }
            }
        }
        if (addWorkoutTitleInit && !loadingTitle) {
            this.setState({ addWorkoutTitleInit: false });
            this.handleAddWorkoutTitleCancel();
            if (errorTitle && errorTitle.length > 0) {
                te("Something went wrong! please try again later.");
            } else if (workoutTitle) {
                history.push(routeCodes.SAVE_PROGRAM_SCHEDULE_WORKOUT.replace(':id', workoutTitle.programId).replace(':workout_id', workoutTitle._id));
            } else {
                te('Something went wrong! Please try after sometime');
            }
        }
    }

    handleWorkoutMainTypeChange = (mainType) => {
        const { dispatch } = this.props;
        dispatch(changeProgramWorkoutMainType(mainType));
    }

    handleSubmit = (data) => {
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
        dispatch(addUsersProgramWorkoutScheduleRequest(requestData));
        this.setState({ saveWorkoutActionInit: true });
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
        dispatch(updateUsersProgramWorkoutScheduleRequest(requestData));
        this.setState({ updateWorkoutActionInit: true });
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
                exercises: exercises,
            };
        }
        return requestData;
    }

    handleAddWorkout = () => {
        this.setState({ showAddWorkoutTitleAlert: true });
    }

    handleAddWorkoutTitleCancel = () => {
        this.setState({ showAddWorkoutTitleAlert: false });
    }

    handleAddTitleSubmit = (data) => {
        const { dispatch, workout } = this.props;
        var day = (workout && typeof workout.day !== 'undefined') ? workout.day : 0;
        var requestData = {
            title: data.title,
            description: (data.description) ? data.description : '',
            type: SCHEDULED_WORKOUT_TYPE_EXERCISE,
            day: day,
            programId: workout.programId,
        }
        this.setState({ addWorkoutTitleInit: true });
        dispatch(addUserProgramWorkoutTitleRequest(requestData));
    }

    handleShowWholeWorkoutDeleteAlert = (workout) => {
        this.setState({
            selectedWorkoutIdForDelete: workout._id,
            selectedProgramId: workout.programId,
            selectedProgramDay: workout.day,
            showWholeWorkoutDeleteAlert: true
        });
    }

    handleCancelWholeWorkoutDeleteAlert = (_id) => {
        this.setState({
            selectedWorkoutIdForDelete: null,
            selectedProgramId: null,
            selectedProgramDay: null,
            showWholeWorkoutDeleteAlert: false
        });
    }

    handleDeleteWholeWorkoutSchedule = () => {
        const { dispatch } = this.props;
        const { selectedProgramId, selectedProgramDay } = this.state;
        const { selectedWorkoutIdForDelete } = this.state;
        if (selectedWorkoutIdForDelete) {
            var requestData = {
                exerciseIds: [selectedWorkoutIdForDelete],
                programId: selectedProgramId,
                day: selectedProgramDay,
            };
            dispatch(deleteUserProgramBulkExerciseRequest(requestData));
            this.setState({ deleteWorkoutActionInit: true, showWholeWorkoutDeleteAlert: false });
            dispatch(changeUsersProgramWorkoutFormAction('add', null));
            dispatch(reset('update_schedule_workout_form'));
        }
    }

    handleOpenEditExerciseTitleModal = (workout) => {
        const { dispatch } = this.props;
        let formData = {
            id: workout._id,
            title: workout.title,
            description: workout.description,
        };
        dispatch(initialize('update_workout_title_form', formData));
        this.setState({ showUpdateTitleModal: true });
    }

    handleCloseEditExerciseTitleModal = () => {
        const { dispatch } = this.props;
        dispatch(reset('update_workout_title_form'));
        this.setState({ showUpdateTitleModal: false });
    }

    handleTitleChangeSubmit = (data) => {
        const { dispatch } = this.props;
        let requestData = {
            title: (data.title) ? data.title : '',
            description: (data.description) ? data.description : '',
        }
        this.setState({ updateTitleActionInit: true });
        dispatch(showPageLoader());
        dispatch(updateUserProgramWorkoutTitleRequest(data.id, requestData));
    }
}

const mapStateToProps = (state) => {
    const { userPrograms, userScheduleWorkouts } = state;
    return {
        workout: userPrograms.get('workout'),
        loading: userPrograms.get('loading'),
        error: userPrograms.get('error'),
        selectedWorkoutMainType: userPrograms.get('selectedWorkoutMainType'),
        exerciseMeasurements: userScheduleWorkouts.get('exerciseMeasurements'),
        loadingTitle: userPrograms.get('loadingTitle'),
        workoutTitle: userPrograms.get('workoutTitle'),
        errorTitle: userPrograms.get('errorTitle'),
        selectedWorkoutForEdit: userPrograms.get('selectedWorkoutForEdit'),
        workoutFormAction: userPrograms.get('workoutFormAction'),
        workoutWarmupSequence: userPrograms.get('workoutWarmupSequence'),
        workoutSequence: userPrograms.get('workoutSequence'),
        workoutCooldownSequence: userPrograms.get('workoutCooldownSequence'),
        workoutsList: userPrograms.get('workoutsList'),
        workoutStat: userPrograms.get('workoutStat'),
        remainingWorkouts: userPrograms.get('remainingWorkouts'),
    };
}

export default connect(
    mapStateToProps,
)(SaveScheduleProgramWorkout);

class TodaysWorkoutListCard extends Component {
    render() {
        const { workout, handleWholeWorkoutDelete, isActive, openEditExerciseTitleModal } = this.props;
        return (
            <div className={cns('todays-workout-list-card', { active: isActive })}>
                {workout.dayType === SCHEDULED_WORKOUT_TYPE_EXERCISE &&
                    <button type="button" className="edit-title-btn" onClick={() => openEditExerciseTitleModal(workout)}><i className="icon-mode_edit"></i></button>
                }
                <NavLink to={routeCodes.SAVE_PROGRAM_SCHEDULE_WORKOUT.replace(':id', workout.programId).replace(':workout_id', workout._id)}>{workout.title}</NavLink>
                <button type="button" onClick={() => handleWholeWorkoutDelete(workout)}><i className="icon-cancel"></i></button>
            </div>
        );
    }
}