import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initialize, reset } from 'redux-form';
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
import { te, ts, prepareExerciseOptions, focusToControl } from '../../helpers/funs';
import { FaPencil, FaTrash } from "react-icons/lib/fa";
import { ButtonToolbar, Dropdown, MenuItem } from "react-bootstrap";
import ReactHtmlParser from "react-html-parser";
import { changeUsersProgramWorkoutFormAction, deleteUserProgramSingleExerciseRequest, deleteUserProgramWholeExerciseRequest, reorderProgramWorkoutExercises, reorderProgramWorkoutExercisesRequest } from '../../actions/userPrograms';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import SweetAlert from "react-bootstrap-sweetalert";
import { showPageLoader, hidePageLoader } from '../../actions/pageLoader';

class ProgramWorkoutExercisesView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDeleteAlert: false,
            deleteWholeExeInit: false,
            showDeleteSingleAlert: false,
            deleteExeId: null,
            reorderInit: false,
        }
    }

    render() {
        const {
            exercises,
            workoutType,
            allowEdit
        } = this.props;
        const { showDeleteAlert, showDeleteSingleAlert } = this.state;
        return (
            <div className="workout-exercises-view-wrapper">
                <DragDropContext onDragEnd={this.handleRearrange}>
                    <Droppable droppableId={workoutType}>
                        {(provided, snapshot) => (
                            <ul ref={provided.innerRef}>
                                {exercises && exercises.length > 0 &&
                                    exercises.map((o, i) => {
                                        return (
                                            <Draggable key={i} draggableId={i} index={i}>
                                                {(provided, snapshot) => (
                                                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                        {o.subType === SCHEDULED_WORKOUT_TYPE_EXERCISE &&
                                                            <WorkoutExerciseSingleView
                                                                exercise={o.exercises[0]}
                                                                exerciseObj={o}
                                                                handleWholeExeDelete={this.handleShowExeDeleteAlert}
                                                                handleFillFormForEdit={this.handleFillFormForEdit}
                                                                allowEdit={allowEdit}
                                                            />
                                                        }
                                                        {o.subType === SCHEDULED_WORKOUT_TYPE_SUPERSET &&
                                                            <WorkoutExerciseSupersetView
                                                                exercises={o.exercises}
                                                                exerciseObj={o}
                                                                handleWholeExeDelete={this.handleShowExeDeleteAlert}
                                                                handleFillFormForEdit={this.handleFillFormForEdit}
                                                                allowEdit={allowEdit}
                                                            />
                                                        }
                                                        {o.subType === SCHEDULED_WORKOUT_TYPE_CIRCUIT &&
                                                            <WorkoutExerciseCircuitView
                                                                exercises={o.exercises}
                                                                exerciseObj={o}
                                                                handleWholeExeDelete={this.handleShowExeDeleteAlert}
                                                                handleSingleExeDelete={this.handleShowExeDeleteSingleAlert}
                                                                handleFillFormForEdit={this.handleFillFormForEdit}
                                                                allowEdit={allowEdit}
                                                            />
                                                        }
                                                    </li>
                                                )}
                                            </Draggable>
                                        );
                                    })
                                }
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
                <SweetAlert
                    show={showDeleteAlert}
                    danger
                    showCancel
                    confirmBtnText="Yes, delete it!"
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title="Are you sure?"
                    onConfirm={this.handleWholeExeDelete}
                    onCancel={this.handleCloseExeDeleteAlert}
                >
                    You will loss the changes and not be able to recover!
                </SweetAlert>
                <SweetAlert
                    show={showDeleteSingleAlert}
                    danger
                    showCancel
                    confirmBtnText="Yes, delete it!"
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title="Are you sure?"
                    onConfirm={this.handleSingleExeDelete}
                    onCancel={this.handleCloseExeDeleteSingleAlert}
                >
                    You will loss the changes and not be able to recover!
                </SweetAlert>
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const { deleteWholeExeInit, reorderInit, requestReorder } = this.state;
        const { loading, error, dispatch, exercises, reorderExercisesLoading, reorderExercisesError, workout } = this.props;
        if (deleteWholeExeInit && !loading) {
            this.setState({ deleteWholeExeInit: false });
            this.handleCloseExeDeleteAlert();
            this.handleCloseExeDeleteSingleAlert();
            if (error && error.length > 0) {
                te(error[0]);
            } else {
                ts('Deleted');
            }
            dispatch(hidePageLoader());
        }
        if (reorderInit) {
            this.setState({ reorderInit: false, requestReorder: true });
            let ex = [];
            exercises.map((o) => {
                ex.push({ id: o._id, sequence: o.sequence });
            });
            let requestData = {
                workoutId: workout._id,
                reorderExercises: ex,
            };
            dispatch(reorderProgramWorkoutExercisesRequest(requestData));
        }
        if (requestReorder && !reorderExercisesLoading) {
            this.setState({ requestReorder: false });
            if (reorderExercisesError && reorderExercisesError.length > 0) {
                te('Something went wrong! please rearrange again.');
            }
        }
    }

    handleShowExeDeleteAlert = (exerciseObj) => {
        this.setState({ showDeleteAlert: true, deleteExeObj: exerciseObj });
    }

    handleCloseExeDeleteAlert = () => {
        this.setState({ showDeleteAlert: false, deleteExeObj: null });
    }

    handleWholeExeDelete = () => {
        const { dispatch } = this.props;
        const { deleteExeObj } = this.state;
        let requestData = {
            exerciseIds: [deleteExeObj._id],
            parentId: deleteExeObj.userWorkoutsProgramId,
        };
        dispatch(showPageLoader());
        dispatch(deleteUserProgramWholeExerciseRequest(requestData));
        dispatch(changeUsersProgramWorkoutFormAction('add', null));
        dispatch(reset('update_schedule_workout_form'));
        this.setState({ deleteWholeExeInit: true, showDeleteAlert: false });
    }

    handleShowExeDeleteSingleAlert = (_id, exerciseObj) => {
        this.setState({ showDeleteSingleAlert: true, deleteExeObj: exerciseObj, deleteExeId: _id });
    }

    handleCloseExeDeleteSingleAlert = () => {
        this.setState({ showDeleteSingleAlert: false, deleteExeObj: null, deleteExeId: null });
    }

    handleSingleExeDelete = () => {
        const { dispatch } = this.props;
        const { deleteExeObj, deleteExeId } = this.state;
        let requestData = {
            subChildIds: [deleteExeId],
            childId: deleteExeObj._id,
            parentId: deleteExeObj.userWorkoutsProgramId,
        };
        dispatch(showPageLoader());
        dispatch(deleteUserProgramSingleExerciseRequest(requestData));
        this.setState({ deleteWholeExeInit: true, showDeleteSingleAlert: false });
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

    handleRearrange = (result, provider) => {
        if (result && result.source && result.destination && result.source.index !== result.destination.index) {
            const { dispatch } = this.props;
            let newOrder = {
                workoutType: result.source.droppableId,
                source: result.source.index,
                destination: result.destination.index,
            };
            dispatch(reorderProgramWorkoutExercises(newOrder));
            this.setState({ reorderInit: true });
        }
    }
}

const mapStateToProps = (state) => {
    const { userPrograms, userScheduleWorkouts } = state;
    return {
        workout: userPrograms.get('workout'),
        loading: userPrograms.get('loading'),
        error: userPrograms.get('error'),
        exercisesList: userScheduleWorkouts.get('exercises'),
        reorderExercisesLoading: userPrograms.get('reorderExercisesLoading'),
        reorderExercisesError: userPrograms.get('reorderExercisesError'),
    };
}

export default connect(
    mapStateToProps,
)(ProgramWorkoutExercisesView);

class WorkoutExerciseSingleView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAdvance: false,
        }
    }

    render() {
        const {
            exercise,
            exerciseObj,
            handleWholeExeDelete,
            handleFillFormForEdit,
            allowEdit
        } = this.props;
        const { showAdvance } = this.state;
        return (
            <div className="workout-exercise-view">
                <div className="workout-exercise-head-view d-flex">
                    <div className="workout-exercise-head-view-l">
                        <strong>{exercise.exercises.name}</strong>
                    </div>
                    <div className="workout-exercise-head-view-r">
                        {exercise.differentSets === 1 &&
                            <ToggleAdvanceSwitch exercise={exercise} showAdvance={showAdvance} handleAdvanceViewChange={() => this.setState({ showAdvance: !showAdvance })} />
                        }
                        {allowEdit &&
                            <ButtonToolbar>
                                <Dropdown id={`workout-actions-${exercise._id}`} pullRight>
                                    <Dropdown.Toggle noCaret><i className="icon-more_horiz"></i></Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <MenuItem eventKey="1" onClick={() => handleFillFormForEdit(exerciseObj)}><FaPencil /> Edit</MenuItem>
                                        <MenuItem eventKey="2" onClick={() => handleWholeExeDelete(exerciseObj)}><FaTrash /> Delete</MenuItem>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </ButtonToolbar>
                        }
                    </div>
                </div>
                <div className="workout-exercise-body-view d-flex">
                    <div className="workout-exercise-body-view-l">
                        <img
                            src={SERVER_BASE_URL + exercise.exercises.images[0]}
                            onError={(e) => {
                                e.target.src = noImg
                            }}
                        />
                    </div>
                    <div className="workout-exercise-body-view-r">
                        <div className="workout-exercise-body-view-desc">
                            {ReactHtmlParser(exercise.exercises.description)}
                        </div>
                        <div className="d-flex">
                            {exercise.differentSets === 0 &&
                                <div className="workout-exercise-head-view-data-row d-flex">
                                    {exercise.sets &&
                                        <div className="workout-exercise-head-view-data-col">
                                            <strong>{'Sets'}</strong><strong>{exercise.sets}</strong>
                                        </div>
                                    }
                                    {typeof exercise.restTime !== 'undefined' &&
                                        <div className="workout-exercise-head-view-data-col">
                                            <strong>{_.find(EXE_REST_TIME_UNITS, ['value', exercise.restTimeUnit]).label} Rest</strong><strong>{exercise.restTime}</strong>
                                        </div>
                                    }
                                    {exercise.setsDetails[0].field1 &&
                                        <div className="workout-exercise-head-view-data-col">
                                            <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field1.unit]).label}</strong><strong>{exercise.setsDetails[0].field1.value}</strong>
                                        </div>
                                    }
                                    {exercise.setsDetails[0].field2 &&
                                        <div className="workout-exercise-head-view-data-col">
                                            <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field2.unit]).label}</strong><strong>{exercise.setsDetails[0].field2.value}</strong>
                                        </div>
                                    }
                                    {exercise.setsDetails[0].field3 &&
                                        <div className="workout-exercise-head-view-data-col">
                                            <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field3.unit]).label}</strong><strong>{exercise.setsDetails[0].field3.value}</strong>
                                        </div>
                                    }
                                </div>
                            }
                            {exercise.differentSets === 1 &&
                                <WorkoutExerciseSingleAdvanceView exercise={exercise} showAdvance={showAdvance} />
                            }
                        </div>
                    </div>
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
                                    <strong>{'Sets'}</strong><strong>{exercises[0].sets}</strong>
                                </div>
                            }
                            {typeof exercises[0].restTime !== 'undefined' &&
                                <div className="workout-exercise-head-view-data-col">
                                    <strong>{_.find(EXE_REST_TIME_UNITS, ['value', exercises[0].restTimeUnit]).label} Rest</strong><strong>{exercises[0].restTime}</strong>
                                </div>
                            }
                        </div>
                        {allowEdit &&
                            <ButtonToolbar>
                                <Dropdown id={`workout-actions-${exercises[0]._id}`} pullRight>
                                    <Dropdown.Toggle noCaret><i className="icon-more_horiz"></i></Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <MenuItem eventKey="1" onClick={() => handleFillFormForEdit(exerciseObj)}><FaPencil /> Edit</MenuItem>
                                        <MenuItem eventKey="2" onClick={() => handleWholeExeDelete(exerciseObj)}><FaTrash /> Delete</MenuItem>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </ButtonToolbar>
                        }
                    </div>

                </div>
                <ul className="workout-exercise-body-view-ul">
                    <li>
                        <div className="workout-exercise-body-view-wrapper">
                            {exercises && exercises.length > 0 &&
                                exercises.map((exercise, index) => {
                                    return (
                                        <WorkoutExerciseSupersetNormalView key={index} exercise={exercise} />
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
                                    <strong>{'Sets'}</strong><strong>{exercises[0].sets}</strong>
                                </div>
                            }
                            {typeof exercises[0].restTime !== 'undefined' &&
                                <div className="workout-exercise-head-view-data-col">
                                    <strong>{_.find(EXE_REST_TIME_UNITS, ['value', exercises[0].restTimeUnit]).label} Rest</strong><strong>{exercises[0].restTime}</strong>
                                </div>
                            }
                        </div>
                        {allowEdit &&
                            <ButtonToolbar>
                                <Dropdown id={`workout-actions-${exercises[0]._id}`} pullRight>
                                    <Dropdown.Toggle noCaret><i className="icon-more_horiz"></i></Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <MenuItem eventKey="1" onClick={() => handleFillFormForEdit(exerciseObj)}><FaPencil /> Edit</MenuItem>
                                        <MenuItem eventKey="2" onClick={() => handleWholeExeDelete(exerciseObj)}><FaTrash /> Delete</MenuItem>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </ButtonToolbar>
                        }
                    </div>
                </div>
                <ul className="workout-exercise-body-view-ul">
                    <li>
                        <div className="workout-exercise-body-view-wrapper">
                            {exercises && exercises.length > 0 &&
                                exercises.map((exercise, index) => {
                                    return (
                                        <WorkoutExerciseCircuitNormalView key={index} exercise={exercise} exerciseObj={exerciseObj} handleSingleExeDelete={handleSingleExeDelete} />
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
    render() {
        const {
            exercise,
            showAdvance,
        } = this.props;
        return (
            <div className="workout-exercise-head-view-data-row-inner">
                {!showAdvance &&
                    <div className="workout-exercise-head-view-data-row d-flex">
                        {exercise.sets &&
                            <div className="workout-exercise-head-view-data-col">
                                <strong>{'Sets'}</strong><strong>{exercise.sets}</strong>
                            </div>
                        }
                        {typeof exercise.setsDetails[0].restTime !== 'undefined' &&
                            <div className="workout-exercise-head-view-data-col">
                                <strong>{_.find(EXE_REST_TIME_UNITS, ['value', exercise.setsDetails[0].restTimeUnit]).label} Rest</strong>
                                <strong>
                                    {exercise.setsDetails[0].restTime}
                                    {exercise.setsDetails.length > 2 && typeof exercise.setsDetails[(exercise.setsDetails.length - 2)].restTime !== 'undefined' &&
                                        ' - ' + exercise.setsDetails[(exercise.setsDetails.length - 2)].restTime
                                    }
                                </strong>
                            </div>
                        }
                        {exercise.setsDetails[0].field1 &&
                            <div className="workout-exercise-head-view-data-col">
                                <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field1.unit]).label}</strong>
                                <strong>
                                    {exercise.setsDetails[0].field1.value}
                                    {exercise.setsDetails.length > 2 && exercise.setsDetails[(exercise.setsDetails.length - 2)].field1 &&
                                        ' - ' + exercise.setsDetails[(exercise.setsDetails.length - 2)].field1.value
                                    }
                                </strong>
                            </div>
                        }
                        {exercise.setsDetails[0].field2 &&
                            <div className="workout-exercise-head-view-data-col">
                                <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field2.unit]).label}</strong>
                                <strong>
                                    {exercise.setsDetails[0].field2.value}
                                    {exercise.setsDetails.length > 2 && exercise.setsDetails[(exercise.setsDetails.length - 2)].field2 &&
                                        ' - ' + exercise.setsDetails[(exercise.setsDetails.length - 2)].field2.value
                                    }
                                </strong>
                            </div>
                        }
                        {exercise.setsDetails[0].field3 &&
                            <div className="workout-exercise-head-view-data-col">
                                <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field3.unit]).label}</strong><strong>{exercise.setsDetails[0].field3.value}</strong>
                                {exercise.setsDetails.length > 2 && exercise.setsDetails[(exercise.setsDetails.length - 2)].field3 &&
                                    <strong> - {_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[(exercise.setsDetails.length - 2)].field3.unit]).label}</strong>
                                }

                                {exercise.setsDetails.length > 2 && exercise.setsDetails[(exercise.setsDetails.length - 2)].field3 &&
                                    <strong>{exercise.setsDetails[(exercise.setsDetails.length - 2)].field3.value}</strong>
                                }
                            </div>
                        }
                    </div>
                }
                {showAdvance &&
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
                                                    <strong>{_.find(EXE_REST_TIME_UNITS, ['value', o.restTimeUnit]).label} Rest</strong><strong>{o.restTime}</strong>
                                                </div>
                                            }
                                            {o.field1 &&
                                                <div className="workout-exercise-head-view-data-col">
                                                    <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', o.field1.unit]).label}</strong><strong>{o.field1.value}</strong>
                                                </div>
                                            }
                                            {o.field2 &&
                                                <div className="workout-exercise-head-view-data-col">
                                                    <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', o.field2.unit]).label}</strong><strong>{o.field2.value}</strong>
                                                </div>
                                            }
                                            {o.field3 &&
                                                <div className="workout-exercise-head-view-data-col">
                                                    <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', o.field3.unit]).label}</strong><strong>{o.field3.value}</strong>
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

class WorkoutExerciseSupersetNormalView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAdvance: false,
        }
    }

    render() {
        const { exercise } = this.props;
        const { showAdvance } = this.state;
        return (
            <div className="workout-exercise-body-view">
                <div className="workout-exercise-body-head-view d-flex">
                    <div className="workout-exercise-head-view-l">
                        <strong>{exercise.exercises.name}</strong>
                    </div>
                    <div className="workout-exercise-head-view-r">
                        {exercise.differentSets === 1 &&
                            <ToggleAdvanceSwitch exercise={exercise} showAdvance={showAdvance} handleAdvanceViewChange={() => this.setState({ showAdvance: !showAdvance })} />
                        }
                    </div>
                </div>
                <div className="workout-exercise-body-content-view d-flex">
                    <div className="workout-exercise-body-content-view-l">
                        <img
                            src={SERVER_BASE_URL + exercise.exercises.images[0]}
                            onError={(e) => {
                                e.target.src = noImg
                            }}
                        />
                    </div>
                    <div className="workout-exercise-body-content-view-r">
                        <div className="workout-exercise-body-view-desc">
                            {ReactHtmlParser(exercise.exercises.description)}
                        </div>
                        <div className="d-flex">
                            {exercise.differentSets === 0 &&
                                <div className="workout-exercise-body-view-data-row d-flex">
                                    {exercise.setsDetails[0].field1 &&
                                        <div className="workout-exercise-body-view-data-col">
                                            <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field1.unit]).label}</strong><strong>{exercise.setsDetails[0].field1.value}</strong>
                                        </div>
                                    }
                                    {exercise.setsDetails[0].field2 &&
                                        <div className="workout-exercise-body-view-data-col">
                                            <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field2.unit]).label}</strong><strong>{exercise.setsDetails[0].field2.value}</strong>
                                        </div>
                                    }
                                    {exercise.setsDetails[0].field3 &&
                                        <div className="workout-exercise-body-view-data-col">
                                            <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field3.unit]).label}</strong><strong>{exercise.setsDetails[0].field3.value}</strong>
                                        </div>
                                    }
                                </div>
                            }
                            {exercise.differentSets === 1 &&
                                <WorkoutExerciseSupersetAdvanceView exercise={exercise} showAdvance={showAdvance} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class WorkoutExerciseSupersetAdvanceView extends Component {
    render() {
        const {
            exercise,
            showAdvance
        } = this.props;
        return (
            <div className="workout-exercise-head-view-data-row-inner ">
                {!showAdvance &&
                    <div className="workout-exercise-body-view-data-row d-flex">
                        {exercise.setsDetails[0].field1 &&
                            <div className="workout-exercise-body-view-data-col">
                                <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field1.unit]).label}</strong>
                                <strong>
                                    {exercise.setsDetails[0].field1.value}
                                    {exercise.setsDetails.length > 2 && exercise.setsDetails[(exercise.setsDetails.length - 2)].field1 &&
                                        ' - ' + exercise.setsDetails[(exercise.setsDetails.length - 2)].field1.value
                                    }
                                </strong>
                            </div>
                        }
                        {exercise.setsDetails[0].field2 &&
                            <div className="workout-exercise-body-view-data-col">
                                <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field2.unit]).label}</strong>
                                <strong>
                                    {exercise.setsDetails[0].field2.value}
                                    {exercise.setsDetails.length > 2 && exercise.setsDetails[(exercise.setsDetails.length - 2)].field2 &&
                                        ' - ' + exercise.setsDetails[(exercise.setsDetails.length - 2)].field2.value
                                    }
                                </strong>
                            </div>
                        }
                        {exercise.setsDetails[0].field3 &&
                            <div className="workout-exercise-body-view-data-col">
                                <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field3.unit]).label}</strong>
                                <strong>
                                    {exercise.setsDetails[0].field3.value}
                                    {exercise.setsDetails.length > 2 && exercise.setsDetails[(exercise.setsDetails.length - 2)].field3 &&
                                        ' - ' + exercise.setsDetails[(exercise.setsDetails.length - 2)].field3.value
                                    }
                                </strong>
                            </div>
                        }
                    </div>
                }
                {showAdvance &&
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
                                                    <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', o.field1.unit]).label}</strong><strong>{o.field1.value}</strong>
                                                </div>
                                            }
                                            {o.field2 &&
                                                <div className="workout-exercise-head-view-data-col">
                                                    <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', o.field2.unit]).label}</strong><strong>{o.field2.value}</strong>
                                                </div>
                                            }
                                            {o.field3 &&
                                                <div className="workout-exercise-head-view-data-col">
                                                    <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', o.field3.unit]).label}</strong><strong>{o.field3.value}</strong>
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

class WorkoutExerciseCircuitNormalView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAdvance: false,
        }
    }

    render() {
        const { exercise, exerciseObj, handleSingleExeDelete } = this.props;
        const { showAdvance } = this.state;
        return (
            <div className="workout-exercise-body-view">
                <div className="workout-exercise-body-head-view d-flex">
                    <div className="workout-exercise-head-view-l">
                        <strong>{exercise.exercises.name}</strong>
                    </div>

                    <div className="workout-exercise-head-view-r">
                        {exercise.differentSets === 1 &&
                            <ToggleAdvanceSwitch exercise={exercise} showAdvance={showAdvance} handleAdvanceViewChange={() => this.setState({ showAdvance: !showAdvance })} />
                        }
                        <div className="workout-exercise-head-view-cancel">
                            <button type="button" onClick={() => handleSingleExeDelete(exercise._id, exerciseObj)}>
                                <i className="icon-cancel"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="workout-exercise-body-content-view d-flex">
                    <div className="workout-exercise-body-content-view-l">
                        <img
                            src={SERVER_BASE_URL + exercise.exercises.images[0]}
                            onError={(e) => {
                                e.target.src = noImg
                            }}
                        />
                    </div>
                    <div className="workout-exercise-body-content-view-r">
                        <div className="workout-exercise-body-view-desc">
                            {ReactHtmlParser(exercise.exercises.description)}
                        </div>
                        <div className="d-flex">
                            {exercise.differentSets === 0 &&
                                <div className="workout-exercise-body-view-data-row d-flex">
                                    {exercise.setsDetails[0].field1 &&
                                        <div className="workout-exercise-body-view-data-col">
                                            <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field1.unit]).label}</strong><strong>{exercise.setsDetails[0].field1.value}</strong>
                                        </div>
                                    }
                                    {exercise.setsDetails[0].field2 &&
                                        <div className="workout-exercise-body-view-data-col">
                                            <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field2.unit]).label}</strong><strong>{exercise.setsDetails[0].field2.value}</strong>
                                        </div>
                                    }
                                    {exercise.setsDetails[0].field3 &&
                                        <div className="workout-exercise-body-view-data-col">
                                            <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field3.unit]).label}</strong><strong>{exercise.setsDetails[0].field3.value}</strong>
                                        </div>
                                    }
                                </div>
                            }
                            {exercise.differentSets === 1 &&
                                <WorkoutExerciseCircuitAdvanceView
                                    exercise={exercise}
                                    exerciseObj={exerciseObj}
                                    handleSingleExeDelete={handleSingleExeDelete}
                                    showAdvance={showAdvance}
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class WorkoutExerciseCircuitAdvanceView extends Component {
    render() {
        const {
            exercise,
            showAdvance
        } = this.props;
        return (
            <div className="workout-exercise-head-view-data-row-inner">
                {!showAdvance &&
                    <div className="workout-exercise-body-view-data-row d-flex">
                        {exercise.setsDetails[0].field1 &&
                            <div className="workout-exercise-body-view-data-col">
                                <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field1.unit]).label}</strong>
                                <strong>
                                    {exercise.setsDetails[0].field1.value}
                                    {exercise.setsDetails.length > 2 && exercise.setsDetails[(exercise.setsDetails.length - 2)].field1 &&
                                        ' - ' + exercise.setsDetails[(exercise.setsDetails.length - 2)].field1.value
                                    }
                                </strong>
                            </div>
                        }
                        {exercise.setsDetails[0].field2 &&
                            <div className="workout-exercise-body-view-data-col">
                                <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field2.unit]).label}</strong>
                                <strong>
                                    {exercise.setsDetails[0].field2.value}
                                    {exercise.setsDetails.length > 2 && exercise.setsDetails[(exercise.setsDetails.length - 2)].field2 &&
                                        ' - ' + exercise.setsDetails[(exercise.setsDetails.length - 2)].field2.value
                                    }
                                </strong>
                            </div>
                        }
                        {exercise.setsDetails[0].field3 &&
                            <div className="workout-exercise-body-view-data-col">
                                <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field3.unit]).label}</strong>
                                <strong>
                                    {exercise.setsDetails[0].field3.value}
                                    {exercise.setsDetails.length > 2 && exercise.setsDetails[(exercise.setsDetails.length - 2)].field3 &&
                                        ' - ' + exercise.setsDetails[(exercise.setsDetails.length - 2)].field3.value
                                    }
                                </strong>
                            </div>
                        }
                    </div>
                }
                {showAdvance &&
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
                                                    <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', o.field1.unit]).label}</strong><strong>{o.field1.value}</strong>
                                                </div>
                                            }
                                            {o.field2 &&
                                                <div className="workout-exercise-head-view-data-col">
                                                    <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', o.field2.unit]).label}</strong><strong>{o.field2.value}</strong>
                                                </div>
                                            }
                                            {o.field3 &&
                                                <div className="workout-exercise-head-view-data-col">
                                                    <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', o.field3.unit]).label}</strong><strong>{o.field3.value}</strong>
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

class ToggleAdvanceSwitch extends Component {
    render() {
        const {
            exercise,
            showAdvance,
            handleAdvanceViewChange
        } = this.props;
        return (
            <div className="advance-toggle-switch-workout-view switch-wrap">
                <small>Advance View</small>
                <div className="material-switch">
                    <input
                        id={`advance_toggle_${exercise._id}`}
                        name={`advance_toggle_${exercise._id}`}
                        type="checkbox"
                        checked={showAdvance}
                        onChange={handleAdvanceViewChange}
                    />
                    <label htmlFor={`advance_toggle_${exercise._id}`} className="label-default"></label>
                </div>
            </div>
        );
    }
}