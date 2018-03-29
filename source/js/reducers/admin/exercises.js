import { Map } from "immutable";
import {
    EXERCISES_ADD_REQUEST,
    EXERCISES_ADD_SUCCESS,
    EXERCISES_ADD_ERROR,
    EXERCISES_LIST_REQUEST,
    EXERCISES_LIST_SUCCESS,
    EXERCISES_LIST_ERROR,
    EXERCISES_DELETE_REQUEST,
    EXERCISES_DELETE_SUCCESS,
    EXERCISES_DELETE_ERROR,
    EXERCISES_SELECT_ONE_REQUEST,
    EXERCISES_SELECT_ONE_SUCCESS,
    EXERCISES_SELECT_ONE_ERROR,
    EXERCISES_UPDATE_REQUEST,
    EXERCISES_UPDATE_SUCCESS,
    EXERCISES_UPDATE_ERROR
} from "../../actions/admin/exercises";

const initialState = Map({
    loading: false,
    error: null,
    exercise: null,
    exercises: null,
});

const actionMap = {
    [EXERCISES_LIST_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null,
            exercises: null,
            exercise: null,
        }));
    },
    [EXERCISES_LIST_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: null,
            exercises: action.data.exercises,
            exercise: null,
        }));
    },
    [EXERCISES_LIST_ERROR]: (state, action) => {
        let error = 'Server error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: error,
            exercises: null,
            exercise: null,
        }));
    },
    [EXERCISES_SELECT_ONE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null,
            exercises: null,
            exercise: null,
        }));
    },
    [EXERCISES_SELECT_ONE_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: null,
            exercises: null,
            exercise: action.data.exercise,
        }));
    },
    [EXERCISES_SELECT_ONE_ERROR]: (state, action) => {
        let error = 'Server error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: error,
            exercises: null,
            exercise: null,
        }));
    },
    [EXERCISES_ADD_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null,
            exercises: null,
            exercise: null
        }));
    },
    [EXERCISES_ADD_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: null,
            exercises: null,
            exercise: action.data.exercise
        }));
    },
    [EXERCISES_ADD_ERROR]: (state, action) => {
        let error = 'Server error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: error,
            exercises: null,
            exercise: null
        }));
    },
    [EXERCISES_UPDATE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null,
            exercises: null,
            exercise: null
        }));
    },
    [EXERCISES_UPDATE_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: null,
            exercises: null,
            exercise: action.data.exercise
        }));
    },
    [EXERCISES_UPDATE_ERROR]: (state, action) => {
        let error = 'Server error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: error,
            exercises: null,
            exercise: null
        }));
    },
    [EXERCISES_DELETE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null,
            exercises: null,
            exercise: null
        }));
    },
    [EXERCISES_DELETE_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: null,
            exercises: null,
            exercise: null
        }));
    },
    [EXERCISES_DELETE_ERROR]: (state, action) => {
        let error = 'Server error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: error,
            exercises: null,
            exercise: null
        }));
    },
};

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}