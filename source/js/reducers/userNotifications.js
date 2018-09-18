import { Map } from "immutable";
import {
    SET_USER_NOTIFICATION_COUNT,
    GET_USER_UNREAD_NOTIFICATIONS_REQUEST,
    GET_USER_UNREAD_NOTIFICATIONS_SUCCESS,
    GET_USER_UNREAD_NOTIFICATIONS_ERROR,
    READ_ONE_USER_NOTIFICATION_REQUEST,
    READ_ONE_USER_NOTIFICATION_SUCCESS,
    READ_ONE_USER_NOTIFICATION_ERROR,
    READ_ALL_USER_NOTIFICATION_REQUEST,
    READ_ALL_USER_NOTIFICATION_SUCCESS,
    READ_ALL_USER_NOTIFICATION_ERROR,
    GET_ALL_USER_NOTIFICATION_REQUEST,
    GET_ALL_USER_NOTIFICATION_SUCCESS,
    GET_ALL_USER_NOTIFICATION_ERROR,
    LOAD_MORE_ALL_USER_NOTIFICATION_REQUEST,
    LOAD_MORE_ALL_USER_NOTIFICATION_SUCCESS,
    LOAD_MORE_ALL_USER_NOTIFICATION_ERROR
} from "../actions/userNotifications";
import { VALIDATION_FAILURE_STATUS } from "../constants/consts";
import { generateValidationErrorMsgArr } from "../helpers/funs";

const initialState = Map({
    count: 0,
    loading: false,
    error: [],
    notifications: [],
    allLoading: false,
    allNotifications: [],
    allNotificationsSkip: 0,
    allNotificationsLimit: 10,
    allNotificationsLoadMoreLoading: false,
    allNotificationsNoLoadMore: false,
    allError: [],
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
    [READ_ALL_USER_NOTIFICATION_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: [],
        }));
    },
    [READ_ALL_USER_NOTIFICATION_SUCCESS]: (state, action) => {
        var newState = {
            loading: false,
        };
        if (action.data.status !== 1) {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [READ_ALL_USER_NOTIFICATION_ERROR]: (state, action) => {
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
    [GET_ALL_USER_NOTIFICATION_REQUEST]: (state, action) => {
        return state.merge(Map({
            allLoading: true,
            allNotifications: [],
            allNotificationsSkip: action.skip,
            allNotificationsLimit: action.limit,
            allNotificationsNoLoadMore: false,
            allError: [],
        }));
    },
    [GET_ALL_USER_NOTIFICATION_SUCCESS]: (state, action) => {
        var newState = { allLoading: false };
        if (action.data.status === 1) {
            newState.allNotifications = action.data.notifications;
            if (action.data.notifications && action.data.notifications.length <= 0) {
                newState.allNotificationsNoLoadMore = true;
            }
        } else {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.allError = [msg];
        }
        return state.merge(Map(newState));
    },
    [GET_ALL_USER_NOTIFICATION_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            allLoading: false,
            allError: error,
        }));
    },
    [LOAD_MORE_ALL_USER_NOTIFICATION_REQUEST]: (state, action) => {
        return state.merge(Map({
            allNotificationsLoadMoreLoading: true,
            allNotificationsSkip: action.skip,
            allNotificationsLimit: action.limit,
            allNotificationsNoLoadMore: false,
            allError: [],
        }));
    },
    [LOAD_MORE_ALL_USER_NOTIFICATION_SUCCESS]: (state, action) => {
        let prevNotifications = state.get('allNotifications');
        var newState = { allNotificationsLoadMoreLoading: false };
        if (action.data.status === 1) {
            if (action.data.notifications && action.data.notifications.length > 0) {
                newState.allNotifications = prevNotifications.concat(action.data.notifications);
            } else {
                newState.allNotificationsNoLoadMore = true;
            }
        } else {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.allNotificationsNoLoadMore = true;
            newState.allError = [msg];
        }
        return state.merge(Map(newState));
    },
    [LOAD_MORE_ALL_USER_NOTIFICATION_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            allNotificationsLoadMoreLoading: false,
            allNotificationsNoLoadMore: true,
            allError: error,
        }));
    },
}

export default function reducer(state = initialState, action = {}) {
    if (action && action.type) {
        var fn = actionMap[action.type];
        return fn ? fn(state, action) : state;
    }
    return state;
}