import React, { Component } from 'react';
import { connect } from 'react-redux';
import FitnessHeader from '../global/FitnessHeader';
import FitnessNav from '../global/FitnessNav';
import { getUserProgramRequest, setSelectedDayForProgram, addUsersProgramWorkoutScheduleRequest, copyUserProgramWorkoutSchedule, deleteUsersProgramWorkoutScheduleRequest, selectUsersProgramWorkoutScheduleForEdit, addUserProgramWorkoutTitleRequest } from '../../actions/userPrograms';
import { routeCodes } from '../../constants/routes';
import { te, ts } from '../../helpers/funs';
import _ from "lodash";
import SweetAlert from "react-bootstrap-sweetalert";
import { FaCopy, FaTrash, FaPencil, FaEye } from 'react-icons/lib/fa'
import { NavLink } from "react-router-dom";
import { getExercisesNameRequest, getProgramsNameRequest } from '../../actions/userScheduleWorkouts';
import { SCHEDULED_WORKOUT_TYPE_RESTDAY, SCHEDULED_WORKOUT_TYPE_EXERCISE } from '../../constants/consts';
import cns from "classnames";
import AddProgramWorkoutTitleForm from './AddProgramWorkoutTitleForm';

class ProgramSave extends Component {
    constructor(props) {
        super(props);
        this.state = {
            program: null,
            workouts: [],
            totalDays: 7,
            showSelectEventAlert: false,
            workoutPasteAction: false,
            deleteWorkoutAlert: false,
            deleteWorkoutActionInit: false,
            selectedWorkoutIdss: null,
            deleteWeekAlert: false,
            deleteWeekActionInit: false,
            selectedWorkoutIds: [],
            deleteBulkActionAlert: false,
            deleteBulkActionInit: false,
            showAddWorkoutTitleAlert: false,
            addWorkoutTitleInit: false,
        }
    }

    componentWillMount() {
        const { dispatch } = this.props;
        this.getProgramWorkoutSchedules();
        dispatch(getExercisesNameRequest());
        dispatch(getProgramsNameRequest());
    }

    render() {
        const {
            program,
            totalDays,
            workouts,
            showSelectEventAlert,
            deleteWorkoutAlert,
            deleteWeekAlert,
            deleteBulkActionAlert,
            showAddWorkoutTitleAlert,
        } = this.state;
        const {
            selectedDay,
        } = this.props;
        var selectedEvents = _.filter(workouts, ['isSelectedForBulkAction', true]);
        return (
            <div className="fitness-body">
                <FitnessHeader />
                <FitnessNav />
                <section className="body-wrap">
                    <div className="body-head d-flex justify-content-start">
                        <div className="body-head-l">
                            <h2>{(program && program.name) ? program.name : ''}</h2>
                            <p>{(program && program.description) ? program.description : ''}</p>
                        </div>
                    </div>
                    <div className="body-content d-flex row justify-content-start">
                        <div className="col-md-12">
                            <div className="white-box space-btm-20">
                                <div className="whitebox-body profile-body programs-table-wrapper">
                                    {selectedEvents && selectedEvents.length > 0 &&
                                        <div>
                                            <a href="javascript:void(0)" onClick={() => this.setState({ deleteBulkActionAlert: true })}>({selectedEvents.length}) Delete Selected</a>
                                        </div>
                                    }
                                    <CustomDaysCalendarView
                                        programId={(program) ? program._id : null}
                                        totalDays={totalDays}
                                        workouts={workouts}
                                        handleSelectDayAction={this.handleSelectDayAction}
                                        handleCopy={this.handleCopy}
                                        handleDelete={this.showDeleteConfirmation}
                                        handleSelectedForBulk={this.handleSelectedForBulk}
                                    />
                                    <div className="d-flex week-btn-btm">
                                        <a href="javascript:void(0)" className="program-save-add-week-btn" onClick={this.handleAddWeek}><i className="icon-add_box"></i> Add Week</a>
                                        {totalDays > 7 &&
                                            <a href="javascript:void(0)" className="program-save-delete-week-btn" onClick={this.handleShowDeleteWeekAlert}><i className="icon-delete_forever"></i> Delete Week</a>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <SweetAlert
                    type="default"
                    title={`Select event for - Day ${selectedDay}`}
                    onCancel={this.cancelSelectDayAction}
                    onConfirm={() => { }}
                    btnSize="sm"
                    cancelBtnBsStyle="danger"
                    show={showSelectEventAlert}
                    showConfirm={false}
                    showCancel={true}
                    closeOnClickOutside={false}
                >
                    <SelectEventView
                        handleAddWorkout={this.handleAddWorkout}
                        handleNewRestDay={this.handleNewRestDay}
                        handlePaste={this.handlePaste}
                    />
                </SweetAlert>

                <SweetAlert
                    show={deleteWorkoutAlert}
                    warning
                    showCancel
                    confirmBtnText="Yes, delete it!"
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title="Are you sure?"
                    onConfirm={this.handleDeleteWorkoutSchedule}
                    onCancel={this.handleCancelDelete}
                >
                    You will not be able to recover this file!
                </SweetAlert>

                <SweetAlert
                    show={deleteWeekAlert}
                    warning
                    showCancel
                    confirmBtnText="Yes, delete it!"
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title="Are you sure?"
                    onConfirm={this.handleDeleteWeek}
                    onCancel={this.handleCancelDeleteWeek}
                >
                    You will not be able to recover this file!
                </SweetAlert>

                <SweetAlert
                    show={deleteBulkActionAlert}
                    warning
                    showCancel
                    confirmBtnText="Yes, delete it!"
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title="Are you sure?"
                    onConfirm={this.handleDeleteBulkWorkoutSchedule}
                    onCancel={() => this.setState({ deleteBulkActionAlert: false })}
                >
                    You will not be able to recover this file!
                </SweetAlert>

                <SweetAlert
                    type="default"
                    title={`Add workout for - Day ${selectedDay}`}
                    onConfirm={() => { }}
                    btnSize="sm"
                    cancelBtnBsStyle="danger"
                    confirmBtnBsStyle="success"
                    show={showAddWorkoutTitleAlert}
                    showConfirm={false}
                    showCancel={false}
                    closeOnClickOutside={false}
                >
                    <AddProgramWorkoutTitleForm
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
            program,
            error,
            history,
            workout,
            match,
            loadingTitle,
            workoutTitle,
            errorTitle,
        } = this.props;
        const {
            workoutPasteAction,
            deleteWorkoutActionInit,
            selectedWorkoutIds,
            deleteWeekActionInit,
            deleteBulkActionInit,
            addWorkoutTitleInit,
        } = this.state;
        if (!loading && error && error.length > 0) {
            te(error[0]);
            history.push(routeCodes.PROGRAMS);
        }
        if (!loading && program && prevProps.program !== program) {
            var prog = (program.programDetails) ? program.programDetails : null;
            var works = (program.workouts) ? program.workouts : [];
            var lastDay = 1;
            if (works && works.length > 0) {
                lastDay = (works[(works.length - 1)].day);
                lastDay++;
                works = _.map(works, (w) => {
                    return _.assignIn({}, w, { isSelectedForBulkAction: false });
                });
            }
            var getNumberOfWeek = Math.ceil(lastDay / 7);
            var totalDaysToGenerate = (getNumberOfWeek * 7);
            if (prog) {
                this.setState({
                    program: prog,
                    workouts: works,
                    totalDays: totalDaysToGenerate,
                });
            } else {
                te('Something went wrong! please try again later.');
                history.push(routeCodes.PROGRAMS);
            }
        }
        if (!loading && workout && prevProps.workout !== workout) {
            this.getProgramWorkoutSchedules();
            this.cancelSelectDayAction();
            if (workoutPasteAction) {
                ts('Workout pasted!');
                this.setState({ workoutPasteAction: false });
            }
        }
        if (deleteWorkoutActionInit && selectedWorkoutIds && selectedWorkoutIds.length > 0 && !loading) {
            this.setState({ deleteWorkoutActionInit: false, selectedWorkoutIds: [] });
            this.getProgramWorkoutSchedules();
            if (error.length <= 0) {
                ts('Workout deleted successfully!');
            } else {
                te('Cannot delete workout. Please try again later!');
            }
        }
        if (deleteWeekActionInit && selectedWorkoutIds && selectedWorkoutIds.length > 0 && !loading) {
            this.setState({ deleteWeekActionInit: false, selectedWorkoutIds: [] });
            this.getProgramWorkoutSchedules();
            if (error.length <= 0) {
                ts('Week deleted successfully!');
            } else {
                te('Cannot delete week. Please try again later!');
            }
        }
        if (deleteBulkActionInit && !loading) {
            this.setState({ deleteBulkActionInit: false });
            this.getProgramWorkoutSchedules();
            if (error.length <= 0) {
                ts('Workouts deleted successfully!');
            } else {
                te('Cannot delete workouts. Please try again later!');
            }
        }
        if (addWorkoutTitleInit && !loadingTitle && workoutTitle && prevProps.workoutTitle !== workoutTitle) {
            this.setState({ addWorkoutTitleInit: false });
            if (errorTitle && errorTitle.length <= 0) {
                var program_id = match.params.id;
                var workout_id = workoutTitle._id;
                let url = routeCodes.SAVE_PROGRAM_SCHEDULE_WORKOUT.replace(':id', program_id);
                url = url.replace(':workout_id', workout_id);
                history.push(url);
            } else {
                te(errorTitle[0]);
            }
        }
    }

    getProgramWorkoutSchedules = () => {
        const { match, dispatch } = this.props;
        if (match && match.params && match.params.id) {
            var _id = match.params.id;
            dispatch(getUserProgramRequest(_id));
        }
    }

    handleAddWeek = () => {
        this.setState({
            totalDays: (this.state.totalDays + 7)
        });
    }

    handleShowDeleteWeekAlert = () => {
        const { totalDays, workouts } = this.state;
        var start = (totalDays - 7);
        var end = totalDays;
        var selectedWorkoutIds = [];
        for (let day = start; day < end; day++) {
            var filterWorkouts = _.filter(workouts, { 'day': day });
            if (filterWorkouts && filterWorkouts.length > 0) {
                _.forEach(filterWorkouts, (o, i) => {
                    selectedWorkoutIds.push(o._id);
                });
            }
        }
        this.setState({
            selectedWorkoutIds: selectedWorkoutIds,
            deleteWeekAlert: true,
        });
    }

    handleCancelDeleteWeek = () => {
        this.setState({
            selectedWorkoutIds: [],
            deleteWeekAlert: false,
        });
    }

    handleDeleteWeek = () => {
        const { dispatch } = this.props;
        const { selectedWorkoutIds, totalDays } = this.state;
        if (selectedWorkoutIds && selectedWorkoutIds.length > 0) {
            var requestData = {
                exercisesIds: selectedWorkoutIds,
            }
            dispatch(deleteUsersProgramWorkoutScheduleRequest(requestData));
            this.setState({ deleteWeekAlert: false, deleteWeekActionInit: true });
        } else {
            this.setState({ deleteWeekAlert: false, selectedWorkoutIds: [], totalDays: (totalDays - 7) });
            ts('Week deleted successfully!');
        }
    }

    handleSelectDayAction = (day) => {
        const { dispatch } = this.props;
        this.setState({
            showSelectEventAlert: true,
        });
        dispatch(setSelectedDayForProgram(day));
    }

    cancelSelectDayAction = () => {
        const { dispatch } = this.props;
        this.setState({
            showSelectEventAlert: false,
        });
        dispatch(setSelectedDayForProgram(null));
    }

    handleNewRestDay = () => {
        const { selectedDay, dispatch, match } = this.props;
        if (match && match.params && match.params.id) {
            var _id = match.params.id;
            var requestData = {
                programId: _id,
                title: 'Rest Day',
                description: 'Hey its rest day! Take total rest.',
                type: SCHEDULED_WORKOUT_TYPE_RESTDAY,
                day: (selectedDay - 1),
                exercises: [],
            };
        }
        dispatch(addUsersProgramWorkoutScheduleRequest(requestData));
    }

    handleCopy = (selectedEvent) => {
        const { dispatch } = this.props;
        dispatch(copyUserProgramWorkoutSchedule(selectedEvent));
        ts('Workout copied!');
    }

    handlePaste = () => {
        const { copiedWorkout, selectedDay, dispatch, match } = this.props;
        if (copiedWorkout && match && match.params && match.params.id) {
            var exercises = [];
            var copiedExercises = copiedWorkout.exercises;
            _.forEach(copiedExercises, (exercise, index) => {
                var exerciseObj = {
                    exerciseId: exercise.exercise._id,
                    type: exercise.type,
                    reps: (exercise.reps) ? exercise.reps : null,
                    sets: (exercise.sets) ? exercise.sets : null,
                    weight: (exercise.weight) ? exercise.weight : null,
                    weightUnits: (exercise.weightUnits) ? exercise.weightUnits : MEASUREMENT_UNIT_KILOGRAM,
                    distance: (exercise.distance) ? exercise.distance : null,
                    distanceUnits: (exercise.distanceUnits) ? exercise.distanceUnits : MEASUREMENT_UNIT_KILOMETER,
                    restTime: (exercise.restTime) ? exercise.restTime : null,
                    oneSetTimer: (exercise.oneSetTimer) ? exercise.oneSetTimer : null,
                    sequence: (typeof exercise.sequence !== 'undefined') ? exercise.sequence : 0,
                };
                exercises.push(exerciseObj);
            });
            var requestData = {
                programId: match.params.id,
                title: copiedWorkout.title,
                description: copiedWorkout.description,
                type: SCHEDULED_WORKOUT_TYPE_EXERCISE,
                day: (selectedDay - 1),
                exercises: exercises,
            };
            dispatch(addUsersProgramWorkoutScheduleRequest(requestData));
            this.setState({ workoutPasteAction: true });
        } else {
            te('There is no workout copied!');
        }
    }

    showDeleteConfirmation = (_id) => {
        var ids = [_id];
        this.setState({
            deleteWorkoutAlert: true,
            selectedWorkoutIds: ids,
        });
    }

    handleCancelDelete = () => {
        this.setState({
            deleteWorkoutAlert: false,
            selectedWorkoutIds: null,
        });
    }

    handleDeleteWorkoutSchedule = () => {
        const { dispatch } = this.props;
        const { selectedWorkoutIds } = this.state;
        if (selectedWorkoutIds && selectedWorkoutIds.length > 0) {
            var requestData = {
                exercisesIds: selectedWorkoutIds,
            }
            dispatch(deleteUsersProgramWorkoutScheduleRequest(requestData));
        }
        this.setState({ deleteWorkoutAlert: false, deleteWorkoutActionInit: true });
    }

    handleSelectedForBulk = (_id) => {
        const workoutEvents = this.state.workouts;
        var workouts = Object.assign([], workoutEvents);
        var selectedWorkout = _.find(workouts, ['_id', _id]);
        if (selectedWorkout) {
            var isSelectedForBulkAction = (typeof selectedWorkout.isSelectedForBulkAction !== 'undefined') ? (selectedWorkout.isSelectedForBulkAction === false) ? true : false : true;
            var workout = Object.assign({}, selectedWorkout);
            workout.isSelectedForBulkAction = isSelectedForBulkAction;
            var index = _.findIndex(workouts, ['_id', _id]);
            workouts[index] = workout;
            this.setState({
                workouts: workouts,
            });
        }
    }

    handleDeleteBulkWorkoutSchedule = () => {
        const { dispatch } = this.props;
        const workoutEvents = this.state.workouts;
        var selectedEvents = _.filter(workoutEvents, ['isSelectedForBulkAction', true]);
        var selectedIds = _.map(selectedEvents, '_id');
        var requestData = {
            exercisesIds: selectedIds,
        }
        dispatch(deleteUsersProgramWorkoutScheduleRequest(requestData));
        this.setState({ deleteBulkActionInit: true, deleteBulkActionAlert: false });
    }

    handleAddWorkout = () => {
        this.setState({
            showSelectEventAlert: false,
            showAddWorkoutTitleAlert: true,
        });
    }

    handleAddWorkoutTitleCancel = () => {
        const { dispatch } = this.props;
        this.setState({
            showSelectEventAlert: false,
            showAddWorkoutTitleAlert: false,
        });
        dispatch(setSelectedDayForProgram(null));
    }

    handleAddTitleSubmit = (data) => {
        const { selectedDay, dispatch, match } = this.props;
        var requestData = {
            programId: match.params.id,
            title: data.title,
            description: (data.description) ? data.description : '',
            type: SCHEDULED_WORKOUT_TYPE_EXERCISE,
            day: (selectedDay - 1),
        }
        dispatch(addUserProgramWorkoutTitleRequest(requestData));
        this.setState({ addWorkoutTitleInit: true });
    }
}

const mapStateToProps = (state) => {
    const { userPrograms } = state;
    return {
        loading: userPrograms.get('loading'),
        program: userPrograms.get('program'),
        error: userPrograms.get('error'),
        selectedDay: userPrograms.get('selectedDay'),
        workout: userPrograms.get('workout'),
        copiedWorkout: userPrograms.get('copiedWorkout'),
        loadingTitle: userPrograms.get('loadingTitle'),
        workoutTitle: userPrograms.get('workoutTitle'),
        errorTitle: userPrograms.get('errorTitle'),
    };
}

export default connect(
    mapStateToProps,
)(ProgramSave);

class CustomDaysCalendarView extends Component {
    render() {
        const {
            totalDays,
            workouts,
            handleSelectDayAction,
            handleCopy,
            handleDelete,
            handleSelectedForBulk,
        } = this.props;
        var rows = (totalDays / 7);
        var rowsObj = [];
        for (let index = 1; index <= rows; index++) {
            rowsObj.push(
                <CustomDaysCalendarRow
                    rowNumber={index}
                    key={index}
                    workouts={workouts}
                    handleSelectDayAction={handleSelectDayAction}
                    handleCopy={handleCopy}
                    handleDelete={handleDelete}
                    handleSelectedForBulk={handleSelectedForBulk}
                />
            )
        }
        return (
            <div className="program-save-custom-days-wrapper">
                {rowsObj}
            </div>
        );
    }
}

class CustomDaysCalendarRow extends Component {
    render() {
        const {
            rowNumber,
            workouts,
            handleSelectDayAction,
            handleCopy,
            handleDelete,
            handleSelectedForBulk,
        } = this.props;
        var end = rowNumber * 7;
        var start = end - (7 - 1);
        var blockObj = [];
        for (let index = start; index <= end; index++) {
            blockObj.push(
                <CustomDaysCalendarBlock
                    blockNumber={index}
                    key={index}
                    workouts={workouts}
                    handleSelectDayAction={handleSelectDayAction}
                    handleCopy={handleCopy}
                    handleDelete={handleDelete}
                    handleSelectedForBulk={handleSelectedForBulk}
                />
            )
        }
        return (
            <div className="program-save-custom-days-row">
                {blockObj}
            </div>
        );
    }
}

class CustomDaysCalendarBlock extends Component {
    render() {
        const {
            blockNumber,
            workouts,
            handleSelectDayAction,
        } = this.props;
        var findDay = (blockNumber - 1);
        var events = _.filter(workouts, { 'day': findDay });
        return (
            <div className="program-save-custom-days-block" onClick={() => handleSelectDayAction(blockNumber)}>
                <div className="program-save-custom-days-block-title">
                    Day {blockNumber}
                </div>
                <div className="program-save-custom-days-block-content">
                    {events && events.length > 0 &&
                        <div className="program-event-block-main-wrapper">
                            {
                                events.map((e, i) => {
                                    return (
                                        <div className={cns('program-event-block-wrapper', { 'restday': (e.type === SCHEDULED_WORKOUT_TYPE_RESTDAY) })} key={i} onClick={(e) => e.stopPropagation()}>
                                            <div className="program-event-block-title">
                                                <div className="pull-left custom_check" onClick={(event) => this.handleCheckChange(event, e._id)}>
                                                    <input
                                                        type="checkbox"
                                                        id={`complete_workout_schedule_${e._id}`}
                                                        name={`complete_workout_schedule_${e._id}`}
                                                        checked={e.isSelectedForBulkAction}
                                                        onChange={() => { }}
                                                    />
                                                    <label><h5 className="">{(e.title) ? e.title : ''}</h5></label>
                                                </div>
                                            </div>
                                            <div className="program-event-block-content">
                                                <p>{(e.description) ? e.description : ''}</p>
                                                {(e.type === SCHEDULED_WORKOUT_TYPE_EXERCISE) &&
                                                    <a href="javascript:void(0)" onClick={(event) => this.handleCopyEvent(event, e)}><FaCopy /></a>
                                                }
                                                {(e.type === SCHEDULED_WORKOUT_TYPE_EXERCISE) &&
                                                    <a href="javascript:void(0)"><FaEye /></a>
                                                }
                                                {(e.type === SCHEDULED_WORKOUT_TYPE_EXERCISE) &&
                                                    <a href="javascript:void(0)"><FaPencil /></a>
                                                }
                                                <a href="javascript:void(0)" onClick={(event) => this.handleDeleteEvent(event, e._id)}><FaTrash /></a>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    }
                </div>
            </div>
        );
    }

    handleCopyEvent = (e, event) => {
        const { handleCopy } = this.props;
        e.stopPropagation();
        handleCopy(event);
    }

    handleDeleteEvent = (e, _id) => {
        const { handleDelete } = this.props;
        e.stopPropagation();
        handleDelete(_id);
    }

    handleCheckChange = (e, _id) => {
        const { handleSelectedForBulk } = this.props;
        e.stopPropagation();
        handleSelectedForBulk(_id);
    }
}

class SelectEventView extends Component {
    render() {
        const {
            handleNewRestDay,
            handlePaste,
            handleAddWorkout,
        } = this.props;
        return (
            <div className="program-select-event-view row">
                <div className="popup-link-wrap">
                    <div className="popup-link">
                        <button type="button" onClick={handleAddWorkout} className="btn btn-primary">Add Workout</button>
                    </div>
                    <div className="popup-link">
                        <button type="button" onClick={handleNewRestDay} className="btn btn-primary">Make Rest Day</button>
                    </div>
                    <div className="popup-link">
                        <button type="button" onClick={handlePaste} className="btn btn-primary">Paste Workout</button>
                    </div>
                </div>
            </div>
        );
    }
}