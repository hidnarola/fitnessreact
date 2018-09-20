import { takeLatest, call, put } from 'redux-saga/effects';

import api from 'api/friends';
import {
    GET_APPROVED_FRIENDS_REQUEST,
    GET_PENDING_FRIENDS_REQUEST,
    getApprovedFriendsSuccess,
    getApprovedFriendsError,
    getPendingFriendsSuccess,
    getPendingFriendsError,
    sendFriendRequestSuccess,
    sendFriendRequestError,
    SEND_FRIEND_REQUEST_REQUEST,
    cancelFriendRequestSuccess,
    cancelFriendRequestError,
    CANCEL_FRIEND_REQUEST_REQUEST,
    acceptFriendRequestSuccess,
    acceptFriendRequestError,
    ACCEPT_FRIEND_REQUEST_REQUEST,
    LOAD_MORE_APPROVED_FRIENDS_REQUEST,
    LOAD_MORE_PENDING_FRIENDS_REQUEST,
    loadMoreApprovedFriendsSuccess,
    loadMoreApprovedFriendsError,
    loadMorePendingFriendsSuccess,
    loadMorePendingFriendsError,
} from '../actions/friends';
import {
    FRIEND_APPROVED,
    FRIEND_PENDING
} from '../constants/consts';

function fetchApprovedFriendsData() {
    return function* (action) {
        try {
            let username = action.username;
            let skip = action.skip;
            let limit = action.limit;
            let sort = action.sort;
            const data = yield call(() => api.getFriends(username, FRIEND_APPROVED, skip, limit, sort));
            yield put(getApprovedFriendsSuccess(data));
        } catch (error) {
            yield put(getApprovedFriendsError(error));
        }
    }
}

function loadMoreApprovedFriendsData() {
    return function* (action) {
        try {
            let username = action.username;
            let skip = action.skip;
            let limit = action.limit;
            let sort = action.sort;
            const data = yield call(() => api.getFriends(username, FRIEND_APPROVED, skip, limit, sort));
            yield put(loadMoreApprovedFriendsSuccess(data));
        } catch (error) {
            yield put(loadMoreApprovedFriendsError(error));
        }
    }
}

function fetchPendingFriendsData() {
    return function* (action) {
        try {
            var username = action.username;
            let skip = action.skip;
            let limit = action.limit;
            let sort = action.sort;
            const data = yield call(() => api.getFriends(username, FRIEND_PENDING, skip, limit, sort));
            yield put(getPendingFriendsSuccess(data));
        } catch (error) {
            yield put(getPendingFriendsError(error));
        }
    }
}

function loadMorePendingFriendsData() {
    return function* (action) {
        try {
            var username = action.username;
            let skip = action.skip;
            let limit = action.limit;
            let sort = action.sort;
            const data = yield call(() => api.getFriends(username, FRIEND_PENDING, skip, limit, sort));
            yield put(loadMorePendingFriendsSuccess(data));
        } catch (error) {
            yield put(loadMorePendingFriendsError(error));
        }
    }
}

function postFriendRequestData() {
    return function* (action) {
        try {
            var requestData = action.requestData;
            const data = yield call(() => api.sendRequest(requestData));
            yield put(sendFriendRequestSuccess(data));
        } catch (error) {
            yield put(sendFriendRequestError(error));
        }
    }
}

function deleteFriendRequestData() {
    return function* (action) {
        try {
            var friendshipId = action.friendshipId;
            const data = yield call(() => api.cancelRequest(friendshipId));
            yield put(cancelFriendRequestSuccess(data));
        } catch (error) {
            yield put(cancelFriendRequestError(error));
        }
    }
}

function putFriendAcceptData() {
    return function* (action) {
        try {
            var friendshipId = action.friendshipId;
            const data = yield call(() => api.acceptRequest(friendshipId));
            yield put(acceptFriendRequestSuccess(data));
        } catch (error) {
            yield put(acceptFriendRequestError(error));
        }
    }
}

export function* watchFriendsData() {
    yield takeLatest(GET_APPROVED_FRIENDS_REQUEST, fetchApprovedFriendsData());
    yield takeLatest(LOAD_MORE_APPROVED_FRIENDS_REQUEST, loadMoreApprovedFriendsData());
    yield takeLatest(GET_PENDING_FRIENDS_REQUEST, fetchPendingFriendsData());
    yield takeLatest(LOAD_MORE_PENDING_FRIENDS_REQUEST, loadMorePendingFriendsData());
    yield takeLatest(SEND_FRIEND_REQUEST_REQUEST, postFriendRequestData());
    yield takeLatest(CANCEL_FRIEND_REQUEST_REQUEST, deleteFriendRequestData());
    yield takeLatest(ACCEPT_FRIEND_REQUEST_REQUEST, putFriendAcceptData());
}

export default [
    watchFriendsData()
];