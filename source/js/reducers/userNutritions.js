import { Map } from "immutable";
import {
    GET_USER_TODAYS_MEAL_REQUEST,
    GET_USER_TODAYS_MEAL_SUCCESS,
    GET_USER_TODAYS_MEAL_ERROR
} from "../actions/userNutritions";
import { VALIDATION_FAILURE_STATUS } from "../constants/consts";
import { generateValidationErrorMsgArr } from "../helpers/funs";

const initialState = Map({
    loading: false,
    error: [],
    todaysMeal: [],
});

const actionMap = {
    [GET_USER_TODAYS_MEAL_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
        }));
    },
    [GET_USER_TODAYS_MEAL_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            todaysMeal: action.data.todays_meal,
        }));
    },
    [GET_USER_TODAYS_MEAL_ERROR]: (state, action) => {
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