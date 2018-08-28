import { Map } from "immutable";
import {
    GET_USERS_PROGRAM_WORKOUT_SCHEDULE_REQUEST,
    GET_USERS_PROGRAM_WORKOUT_SCHEDULE_SUCCESS,
    GET_USERS_PROGRAM_WORKOUT_SCHEDULE_ERROR,
    GET_USER_PROGRAMS_REQUEST,
    GET_USER_PROGRAMS_SUCCESS,
    GET_USER_PROGRAMS_ERROR,
    ADD_USER_PROGRAM_MASTER_REQUEST,
    ADD_USER_PROGRAM_MASTER_SUCCESS,
    ADD_USER_PROGRAM_MASTER_ERROR,
    DELETE_USER_PROGRAM_REQUEST,
    DELETE_USER_PROGRAM_SUCCESS,
    DELETE_USER_PROGRAM_ERROR,
    GET_USER_PROGRAM_REQUEST,
    GET_USER_PROGRAM_SUCCESS,
    GET_USER_PROGRAM_ERROR,
    DELETE_USERS_PROGRAM_WORKOUT_SCHEDULE_REQUEST,
    DELETE_USERS_PROGRAM_WORKOUT_SCHEDULE_SUCCESS,
    DELETE_USERS_PROGRAM_WORKOUT_SCHEDULE_ERROR,
    ADD_USER_PROGRAM_WORKOUT_TITLE_REQUEST,
    ADD_USER_PROGRAM_WORKOUT_TITLE_SUCCESS,
    ADD_USER_PROGRAM_WORKOUT_TITLE_ERROR,
    SET_SELECTED_DAY_FOR_PROGRAM,
    CHANGE_PROGRAM_WORKOUT_MAIN_TYPE,
    CHANGE_USERS_PROGRAM_WORKOUT_FORM_ACTION,
    ADD_USERS_PROGRAM_WORKOUT_SCHEDULE_REQUEST,
    ADD_USERS_PROGRAM_WORKOUT_SCHEDULE_SUCCESS,
    ADD_USERS_PROGRAM_WORKOUT_SCHEDULE_ERROR,
    UPDATE_USER_PROGRAM_WORKOUT_TITLE_REQUEST,
    UPDATE_USER_PROGRAM_WORKOUT_TITLE_SUCCESS,
    UPDATE_USER_PROGRAM_WORKOUT_TITLE_ERROR,
    UPDATE_USERS_PROGRAM_WORKOUT_SCHEDULE_REQUEST,
    UPDATE_USERS_PROGRAM_WORKOUT_SCHEDULE_SUCCESS,
    UPDATE_USERS_PROGRAM_WORKOUT_SCHEDULE_ERROR,
    DELETE_USER_PROGRAM_SINGLE_EXERCISE_REQUEST,
    DELETE_USER_PROGRAM_SINGLE_EXERCISE_SUCCESS,
    DELETE_USER_PROGRAM_SINGLE_EXERCISE_ERROR,
    DELETE_USER_PROGRAM_WHOLE_EXERCISE_REQUEST,
    DELETE_USER_PROGRAM_WHOLE_EXERCISE_SUCCESS,
    DELETE_USER_PROGRAM_WHOLE_EXERCISE_ERROR,
    CHANGE_PROGRAM_WORKOUT_MAIN_TYPE_DETAILS,
    COPY_USER_PROGRAM_WORKOUT_SCHEDULE,
    PASTE_USERS_PROGRAM_WORKOUT_SCHEDULE_REQUEST,
    PASTE_USERS_PROGRAM_WORKOUT_SCHEDULE_SUCCESS,
    PASTE_USERS_PROGRAM_WORKOUT_SCHEDULE_ERROR,
    UPDATE_USER_PROGRAM_MASTER_REQUEST,
    UPDATE_USER_PROGRAM_MASTER_SUCCESS,
    UPDATE_USER_PROGRAM_MASTER_ERROR
} from "../actions/userPrograms";
import {
    VALIDATION_FAILURE_STATUS,
    SCHEDULED_WORKOUT_TYPE_WARMUP
} from "../constants/consts";
import { generateValidationErrorMsgArr, createNewStateForWorkout } from "../helpers/funs";

const initialState = Map({
    loading: false,
    programs: [],
    program: null,
    workout: null,
    error: [],
    selectedDay: null,
    loadingMaster: false,
    programMaster: null,
    errorMaster: [],
    loadingTitle: false,
    workoutTitle: null,
    errorTitle: [],
    copiedWorkout: null,
    selectedWorkoutMainType: SCHEDULED_WORKOUT_TYPE_WARMUP,
    selectedWorkoutMainTypeDetails: SCHEDULED_WORKOUT_TYPE_WARMUP,
    workoutFormAction: 'add',
    selectedWorkoutForEdit: null,
    workoutWarmupSequence: -1,
    workoutSequence: -1,
    workoutCooldownSequence: -1,
});

const actionMap = {
    [GET_USER_PROGRAMS_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            programs: [],
            error: [],
        }));
    },
    [GET_USER_PROGRAMS_SUCCESS]: (state, action) => {
        var newState = {
            loading: false,
        };
        if (action.data.status === 1) {
            newState.programs = action.data.programs;
        } else {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [GET_USER_PROGRAMS_ERROR]: (state, action) => {
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
    [SET_SELECTED_DAY_FOR_PROGRAM]: (state, action) => {
        return state.merge(Map({
            selectedDay: action.day,
        }));
    },
    [ADD_USER_PROGRAM_MASTER_REQUEST]: (state, action) => {
        return state.merge(Map({
            loadingMaster: true,
            programMaster: null,
            errorMaster: [],
        }));
    },
    [ADD_USER_PROGRAM_MASTER_SUCCESS]: (state, action) => {
        var newState = {
            loadingMaster: false,
        };
        if (action.data.status === 1) {
            newState.programMaster = action.data.program;
        } else {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.errorMaster = [msg];
        }
        return state.merge(Map(newState));
    },
    [ADD_USER_PROGRAM_MASTER_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            loadingMaster: false,
            errorMaster: error,
        }));
    },
    [DELETE_USER_PROGRAM_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: [],
        }));
    },
    [DELETE_USER_PROGRAM_SUCCESS]: (state, action) => {
        var newState = {
            loading: false,
        };
        if (action.data.status !== 1) {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [DELETE_USER_PROGRAM_ERROR]: (state, action) => {
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
    [GET_USER_PROGRAM_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            program: null,
            error: [],
        }));
    },
    [GET_USER_PROGRAM_SUCCESS]: (state, action) => {
        var newState = {
            loading: false,
        };
        if (action.data.status === 1) {
            newState.program = action.data.program;
        } else {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [GET_USER_PROGRAM_ERROR]: (state, action) => {
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
    [DELETE_USERS_PROGRAM_WORKOUT_SCHEDULE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: [],
        }));
    },
    [DELETE_USERS_PROGRAM_WORKOUT_SCHEDULE_SUCCESS]: (state, action) => {
        var newState = {
            loading: false,
        };
        if (action.data.status !== 1) {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [DELETE_USERS_PROGRAM_WORKOUT_SCHEDULE_ERROR]: (state, action) => {
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
    [ADD_USER_PROGRAM_WORKOUT_TITLE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loadingTitle: true,
            workoutTitle: null,
            errorTitle: [],
        }));
    },
    [ADD_USER_PROGRAM_WORKOUT_TITLE_SUCCESS]: (state, action) => {
        var newState = {
            loadingTitle: false,
        };
        if (action.data.status === 1) {
            newState.workoutTitle = action.data.program;
        } else {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.errorTitle = [msg];
        }
        return state.merge(Map(newState));
    },
    [ADD_USER_PROGRAM_WORKOUT_TITLE_ERROR]: (state, action) => {
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
    [GET_USERS_PROGRAM_WORKOUT_SCHEDULE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            workout: null,
            error: [],
        }));
    },
    [GET_USERS_PROGRAM_WORKOUT_SCHEDULE_SUCCESS]: (state, action) => {
        var newState = {
            loading: false,
        };
        if (action.data.status === 1) {
            var newSt = createNewStateForWorkout(action.data.workouts);
            newState.workout = newSt.workout;
            newState.workoutWarmupSequence = newSt.workoutWarmupSequence;
            newState.workoutSequence = newSt.workoutSequence;
            newState.workoutCooldownSequence = newSt.workoutCooldownSequence;
        } else {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [GET_USERS_PROGRAM_WORKOUT_SCHEDULE_ERROR]: (state, action) => {
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
    [CHANGE_PROGRAM_WORKOUT_MAIN_TYPE]: (state, action) => {
        return state.merge(Map({
            selectedWorkoutMainType: action.mainType,
        }));
    },
    [CHANGE_PROGRAM_WORKOUT_MAIN_TYPE_DETAILS]: (state, action) => {
        return state.merge(Map({
            selectedWorkoutMainTypeDetails: action.mainType,
        }));
    },
    [CHANGE_USERS_PROGRAM_WORKOUT_FORM_ACTION]: (state, action) => {
        return state.merge(Map({
            workoutFormAction: action.action,
            selectedWorkoutForEdit: action.data,
        }));
    },
    [ADD_USERS_PROGRAM_WORKOUT_SCHEDULE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: [],
        }));
    },
    [ADD_USERS_PROGRAM_WORKOUT_SCHEDULE_SUCCESS]: (state, action) => {
        var newState = {
            loading: false,
        };
        if (action.data.status === 1) {
            var newSt = createNewStateForWorkout(action.data.workouts);
            newState.workout = newSt.workout;
            newState.workoutWarmupSequence = newSt.workoutWarmupSequence;
            newState.workoutSequence = newSt.workoutSequence;
            newState.workoutCooldownSequence = newSt.workoutCooldownSequence;
        } else {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [ADD_USERS_PROGRAM_WORKOUT_SCHEDULE_ERROR]: (state, action) => {
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
    [UPDATE_USER_PROGRAM_WORKOUT_TITLE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loadingTitle: true,
            errorTitle: [],
        }));
    },
    [UPDATE_USER_PROGRAM_WORKOUT_TITLE_SUCCESS]: (state, action) => {
        var newState = {
            loadingTitle: false,
        };
        if (action.data.status !== 1) {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.errorTitle = [msg];
        }
        return state.merge(Map(newState));
    },
    [UPDATE_USER_PROGRAM_WORKOUT_TITLE_ERROR]: (state, action) => {
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
    [UPDATE_USERS_PROGRAM_WORKOUT_SCHEDULE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: [],
        }));
    },
    [UPDATE_USERS_PROGRAM_WORKOUT_SCHEDULE_SUCCESS]: (state, action) => {
        var newState = {
            loading: false,
        };
        if (action.data.status === 1) {
            var newSt = createNewStateForWorkout(action.data.workouts);
            newState.workout = newSt.workout;
            newState.workoutWarmupSequence = newSt.workoutWarmupSequence;
            newState.workoutSequence = newSt.workoutSequence;
            newState.workoutCooldownSequence = newSt.workoutCooldownSequence;
        } else {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [UPDATE_USERS_PROGRAM_WORKOUT_SCHEDULE_ERROR]: (state, action) => {
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
    [DELETE_USER_PROGRAM_SINGLE_EXERCISE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: [],
        }));
    },
    [DELETE_USER_PROGRAM_SINGLE_EXERCISE_SUCCESS]: (state, action) => {
        var newState = {
            loading: false,
        };
        if (action.data.status === 1) {
            var newSt = createNewStateForWorkout(action.data.workouts);
            newState.workout = newSt.workout;
            newState.workoutWarmupSequence = newSt.workoutWarmupSequence;
            newState.workoutSequence = newSt.workoutSequence;
            newState.workoutCooldownSequence = newSt.workoutCooldownSequence;
        } else {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [DELETE_USER_PROGRAM_SINGLE_EXERCISE_ERROR]: (state, action) => {
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
    [DELETE_USER_PROGRAM_WHOLE_EXERCISE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: [],
        }));
    },
    [DELETE_USER_PROGRAM_WHOLE_EXERCISE_SUCCESS]: (state, action) => {
        var newState = {
            loading: false,
        };
        if (action.data.status === 1) {
            var newSt = createNewStateForWorkout(action.data.workouts);
            newState.workout = newSt.workout;
            newState.workoutWarmupSequence = newSt.workoutWarmupSequence;
            newState.workoutSequence = newSt.workoutSequence;
            newState.workoutCooldownSequence = newSt.workoutCooldownSequence;
        } else {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [DELETE_USER_PROGRAM_WHOLE_EXERCISE_ERROR]: (state, action) => {
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
    [COPY_USER_PROGRAM_WORKOUT_SCHEDULE]: (state, action) => {
        return state.merge(Map({
            copiedWorkout: action.selectedData,
        }));
    },
    [PASTE_USERS_PROGRAM_WORKOUT_SCHEDULE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: [],
        }));
    },
    [PASTE_USERS_PROGRAM_WORKOUT_SCHEDULE_SUCCESS]: (state, action) => {
        var newState = {
            loading: false,
        };
        if (action.data.status !== 1) {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [PASTE_USERS_PROGRAM_WORKOUT_SCHEDULE_ERROR]: (state, action) => {
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
    [UPDATE_USER_PROGRAM_MASTER_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: [],
        }));
    },
    [UPDATE_USER_PROGRAM_MASTER_SUCCESS]: (state, action) => {
        var newState = {
            loading: false,
        };
        if (action.data.status === 1) {
            var oldStateProgram = state.get('program');
            var newStateProgram = Object.assign({}, oldStateProgram);
            newStateProgram.programDetails.name = action.data.program.name;
            newStateProgram.programDetails.description = action.data.program.description;
            newState.program = newStateProgram;
        } else {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [UPDATE_USER_PROGRAM_MASTER_ERROR]: (state, action) => {
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
}

export default function reducer(state = initialState, action = {}) {
    if (action && action.type) {
        var fn = actionMap[action.type];
        return fn ? fn(state, action) : state;
    }
    return state;
}