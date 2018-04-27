import { Map } from "immutable";
import {
    GET_USER_EXERCISE_TYPES_REQUEST,
    GET_USER_EXERCISE_TYPES_SUCCESS,
    GET_USER_EXERCISE_TYPES_ERROR,
} from "../actions/userExerciseTypes";

const initialState = Map({
    loading: false,
    error: null,
    exerciseTypes: 0,
});

const actionMap = {
    [GET_USER_EXERCISE_TYPES_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
        }));
    },

    [GET_USER_EXERCISE_TYPES_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            exerciseTypes: action.data.exercise_types,
        }));
    },
    [GET_USER_EXERCISE_TYPES_ERROR]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: action.error.message,
        }));
    },
}

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}