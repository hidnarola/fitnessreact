import { takeLatest, put, call } from 'redux-saga/effects';
import api from 'api/userTimeline';
import {
    getUserTimelineSuccess,
    getUserTimelineError,
    GET_USER_TIMELINE_REQUEST,
    getUserSingleTimelineSuccess,
    getUserSingleTimelineError,
    GET_USER_SINGLE_TIMELINE_REQUEST,
    addPostOnUserTimelineSuccess,
    addPostOnUserTimelineError,
    ADD_POST_ON_USER_TIMELINE_REQUEST,
    GET_PRIVACY_OF_TIMELINE_USER_REQUEST,
    getPrivacyOfTimelineUserSuccess,
    getPrivacyOfTimelineUserError
} from '../actions/userTimeline';

function getUserTimelineData() {
    return function* (action) {
        try {
            let username = action.username;
            let start = action.start;
            let offset = action.offset;
            const data = yield call(() => api.getUserTimeline(username, start, offset));
            yield put(getUserTimelineSuccess(data));
        } catch (error) {
            yield put(getUserTimelineError(error));
        }
    }
}

function getUserSingleTimelineData() {
    return function* (action) {
        try {
            let postId = action.postId;
            const data = yield call(() => api.getUserSingleTimeline(postId));
            yield put(getUserSingleTimelineSuccess(data));
        } catch (error) {
            yield put(getUserSingleTimelineError(error));
        }
    }
}

function postPostOnUserTimelineData() {
    return function* (action) {
        try {
            let formData = action.formData;
            const data = yield call(() => api.addPostOnUserTimeline(formData));
            yield put(addPostOnUserTimelineSuccess(data));
        } catch (error) {
            yield put(addPostOnUserTimelineError(error));
        }
    }
}

function getPrivacyOfTimelineUserData() {
    return function* (action) {
        try {
            let formData = action.formData;
            const data = yield call(() => api.getPrivacyOfTimelineUser(formData));
            yield put(getPrivacyOfTimelineUserSuccess(data));
        } catch (error) {
            yield put(getPrivacyOfTimelineUserError(error));
        }
    }
}

export function* watchUserTimelineData() {
    yield takeLatest(GET_USER_TIMELINE_REQUEST, getUserTimelineData());
    yield takeLatest(GET_USER_SINGLE_TIMELINE_REQUEST, getUserSingleTimelineData());
    yield takeLatest(ADD_POST_ON_USER_TIMELINE_REQUEST, postPostOnUserTimelineData());
    yield takeLatest(GET_PRIVACY_OF_TIMELINE_USER_REQUEST, getPrivacyOfTimelineUserData());
}

export default [
    watchUserTimelineData()
];