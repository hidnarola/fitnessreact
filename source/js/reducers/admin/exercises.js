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
    EXERCISES_UPDATE_ERROR,
    EXERCISES_FILTER_REQUEST,
    EXERCISES_FILTER_SUCCESS,
    EXERCISES_FILTER_ERROR,
    EXERCISES_RECOVER_REQUEST,
    EXERCISES_RECOVER_SUCCESS,
    EXERCISES_RECOVER_ERROR,
    SET_EXERCISE_STATE
} from "../../actions/admin/exercises";
import { generateValidationErrorMsgArr } from "../../helpers/funs";
import { VALIDATION_FAILURE_STATUS } from "../../constants/consts";

const initialState = Map({
    loading: false,
    error: [],
    exercise: null,
    exercises: [],
    filteredExercises: [],
    filteredTotalPages: 0,
    deleteLoading: false,
    deleteFlag: false,
    deleteError: [],
    recoverLoading: false,
    recoverFlag: false,
    recoverError: [],
});

const actionMap = {
    [EXERCISES_LIST_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: [],
            exercises: [],
            exercise: null,
        }));
    },
    [EXERCISES_LIST_SUCCESS]: (state, action) => {
        let newState = { loading: false };
        if (action.data && action.data.status && action.data.status === 1) {
            newState.exercises = action.data.exercises;
        } else {
            let msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [EXERCISES_LIST_ERROR]: (state, action) => {
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
    [EXERCISES_FILTER_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: [],
            filteredExercises: [],
            filteredTotalPages: 0,
        }));
    },
    [EXERCISES_FILTER_SUCCESS]: (state, action) => {
        let newState = { loading: false };
        if (action.data && action.data.status && action.data.status === 1) {
            newState.filteredExercises = action.data.filtered_exercises;
            newState.filteredTotalPages = action.data.filtered_total_pages;
        } else {
            let msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [EXERCISES_FILTER_ERROR]: (state, action) => {
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
    [EXERCISES_SELECT_ONE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: [],
            exercises: [],
            exercise: null,
        }));
    },
    [EXERCISES_SELECT_ONE_SUCCESS]: (state, action) => {
        let newState = { loading: false };
        if (action.data && action.data.status && action.data.status === 1) {
            newState.exercise = action.data.exercise;
        } else {
            let msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [EXERCISES_SELECT_ONE_ERROR]: (state, action) => {
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
    [EXERCISES_ADD_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: [],
            exercises: [],
            exercise: null,
        }));
    },
    [EXERCISES_ADD_SUCCESS]: (state, action) => {
        let newState = { loading: false };
        if (action.data && action.data.status && action.data.status === 1) {
            newState.exercise = action.data.exercise;
        } else {
            let msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [EXERCISES_ADD_ERROR]: (state, action) => {
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
    [EXERCISES_UPDATE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: [],
            exercises: [],
            exercise: null,
        }));
    },
    [EXERCISES_UPDATE_SUCCESS]: (state, action) => {
        let newState = { loading: false };
        if (action.data && action.data.status && action.data.status === 1) {
            newState.exercise = action.data.exercise;
        } else {
            let msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [EXERCISES_UPDATE_ERROR]: (state, action) => {
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
    [EXERCISES_DELETE_REQUEST]: (state, action) => {
        return state.merge(Map({
            deleteLoading: true,
            deleteFlag: false,
            deleteError: []
        }));
    },
    [EXERCISES_DELETE_SUCCESS]: (state, action) => {
        let newState = { deleteLoading: false };
        if (action.data && action.data.status && action.data.status === 1) {
            newState.deleteFlag = true;
        } else {
            let msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later';
            newState.deleteError = [msg];
        }
        return state.merge(Map(newState));
    },
    [EXERCISES_DELETE_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            deleteLoading: false,
            deleteError: error,
        }));
    },
    [EXERCISES_RECOVER_REQUEST]: (state, action) => {
        return state.merge(Map({
            recoverLoading: true,
            recoverFlag: false,
            recoverError: []
        }));
    },
    [EXERCISES_RECOVER_SUCCESS]: (state, action) => {
        let newState = { recoverLoading: false };
        if (action.data && action.data.status && action.data.status === 1) {
            newState.recoverFlag = true;
        } else {
            let msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later';
            newState.recoverError = [msg];
        }
        return state.merge(Map(newState));
    },
    [EXERCISES_RECOVER_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            recoverLoading: false,
            recoverError: error,
        }));
    },
    [SET_EXERCISE_STATE]: (state, action) => {
        return state.merge(Map(action.stateData));
    },
};

export default function reducer(state = initialState, action = {}) {
    if (action && action.type) {
        var fn = actionMap[action.type];
        return fn ? fn(state, action) : state;
    }
    return state;
}