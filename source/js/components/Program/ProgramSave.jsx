import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import FitnessHeader from '../global/FitnessHeader';
import FitnessNav from '../global/FitnessNav';
import { getUserProgramRequest, setSelectedDayForProgram, copyUserProgramWorkoutSchedule, deleteUsersProgramWorkoutScheduleRequest, selectUsersProgramWorkoutScheduleForEdit, addUserProgramWorkoutTitleRequest, pasteUsersProgramWorkoutScheduleRequest, setUserProgramState, cutUserProgramWorkoutSchedule } from '../../actions/userPrograms';
import { routeCodes } from '../../constants/routes';
import { te, ts, capitalizeFirstLetter, getElementOffsetRelativeToBody } from '../../helpers/funs';
import _ from "lodash";
import SweetAlert from "react-bootstrap-sweetalert";
import { FaCopy, FaTrash, FaPencil, FaEye } from 'react-icons/lib/fa'
import { getProgramsNameRequest } from '../../actions/userScheduleWorkouts';
import { SCHEDULED_WORKOUT_TYPE_RESTDAY, SCHEDULED_WORKOUT_TYPE_EXERCISE } from '../../constants/consts';
import cns from "classnames";
import AddProgramWorkoutTitleForm from './AddProgramWorkoutTitleForm';
import { NavLink, Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { showPageLoader, hidePageLoader } from '../../actions/pageLoader';
import ReactHtmlParser from "react-html-parser";
import $ from "jquery";

let dragEventActive = false;
let dragEventCardOutside = false;
let dragEventId = null;
let dragEventCardX = null;
let dragEventCardY = null;

let calendarArea = null;

let hardResetContainer = false;

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
            addRestDayInit: false,
            selectAllChecked: false,
        }
    }

    componentWillMount() {
        const { dispatch } = this.props;
        this.getProgramWorkoutSchedules();
        dispatch(getProgramsNameRequest());
    }

    render() {
        const { program, totalDays, workouts, showSelectEventAlert, deleteWorkoutAlert, deleteWeekAlert, deleteBulkActionAlert, showAddWorkoutTitleAlert, selectAllChecked } = this.state;
        const { selectedDay, errorTitle, cutWorkout, cutWorkoutData } = this.props;
        var selectedEvents = _.filter(workouts, ['isSelectedForBulkAction', true]);
        return (
            <div className="fitness-body">
                <FitnessHeader />
                <FitnessNav />
                <section className="body-wrap">
                    <div className="body-head d-flex justify-content-start front-white-header">
                        {program && program.name &&
                            <div className="body-head-l title_edit_pop">
                                <h2>{program.name}</h2>
                                <Link to={`${routeCodes.PROGRAM_MASTER_SAVE}/${program._id}`} data-for="edit-program-tooltip" data-tip="Edit"><FaPencil /></Link>
                                <ReactTooltip id='edit-program-tooltip' place="top" effect="solid" />
                                {program && program.description &&
                                    ReactHtmlParser(program.description)
                                }
                            </div>
                        }
                        <div className="body-head-r">
                            <NavLink
                                className="white-btn"
                                to={routeCodes.PROGRAMS}
                            >
                                <span>Back</span>
                                <i className="icon-arrow_back"></i>
                            </NavLink>
                        </div>
                    </div>
                    <div className="body-content">
                        <div className="p-unset">
                            <div id="cal-panel-wrap" className="white-box space-btm-20 my-custom-calendar">
                                <div className="whitebox-body profile-body programs-table-wrapper" data-for="custom-cut-workout-wrap" data-tip>
                                    {selectedEvents && selectedEvents.length > 0 &&
                                        <div className="fixed-btm-bar d-flex">
                                            <div className="fixed-btm-bar-l d-flex">
                                                <div className="custom_check">
                                                    <input
                                                        type="checkbox"
                                                        id={'select_all_workouts'}
                                                        name={'select_all_workouts'}
                                                        checked={selectAllChecked}
                                                        onChange={this.handleSelectAll}
                                                    />
                                                    <label htmlFor="select_all_workouts">Select All</label>
                                                </div>
                                                <div className="count-leadeboard bg-pink">{selectedEvents.length}</div>
                                            </div>
                                            <div className="fixed-btm-bar-c">
                                                <a href="javascript:void(0)" data-for="event-bulk-delete-tooltip" data-tip="Delete" onClick={() => this.setState({ deleteBulkActionAlert: true })}><i className="icon-delete_forever"></i> </a>
                                            </div>
                                            <ReactTooltip id='event-bulk-delete-tooltip' place="top" type="error" effect="solid" />
                                        </div>
                                    }
                                    <CustomDaysCalendarView
                                        programId={(program) ? program._id : null}
                                        totalDays={totalDays}
                                        workouts={workouts}
                                        handleSelectDayAction={this.handleSelectDayAction}
                                        handleCut={this.handleCut}
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
                                {cutWorkout &&
                                    <ReactTooltip id="custom-cut-workout-wrap" place="top" type="dark" effect="float">
                                        <CustomEventCardView event={cutWorkoutData} />
                                    </ReactTooltip>
                                }
                                <div id="custom-drag-workout-wrap" style={{ position: 'absolute' }}></div>
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
                    danger
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
                    danger
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
                    danger
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
                        errorArr={errorTitle}
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
            match,
            loadingTitle,
            workoutTitle,
            errorTitle,
            dispatch,
            cutWorkout
        } = this.props;
        const {
            workoutPasteAction,
            deleteWorkoutActionInit,
            selectedWorkoutIds,
            deleteWeekActionInit,
            deleteBulkActionInit,
            addWorkoutTitleInit,
            addRestDayInit,
        } = this.state;
        if (!loading && error && error.length > 0) {
            te("Something went wrong! please try again later.");
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
                    return _.assignIn({}, w, { isSelectedForBulkAction: false, isCut: (cutWorkout === w._id), isCutEnable: (cutWorkout) ? true : false });
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
            this.resetDragContainer();
        }
        if (cutWorkout && prevProps.cutWorkout !== cutWorkout) {
            var prog = (program.programDetails) ? program.programDetails : null;
            var works = (program.workouts) ? program.workouts : [];
            var lastDay = 1;
            if (works && works.length > 0) {
                lastDay = (works[(works.length - 1)].day);
                lastDay++;
                works = _.map(works, (w) => {
                    return _.assignIn({}, w, { isSelectedForBulkAction: false, isCut: (cutWorkout === w._id), isCutEnable: (cutWorkout) ? true : false });
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
        if (workoutPasteAction && !loading) {
            this.setState({ workoutPasteAction: false });
            this.getProgramWorkoutSchedules();
            this.cancelSelectDayAction();
            const newWorkoutState = { cutWorkout: null, cutWorkoutData: null };
            dispatch(setUserProgramState(newWorkoutState));
            dispatch(hidePageLoader());
            if (error && error.length > 0) {
                te('Something went wrong! please try again later.');
            } else {
                ts('Workout pasted!');
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
        if (addWorkoutTitleInit && !loadingTitle) {
            this.setState({ addWorkoutTitleInit: false });
            dispatch(hidePageLoader());
            if (errorTitle && errorTitle.length <= 0) {
                var program_id = match.params.id;
                var workout_id = workoutTitle._id;
                let url = routeCodes.SAVE_PROGRAM_SCHEDULE_WORKOUT.replace(':id', program_id);
                url = url.replace(':workout_id', workout_id);
                history.push(url);
            }
        }
        if (addRestDayInit && !loadingTitle) {
            this.setState({ addRestDayInit: false });
            this.getProgramWorkoutSchedules();
            this.cancelSelectDayAction();
            dispatch(hidePageLoader());
            if (errorTitle && errorTitle.length > 0) {
                te('Something went wrong! please try again later.');
            } else {
                ts('Rest day added!');
            }
        }
    }

    componentDidMount() {
        document.addEventListener("keyup", this.handleKeyUp, true);
        document.addEventListener("mousemove", this.handleMouseMove, true);
        document.addEventListener("mouseup", this.handleMouseUp, true);
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        let stateData = { copiedWorkout: null };
        dispatch(setUserProgramState(stateData));
        document.removeEventListener('keyup', this.handleKeyUp, true);
        document.removeEventListener('mousemove', this.handleMouseMove, true);
        document.removeEventListener('mouseup', this.handleMouseUp, true);
    }

    handleKeyUp = (e) => {
        if (e && typeof e.keyCode !== 'undefined' && e.keyCode === 27) {
            this.resetCutData();
            if (dragEventId) {
                const selectedCard = $(`#workout-card-${dragEventId}`);
                this.resetDragContainer();
                selectedCard.removeClass("opacity-0");
                selectedCard.css({ opacity: "1" });
            }
        }
    }

    handleMouseMove = (e) => {
        if (dragEventActive && dragEventId) {
            const workoutCalendarWrapper = $(".program-save-custom-days-wrapper");
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (workoutCalendarWrapper && workoutCalendarWrapper[0]) {
                calendarArea = getElementOffsetRelativeToBody(workoutCalendarWrapper[0]);
            }
            if (calendarArea) {
                if ((e.clientX + scrollLeft) <= calendarArea.left ||
                    (e.clientX + scrollLeft) >= (calendarArea.left + calendarArea.width) ||
                    (e.clientY + scrollTop) <= calendarArea.top ||
                    (e.clientY + scrollTop) >= (calendarArea.top + calendarArea.height)
                ) {
                    dragEventCardOutside = true;
                    $('#cal-panel-wrap').css({ boxShadow: "0 0 10px 1px #da6d6d" });
                } else {
                    dragEventCardOutside = false;
                    $('#cal-panel-wrap').css({ boxShadow: "none" });
                }
            }
            const customDragWrap = $('#custom-drag-workout-wrap');
            customDragWrap.css({ top: (dragEventCardY + e.clientY), left: (dragEventCardX + e.clientX) });
        }
    }

    handleMouseUp = (e) => {
        if (dragEventActive && dragEventId) {
            const workoutCalendarWrapper = $(".program-save-custom-days-wrapper");
            hardResetContainer = true;
            setTimeout(() => {
                if (hardResetContainer) {
                    this.changeAllWorkoutCheckedStatus();
                    hardResetContainer = false;
                    const selectedCard = $(`#workout-card-${dragEventId}`);
                    this.resetDragContainer();
                    selectedCard.removeClass("opacity-0");
                    selectedCard.css({ opacity: "1" });
                }
            }, 500);
            if (workoutCalendarWrapper && workoutCalendarWrapper[0]) {
                calendarArea = getElementOffsetRelativeToBody(workoutCalendarWrapper[0]);
            }
            if (calendarArea) {
                const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                if ((e.clientX + scrollLeft) <= calendarArea.left ||
                    (e.clientX + scrollLeft) >= (calendarArea.left + calendarArea.width) ||
                    (e.clientY + scrollTop) <= calendarArea.top ||
                    (e.clientY + scrollTop) >= (calendarArea.top + calendarArea.height)
                ) {
                    e.stopPropagation();
                    const selectedCard = $(`#workout-card-${dragEventId}`);
                    this.resetDragContainer();
                    selectedCard.removeClass("opacity-0");
                    selectedCard.css({ opacity: "1" });
                }
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
        const { dispatch, cutWorkout } = this.props;
        if (dragEventId) {
            hardResetContainer = false;
            if (dragEventCardOutside) {
                this.resetDragContainer();
            } else {
                dragEventActive = false;
                var requestData = {
                    exerciseId: dragEventId,
                    day: (day - 1),
                };
                dispatch(pasteUsersProgramWorkoutScheduleRequest(requestData, 'cut'));
                this.setState({ workoutPasteAction: true });
                dispatch(showPageLoader());
            }
        } else if (cutWorkout) {
            var requestData = {
                exerciseId: cutWorkout,
                day: (day - 1),
            };
            dispatch(pasteUsersProgramWorkoutScheduleRequest(requestData, 'cut'));
            this.setState({ workoutPasteAction: true });
            dispatch(showPageLoader());
        } else {
            this.setState({ showSelectEventAlert: true });
            dispatch(setSelectedDayForProgram(day));
        }
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
            };
        }
        dispatch(addUserProgramWorkoutTitleRequest(requestData));
        this.setState({ addRestDayInit: true });
        dispatch(showPageLoader());
    }

    resetCutData = () => {
        const { dispatch, cutWorkout } = this.props;
        if (cutWorkout) {
            this.getProgramWorkoutSchedules();
            const newWorkoutState = { cutWorkout: null, cutWorkoutData: null };
            dispatch(setUserProgramState(newWorkoutState));
        }
    }

    resetDragContainer = () => {
        const dragPlaceholder = $('#custom-drag-workout-wrap');
        dragPlaceholder.html('');
        dragEventActive = false;
        dragEventCardOutside = false;
        dragEventId = null;
        dragEventCardX = null;
        dragEventCardY = null;
        $('#cal-panel-wrap').css({ boxShadow: "none" });
    }

    handleCut = (_id, workout) => {
        const { dispatch } = this.props;
        if (_id) {
            dispatch(cutUserProgramWorkoutSchedule(_id, workout));
            ts('Workout cut!');
        }
    }

    handleCopy = (_id) => {
        const { dispatch } = this.props;
        if (_id) {
            dispatch(copyUserProgramWorkoutSchedule(_id));
            ts('Workout copied!');
        }
    }

    handlePaste = () => {
        const { copiedWorkout, selectedDay, dispatch } = this.props;
        if (copiedWorkout) {
            var requestData = {
                exerciseId: copiedWorkout,
                day: (selectedDay - 1),
            };
            dispatch(pasteUsersProgramWorkoutScheduleRequest(requestData));
            this.setState({ workoutPasteAction: true });
            dispatch(showPageLoader());
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
            let selectAllChecked = false;
            let totalEventDaysCount = workouts.length;
            let selectedEventDaysCount = 0;
            _.forEach(workouts, (o, i) => {
                if (o.isSelectedForBulkAction) {
                    selectedEventDaysCount++;
                }
            });
            if (selectedEventDaysCount >= totalEventDaysCount) {
                selectAllChecked = true;
            }
            this.setState({
                workouts: workouts,
                selectAllChecked: selectAllChecked
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
        this.setState({ showSelectEventAlert: false, showAddWorkoutTitleAlert: true });
    }

    handleAddWorkoutTitleCancel = () => {
        const { dispatch } = this.props;
        this.setState({ showSelectEventAlert: false, showAddWorkoutTitleAlert: false });
        dispatch(setSelectedDayForProgram(null));
    }

    handleAddTitleSubmit = (data) => {
        const { selectedDay, dispatch, match } = this.props;
        var requestData = {
            programId: match.params.id,
            title: (data.title && data.title.trim()) ? capitalizeFirstLetter(data.title.trim()) : '',
            description: (data.description && data.description.trim()) ? capitalizeFirstLetter(data.description.trim()) : '',
            type: SCHEDULED_WORKOUT_TYPE_EXERCISE,
            day: (selectedDay - 1),
        }
        dispatch(addUserProgramWorkoutTitleRequest(requestData));
        this.setState({ addWorkoutTitleInit: true });
        dispatch(showPageLoader());
    }

    handleSelectAll = (e) => {
        let selectStatus = e.target.checked;
        this.changeAllWorkoutCheckedStatus(selectStatus);
    }

    changeAllWorkoutCheckedStatus = (checked) => {
        const workoutEvents = this.state.workouts;
        let newWorkouts = [];
        _.forEach(workoutEvents, (o, i) => {
            let newObj = Object.assign({}, o);
            newObj.isSelectedForBulkAction = checked;
            newWorkouts.push(newObj);
        });
        this.setState({ workouts: newWorkouts, selectAllChecked: checked });
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
        cutWorkout: userPrograms.get('cutWorkout'),
        cutWorkoutData: userPrograms.get('cutWorkoutData'),
        copiedWorkout: userPrograms.get('copiedWorkout'),
        loadingTitle: userPrograms.get('loadingTitle'),
        workoutTitle: userPrograms.get('workoutTitle'),
        errorTitle: userPrograms.get('errorTitle'),
        loadingMaster: userPrograms.get('loadingMaster'),
        programMaster: userPrograms.get('programMaster'),
        errorMaster: userPrograms.get('errorMaster'),
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
            handleCut,
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
                    handleCut={handleCut}
                    handleCopy={handleCopy}
                    handleDelete={handleDelete}
                    handleSelectedForBulk={handleSelectedForBulk}
                />
            )
        }
        return (
            <div className="program-save-custom-days-wrapper">
                <div className="block-border-div"></div>
                <div className="block-border-div"></div>
                <div className="block-border-div"></div>
                <div className="block-border-div"></div>
                <div className="block-border-div"></div>
                <div className="block-border-div"></div>
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
            handleCut,
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
                    handleCut={handleCut}
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
            handleSelectedForBulk,
            handleCut,
            handleCopy,
            handleDelete
        } = this.props;
        var findDay = (blockNumber - 1);
        var events = _.filter(workouts, { 'day': findDay });
        return (
            <div className="program-save-custom-days-block" onMouseUp={this.handleCardMouseUp} onClick={() => handleSelectDayAction(blockNumber)}>
                <div className="program-save-custom-days-block-title">
                    Day {blockNumber}
                </div>
                <div className="program-save-custom-days-block-content">
                    {events && events.length > 0 &&
                        <Fragment>
                            {
                                events.map((e, i) => {
                                    return (
                                        <CustomDaysCalendarBlockCard
                                            key={i}
                                            e={e}
                                            i={i}
                                            handleSelectedForBulk={handleSelectedForBulk}
                                            handleCut={handleCut}
                                            handleCopy={handleCopy}
                                            handleDelete={handleDelete}
                                        />
                                    );
                                })
                            }
                        </Fragment>
                    }
                </div>
            </div>
        );
    }

    handleCardMouseUp = (e) => {
        if (dragEventActive && dragEventId) {
            const { blockNumber, handleSelectDayAction } = this.props;
            handleSelectDayAction(blockNumber)
        }
    }
}

class CustomDaysCalendarBlockCard extends Component {
    constructor(props) {
        super(props);
        this.checkbox = React.createRef();
    }

    componentWillReceiveProps(nextProps) {
        const { e } = this.props;
        if (e.isSelectedForBulkAction !== nextProps.e.isSelectedForBulkAction) {
            if (typeof nextProps.e.isSelectedForBulkAction !== 'undefined') {
                this.checkbox.current.checked = nextProps.e.isSelectedForBulkAction
            }
        }
    }

    render() {
        const { e } = this.props;
        return (
            <div className="program-event-block-main-wrapper">
                <div id={`workout-card-${e._id}`} className={cns('program-event-block-wrapper', {
                    'restday': (e.type === SCHEDULED_WORKOUT_TYPE_RESTDAY),
                    'loss-opacity': e.isCut,
                    'disable-overlay': e.isCutEnable,
                    'opacity-0': dragEventId === e._id
                })} onClick={(event) => { event.preventDefault(); event.stopPropagation(); }}>
                    <div className="program-event-block-title">
                        <div className="pull-left custom_check p-relative" onClick={(event) => this.handleCheckChange(event, e._id)}>
                            <input
                                type="checkbox"
                                id={`complete_workout_schedule_${e._id}`}
                                ref={this.checkbox}
                            />
                            <label><h5 className="">{(e.title) ? e.title : ''}</h5></label>
                            <a href="javascript:void(0)" data-tip="Cut" className="workout-cut-card-btn" onClick={(event) => this.handleCutEvent(event, e._id, e)}><i className="icon-flip_to_front"></i></a>
                            <div className="calendar-custom-drag-handle" onMouseDown={(event) => this.handleMouseDown(event, e)} onMouseUp={this.handleMouseUp} onClick={(event) => { event.stopPropagation(); }}><i className="icon-open_with"></i></div>
                        </div>
                    </div>
                    <div className="program-event-block-content">
                        <p>{(e.description) ? e.description : ''}</p>
                        {(e.type === SCHEDULED_WORKOUT_TYPE_EXERCISE) &&
                            <a href="javascript:void(0)" data-tip="Copy" onClick={(event) => this.handleCopyEvent(event, e._id)}><FaCopy /></a>
                        }
                        {(e.type === SCHEDULED_WORKOUT_TYPE_EXERCISE) &&
                            <NavLink to={routeCodes.SAVE_PROGRAM_SCHEDULE_WORKOUT.replace(':id', e.programId).replace(':workout_id', e._id)} data-tip="Details" title=""><FaEye /></NavLink>
                        }
                        {(e.type === SCHEDULED_WORKOUT_TYPE_EXERCISE) &&
                            <NavLink to={routeCodes.SAVE_PROGRAM_SCHEDULE_WORKOUT.replace(':id', e.programId).replace(':workout_id', e._id)} data-tip="Change" title=""><FaPencil /></NavLink>
                        }
                        <a href="javascript:void(0)" data-tip="Delete" data-for="event-delete-tooltip" onClick={(event) => this.handleDeleteEvent(event, e._id)}><FaTrash /></a>
                    </div>
                    <ReactTooltip place="top" type="dark" effect="solid" />
                    <ReactTooltip id='event-delete-tooltip' place="top" type="error" effect="solid" />
                </div>
            </div>
        );
    }

    handleCutEvent = (e, _id, event) => {
        const { handleCut } = this.props;
        e.stopPropagation();
        handleCut(_id, event);
    }

    handleCopyEvent = (e, _id) => {
        const { handleCopy } = this.props;
        e.stopPropagation();
        handleCopy(_id);
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

    handleMouseDown = (e, event) => {
        const selectedCard = $(`#workout-card-${event._id}`);
        const dragPlaceholder = $('#custom-drag-workout-wrap');
        const offsets = selectedCard.offset();
        const offsetLeft = offsets && offsets.left ? offsets.left : 0;
        const offsetRight = offsets && offsets.top ? offsets.top : 0;
        const eventCardX = (offsetLeft - e.clientX);
        const eventCardY = (offsetRight - e.clientY);
        dragPlaceholder.html(selectedCard.parent().html());
        dragPlaceholder.css({ top: (eventCardY + e.clientY), left: (eventCardX + e.clientX) });
        dragEventActive = true;
        dragEventCardOutside = false;
        dragEventId = event._id;
        dragEventCardX = eventCardX;
        dragEventCardY = eventCardY;
        $('#cal-panel-wrap').css({ boxShadow: "none" });
        selectedCard.css({ opacity: "0" });
    }

    handleMouseUp = (e) => {
        const selectedCard = $(`#workout-card-${dragEventId}`);
        const dragPlaceholder = $('#custom-drag-workout-wrap');
        dragPlaceholder.html('');
        dragEventActive = false;
        dragEventCardOutside = false;
        dragEventId = null;
        dragEventCardX = null;
        dragEventCardY = null;
        $('#cal-panel-wrap').css({ boxShadow: "none" });
        selectedCard.removeClass("opacity-0");
        selectedCard.css({ opacity: "1" });
    }
}

class CustomEventCardView extends Component {
    render() {
        const e = this.props.event;
        return (
            <div className={cns('cut-workout-wrap program-event-block-wrapper', { 'restday': (e.type === SCHEDULED_WORKOUT_TYPE_RESTDAY) })}>
                <div className="program-event-block-title">
                    <div className="pull-left custom_check p-relative">
                        <input
                            type="checkbox"
                            id={`cut-complete_workout_schedule_${e._id}`}
                            name={`cut-complete_workout_schedule_${e._id}`}
                            checked={e.isSelectedForBulkAction}
                        />
                        <label><h5 className="">{(e.title) ? e.title : ''}</h5></label>
                        <a href="javascript:void(0)" className="workout-cut-card-btn"><i className="icon-flip_to_front"></i></a>
                        <div href="javascript:void(0)" className="calendar-custom-drag-handle"><i className="icon-open_with"></i></div>
                    </div>
                </div>
                <div className="program-event-block-content">
                    <p>{(e.description) ? e.description : ''}</p>
                    {(e.type === SCHEDULED_WORKOUT_TYPE_EXERCISE) &&
                        <a href="javascript:void(0)"><FaCopy /></a>
                    }
                    {(e.type === SCHEDULED_WORKOUT_TYPE_EXERCISE) &&
                        <a href="javascript:void(0)"><FaEye /></a>
                    }
                    {(e.type === SCHEDULED_WORKOUT_TYPE_EXERCISE) &&
                        <a href="javascript:void(0)"><FaPencil /></a>
                    }
                    <a href="javascript:void(0)"><FaTrash /></a>
                </div>
            </div>
        );
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