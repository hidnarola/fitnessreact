import { takeLatest, call, put } from 'redux-saga/effects';

import api from 'api/friends';
import {
    GET_APPROVED_FRIENDS_REQUEST,
    GET_PENDING_FRIENDS_REQUEST,
    getApprovedFriendsSuccess,
    getApprovedFriendsError,
    getPendingFriendsSuccess,
    getPendingFriendsError
} from '../actions/friends';
import {
    FRIEND_APPROVED,
    FRIEND_PENDING
} from '../constants/consts';

function fetchApprovedFriendsData() {
    return function* (action) {
        try {
            var username = action.username;
            const data = yield call(() => api.getFriends(username, FRIEND_APPROVED));
            yield put(getApprovedFriendsSuccess(data));
        } catch (error) {
            yield put(getApprovedFriendsError(error));
        }
    }
}

function fetchPendingFriendsData() {
    return function* (action) {
        try {
            var username = action.username;
            const data = yield call(() => api.getFriends(username, FRIEND_PENDING));
            yield put(getPendingFriendsSuccess(data));
        } catch (error) {
            yield put(getPendingFriendsError(error));
        }
    }
}

export function* watchFriendsData() {
    yield takeLatest(GET_APPROVED_FRIENDS_REQUEST, fetchApprovedFriendsData());
    yield takeLatest(GET_PENDING_FRIENDS_REQUEST, fetchPendingFriendsData());
}

export default [
    watchFriendsData()
];