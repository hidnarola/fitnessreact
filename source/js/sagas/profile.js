import { takeLatest, call, put } from 'redux-saga/effects';
import { getProfileDetailsSuccess, getProfileDetailsError, GET_PROFILE_DETAILS_REQUEST } from '../actions/profile';

import api from 'api/profile';

function fetchProfileDetailsData() {
    return function* (action) {
        try {
            var username = action.username;
            const data = yield call(() => api.getProfileDetails(username));
            yield put(getProfileDetailsSuccess(data));
        } catch (error) {
            yield put(getProfileDetailsError(error));
        }
    }
}

export function* watchProfileDetailsData() {
    yield takeLatest(GET_PROFILE_DETAILS_REQUEST, fetchProfileDetailsData());
}

export default [
    watchProfileDetailsData()
];