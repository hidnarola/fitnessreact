import React, { Component } from 'react';
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
    updateUsersWorkoutScheduleRequest
} from '../../actions/userScheduleWorkouts';
import { routeCodes } from '../../constants/routes';
import { te, prepareFieldsOptions, ts } from '../../helpers/funs';
import FitnessHeader from '../global/FitnessHeader';
import FitnessNav from '../global/FitnessNav';
import moment from "moment";
import UpdateScheduleWorkoutTitleForm from './UpdateScheduleWorkoutTitleForm';
import {
    SCHEDULED_WORKOUT_TYPE_WARMUP,
    SCHEDULED_WORKOUT_TYPE_EXERCISE,
    SCHEDULED_WORKOUT_TYPE_COOLDOWN,
    SCHEDULED_WORKOUT_TYPE_SUPERSET,
    SCHEDULED_WORKOUT_TYPE_CIRCUIT,
    MEASUREMENT_UNIT_SECONDS
} from '../../constants/consts';
import SaveScheduleWorkoutForm from './SaveScheduleWorkoutForm';
import cns from "classnames";
import WorkoutExercisesView from './WorkoutExercisesView';
import UpdateScheduleWorkoutForm from './UpdateScheduleWorkoutForm';

class SaveScheduleWorkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadWorkoutInit: false,
            saveWorkoutActionInit: false,
            updateTitleActionInit: false,
            updateWorkoutActionInit: false,
        }
    }

    componentWillMount() {
        const { match, dispatch } = this.props;
        if (match && match.params && match.params.id) {
            let _id = match.params.id;
            dispatch(getUsersWorkoutScheduleRequest(_id));
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
        } = this.props;
        return (
            <div className="fitness-body">
                <FitnessHeader />
                <FitnessNav />
                {workout && Object.keys(workout).length > 0 &&
                    <section className="body-wrap">
                        <div className="body-head d-flex justify-content-start">
                            <div className="body-head-l">
                                <h2>{`Save Workout on ${moment(workout.date).format('MM/DD/YYYY')}`}</h2>
                                <p>Your goal choice shapes how your fitness assistant will ceate your meal and exercise plans, it’s important that you set goals which are achieveable. Keep updating your profile and your fitness assistant will keep you on track and meeting the goals you’ve set out for yourself.</p>
                            </div>
                        </div>
                        <div className="body-content d-flex row justify-content-start profilephoto-content">
                            <div className="col-md-12">
                                <div className="white-box space-btm-20">
                                    <div className="whitebox-body profile-body">
                                        <UpdateScheduleWorkoutTitleForm onSubmit={this.handleTitleChangeSubmit} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="white-box space-btm-20">
                                    <div className="whitebox-body profile-body">
                                        <div className="workout-main-types-wrapper">
                                            <ul>
                                                <li className={cns({ 'active': (selectedWorkoutMainType === SCHEDULED_WORKOUT_TYPE_WARMUP) })}><a href="javascript:void(0)" className="" onClick={() => this.handleWorkoutMainTypeChange(SCHEDULED_WORKOUT_TYPE_WARMUP)}>Warmup</a></li>
                                                <li className={cns({ 'active': (selectedWorkoutMainType === SCHEDULED_WORKOUT_TYPE_EXERCISE) })}><a href="javascript:void(0)" className="" onClick={() => this.handleWorkoutMainTypeChange(SCHEDULED_WORKOUT_TYPE_EXERCISE)}>Workout</a></li>
                                                <li className={cns({ 'active': (selectedWorkoutMainType === SCHEDULED_WORKOUT_TYPE_COOLDOWN) })}><a href="javascript:void(0)" className="" onClick={() => this.handleWorkoutMainTypeChange(SCHEDULED_WORKOUT_TYPE_COOLDOWN)}>Cooldown</a></li>
                                            </ul>
                                        </div>
                                        {selectedWorkoutMainType &&
                                            <div className="workout-main-types-view-wrapper">
                                                {selectedWorkoutMainType === SCHEDULED_WORKOUT_TYPE_WARMUP &&
                                                    <WorkoutExercisesView
                                                        exercises={workout.warmup}
                                                    />
                                                }
                                                {selectedWorkoutMainType === SCHEDULED_WORKOUT_TYPE_EXERCISE &&
                                                    <WorkoutExercisesView
                                                        exercises={workout.exercise}
                                                    />
                                                }
                                                {selectedWorkoutMainType === SCHEDULED_WORKOUT_TYPE_COOLDOWN &&
                                                    <WorkoutExercisesView
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
                                                            <UpdateScheduleWorkoutForm onSubmit={this.handleUpdateSubmit} />
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                }
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
            loadingTitle,
            errorTitle,
        } = this.props;
        const {
            loadWorkoutInit,
            saveWorkoutActionInit,
            updateTitleActionInit,
            updateWorkoutActionInit,
        } = this.state;
        if (loadWorkoutInit && !loading && workout && Object.keys(workout).length <= 0) {
            this.setState({ loadWorkoutInit: false });
            history.push(routeCodes.SCHEDULE_WORKOUT);
        }
        if (loadWorkoutInit && !loading && error && error.length > 0) {
            this.setState({ loadWorkoutInit: false });
            te(error[0]);
            history.push(routeCodes.SCHEDULE_WORKOUT);
        }
        if (saveWorkoutActionInit && !loading) {
            this.setState({ saveWorkoutActionInit: false });
            if (error && error.length > 0) {
                te(error[0]);
            } else {
                ts('Workout saved successfully!');
            }
            dispatch(reset('save_schedule_workout_form'));
        }
        if (updateWorkoutActionInit && !loading) {
            this.setState({ updateWorkoutActionInit: false });
            if (error && error.length > 0) {
                te(error[0]);
            } else {
                ts('Workout updated successfully!');
            }
            dispatch(reset('update_schedule_workout_form'));
            dispatch(changeUsersWorkoutFormAction('add', null));
        }
        if (updateTitleActionInit && !loadingTitle) {
            this.setState({ updateTitleActionInit: false });
            if (errorTitle && errorTitle.length > 0) {
                te(errorTitle[0]);
            } else {
                ts('Updated!');
            }
        }
    }

    handleTitleChangeSubmit = (data) => {
        const { match, dispatch } = this.props;
        if (match && match.params && match.params.id) {
            let requestData = {
                title: data.title,
                description: data.description,
            }
            this.setState({ updateTitleActionInit: true });
            dispatch(updateUserWorkoutTitleRequest(match.params.id, requestData));
        }
    }

    handleSubmit = (data) => {
        const { dispatch } = this.props;
        var workoutType = (data.workout_type) ? data.workout_type : null;
        let requestData = null;
        if (workoutType && workoutType === SCHEDULED_WORKOUT_TYPE_EXERCISE) {
            requestData = this.prepareRequestDataForSingleWorkout(data);
        } else if (workoutType && workoutType === SCHEDULED_WORKOUT_TYPE_SUPERSET) {
            requestData = this.prepareRequestDataForSupersetWorkout(data);
        } else if (workoutType && workoutType === SCHEDULED_WORKOUT_TYPE_CIRCUIT) {
            requestData = this.prepareRequestDataForCircuitWorkout(data);
        }
        dispatch(addUsersWorkoutScheduleRequest(requestData));
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
        dispatch(updateUsersWorkoutScheduleRequest(requestData));
        this.setState({ updateWorkoutActionInit: true });
    }

    handleWorkoutMainTypeChange = (mainType) => {
        const { dispatch } = this.props;
        dispatch(changeWorkoutMainType(mainType));
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
        errorTitle: userScheduleWorkouts.get('errorTitle'),
        workoutFormAction: userScheduleWorkouts.get('workoutFormAction'),
        selectedWorkoutForEdit: userScheduleWorkouts.get('selectedWorkoutForEdit'),
    };
}

export default connect(
    mapStateToProps,
)(SaveScheduleWorkout);