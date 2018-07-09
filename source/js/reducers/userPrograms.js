import { Map } from "immutable";
import {
    GET_USER_PROGRAMS_REQUEST,
    GET_USER_PROGRAMS_SUCCESS,
    GET_USER_PROGRAMS_ERROR
} from "../actions/userPrograms";
import { VALIDATION_FAILURE_STATUS } from "../constants/consts";
import { generateValidationErrorMsgArr } from "../helpers/funs";

const initialState = Map({
    loading: false,
    programs: [],
    error: [],
});

const actionMap = {
    [GET_USER_PROGRAMS_REQUEST]: () => {
        return state.merge(Map({
            loading: true,
            programs: [],
            error: [],
        }));
    },
    [GET_USER_PROGRAMS_SUCCESS]: () => {
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
    [GET_USER_PROGRAMS_ERROR]: () => {
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