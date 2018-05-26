import { takeLatest, put, call } from 'redux-saga/effects';
import api from 'api/userTimeline';
import {
    getUserTimelineSuccess,
    getUserTimelineError,
    GET_USER_TIMELINE_REQUEST
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

export function* watchUserTimelineData() {
    yield takeLatest(GET_USER_TIMELINE_REQUEST, getUserTimelineData());
}

export default [
    watchUserTimelineData()
];