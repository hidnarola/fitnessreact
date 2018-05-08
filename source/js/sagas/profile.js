import { takeLatest, call, put } from 'redux-saga/effects';
import {
    getProfileDetailsSuccess,
    getProfileDetailsError,
    GET_PROFILE_DETAILS_REQUEST,
    SAVE_ABOUT_PROFILE_DETAILS_REQUEST,
    saveAboutProfileDetailsSuccess,
    saveAboutProfileDetailsError,
} from '../actions/profile';

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

function postAboutProfileDetailsData() {
    return function* (action) {
        try {
            var requestData = action.requestData;
            const data = yield call(() => api.saveAboutProfileDetails(requestData));
            yield put(saveAboutProfileDetailsSuccess(data));
        } catch (error) {
            yield put(saveAboutProfileDetailsError(error));
        }
    }
}

export function* watchProfileDetailsData() {
    yield takeLatest(GET_PROFILE_DETAILS_REQUEST, fetchProfileDetailsData());
    yield takeLatest(SAVE_ABOUT_PROFILE_DETAILS_REQUEST, postAboutProfileDetailsData());
}

export default [
    watchProfileDetailsData()
];