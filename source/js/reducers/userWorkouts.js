import { Map } from "immutable";
import { VALIDATION_FAILURE_STATUS } from "../constants/consts";
import { generateValidationErrorMsgArr } from "../helpers/funs";
import {
    GET_USER_WORKOUT_BY_DATE_REQUEST,
    GET_USER_WORKOUT_BY_DATE_SUCCESS,
    GET_USER_WORKOUT_BY_DATE_ERROR,
} from "../actions/userWorkouts";

const initialState = Map({
    loading: false,
    workouts: [],
    date: null,
    error: [],
});

const actionMap = {
    [GET_USER_WORKOUT_BY_DATE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            date: (action.requestData.date) ? action.requestData.date : null,
            error: [],
        }));
    },
    [GET_USER_WORKOUT_BY_DATE_SUCCESS]: (state, action) => {
        var newState = {
            loading: false,
        };
        if (action.data.status === 1) {
            newState.workouts = action.data.workouts;
        } else {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
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
}

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}