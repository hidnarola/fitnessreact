import { Map } from "immutable";
import {
    GET_USER_PROGRAMS_REQUEST,
    GET_USER_PROGRAMS_SUCCESS,
    GET_USER_PROGRAMS_ERROR,
    ADD_USER_PROGRAM_MASTER_REQUEST,
    ADD_USER_PROGRAM_MASTER_SUCCESS,
    ADD_USER_PROGRAM_MASTER_ERROR,
    GET_USER_PROGRAM_REQUEST,
    GET_USER_PROGRAM_SUCCESS,
    GET_USER_PROGRAM_ERROR,
    DELETE_USER_PROGRAM_REQUEST,
    DELETE_USER_PROGRAM_SUCCESS,
    DELETE_USER_PROGRAM_ERROR,
    SET_SELECTED_DAY_FOR_PROGRAM,
    ADD_USERS_PROGRAM_WORKOUT_SCHEDULE_REQUEST,
    ADD_USERS_PROGRAM_WORKOUT_SCHEDULE_SUCCESS,
    ADD_USERS_PROGRAM_WORKOUT_SCHEDULE_ERROR,
    COPY_USER_PROGRAM_WORKOUT_SCHEDULE
} from "../actions/userPrograms";
import { VALIDATION_FAILURE_STATUS } from "../constants/consts";
import { generateValidationErrorMsgArr } from "../helpers/funs";

const initialState = Map({
    loading: false,
    programs: [],
    program: null,
    error: [],
    loadingMaster: false,
    programMaster: null,
    errorMaster: [],
    selectedDay: null,
    workout: null,
    copiedWorkout: null,
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
    [ADD_USER_PROGRAM_MASTER_REQUEST]: (state, action) => {
        return state.merge(Map({
            loadingMaster: false,
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
    [SET_SELECTED_DAY_FOR_PROGRAM]: (state, action) => {
        return state.merge(Map({
            selectedDay: action.day,
        }));
    },
    [ADD_USERS_PROGRAM_WORKOUT_SCHEDULE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            workout: null,
            error: [],
        }));
    },
    [ADD_USERS_PROGRAM_WORKOUT_SCHEDULE_SUCCESS]: (state, action) => {
        var newState = {
            loading: false,
        };
        if (action.data.status === 1) {
            newState.workout = action.data.workout;
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
    [COPY_USER_PROGRAM_WORKOUT_SCHEDULE]: (state, action) => {
        return state.merge(Map({
            copiedWorkout: action.selectedData,
        }));
    },
}

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}