import { Map } from "immutable";
import {
    EXERCISE_TYPES_ADD_REQUEST,
    EXERCISE_TYPES_ADD_SUCCESS,
    EXERCISE_TYPES_ADD_ERROR,
    EXERCISE_TYPES_LIST_REQUEST,
    EXERCISE_TYPES_LIST_SUCCESS,
    EXERCISE_TYPES_LIST_ERROR,
    EXERCISE_TYPES_DELETE_REQUEST,
    EXERCISE_TYPES_DELETE_SUCCESS,
    EXERCISE_TYPES_DELETE_ERROR,
    EXERCISE_TYPES_SELECT_ONE_REQUEST,
    EXERCISE_TYPES_SELECT_ONE_SUCCESS,
    EXERCISE_TYPES_SELECT_ONE_ERROR,
    EXERCISE_TYPES_UPDATE_REQUEST,
    EXERCISE_TYPES_UPDATE_SUCCESS,
    EXERCISE_TYPES_UPDATE_ERROR,
    EXERCISE_TYPES_FILTER_REQUEST,
    EXERCISE_TYPES_FILTER_SUCCESS,
    EXERCISE_TYPES_FILTER_ERROR
} from "../../actions/admin/exerciseTypes";

const initialState = Map({
    loading: false,
    error: null,
    exerciseTypes: [],
    filteredExerciseTypes: [],
    filteredTotalPages: 0,
    exerciseType: null,
});

const actionMap = {
    [EXERCISE_TYPES_LIST_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null,
            exerciseTypes: [],
            filteredExerciseTypes: [],
            filteredTotalPages: 0,
            exerciseType: null,
        }));
    },
    [EXERCISE_TYPES_LIST_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: null,
            exerciseTypes: action.data.exercise_types,
            filteredExerciseTypes: [],
            filteredTotalPages: 0,
            exerciseType: null,
        }));
    },
    [EXERCISE_TYPES_LIST_ERROR]: (state, action) => {
        let error = 'Server error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: error,
            exerciseTypes: [],
            filteredExerciseTypes: [],
            filteredTotalPages: 0,
            exerciseType: null,
        }));
    },
    [EXERCISE_TYPES_FILTER_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null,
            exerciseTypes: [],
            filteredExerciseTypes: [],
            filteredTotalPages: 0,
            exerciseType: null,
        }));
    },
    [EXERCISE_TYPES_FILTER_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: null,
            exerciseTypes: [],
            filteredExerciseTypes: action.data.filtered_exercise_types,
            filteredTotalPages: action.data.filtered_total_pages,
            exerciseType: null,
        }));
    },
    [EXERCISE_TYPES_FILTER_ERROR]: (state, action) => {
        let error = 'Server error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: error,
            exerciseTypes: [],
            filteredExerciseTypes: [],
            filteredTotalPages: 0,
            exerciseType: null,
        }));
    },
    [EXERCISE_TYPES_SELECT_ONE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null,
            exerciseTypes: [],
            filteredExerciseTypes: [],
            filteredTotalPages: 0,
            exerciseType: null,
        }));
    },
    [EXERCISE_TYPES_SELECT_ONE_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: null,
            exerciseTypes: [],
            filteredExerciseTypes: [],
            filteredTotalPages: 0,
            exerciseType: action.data.exercise_type,
        }));
    },
    [EXERCISE_TYPES_SELECT_ONE_ERROR]: (state, action) => {
        let error = 'Server error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: error,
            exerciseTypes: [],
            filteredExerciseTypes: [],
            filteredTotalPages: 0,
            exerciseType: null,
        }));
    },
    [EXERCISE_TYPES_ADD_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null,
            exerciseTypes: [],
            filteredExerciseTypes: [],
            filteredTotalPages: 0,
            exerciseType: null
        }));
    },
    [EXERCISE_TYPES_ADD_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: null,
            exerciseTypes: [],
            filteredExerciseTypes: [],
            filteredTotalPages: 0,
            exerciseType: action.data.exercise_type
        }));
    },
    [EXERCISE_TYPES_ADD_ERROR]: (state, action) => {
        let error = 'Server error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: error,
            exerciseTypes: [],
            filteredExerciseTypes: [],
            filteredTotalPages: 0,
            exerciseType: null
        }));
    },
    [EXERCISE_TYPES_UPDATE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null,
            exerciseTypes: [],
            filteredExerciseTypes: [],
            filteredTotalPages: 0,
            exerciseType: null
        }));
    },
    [EXERCISE_TYPES_UPDATE_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: null,
            exerciseTypes: [],
            filteredExerciseTypes: [],
            filteredTotalPages: 0,
            exerciseType: action.data.exercise_type
        }));
    },
    [EXERCISE_TYPES_UPDATE_ERROR]: (state, action) => {
        let error = 'Server error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: error,
            exerciseTypes: [],
            filteredExerciseTypes: [],
            filteredTotalPages: 0,
            exerciseType: null
        }));
    },
    [EXERCISE_TYPES_DELETE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null,
            exerciseTypes: [],
            filteredExerciseTypes: [],
            filteredTotalPages: 0,
            exerciseType: null
        }));
    },
    [EXERCISE_TYPES_DELETE_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: null,
            exerciseTypes: [],
            filteredExerciseTypes: [],
            filteredTotalPages: 0,
            exerciseType: null
        }));
    },
    [EXERCISE_TYPES_DELETE_ERROR]: (state, action) => {
        let error = 'Server error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: error,
            exerciseTypes: [],
            filteredExerciseTypes: [],
            filteredTotalPages: 0,
            exerciseType: null
        }));
    },
};

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}