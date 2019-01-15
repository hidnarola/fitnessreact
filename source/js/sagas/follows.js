import { takeLatest, call, put } from 'redux-saga/effects';

import api from 'api/follows';
import {
    START_FOLLOWING_REQUEST,
    startFollowingSuccess,
    startFollowingError,
    STOP_FOLLOWING_REQUEST,
    stopFollowingSuccess,
    stopFollowingError
} from '../actions/follows';

function startFollowingData() {
    return function* (action) {
        try {
            let requestData = action.requestData;
            const data = yield call(() => api.startFollowing(requestData));
            yield put(startFollowingSuccess(data));
        } catch (error) {
            yield put(startFollowingError(error));
        }
    }
}

function stopFollowingData() {
    return function* (action) {
        try {
            let requestData = action.requestData;
            const data = yield call(() => api.stopFollowing(requestData));
            yield put(stopFollowingSuccess(data));
        } catch (error) {
            yield put(stopFollowingError(error));
        }
    }
}

export function* watchFollowsData() {
    yield takeLatest(START_FOLLOWING_REQUEST, startFollowingData());
    yield takeLatest(STOP_FOLLOWING_REQUEST, stopFollowingData());
}

export default [
    watchFollowsData()
];