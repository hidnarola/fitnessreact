import { Map } from "immutable";
import {
    SET_USER_NOTIFICATION_COUNT,
    GET_USER_UNREAD_NOTIFICATIONS_REQUEST,
    GET_USER_UNREAD_NOTIFICATIONS_SUCCESS,
    GET_USER_UNREAD_NOTIFICATIONS_ERROR,
    READ_ONE_USER_NOTIFICATION_REQUEST,
    READ_ONE_USER_NOTIFICATION_SUCCESS,
    READ_ONE_USER_NOTIFICATION_ERROR
} from "../actions/userNotifications";
import { VALIDATION_FAILURE_STATUS } from "../constants/consts";
import { generateValidationErrorMsgArr } from "../helpers/funs";

const initialState = Map({
    count: 0,
    loading: false,
    error: [],
    notifications: [],
});

const actionMap = {
    [SET_USER_NOTIFICATION_COUNT]: (state, action) => {
        return state.merge(Map({
            count: action.count,
        }));
    },
    [GET_USER_UNREAD_NOTIFICATIONS_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: [],
        }));
    },
    [GET_USER_UNREAD_NOTIFICATIONS_SUCCESS]: (state, action) => {
        var newState = {
            loading: false,
        };
        if (action.data.status === 1) {
            newState.notifications = action.data.notifications;
        } else {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [GET_USER_UNREAD_NOTIFICATIONS_ERROR]: (state, action) => {
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
    [READ_ONE_USER_NOTIFICATION_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: [],
        }));
    },
    [READ_ONE_USER_NOTIFICATION_SUCCESS]: (state, action) => {
        var newState = {
            loading: false,
        };
        if (action.data.status !== 1) {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [READ_ONE_USER_NOTIFICATION_ERROR]: (state, action) => {
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