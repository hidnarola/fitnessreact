import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initialize } from 'redux-form';
import {
    SERVER_BASE_URL,
    SCHEDULED_WORKOUT_TYPE_EXERCISE,
    SCHEDULED_WORKOUT_TYPE_SUPERSET,
    SCHEDULED_WORKOUT_TYPE_CIRCUIT,
    EXE_MEASUREMENT_UNITS,
    EXE_REST_TIME_UNITS
} from '../../constants/consts';
import noImg from 'img/common/no-img.png'
import _ from "lodash";
import {
    te,
    ts,
    prepareExerciseOptions,
    focusToControl
} from '../../helpers/funs';
import { FaPencil } from "react-icons/lib/fa";
import {
    changeUsersProgramWorkoutFormAction,
    deleteUserProgramSingleExerciseRequest,
    deleteUserProgramWholeExerciseRequest,
} from '../../actions/userPrograms';

class ProgramWorkoutExercisesView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteWholeExeInit: false,
        }
    }

    render() {
        const {
            exercises,
        } = this.props;
        return (
            <div className="workout-exercises-view-wrapper">
                <ul>
                    {exercises && exercises.length > 0 &&
                        exercises.map((o, i) => {
                            return (
                                <li key={i}>
                                    {o.subType === SCHEDULED_WORKOUT_TYPE_EXERCISE &&
                                        <WorkoutExerciseSingleView
                                            exercise={o.exercises[0]}
                                            exerciseObj={o}
                                            handleWholeExeDelete={this.handleWholeExeDelete}
                                            handleFillFormForEdit={this.handleFillFormForEdit}
                                        />
                                    }
                                    {o.subType === SCHEDULED_WORKOUT_TYPE_SUPERSET &&
                                        <WorkoutExerciseSupersetView
                                            exercises={o.exercises}
                                            exerciseObj={o}
                                            handleWholeExeDelete={this.handleWholeExeDelete}
                                            handleFillFormForEdit={this.handleFillFormForEdit}
                                        />
                                    }
                                    {o.subType === SCHEDULED_WORKOUT_TYPE_CIRCUIT &&
                                        <WorkoutExerciseCircuitView
                                            exercises={o.exercises}
                                            exerciseObj={o}
                                            handleWholeExeDelete={this.handleWholeExeDelete}
                                            handleSingleExeDelete={this.handleSingleExeDelete}
                                            handleFillFormForEdit={this.handleFillFormForEdit}
                                        />
                                    }
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const { deleteWholeExeInit } = this.state;
        const { loading, error } = this.props;
        if (deleteWholeExeInit && !loading) {
            this.setState({ deleteWholeExeInit: false });
            if (error && error.length > 0) {
                te(error[0]);
            } else {
                ts('Deleted');
            }
        }
    }

    handleWholeExeDelete = (exerciseObj) => {
        const { dispatch } = this.props;
        let requestData = {
            exerciseIds: [exerciseObj._id],
            parentId: exerciseObj.userWorkoutsProgramId,
        };
        this.setState({ deleteWholeExeInit: true });
        dispatch(deleteUserProgramWholeExerciseRequest(requestData));
    }

    handleSingleExeDelete = (_id, exerciseObj) => {
        const { dispatch } = this.props;
        let requestData = {
            subChildIds: [_id],
            childId: exerciseObj._id,
            parentId: exerciseObj.userWorkoutsProgramId,
        };
        this.setState({ deleteWholeExeInit: true });
        dispatch(deleteUserProgramSingleExerciseRequest(requestData));
    }

    handleFillFormForEdit = (data) => {
        const { dispatch } = this.props;
        let formData = {};
        if (data) {
            if (data.subType && data.subType === SCHEDULED_WORKOUT_TYPE_EXERCISE) {
                formData = this.prepareFormDataForSingleExercise(data);
            } else if (data.subType && data.subType === SCHEDULED_WORKOUT_TYPE_SUPERSET) {
                formData = this.prepareFormDataForSupersetExercise(data);
            } else if (data.subType && data.subType === SCHEDULED_WORKOUT_TYPE_CIRCUIT) {
                formData = this.prepareFormDataForCircuitExercise(data);
            }
            focusToControl('#edit-workout-form');
            dispatch(initialize('update_schedule_workout_form', formData));
            dispatch(changeUsersProgramWorkoutFormAction('edit', data));
        }
    }

    prepareFormDataForSingleExercise = (data) => {
        const { exercisesList } = this.props;
        var exerciseOptions = prepareExerciseOptions(exercisesList);
        let formData = {};
        let exercise = null;
        if (data.exercises && data.exercises.length === 1 && data.exercises[0]) {
            exercise = data.exercises[0];
            var exerciseId = exercise.exercises._id;
            var exerciseObj = _.find(exerciseOptions, ['value', exerciseId]);
            if (exercise.differentSets) {
                var setDetails = [];
                var simpleViewField1Value = null;
                var simpleViewField1Unit = null;
                var simpleViewField2Value = null;
                var simpleViewField2Unit = null;
                var simpleViewField3Value = null;
                var simpleViewField3Unit = null;
                var simpleViewRestTime = null;
                var simpleViewRestTimeUnit = null;
                _.forEach(exercise.setsDetails, (o, i) => {
                    var detail = {}
                    if (o.field1) {
                        detail.field1_value = o.field1.value;
                        detail.field1_unit = o.field1.unit;
                        if (!simpleViewField1Value) {
                            simpleViewField1Value = o.field1.value;
                            simpleViewField1Unit = o.field1.unit;
                        }
                    }
                    if (o.field2) {
                        detail.field2_value = o.field2.value;
                        detail.field2_unit = o.field2.unit;
                        if (!simpleViewField2Value) {
                            simpleViewField2Value = o.field2.value;
                            simpleViewField2Unit = o.field2.unit;
                        }
                    }
                    if (o.field3) {
                        detail.field3_value = o.field3.value;
                        detail.field3_unit = o.field3.unit;
                        if (!simpleViewField3Value) {
                            simpleViewField3Value = o.field3.value;
                            simpleViewField3Unit = o.field3.unit;
                        }
                    }
                    if (o.restTime) {
                        detail.rest_time = o.restTime;
                        detail.rest_time_unit = o.restTimeUnit;
                        if (!simpleViewRestTime) {
                            simpleViewRestTime = o.restTime;
                            simpleViewRestTimeUnit = o.restTimeUnit;
                        }
                    }
                    setDetails.push(detail);
                });
                var details = {
                    exercise_id: exerciseObj,
                    advance_view: true,
                    sets: exercise.sets,
                    advance_details: setDetails,
                }
                if (simpleViewField1Value) {
                    details.field1_value = simpleViewField1Value;
                    details.field1_unit = simpleViewField1Unit;
                }
                if (simpleViewField2Value) {
                    details.field2_value = simpleViewField2Value;
                    details.field2_unit = simpleViewField2Unit;
                }
                if (simpleViewField3Value) {
                    details.field3_value = simpleViewField3Value;
                    details.field3_unit = simpleViewField3Unit;
                }
                if (simpleViewRestTime) {
                    details.rest_time = simpleViewRestTime;
                    details.rest_time_unit = simpleViewRestTimeUnit;
                }
                formData.workout_single = [details];
            } else {
                var setData = exercise.setsDetails[0];
                var details = {
                    exercise_id: exerciseObj,
                    advance_view: false,
                    sets: exercise.sets,
                }
                if (setData.field1) {
                    details.field1_value = setData.field1.value;
                    details.field1_unit = setData.field1.unit;
                }
                if (setData.field2) {
                    details.field2_value = setData.field2.value;
                    details.field2_unit = setData.field2.unit;
                }
                if (setData.field3) {
                    details.field3_value = setData.field3.value;
                    details.field3_unit = setData.field3.unit;
                }
                if (exercise.restTime) {
                    details.rest_time = exercise.restTime;
                    details.rest_time_unit = exercise.restTimeUnit;
                }
                formData.workout_single = [details];
            }
        }
        return formData;
    }

    prepareFormDataForSupersetExercise = (data) => {
        const { exercisesList } = this.props;
        var exerciseOptions = prepareExerciseOptions(exercisesList);
        let formData = {};
        if (data.exercises) {
            let exercisesDetails = [];
            let superSetSets = null;
            let superSetRestTime = null;
            let superSetRestTimeUnit = null;
            _.forEach(data.exercises, (exercise, index) => {
                var exerciseId = exercise.exercises._id;
                var exerciseObj = _.find(exerciseOptions, ['value', exerciseId]);
                if (exercise.differentSets) {
                    var setDetails = [];
                    var simpleViewField1Value = null;
                    var simpleViewField1Unit = null;
                    var simpleViewField2Value = null;
                    var simpleViewField2Unit = null;
                    var simpleViewField3Value = null;
                    var simpleViewField3Unit = null;
                    _.forEach(exercise.setsDetails, (o, i) => {
                        var detail = {}
                        if (o.field1) {
                            detail.field1_value = o.field1.value;
                            detail.field1_unit = o.field1.unit;
                            if (!simpleViewField1Value) {
                                simpleViewField1Value = o.field1.value;
                                simpleViewField1Unit = o.field1.unit;
                            }
                        }
                        if (o.field2) {
                            detail.field2_value = o.field2.value;
                            detail.field2_unit = o.field2.unit;
                            if (!simpleViewField2Value) {
                                simpleViewField2Value = o.field2.value;
                                simpleViewField2Unit = o.field2.unit;
                            }
                        }
                        if (o.field3) {
                            detail.field3_value = o.field3.value;
                            detail.field3_unit = o.field3.unit;
                            if (!simpleViewField3Value) {
                                simpleViewField3Value = o.field3.value;
                                simpleViewField3Unit = o.field3.unit;
                            }
                        }
                        setDetails.push(detail);
                    });
                    if (!superSetSets && exercise.sets) {
                        superSetSets = exercise.sets;
                    }
                    if (!superSetRestTime && exercise.restTime) {
                        superSetRestTime = exercise.restTime;
                        superSetRestTimeUnit = exercise.restTimeUnit;
                    }
                    var details = {
                        exercise_id: exerciseObj,
                        advance_view: true,
                        advance_details: setDetails,
                    }
                    if (simpleViewField1Value) {
                        details.field1_value = simpleViewField1Value;
                        details.field1_unit = simpleViewField1Unit;
                    }
                    if (simpleViewField2Value) {
                        details.field2_value = simpleViewField2Value;
                        details.field2_unit = simpleViewField2Unit;
                    }
                    if (simpleViewField3Value) {
                        details.field3_value = simpleViewField3Value;
                        details.field3_unit = simpleViewField3Unit;
                    }
                    exercisesDetails.push(details);
                } else {
                    var setData = exercise.setsDetails[0];
                    if (!superSetSets && exercise.sets) {
                        superSetSets = exercise.sets;
                    }
                    if (!superSetRestTime && exercise.restTime) {
                        superSetRestTime = exercise.restTime;
                        superSetRestTimeUnit = exercise.restTimeUnit;
                    }
                    var details = {
                        exercise_id: exerciseObj,
                        advance_view: false,
                    }
                    if (setData.field1) {
                        details.field1_value = setData.field1.value;
                        details.field1_unit = setData.field1.unit;
                    }
                    if (setData.field2) {
                        details.field2_value = setData.field2.value;
                        details.field2_unit = setData.field2.unit;
                    }
                    if (setData.field3) {
                        details.field3_value = setData.field3.value;
                        details.field3_unit = setData.field3.unit;
                    }
                    exercisesDetails.push(details);
                }
            });
            if (superSetSets) {
                formData.superset_sets = superSetSets;
            }
            if (superSetRestTime) {
                formData.superset_rest_time = superSetRestTime;
                formData.superset_rest_time_unit = superSetRestTimeUnit;
            }
            formData.workout_superset = exercisesDetails;
        }
        return formData;
    }

    prepareFormDataForCircuitExercise = (data) => {
        const { exercisesList } = this.props;
        var exerciseOptions = prepareExerciseOptions(exercisesList);
        let formData = {};
        if (data.exercises) {
            let exercisesDetails = [];
            let circuitSets = null;
            let circuitRestTime = null;
            let circuitRestTimeUnit = null;
            _.forEach(data.exercises, (exercise, index) => {
                var exerciseId = exercise.exercises._id;
                var exerciseObj = _.find(exerciseOptions, ['value', exerciseId]);
                if (exercise.differentSets) {
                    var setDetails = [];
                    var simpleViewField1Value = null;
                    var simpleViewField1Unit = null;
                    var simpleViewField2Value = null;
                    var simpleViewField2Unit = null;
                    var simpleViewField3Value = null;
                    var simpleViewField3Unit = null;
                    _.forEach(exercise.setsDetails, (o, i) => {
                        var detail = {}
                        if (o.field1) {
                            detail.field1_value = o.field1.value;
                            detail.field1_unit = o.field1.unit;
                            if (!simpleViewField1Value) {
                                simpleViewField1Value = o.field1.value;
                                simpleViewField1Unit = o.field1.unit;
                            }
                        }
                        if (o.field2) {
                            detail.field2_value = o.field2.value;
                            detail.field2_unit = o.field2.unit;
                            if (!simpleViewField2Value) {
                                simpleViewField2Value = o.field2.value;
                                simpleViewField2Unit = o.field2.unit;
                            }
                        }
                        if (o.field3) {
                            detail.field3_value = o.field3.value;
                            detail.field3_unit = o.field3.unit;
                            if (!simpleViewField3Value) {
                                simpleViewField3Value = o.field3.value;
                                simpleViewField3Unit = o.field3.unit;
                            }
                        }
                        setDetails.push(detail);
                    });
                    if (!circuitSets && exercise.sets) {
                        circuitSets = exercise.sets;
                    }
                    if (!circuitRestTime && exercise.restTime) {
                        circuitRestTime = exercise.restTime;
                        circuitRestTimeUnit = exercise.restTimeUnit;
                    }
                    var details = {
                        exercise_id: exerciseObj,
                        advance_view: true,
                        advance_details: setDetails,
                    }
                    if (simpleViewField1Value) {
                        details.field1_value = simpleViewField1Value;
                        details.field1_unit = simpleViewField1Unit;
                    }
                    if (simpleViewField2Value) {
                        details.field2_value = simpleViewField2Value;
                        details.field2_unit = simpleViewField2Unit;
                    }
                    if (simpleViewField3Value) {
                        details.field3_value = simpleViewField3Value;
                        details.field3_unit = simpleViewField3Unit;
                    }
                    exercisesDetails.push(details);
                } else {
                    var setData = exercise.setsDetails[0];
                    if (!circuitSets && exercise.sets) {
                        circuitSets = exercise.sets;
                    }
                    if (!circuitRestTime && exercise.restTime) {
                        circuitRestTime = exercise.restTime;
                        circuitRestTimeUnit = exercise.restTimeUnit;
                    }
                    var details = {
                        exercise_id: exerciseObj,
                        advance_view: false,
                    }
                    if (setData.field1) {
                        details.field1_value = setData.field1.value;
                        details.field1_unit = setData.field1.unit;
                    }
                    if (setData.field2) {
                        details.field2_value = setData.field2.value;
                        details.field2_unit = setData.field2.unit;
                    }
                    if (setData.field3) {
                        details.field3_value = setData.field3.value;
                        details.field3_unit = setData.field3.unit;
                    }
                    exercisesDetails.push(details);
                }
            });
            if (circuitSets) {
                formData.circuit_sets = circuitSets;
            }
            if (circuitRestTime) {
                formData.circuit_rest_time = circuitRestTime;
                formData.circuit_rest_time_unit = circuitRestTimeUnit;
            }
            formData.workout_circuit = exercisesDetails;
        }
        return formData;
    }
}

const mapStateToProps = (state) => {
    const { userPrograms, userScheduleWorkouts } = state;
    return {
        loading: userPrograms.get('loading'),
        error: userPrograms.get('error'),
        exercisesList: userScheduleWorkouts.get('exercises'),
    };
}

export default connect(
    mapStateToProps,
)(ProgramWorkoutExercisesView);

class WorkoutExerciseSingleView extends Component {
    render() {
        const {
            exercise,
            exerciseObj,
            handleWholeExeDelete,
            handleFillFormForEdit,
        } = this.props;
        return (
            <div className="workout-exercise-head-view d-flex">
                <div className="workout-exercise-head-view-l">
                    <img
                        src={SERVER_BASE_URL + exercise.exercises.images[0]}
                        width="50"
                        onError={(e) => {
                            e.target.src = noImg
                        }}
                    />
                    <strong>{exercise.exercises.name}</strong>
                </div>
                <div className="workout-exercise-head-view-r">
                    {exercise.differentSets === 0 &&
                        <div className="workout-exercise-head-view-data-row d-flex">
                            {exercise.sets &&
                                <div className="workout-exercise-head-view-data-col">
                                    <strong>{exercise.sets}</strong>&nbsp;
                                    <strong>{'Sets'}</strong>
                                </div>
                            }
                            {typeof exercise.restTime !== 'undefined' &&
                                <div className="workout-exercise-head-view-data-col">
                                    <strong>{exercise.restTime}</strong>&nbsp;
                                    <strong>{_.find(EXE_REST_TIME_UNITS, ['value', exercise.restTimeUnit]).label} Rest</strong>
                                </div>
                            }
                            {exercise.setsDetails[0].field1 &&
                                <div className="workout-exercise-head-view-data-col">
                                    <strong>{exercise.setsDetails[0].field1.value}</strong>&nbsp;
                                    <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field1.unit]).label}</strong>
                                </div>
                            }
                            {exercise.setsDetails[0].field2 &&
                                <div className="workout-exercise-head-view-data-col">
                                    <strong>{exercise.setsDetails[0].field2.value}</strong>&nbsp;
                                    <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field2.unit]).label}</strong>
                                </div>
                            }
                            {exercise.setsDetails[0].field3 &&
                                <div className="workout-exercise-head-view-data-col">
                                    <strong>{exercise.setsDetails[0].field3.value}</strong>&nbsp;
                                    <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field3.unit]).label}</strong>
                                </div>
                            }
                            <div className="workout-exercise-head-view-edit">
                                <button type="button" onClick={() => handleFillFormForEdit(exerciseObj)}>
                                    <FaPencil />
                                </button>
                            </div>
                            <div className="workout-exercise-head-view-cancel">
                                <button type="button" onClick={() => handleWholeExeDelete(exerciseObj)}>
                                    <i className="icon-cancel"></i>
                                </button>
                            </div>
                        </div>
                    }
                    {exercise.differentSets === 1 &&
                        <WorkoutExerciseSingleAdvanceView
                            exercise={exercise}
                            exerciseObj={exerciseObj}
                            handleWholeExeDelete={handleWholeExeDelete}
                            handleFillFormForEdit={handleFillFormForEdit}
                        />
                    }
                </div>
            </div>
        );
    }
}

class WorkoutExerciseSupersetView extends Component {
    render() {
        const {
            exercises,
            handleWholeExeDelete,
            exerciseObj,
            handleFillFormForEdit,
        } = this.props;
        return (
            <div className="workout-exercise-head-view-wrapper">
                <div className="workout-exercise-head-view d-flex">
                    <div className="workout-exercise-head-view-l">
                        <strong>{'Superset'}</strong>
                    </div>
                    <div className="workout-exercise-head-view-r">
                        <div className="workout-exercise-head-view-data-row d-flex">
                            {exercises[0].sets &&
                                <div className="workout-exercise-head-view-data-col">
                                    <strong>{exercises[0].sets}</strong>&nbsp;
                                    <strong>{'Sets'}</strong>
                                </div>
                            }
                            {typeof exercises[0].restTime !== 'undefined' &&
                                <div className="workout-exercise-head-view-data-col">
                                    <strong>{exercises[0].restTime}</strong>&nbsp;
                                    <strong>{_.find(EXE_REST_TIME_UNITS, ['value', exercises[0].restTimeUnit]).label} Rest</strong>
                                </div>
                            }
                            <div className="workout-exercise-head-view-edit">
                                <button type="button" onClick={() => handleFillFormForEdit(exerciseObj)}>
                                    <FaPencil />
                                </button>
                            </div>
                            <div className="workout-exercise-head-view-cancel">
                                <button type="button" onClick={() => handleWholeExeDelete(exerciseObj)}>
                                    <i className="icon-cancel"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <ul className="workout-exercise-body-view-ul">
                    <li>
                        <div className="workout-exercise-body-view-wrapper">
                            {exercises && exercises.length > 0 &&
                                exercises.map((exercise, index) => {
                                    return (
                                        <div key={index} className="workout-exercise-body-view d-flex">
                                            <div className="workout-exercise-head-view-l">
                                                <img
                                                    src={SERVER_BASE_URL + exercise.exercises.images[0]}
                                                    width="50"
                                                    onError={(e) => {
                                                        e.target.src = noImg
                                                    }}
                                                />
                                                <strong>{exercise.exercises.name}</strong>
                                            </div>
                                            <div className="workout-exercise-head-view-r">
                                                {exercise.differentSets === 0 &&
                                                    <div className="workout-exercise-body-view-data-row d-flex">
                                                        {exercise.setsDetails[0].field1 &&
                                                            <div className="workout-exercise-body-view-data-col">
                                                                <strong>{exercise.setsDetails[0].field1.value}</strong>&nbsp;
                                                                <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field1.unit]).label}</strong>
                                                            </div>
                                                        }
                                                        {exercise.setsDetails[0].field2 &&
                                                            <div className="workout-exercise-body-view-data-col">
                                                                <strong>{exercise.setsDetails[0].field2.value}</strong>&nbsp;
                                                                <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field2.unit]).label}</strong>
                                                            </div>
                                                        }
                                                        {exercise.setsDetails[0].field3 &&
                                                            <div className="workout-exercise-body-view-data-col">
                                                                <strong>{exercise.setsDetails[0].field3.value}</strong>&nbsp;
                                                                <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field3.unit]).label}</strong>
                                                            </div>
                                                        }
                                                        <div className="workout-exercise-head-view-edit">
                                                            <button type="button">
                                                                <FaPencil />
                                                            </button>
                                                        </div>
                                                    </div>
                                                }
                                                {exercise.differentSets === 1 &&
                                                    <WorkoutExerciseSupersetAdvanceView
                                                        exercise={exercise}
                                                    />
                                                }
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}

class WorkoutExerciseCircuitView extends Component {
    render() {
        const {
            exercises,
            handleWholeExeDelete,
            handleSingleExeDelete,
            exerciseObj,
            handleFillFormForEdit,
        } = this.props;
        return (
            <div className="workout-exercise-head-view-wrapper">
                <div className="workout-exercise-head-view d-flex">
                    <div className="workout-exercise-head-view-l">
                        <strong>{'Circuit'}</strong>
                    </div>
                    <div className="workout-exercise-head-view-r">
                        <div className="workout-exercise-head-view-data-row d-flex">
                            {exercises[0].sets &&
                                <div className="workout-exercise-head-view-data-col">
                                    <strong>{exercises[0].sets}</strong>&nbsp;
                                    <strong>{'Sets'}</strong>
                                </div>
                            }
                            {typeof exercises[0].restTime !== 'undefined' &&
                                <div className="workout-exercise-head-view-data-col">
                                    <strong>{exercises[0].restTime}</strong>&nbsp;
                                    <strong>{_.find(EXE_REST_TIME_UNITS, ['value', exercises[0].restTimeUnit]).label} Rest</strong>
                                </div>
                            }
                            <div className="workout-exercise-head-view-edit">
                                <button type="button" onClick={() => handleFillFormForEdit(exerciseObj)}>
                                    <FaPencil />
                                </button>
                            </div>
                            <div className="workout-exercise-head-view-cancel">
                                <button type="button" onClick={() => handleWholeExeDelete(exerciseObj)}>
                                    <i className="icon-cancel"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <ul className="workout-exercise-body-view-ul">
                    <li>
                        <div className="workout-exercise-body-view-wrapper">
                            {exercises && exercises.length > 0 &&
                                exercises.map((exercise, index) => {
                                    return (
                                        <div key={index} className="workout-exercise-body-view d-flex">
                                            <div className="workout-exercise-head-view-l">
                                                <img
                                                    src={SERVER_BASE_URL + exercise.exercises.images[0]}
                                                    width="50"
                                                    onError={(e) => {
                                                        e.target.src = noImg
                                                    }}
                                                />
                                                <strong>{exercise.exercises.name}</strong>
                                            </div>
                                            <div className="workout-exercise-head-view-r">
                                                {exercise.differentSets === 0 &&
                                                    <div className="workout-exercise-body-view-data-row d-flex">
                                                        {exercise.setsDetails[0].field1 &&
                                                            <div className="workout-exercise-body-view-data-col">
                                                                <strong>{exercise.setsDetails[0].field1.value}</strong>&nbsp;
                                                                <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field1.unit]).label}</strong>
                                                            </div>
                                                        }
                                                        {exercise.setsDetails[0].field2 &&
                                                            <div className="workout-exercise-body-view-data-col">
                                                                <strong>{exercise.setsDetails[0].field2.value}</strong>&nbsp;
                                                                <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field2.unit]).label}</strong>
                                                            </div>
                                                        }
                                                        {exercise.setsDetails[0].field3 &&
                                                            <div className="workout-exercise-body-view-data-col">
                                                                <strong>{exercise.setsDetails[0].field3.value}</strong>&nbsp;
                                                                <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field3.unit]).label}</strong>
                                                            </div>
                                                        }
                                                        <div className="workout-exercise-head-view-edit">
                                                            <button type="button">
                                                                <FaPencil />
                                                            </button>
                                                        </div>
                                                        <div className="workout-exercise-head-view-cancel">
                                                            <button type="button" onClick={() => handleSingleExeDelete(exercise._id, exerciseObj)}>
                                                                <i className="icon-cancel"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                }
                                                {exercise.differentSets === 1 &&
                                                    <WorkoutExerciseCircuitAdvanceView
                                                        exercise={exercise}
                                                        exerciseObj={exerciseObj}
                                                        handleSingleExeDelete={handleSingleExeDelete}
                                                    />
                                                }
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}

class WorkoutExerciseSingleAdvanceView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        }
    }

    render() {
        const {
            exercise,
            handleWholeExeDelete,
            exerciseObj,
            handleFillFormForEdit,
        } = this.props;
        const { show } = this.state;
        return (
            <div className="workout-exercise-head-view-data-row-inner">
                <div className="workout-exercise-head-view-data-row d-flex">
                    {exercise.sets &&
                        <div className="workout-exercise-head-view-data-col">
                            <strong>{exercise.sets}</strong>
                            &nbsp;
                        <strong>{'Sets'}</strong>
                        </div>
                    }
                    {typeof exercise.setsDetails[0].restTime !== 'undefined' &&
                        <div className="workout-exercise-head-view-data-col">
                            <strong>{exercise.setsDetails[0].restTime}</strong>
                            &nbsp;
                        <strong>{_.find(EXE_REST_TIME_UNITS, ['value', exercise.setsDetails[0].restTimeUnit]).label}</strong>
                            {exercise.setsDetails.length > 1 && typeof exercise.setsDetails[(exercise.setsDetails.length - 1)].restTime !== 'undefined' &&
                                <strong> - {exercise.setsDetails[(exercise.setsDetails.length - 1)].restTime}</strong>
                            }
                            &nbsp;
                        {exercise.setsDetails.length > 1 && typeof exercise.setsDetails[(exercise.setsDetails.length - 1)].restTimeUnit !== 'undefined' &&
                                <strong>{_.find(EXE_REST_TIME_UNITS, ['value', exercise.setsDetails[(exercise.setsDetails.length - 1)].restTimeUnit]).label}</strong>
                            } Rest
                    </div>
                    }
                    {exercise.setsDetails[0].field1 &&
                        <div className="workout-exercise-head-view-data-col">
                            <strong>{exercise.setsDetails[0].field1.value}</strong>
                            &nbsp;
                        <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field1.unit]).label}</strong>
                            {exercise.setsDetails.length > 1 && exercise.setsDetails[(exercise.setsDetails.length - 1)].field1 &&
                                <strong> - {exercise.setsDetails[(exercise.setsDetails.length - 1)].field1.value}</strong>
                            }
                            &nbsp;
                        {exercise.setsDetails.length > 1 && exercise.setsDetails[(exercise.setsDetails.length - 1)].field1 &&
                                <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[(exercise.setsDetails.length - 1)].field1.unit]).label}</strong>
                            }
                        </div>
                    }
                    {exercise.setsDetails[0].field2 &&
                        <div className="workout-exercise-head-view-data-col">
                            <strong>{exercise.setsDetails[0].field2.value}</strong>
                            &nbsp;
                        <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field2.unit]).label}</strong>
                            {exercise.setsDetails.length > 1 && exercise.setsDetails[(exercise.setsDetails.length - 1)].field2 &&
                                <strong> - {exercise.setsDetails[(exercise.setsDetails.length - 1)].field2.value}</strong>
                            }
                            &nbsp;
                        {exercise.setsDetails.length > 1 && exercise.setsDetails[(exercise.setsDetails.length - 1)].field2 &&
                                <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[(exercise.setsDetails.length - 1)].field2.unit]).label}</strong>
                            }
                        </div>
                    }
                    {exercise.setsDetails[0].field3 &&
                        <div className="workout-exercise-head-view-data-col">
                            <strong>{exercise.setsDetails[0].field3.value}</strong>
                            &nbsp;
                        <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field3.unit]).label}</strong>
                            {exercise.setsDetails.length > 1 && exercise.setsDetails[(exercise.setsDetails.length - 1)].field3 &&
                                <strong> - {exercise.setsDetails[(exercise.setsDetails.length - 1)].field3.value}</strong>
                            }
                            &nbsp;
                        {exercise.setsDetails.length > 1 && exercise.setsDetails[(exercise.setsDetails.length - 1)].field3 &&
                                <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[(exercise.setsDetails.length - 1)].field3.unit]).label}</strong>
                            }
                        </div>
                    }
                    <div className="workout-exercise-head-view-edit">
                        <button type="button" onClick={() => handleFillFormForEdit(exerciseObj)}>
                            <FaPencil />
                        </button>
                    </div>
                    <div className="workout-exercise-head-toggle-actions">
                        <button type="button" onClick={() => this.setState({ show: !show })}>
                            ...
                    </button>
                    </div>
                    <div className="workout-exercise-head-view-cancel">
                        <button type="button" onClick={() => handleWholeExeDelete(exerciseObj)}>
                            <i className="icon-cancel"></i>
                        </button>
                    </div>
                </div>
                {show &&
                    <div className="workout-exercise-head-view-data-row-ul">
                        <ul>
                            {exercise.setsDetails.map((o, i) => {
                                return (
                                    <li key={i}>
                                        <div className="workout-exercise-advance-set-view-wrapper d-flex">
                                            <div className="workout-exercise-head-view-data-col">
                                                <strong>{`Set #${(i + 1)}`}</strong>
                                            </div>
                                            {typeof o.restTime !== 'undefined' &&
                                                <div className="workout-exercise-head-view-data-col">
                                                    <strong>{o.restTime}</strong>&nbsp;<strong>{_.find(EXE_REST_TIME_UNITS, ['value', o.restTimeUnit]).label} Rest</strong>
                                                </div>
                                            }
                                            {o.field1 &&
                                                <div className="workout-exercise-head-view-data-col">
                                                    <strong>{o.field1.value}</strong>&nbsp;<strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', o.field1.unit]).label}</strong>
                                                </div>
                                            }
                                            {o.field2 &&
                                                <div className="workout-exercise-head-view-data-col">
                                                    <strong>{o.field2.value}</strong>&nbsp;<strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', o.field2.unit]).label}</strong>
                                                </div>
                                            }
                                            {o.field3 &&
                                                <div className="workout-exercise-head-view-data-col">
                                                    <strong>{o.field3.value}</strong>&nbsp;<strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', o.field3.unit]).label}</strong>
                                                </div>
                                            }
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                }
            </div>
        );
    }
}

class WorkoutExerciseSupersetAdvanceView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        }
    }

    render() {
        const {
            exercise,
        } = this.props;
        const { show } = this.state;
        return (
            <div className="workout-exercise-head-view-data-row-inner">
                <div className="workout-exercise-body-view-data-row d-flex">
                    {exercise.setsDetails[0].field1 &&
                        <div className="workout-exercise-body-view-data-col">
                            <strong>{exercise.setsDetails[0].field1.value}</strong>&nbsp;<strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field1.unit]).label}</strong>
                            {exercise.setsDetails.length > 1 && exercise.setsDetails[(exercise.setsDetails.length - 1)].field1 &&
                                <strong> - {exercise.setsDetails[(exercise.setsDetails.length - 1)].field1.value}</strong>
                            }
                            &nbsp;
                        {exercise.setsDetails.length > 1 && exercise.setsDetails[(exercise.setsDetails.length - 1)].field1 &&
                                <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[(exercise.setsDetails.length - 1)].field1.unit]).label}</strong>
                            }
                        </div>
                    }
                    {exercise.setsDetails[0].field2 &&
                        <div className="workout-exercise-body-view-data-col">
                            <strong>{exercise.setsDetails[0].field2.value}</strong>&nbsp;<strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field2.unit]).label}</strong>
                            {exercise.setsDetails.length > 1 && exercise.setsDetails[(exercise.setsDetails.length - 1)].field2 &&
                                <strong> - {exercise.setsDetails[(exercise.setsDetails.length - 1)].field2.value}</strong>
                            }
                            &nbsp;
                        {exercise.setsDetails.length > 1 && exercise.setsDetails[(exercise.setsDetails.length - 1)].field2 &&
                                <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[(exercise.setsDetails.length - 1)].field2.unit]).label}</strong>
                            }
                        </div>
                    }
                    {exercise.setsDetails[0].field3 &&
                        <div className="workout-exercise-body-view-data-col">
                            <strong>{exercise.setsDetails[0].field3.value}</strong>&nbsp;<strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field3.unit]).label}</strong>
                            {exercise.setsDetails.length > 1 && exercise.setsDetails[(exercise.setsDetails.length - 1)].field3 &&
                                <strong> - {exercise.setsDetails[(exercise.setsDetails.length - 1)].field3.value}</strong>
                            }
                            &nbsp;
                        {exercise.setsDetails.length > 1 && exercise.setsDetails[(exercise.setsDetails.length - 1)].field3 &&
                                <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[(exercise.setsDetails.length - 1)].field3.unit]).label}</strong>
                            }
                        </div>
                    }
                    <div className="workout-exercise-head-view-edit">
                        <button type="button">
                            <FaPencil />
                        </button>
                    </div>
                    <div className="workout-exercise-head-toggle-actions">
                        <button type="button" onClick={() => this.setState({ show: !show })}>
                            ...
                    </button>
                    </div>
                </div>
                {show &&
                    <div className="workout-exercise-head-view-data-row-ul">
                        <ul>
                            {exercise.setsDetails.map((o, i) => {
                                return (
                                    <li key={i}>
                                        <div className="workout-exercise-advance-set-view-wrapper d-flex">
                                            <div className="workout-exercise-head-view-data-col">
                                                <strong>{`Set #${(i + 1)}`}</strong>
                                            </div>
                                            {o.field1 &&
                                                <div className="workout-exercise-head-view-data-col">
                                                    <strong>{o.field1.value}</strong>&nbsp;<strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', o.field1.unit]).label}</strong>
                                                </div>
                                            }
                                            {o.field2 &&
                                                <div className="workout-exercise-head-view-data-col">
                                                    <strong>{o.field2.value}</strong>&nbsp;<strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', o.field2.unit]).label}</strong>
                                                </div>
                                            }
                                            {o.field3 &&
                                                <div className="workout-exercise-head-view-data-col">
                                                    <strong>{o.field3.value}</strong>&nbsp;<strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', o.field3.unit]).label}</strong>
                                                </div>
                                            }
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                }
            </div>
        );
    }
}

class WorkoutExerciseCircuitAdvanceView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        }
    }

    render() {
        const {
            exercise,
            handleSingleExeDelete,
            exerciseObj,
        } = this.props;
        const { show } = this.state;
        return (
            <div className="workout-exercise-head-view-data-row-inner">
                <div className="workout-exercise-body-view-data-row d-flex">
                    {exercise.setsDetails[0].field1 &&
                        <div className="workout-exercise-body-view-data-col">
                            <strong>{exercise.setsDetails[0].field1.value}</strong>&nbsp;<strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field1.unit]).label}</strong>
                            {exercise.setsDetails.length > 1 && exercise.setsDetails[(exercise.setsDetails.length - 1)].field1 &&
                                <strong> - {exercise.setsDetails[(exercise.setsDetails.length - 1)].field1.value}</strong>
                            }
                            &nbsp;
                            {exercise.setsDetails.length > 1 && exercise.setsDetails[(exercise.setsDetails.length - 1)].field1 &&
                                <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[(exercise.setsDetails.length - 1)].field1.unit]).label}</strong>
                            }
                        </div>
                    }
                    {exercise.setsDetails[0].field2 &&
                        <div className="workout-exercise-body-view-data-col">
                            <strong>{exercise.setsDetails[0].field2.value}</strong>&nbsp;<strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field2.unit]).label}</strong>
                            {exercise.setsDetails.length > 1 && exercise.setsDetails[(exercise.setsDetails.length - 1)].field2 &&
                                <strong> - {exercise.setsDetails[(exercise.setsDetails.length - 1)].field2.value}</strong>
                            }
                            &nbsp;
                            {exercise.setsDetails.length > 1 && exercise.setsDetails[(exercise.setsDetails.length - 1)].field2 &&
                                <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[(exercise.setsDetails.length - 1)].field2.unit]).label}</strong>
                            }
                        </div>
                    }
                    {exercise.setsDetails[0].field3 &&
                        <div className="workout-exercise-body-view-data-col">
                            <strong>{exercise.setsDetails[0].field3.value}</strong>&nbsp;<strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field3.unit]).label}</strong>
                            {exercise.setsDetails.length > 1 && exercise.setsDetails[(exercise.setsDetails.length - 1)].field3 &&
                                <strong> - {exercise.setsDetails[(exercise.setsDetails.length - 1)].field3.value}</strong>
                            }
                            &nbsp;
                            {exercise.setsDetails.length > 1 && exercise.setsDetails[(exercise.setsDetails.length - 1)].field3 &&
                                <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[(exercise.setsDetails.length - 1)].field3.unit]).label}</strong>
                            }
                        </div>
                    }
                    <div className="workout-exercise-head-view-edit">
                        <button type="button">
                            <FaPencil />
                        </button>
                    </div>
                    <div className="workout-exercise-head-toggle-actions">
                        <button type="button" onClick={() => this.setState({ show: !show })}>...</button>
                    </div>
                    <div className="workout-exercise-head-view-cancel">
                        <button type="button" onClick={() => handleSingleExeDelete(exercise._id, exerciseObj)}>
                            <i className="icon-cancel"></i>
                        </button>
                    </div>
                </div>
                {show &&
                    <div className="workout-exercise-head-view-data-row-ul">
                        <ul>
                            {exercise.setsDetails.map((o, i) => {
                                return (
                                    <li key={i}>
                                        <div className="workout-exercise-advance-set-view-wrapper d-flex">
                                            <div className="workout-exercise-head-view-data-col">
                                                <strong>{`Set #${(i + 1)}`}</strong>
                                            </div>
                                            {o.field1 &&
                                                <div className="workout-exercise-head-view-data-col">
                                                    <strong>{o.field1.value}</strong>&nbsp;<strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', o.field1.unit]).label}</strong>
                                                </div>
                                            }
                                            {o.field2 &&
                                                <div className="workout-exercise-head-view-data-col">
                                                    <strong>{o.field2.value}</strong>&nbsp;<strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', o.field2.unit]).label}</strong>
                                                </div>
                                            }
                                            {o.field3 &&
                                                <div className="workout-exercise-head-view-data-col">
                                                    <strong>{o.field3.value}</strong>&nbsp;<strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', o.field3.unit]).label}</strong>
                                                </div>
                                            }
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                }
            </div>
        );
    }
}