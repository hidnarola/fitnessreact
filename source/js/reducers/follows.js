import { Map } from "immutable";
import { START_FOLLOWING_REQUEST, START_FOLLOWING_SUCCESS, START_FOLLOWING_ERROR, STOP_FOLLOWING_REQUEST, STOP_FOLLOWING_SUCCESS, STOP_FOLLOWING_ERROR } from "../actions/follows";
import { VALIDATION_FAILURE_STATUS } from "../constants/consts";
import { generateValidationErrorMsgArr } from "../helpers/funs";

const initialState = Map({
    startFollowingLoading: false,
    startFollowingStatus: 0,
    startFollowingError: [],

    stopFollowingLoading: false,
    stopFollowingStatus: 0,
    stopFollowingError: [],
});

const actionMap = {
    [START_FOLLOWING_REQUEST]: (state, action) => {
        return state.merge(Map({
            startFollowingLoading: true,
            startFollowingStatus: 0,
            startFollowingError: []
        }));
    },
    [START_FOLLOWING_SUCCESS]: (state, action) => {
        return state.merge(Map({
            startFollowingLoading: false,
            startFollowingStatus: 1
        }));
    },
    [START_FOLLOWING_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            startFollowingLoading: false,
            startFollowingError: error
        }));
    },
    [STOP_FOLLOWING_REQUEST]: (state, action) => {
        return state.merge(Map({
            stopFollowingLoading: true,
            stopFollowingStatus: 0,
            stopFollowingError: []
        }));
    },
    [STOP_FOLLOWING_SUCCESS]: (state, action) => {
        return state.merge(Map({
            stopFollowingLoading: false,
            stopFollowingStatus: 1
        }));
    },
    [STOP_FOLLOWING_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            stopFollowingLoading: false,
            stopFollowingError: error
        }));
    },
};

export default function reducer(state = initialState, action = {}) {
    if (action && action.type) {
        var fn = actionMap[action.type];
        return fn ? fn(state, action) : state;
    }
    return state;
}