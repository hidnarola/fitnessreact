import { Map } from "immutable";
import {
    GET_APPROVED_FRIENDS_REQUEST,
    GET_APPROVED_FRIENDS_SUCCESS,
    GET_APPROVED_FRIENDS_ERROR,
    GET_PENDING_FRIENDS_REQUEST,
    GET_PENDING_FRIENDS_SUCCESS,
    GET_PENDING_FRIENDS_ERROR,
    SEND_FRIEND_REQUEST_REQUEST,
    SEND_FRIEND_REQUEST_SUCCESS,
    SEND_FRIEND_REQUEST_ERROR,
    CANCEL_FRIEND_REQUEST_REQUEST,
    CANCEL_FRIEND_REQUEST_SUCCESS,
    CANCEL_FRIEND_REQUEST_ERROR,
    ACCEPT_FRIEND_REQUEST_REQUEST,
    ACCEPT_FRIEND_REQUEST_SUCCESS,
    ACCEPT_FRIEND_REQUEST_ERROR,
    SET_USER_FRIEND_REQUESTS_COUNT,
} from "../actions/friends";
import { VALIDATION_FAILURE_STATUS } from "../constants/consts";
import { generateValidationErrorMsgArr } from "../helpers/funs";

const initialState = Map({
    pendingRequestsCount: 0,
    approvedLoading: false,
    approvedFriends: [],
    approvedError: [],
    approvedSkip: 0,
    approvedLimit: 10,
    pendingLoading: false,
    pendingFriends: [],
    pendingError: [],
    pendingSkip: 0,
    pendingLimit: 10,
    requestSendLoading: false,
    requestSendError: [],
    requestCancelLoading: false,
    requestCancelError: [],
    requestAcceptLoading: false,
    requestAcceptError: [],
});

const actionMap = {
    [GET_APPROVED_FRIENDS_REQUEST]: (state, action) => {
        return state.merge(Map({
            approvedLoading: true,
            approvedFriends: [],
            approvedSkip: action.skip,
            approvedLimit: action.limit,
            approvedError: [],
        }));
    },
    [GET_APPROVED_FRIENDS_SUCCESS]: (state, action) => {
        let newState = { approvedLoading: false };
        if (action.data && action.data.status && action.data.status === 1) {
            newState.approvedFriends = action.data.friends;
        } else {
            let msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later';
            newState.approvedError = [msg];
        }
        return state.merge(Map(newState));
    },
    [GET_APPROVED_FRIENDS_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            approvedLoading: false,
            approvedError: error,
        }));
    },
    [GET_PENDING_FRIENDS_REQUEST]: (state, action) => {
        return state.merge(Map({
            pendingLoading: true,
            pendingFriends: [],
            pendingSkip: action.skip,
            pendingLimit: action.limit,
            pendingError: [],
        }));
    },
    [GET_PENDING_FRIENDS_SUCCESS]: (state, action) => {
        let newState = { pendingLoading: false };
        if (action.data && action.data.status && action.data.status === 1) {
            newState.pendingFriends = action.data.friends;
        } else {
            let msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later';
            newState.pendingError = [msg];
        }
        return state.merge(Map(newState));
    },
    [GET_PENDING_FRIENDS_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            pendingLoading: false,
            pendingError: error,
        }));
    },
    [SEND_FRIEND_REQUEST_REQUEST]: (state, action) => {
        return state.merge(Map({
            requestSendLoading: true,
        }));
    },
    [SEND_FRIEND_REQUEST_SUCCESS]: (state, action) => {
        return state.merge(Map({
            requestSendLoading: false,
        }));
    },
    [SEND_FRIEND_REQUEST_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            requestSendLoading: false,
            requestSendError: error,
        }));
    },
    [CANCEL_FRIEND_REQUEST_REQUEST]: (state, action) => {
        return state.merge(Map({
            requestCancelLoading: true,
        }));
    },
    [CANCEL_FRIEND_REQUEST_SUCCESS]: (state, action) => {
        return state.merge(Map({
            requestCancelLoading: false,
        }));
    },
    [CANCEL_FRIEND_REQUEST_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            requestCancelLoading: false,
            requestCancelError: error,
        }));
    },
    [ACCEPT_FRIEND_REQUEST_REQUEST]: (state, action) => {
        return state.merge(Map({
            requestAcceptLoading: true,
        }));
    },
    [ACCEPT_FRIEND_REQUEST_SUCCESS]: (state, action) => {
        return state.merge(Map({
            requestAcceptLoading: false,
        }));
    },
    [ACCEPT_FRIEND_REQUEST_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            requestAcceptLoading: false,
            requestAcceptError: error,
        }));
    },
    [SET_USER_FRIEND_REQUESTS_COUNT]: (state, action) => {
        return state.merge(Map({
            pendingRequestsCount: action.count,
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