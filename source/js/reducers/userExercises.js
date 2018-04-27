import { Map } from "immutable";
import {
    GET_USER_EXERCISES_REQUEST,
    GET_USER_EXERCISES_SUCCESS,
    GET_USER_EXERCISES_ERROR,
} from "../actions/userExercises";

const initialState = Map({
    loading: false,
    error: null,
    exercises: 0,
});

const actionMap = {
    [GET_USER_EXERCISES_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
        }));
    },

    [GET_USER_EXERCISES_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            exercises: action.data.exercises,
        }));
    },
    [GET_USER_EXERCISES_ERROR]: (state, action) => {
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