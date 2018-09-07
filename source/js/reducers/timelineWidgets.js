import { Map } from "immutable";
import {
    GET_TIMELINE_WIDGETS_AND_WIDGETS_DATA_REQUEST,
    GET_TIMELINE_WIDGETS_AND_WIDGETS_DATA_SUCCESS,
    GET_TIMELINE_WIDGETS_AND_WIDGETS_DATA_ERROR
} from "../actions/timelineWidgets";
import { generateValidationErrorMsgArr } from "../helpers/funs";
import { VALIDATION_FAILURE_STATUS } from "../constants/consts";

const initialState = Map({
    loading: false,
    userWidgets: {},
    error: [],
});

const actionMap = {
    [GET_TIMELINE_WIDGETS_AND_WIDGETS_DATA_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            userWidgets: {},
            error: [],
        }));
    },
    [GET_TIMELINE_WIDGETS_AND_WIDGETS_DATA_SUCCESS]: (state, action) => {
        let newState = { loading: false };
        if (action.data && action.data.status && action.data.status === 1) {
            newState.userWidgets = action.data.data.userWidgets;
        } else {
            let msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [GET_TIMELINE_WIDGETS_AND_WIDGETS_DATA_ERROR]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: prepareResponseError(action),
        }));
    },
}

function prepareResponseError(action) {
    let error = [];
    if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
        error = generateValidationErrorMsgArr(action.error.response.message);
    } else if (action.error && action.error.message) {
        error = [action.error.message];
    } else {
        error = ['Something went wrong! please try again later'];
    }
    return error;
}

export default function reducer(state = initialState, action = {}) {
    if (action && action.type) {
        var fn = actionMap[action.type];
        return fn ? fn(state, action) : state;
    }
    return state;
}