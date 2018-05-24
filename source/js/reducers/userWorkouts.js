import { Map } from "immutable";
import {
    GET_USER_WORKOUT_BY_DATE_REQUEST,
    GET_USER_WORKOUT_BY_DATE_SUCCESS,
    GET_USER_WORKOUT_BY_DATE_ERROR,
    GET_USER_WORKOUT_BY_ID_REQUEST,
    GET_USER_WORKOUT_BY_ID_SUCCESS,
    GET_USER_WORKOUT_BY_ID_ERROR,
    DELETE_USER_WORKOUT_BY_ID_REQUEST,
    DELETE_USER_WORKOUT_BY_ID_SUCCESS,
    DELETE_USER_WORKOUT_BY_ID_ERROR
} from "../actions/userWorkouts";
import { VALIDATION_FAILURE_STATUS } from "../constants/consts";
import { generateValidationErrorMsgArr } from "../helpers/funs";

const initialState = Map({
    loading: false,
    workouts: [],
    workout: null,
    error: [],
});

const actionMap = {
    [GET_USER_WORKOUT_BY_DATE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            workouts: [],
            error: [],
        }));
    },
    [GET_USER_WORKOUT_BY_DATE_SUCCESS]: (state, action) => {
        var newState = {
            loading: false,
        };
        if (action.data.status === 1) {
            newState.workouts = action.data.user_workouts;
            newState.error = [];
        } else {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.workouts = [];
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [GET_USER_WORKOUT_BY_DATE_ERROR]: (state, action) => {
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
    [GET_USER_WORKOUT_BY_ID_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            workout: null,
            error: [],
        }));
    },
    [GET_USER_WORKOUT_BY_ID_SUCCESS]: (state, action) => {
        var newState = {
            loading: false,
        };
        if (action.data.status === 1) {
            newState.workout = action.data.user_workout;
            newState.error = [];
        } else {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.workout = null;
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [GET_USER_WORKOUT_BY_ID_ERROR]: (state, action) => {
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
    [DELETE_USER_WORKOUT_BY_ID_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            workout: null,
            error: [],
        }));
    },
    [DELETE_USER_WORKOUT_BY_ID_SUCCESS]: (state, action) => {
        var newState = {
            loading: false,
        };
        if (action.data.status === 1) {
            newState.error = [];
        } else {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [DELETE_USER_WORKOUT_BY_ID_ERROR]: (state, action) => {
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
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}