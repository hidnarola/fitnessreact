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
    LOAD_MORE_APPROVED_FRIENDS_REQUEST,
    LOAD_MORE_APPROVED_FRIENDS_SUCCESS,
    LOAD_MORE_APPROVED_FRIENDS_ERROR,
    LOAD_MORE_PENDING_FRIENDS_REQUEST,
    LOAD_MORE_PENDING_FRIENDS_SUCCESS,
    LOAD_MORE_PENDING_FRIENDS_ERROR,
    GET_APPROVED_FRIENDS_MESSENGER_REQUEST,
    GET_APPROVED_FRIENDS_MESSENGER_SUCCESS,
    GET_APPROVED_FRIENDS_MESSENGER_ERROR,
    LOAD_MORE_APPROVED_FRIENDS_MESSENGER_REQUEST,
    LOAD_MORE_APPROVED_FRIENDS_MESSENGER_SUCCESS,
    LOAD_MORE_APPROVED_FRIENDS_MESSENGER_ERROR,
    UPDATE_APPROVED_FRIENDS_ONLINE_STATUS_MESSENGER,
    SET_USER_FRIEND_REQUEST
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
    approvedLoadMoreLoading: false,
    approvedNoMoreData: false,
    pendingLoading: false,
    pendingFriends: [],
    pendingError: [],
    pendingSkip: 0,
    pendingLimit: 10,
    pendingLoadMoreLoading: false,
    pendingNoMoreData: false,
    requestSendLoading: false,
    requestSendError: [],
    requestCancelLoading: false,
    requestCancelError: [],
    requestAcceptLoading: false,
    requestAcceptError: [],

    approvedMessLoading: false,
    approvedMessFriends: [],
    approvedMessError: [],
    approvedMessSkip: 0,
    approvedMessLimit: 10,
    approvedMessLoadMoreLoading: false,
    approvedMessNoMoreData: false,
});

const actionMap = {
    [GET_APPROVED_FRIENDS_REQUEST]: (state, action) => {
        return state.merge(Map({
            approvedLoading: true,
            approvedFriends: [],
            approvedSkip: action.skip,
            approvedLimit: action.limit,
            approvedNoMoreData: false,
            approvedError: [],
        }));
    },
    [GET_APPROVED_FRIENDS_SUCCESS]: (state, action) => {
        let prevApprovedLimit = state.get('approvedLimit');
        let newState = { approvedLoading: false };
        if (action.data && action.data.status && action.data.status === 1) {
            newState.approvedFriends = action.data.friends;
            if (action.data.friends && action.data.friends.length <= 0) {
                newState.approvedNoMoreData = true;
            }
            if (action.data.total_records && (action.data.total_records <= 0 || action.data.total_records <= prevApprovedLimit)) {
                newState.approvedNoMoreData = true;
            }
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
    [LOAD_MORE_APPROVED_FRIENDS_REQUEST]: (state, action) => {
        return state.merge(Map({
            approvedLoadMoreLoading: true,
            approvedSkip: action.skip,
            approvedLimit: action.limit,
            approvedNoMoreData: false,
            approvedError: [],
        }));
    },
    [LOAD_MORE_APPROVED_FRIENDS_SUCCESS]: (state, action) => {
        let prevApprovedFriends = state.get('approvedFriends');
        let newState = { approvedLoadMoreLoading: false };
        if (action.data && action.data.status && action.data.status === 1) {
            if (action.data.friends && action.data.friends.length > 0) {
                newState.approvedFriends = prevApprovedFriends.concat(action.data.friends);
                if (action.data.total_records && (action.data.total_records <= 0 || action.data.total_records <= newState.approvedFriends.length)) {
                    newState.approvedNoMoreData = true;
                }
            } else {
                newState.approvedNoMoreData = true;
            }
        } else {
            let msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later';
            newState.approvedNoMoreData = true;
            newState.approvedError = [msg];
        }
        return state.merge(Map(newState));
    },
    [LOAD_MORE_APPROVED_FRIENDS_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            approvedLoadMoreLoading: false,
            approvedNoMoreData: true,
            approvedError: error,
        }));
    },
    [GET_APPROVED_FRIENDS_MESSENGER_REQUEST]: (state, action) => {
        return state.merge(Map({
            approvedMessLoading: true,
            approvedMessFriends: [],
            approvedMessSkip: action.requestData.start,
            approvedMessLimit: action.requestData.limit,
            approvedMessNoMoreData: false,
            approvedMessError: [],
        }));
    },
    [GET_APPROVED_FRIENDS_MESSENGER_SUCCESS]: (state, action) => {
        let prevApprovedMessLimit = state.get('approvedMessLimit');
        let newState = { approvedMessLoading: false };
        if (action.data && action.data.status && action.data.status === 1) {
            newState.approvedMessFriends = action.data.friends;
            if (action.data.friends && action.data.friends.length <= 0) {
                newState.approvedMessNoMoreData = true;
            }
            if (action.data.total_records && (action.data.total_records <= 0 || action.data.total_records <= prevApprovedMessLimit)) {
                newState.approvedMessNoMoreData = true;
            }
        } else {
            let msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later';
            newState.approvedMessError = [msg];
        }
        return state.merge(Map(newState));
    },
    [GET_APPROVED_FRIENDS_MESSENGER_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            approvedMessLoading: false,
            approvedMessError: error,
        }));
    },
    [LOAD_MORE_APPROVED_FRIENDS_MESSENGER_REQUEST]: (state, action) => {
        return state.merge(Map({
            approvedMessLoadMoreLoading: true,
            approvedMessSkip: action.requestData.start,
            approvedMessLimit: action.requestData.limit,
            approvedMessNoMoreData: false,
            approvedMessError: [],
        }));
    },
    [LOAD_MORE_APPROVED_FRIENDS_MESSENGER_SUCCESS]: (state, action) => {
        let prevApprovedFriends = state.get('approvedMessFriends');
        let newState = { approvedMessLoadMoreLoading: false };
        if (action.data && action.data.status && action.data.status === 1) {
            if (action.data.friends && action.data.friends.length > 0) {
                newState.approvedMessFriends = prevApprovedFriends.concat(action.data.friends);
                if (action.data.total_records && (action.data.total_records <= 0 || action.data.total_records <= newState.approvedMessFriends.length)) {
                    newState.approvedMessNoMoreData = true;
                }
            } else {
                newState.approvedMessNoMoreData = true;
            }
        } else {
            let msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later';
            newState.approvedMessNoMoreData = true;
            newState.approvedMessError = [msg];
        }
        return state.merge(Map(newState));
    },
    [LOAD_MORE_APPROVED_FRIENDS_MESSENGER_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            approvedMessLoadMoreLoading: false,
            approvedMessNoMoreData: true,
            approvedMessError: error,
        }));
    },
    [GET_PENDING_FRIENDS_REQUEST]: (state, action) => {
        return state.merge(Map({
            pendingLoading: true,
            pendingFriends: [],
            pendingSkip: action.skip,
            pendingLimit: action.limit,
            pendingNoMoreData: false,
            pendingError: [],
        }));
    },
    [GET_PENDING_FRIENDS_SUCCESS]: (state, action) => {
        let prevPendingLimit = state.get('pendingLimit');
        let newState = { pendingLoading: false };
        if (action.data && action.data.status && action.data.status === 1) {
            newState.pendingFriends = action.data.friends;
            if (action.data.friends && action.data.friends.length <= 0) {
                newState.pendingNoMoreData = true;
            }
            if (action.data.total_records && (action.data.total_records <= 0 || action.data.total_records <= prevPendingLimit)) {
                newState.pendingNoMoreData = true;
            }
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
    [LOAD_MORE_PENDING_FRIENDS_REQUEST]: (state, action) => {
        return state.merge(Map({
            pendingLoadMoreLoading: true,
            pendingSkip: action.skip,
            pendingLimit: action.limit,
            pendingNoMoreData: false,
            pendingError: [],
        }));
    },
    [LOAD_MORE_PENDING_FRIENDS_SUCCESS]: (state, action) => {
        let prevPendingFriends = state.get('pendingFriends');
        let newState = { pendingLoadMoreLoading: false };
        if (action.data && action.data.status && action.data.status === 1) {
            if (action.data.friends && action.data.friends.length > 0) {
                newState.pendingFriends = prevPendingFriends.concat(action.data.friends);
                if (action.data.total_records && (action.data.total_records <= 0 || action.data.total_records <= newState.pendingFriends.length)) {
                    newState.pendingNoMoreData = true;
                }
            } else {
                newState.pendingNoMoreData = true;
            }
        } else {
            let msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later';
            newState.pendingNoMoreData = true;
            newState.pendingError = [msg];
        }
        return state.merge(Map(newState));
    },
    [LOAD_MORE_PENDING_FRIENDS_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            pendingLoadMoreLoading: false,
            pendingNoMoreData: true,
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
    [UPDATE_APPROVED_FRIENDS_ONLINE_STATUS_MESSENGER]: (state, action) => {
        let prevFrnds = state.get('approvedMessFriends');
        if (prevFrnds && prevFrnds.length > 0 && action.data &&  action.data.authUserId) {
            let nextFrnds = [];
            prevFrnds.map((o) => {
                let obj = Object.assign({}, o);
                if (o.authUserId === action.data.authUserId) {
                    obj.isOnline = action.data.isOnline;
                }
                nextFrnds.push(obj);
            });
            return state.merge(Map({
                approvedMessFriends: nextFrnds,
            }));
        }
        return state;
    },
    [SET_USER_FRIEND_REQUESTS_COUNT]: (state, action) => {
        return state.merge(Map({
            pendingRequestsCount: action.count,
        }));
    },
    [SET_USER_FRIEND_REQUEST] :(state, action) => {
        return state.merge(Map(action.data));
    }
};

export default function reducer(state = initialState, action = {}) {
    if (action && action.type) {
        var fn = actionMap[action.type];
        return fn ? fn(state, action) : state;
    }
    return state;
}