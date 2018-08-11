import { Map } from "immutable";
import {
    SET_SELECTED_SLOT_FROM_CALENDAR,
    GET_USERS_WORKOUT_SCHEDULES_REQUEST,
    GET_USERS_WORKOUT_SCHEDULES_SUCCESS,
    GET_USERS_WORKOUT_SCHEDULES_ERROR,
    GET_EXERCISES_NAME_REQUEST,
    GET_EXERCISES_NAME_SUCCESS,
    GET_EXERCISES_NAME_ERROR,
    ADD_USERS_WORKOUT_SCHEDULE_REQUEST,
    ADD_USERS_WORKOUT_SCHEDULE_SUCCESS,
    ADD_USERS_WORKOUT_SCHEDULE_ERROR,
    COPY_USER_WORKOUT_SCHEDULE,
    GET_PROGRAMS_NAME_REQUEST,
    GET_PROGRAMS_NAME_SUCCESS,
    GET_PROGRAMS_NAME_ERROR,
    USER_ASSIGN_PROGRAM_REQUEST,
    USER_ASSIGN_PROGRAM_SUCCESS,
    USER_ASSIGN_PROGRAM_ERROR,
    DELETE_USERS_BULK_WORKOUT_SCHEDULE_REQUEST,
    DELETE_USERS_BULK_WORKOUT_SCHEDULE_SUCCESS,
    DELETE_USERS_BULK_WORKOUT_SCHEDULE_ERROR,
    COMPLETE_USERS_BULK_WORKOUT_SCHEDULE_REQUEST,
    COMPLETE_USERS_BULK_WORKOUT_SCHEDULE_SUCCESS,
    COMPLETE_USERS_BULK_WORKOUT_SCHEDULE_ERROR,
    ADD_USER_WORKOUT_TITLE_REQUEST,
    ADD_USER_WORKOUT_TITLE_SUCCESS,
    ADD_USER_WORKOUT_TITLE_ERROR,
    GET_USERS_WORKOUT_SCHEDULE_REQUEST,
    GET_USERS_WORKOUT_SCHEDULE_SUCCESS,
    GET_USERS_WORKOUT_SCHEDULE_ERROR,
    CHANGE_WORKOUT_MAIN_TYPE,
    GET_EXERCISE_MEASUREMENT_REQUEST,
    GET_EXERCISE_MEASUREMENT_SUCCESS,
    GET_EXERCISE_MEASUREMENT_ERROR,
    UPDATE_USER_WORKOUT_TITLE_REQUEST,
    UPDATE_USER_WORKOUT_TITLE_SUCCESS,
    UPDATE_USER_WORKOUT_TITLE_ERROR,
    DELETE_USER_WHOLE_EXERCISE_REQUEST,
    DELETE_USER_WHOLE_EXERCISE_SUCCESS,
    DELETE_USER_WHOLE_EXERCISE_ERROR,
    DELETE_USER_SINGLE_EXERCISE_REQUEST,
    DELETE_USER_SINGLE_EXERCISE_SUCCESS,
    DELETE_USER_SINGLE_EXERCISE_ERROR,
    PASTE_USERS_WORKOUT_SCHEDULE_REQUEST,
    PASTE_USERS_WORKOUT_SCHEDULE_SUCCESS,
    PASTE_USERS_WORKOUT_SCHEDULE_ERROR,
    CHANGE_USERS_WORKOUT_FORM_ACTION,
    UPDATE_USERS_WORKOUT_SCHEDULE_REQUEST,
    UPDATE_USERS_WORKOUT_SCHEDULE_SUCCESS,
    UPDATE_USERS_WORKOUT_SCHEDULE_ERROR,
    CHANGE_WORKOUT_MAIN_TYPE_DETAILS,
    GET_USER_FIRST_WORKOUT_BY_DATE_REQUEST,
    GET_USER_FIRST_WORKOUT_BY_DATE_SUCCESS,
    GET_USER_FIRST_WORKOUT_BY_DATE_ERROR,
    GET_USER_WORKOUT_CALENDAR_LIST_SUCCESS,
    SET_TODAYS_WORKOUT_DATE,
} from "../actions/userScheduleWorkouts";
import { VALIDATION_FAILURE_STATUS, SCHEDULED_WORKOUT_TYPE_WARMUP } from "../constants/consts";
import { generateValidationErrorMsgArr, createNewStateForWorkout } from "../helpers/funs";

const initialState = Map({
    slotInfo: null,
    loading: false,
    workouts: [],
    workout: null,
    workoutsList: [],
    calendarList: [],
    workoutStat: null,
    error: [],
    exercises: [],
    programs: [],
    copiedWorkout: null,
    assignProgramLoading: null,
    assignProgram: null,
    assignProgramError: [],
    loadingTitle: false,
    workoutTitle: null,
    errorTitle: [],
    selectedWorkoutMainType: SCHEDULED_WORKOUT_TYPE_WARMUP,
    selectedWorkoutMainTypeDetails: SCHEDULED_WORKOUT_TYPE_WARMUP,
    exerciseMeasurements: [],
    workoutFormAction: 'add',
    selectedWorkoutForEdit: null,
    workoutWarmupSequence: -1,
    workoutSequence: -1,
    workoutCooldownSequence: -1,
    firstWorkoutLoading: false,
    firstWorkoutId: null,
    firstWorkoutError: [],
    todaysWorkoutDate: null,
});

const actionMap = {
    [SET_SELECTED_SLOT_FROM_CALENDAR]: (state, action) => {
        return state.merge(Map({
            slotInfo: action.slotInfo,
        }));
    },
    [GET_USERS_WORKOUT_SCHEDULES_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            workouts: [],
            error: [],
        }));
    },
    [GET_USERS_WORKOUT_SCHEDULES_SUCCESS]: (state, action) => {
        var newState = {
            loading: false,
        };
        if (action.data.status === 1) {
            newState.workouts = action.data.workouts;
            newState.error = [];
        } else {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.workouts = [];
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [GET_USERS_WORKOUT_SCHEDULES_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            loading: false,
            error: error,
        }));
    },
    [GET_USERS_WORKOUT_SCHEDULE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: [],
        }));
    },
    [GET_USERS_WORKOUT_SCHEDULE_SUCCESS]: (state, action) => {
        var newState = {
            loading: false,
        };
        if (action.data.status === 1) {
            var newSt = createNewStateForWorkout(action.data.workouts);
            newState.workout = newSt.workout;
            newState.workoutsList = action.data.workouts_list;
            newState.calendarList = action.data.calendar_list;
            newState.workoutStat = action.data.workouts_stat;
            newState.workoutWarmupSequence = newSt.workoutWarmupSequence;
            newState.workoutSequence = newSt.workoutSequence;
            newState.workoutCooldownSequence = newSt.workoutCooldownSequence;
        } else {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [GET_USERS_WORKOUT_SCHEDULE_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            loading: false,
            error: error,
        }));
    },
    [GET_EXERCISES_NAME_REQUEST]: (state, action) => {
        return state.merge(Map({
            exercises: [],
        }));
    },
    [GET_EXERCISES_NAME_SUCCESS]: (state, action) => {
        var newState = {};
        if (action.data.status === 1) {
            newState.exercises = action.data.exercises;
        }
        return state.merge(Map(newState));
    },
    [GET_EXERCISES_NAME_ERROR]: (state, action) => {
        return state.merge(Map({
            exercises: [],
        }));
    },
    [GET_PROGRAMS_NAME_REQUEST]: (state, action) => {
        return state.merge(Map({
            programs: [],
        }));
    },
    [GET_PROGRAMS_NAME_SUCCESS]: (state, action) => {
        var newState = {};
        if (action.data.status === 1) {
            newState.programs = action.data.programs;
        }
        return state.merge(Map(newState));
    },
    [GET_PROGRAMS_NAME_ERROR]: (state, action) => {
        return state.merge(Map({
            programs: [],
        }));
    },
    [ADD_USERS_WORKOUT_SCHEDULE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: [],
        }));
    },
    [ADD_USERS_WORKOUT_SCHEDULE_SUCCESS]: (state, action) => {
        var newState = {
            loading: false,
        };
        if (action.data.status === 1) {
            var newSt = createNewStateForWorkout(action.data.workouts);
            newState.workout = newSt.workout;
            newState.workoutsList = action.data.workouts_list;
            newState.calendarList = action.data.calendar_list;
            newState.workoutStat = action.data.workouts_stat;
            newState.workoutWarmupSequence = newSt.workoutWarmupSequence;
            newState.workoutSequence = newSt.workoutSequence;
            newState.workoutCooldownSequence = newSt.workoutCooldownSequence;
        } else {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [ADD_USERS_WORKOUT_SCHEDULE_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            loading: false,
            error: error,
        }));
    },
    [UPDATE_USERS_WORKOUT_SCHEDULE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: [],
        }));
    },
    [UPDATE_USERS_WORKOUT_SCHEDULE_SUCCESS]: (state, action) => {
        var newState = {
            loading: false,
        };
        if (action.data.status === 1) {
            var newSt = createNewStateForWorkout(action.data.workouts);
            newState.workout = newSt.workout;
            newState.workoutsList = action.data.workouts_list;
            newState.calendarList = action.data.calendar_list;
            newState.workoutStat = action.data.workouts_stat;
            newState.workoutWarmupSequence = newSt.workoutWarmupSequence;
            newState.workoutSequence = newSt.workoutSequence;
            newState.workoutCooldownSequence = newSt.workoutCooldownSequence;
        } else {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [UPDATE_USERS_WORKOUT_SCHEDULE_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            loading: false,
            error: error,
        }));
    },
    [PASTE_USERS_WORKOUT_SCHEDULE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: [],
        }));
    },
    [PASTE_USERS_WORKOUT_SCHEDULE_SUCCESS]: (state, action) => {
        var newState = {
            loading: false,
        };
        if (action.data.status !== 1) {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [PASTE_USERS_WORKOUT_SCHEDULE_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            loading: false,
            error: error,
        }));
    },
    [COPY_USER_WORKOUT_SCHEDULE]: (state, action) => {
        return state.merge(Map({
            copiedWorkout: action.selectedData,
        }));
    },
    [DELETE_USERS_BULK_WORKOUT_SCHEDULE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: [],
        }));
    },
    [DELETE_USERS_BULK_WORKOUT_SCHEDULE_SUCCESS]: (state, action) => {
        var newState = {
            loading: false,
        };
        if (action.data.status !== 1) {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [DELETE_USERS_BULK_WORKOUT_SCHEDULE_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            loading: false,
            error: error,
        }));
    },
    [COMPLETE_USERS_BULK_WORKOUT_SCHEDULE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: [],
        }));
    },
    [COMPLETE_USERS_BULK_WORKOUT_SCHEDULE_SUCCESS]: (state, action) => {
        var newState = {
            loading: false,
        };
        if (action.data.status !== 1) {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [COMPLETE_USERS_BULK_WORKOUT_SCHEDULE_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            loading: false,
            error: error,
        }));
    },
    [USER_ASSIGN_PROGRAM_REQUEST]: (state, action) => {
        return state.merge(Map({
            assignProgramLoading: true,
            assignProgram: null,
            assignProgramError: [],
        }));
    },
    [USER_ASSIGN_PROGRAM_SUCCESS]: (state, action) => {
        var newState = {
            assignProgramLoading: false,
        };
        if (action.data.status === 1) {
            newState.assignProgram = action.data.program;
        } else {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.assignProgramError = [msg];
        }
        return state.merge(Map(newState));
    },
    [USER_ASSIGN_PROGRAM_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            assignProgramLoading: false,
            assignProgramError: error,
        }));
    },
    [ADD_USER_WORKOUT_TITLE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loadingTitle: true,
            workoutTitle: null,
            errorTitle: [],
        }));
    },
    [ADD_USER_WORKOUT_TITLE_SUCCESS]: (state, action) => {
        var newState = {
            loadingTitle: false,
        };
        if (action.data.status === 1) {
            newState.workoutTitle = action.data.day;
        } else {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.errorTitle = [msg];
        }
        return state.merge(Map(newState));
    },
    [ADD_USER_WORKOUT_TITLE_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            loadingTitle: false,
            errorTitle: error,
        }));
    },
    [UPDATE_USER_WORKOUT_TITLE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loadingTitle: true,
            errorTitle: [],
        }));
    },
    [UPDATE_USER_WORKOUT_TITLE_SUCCESS]: (state, action) => {
        var newState = {
            loadingTitle: false,
        };
        if (action.data.status !== 1) {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.errorTitle = [msg];
        }
        return state.merge(Map(newState));
    },
    [UPDATE_USER_WORKOUT_TITLE_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            loadingTitle: false,
            errorTitle: error,
        }));
    },
    [CHANGE_WORKOUT_MAIN_TYPE]: (state, action) => {
        return state.merge(Map({
            selectedWorkoutMainType: action.mainType,
        }));
    },
    [CHANGE_WORKOUT_MAIN_TYPE_DETAILS]: (state, action) => {
        return state.merge(Map({
            selectedWorkoutMainTypeDetails: action.mainType,
        }));
    },
    [GET_EXERCISE_MEASUREMENT_REQUEST]: (state, action) => {
        return state.merge(Map({
            exerciseMeasurements: [],
        }));
    },
    [GET_EXERCISE_MEASUREMENT_SUCCESS]: (state, action) => {
        var newState = {};
        if (action.data.status === 1) {
            newState.exerciseMeasurements = action.data.measurements;
        }
        return state.merge(Map(newState));
    },
    [GET_EXERCISE_MEASUREMENT_ERROR]: (state, action) => {
        return state.merge(Map({
            exerciseMeasurements: [],
        }));
    },
    [DELETE_USER_WHOLE_EXERCISE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: [],
        }));
    },
    [DELETE_USER_WHOLE_EXERCISE_SUCCESS]: (state, action) => {
        var newState = {
            loading: false,
        };
        if (action.data.status === 1) {
            var newSt = createNewStateForWorkout(action.data.workouts);
            newState.workout = newSt.workout;
            newState.workoutsList = action.data.workouts_list;
            newState.calendarList = action.data.calendar_list;
            newState.workoutStat = action.data.workouts_stat;
            newState.workoutWarmupSequence = newSt.workoutWarmupSequence;
            newState.workoutSequence = newSt.workoutSequence;
            newState.workoutCooldownSequence = newSt.workoutCooldownSequence;
        } else {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [DELETE_USER_WHOLE_EXERCISE_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            loading: false,
            error: error,
        }));
    },
    [DELETE_USER_SINGLE_EXERCISE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: [],
        }));
    },
    [DELETE_USER_SINGLE_EXERCISE_SUCCESS]: (state, action) => {
        var newState = {
            loading: false,
        };
        if (action.data.status === 1) {
            var newSt = createNewStateForWorkout(action.data.workouts);
            newState.workout = newSt.workout;
            newState.workoutsList = action.data.workouts_list;
            newState.calendarList = action.data.calendar_list;
            newState.workoutStat = action.data.workouts_stat;
            newState.workoutWarmupSequence = newSt.workoutWarmupSequence;
            newState.workoutSequence = newSt.workoutSequence;
            newState.workoutCooldownSequence = newSt.workoutCooldownSequence;
        } else {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [DELETE_USER_SINGLE_EXERCISE_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            loading: false,
            error: error,
        }));
    },
    [CHANGE_USERS_WORKOUT_FORM_ACTION]: (state, action) => {
        return state.merge(Map({
            workoutFormAction: action.action,
            selectedWorkoutForEdit: action.data,
        }));
    },
    [GET_USER_FIRST_WORKOUT_BY_DATE_REQUEST]: (state, action) => {
        return state.merge(Map({
            firstWorkoutLoading: true,
            firstWorkoutId: null,
            firstWorkoutError: [],
        }));
    },
    [GET_USER_FIRST_WORKOUT_BY_DATE_SUCCESS]: (state, action) => {
        var newState = {
            firstWorkoutLoading: false,
        };
        if (action.data.status === 1) {
            newState.firstWorkoutId = action.data.workout_id;
        } else if (action.data.status === 2) {
            newState.firstWorkoutId = null
        } else {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.firstWorkoutError = [msg];
        }
        return state.merge(Map(newState));
    },
    [GET_USER_FIRST_WORKOUT_BY_DATE_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            firstWorkoutLoading: false,
            firstWorkoutError: error,
        }));
    },
    [GET_USER_WORKOUT_CALENDAR_LIST_SUCCESS]: (state, action) => {
        var newState = {}
        if (action.data.status === 1) {
            newState.calendarList = action.data.calendar_list;
        }
        return state.merge(Map(newState));
    },
    [SET_TODAYS_WORKOUT_DATE]: (state, action) => {
        return state.merge(Map({
            todaysWorkoutDate: action.date,
        }))
    },
}

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}