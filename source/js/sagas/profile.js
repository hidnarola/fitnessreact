import { takeLatest, call, put } from 'redux-saga/effects';
import {
    getProfileDetailsSuccess,
    getProfileDetailsError,
    GET_PROFILE_DETAILS_REQUEST,
    SAVE_ABOUT_PROFILE_DETAILS_REQUEST,
    saveAboutProfileDetailsSuccess,
    saveAboutProfileDetailsError,
    getLoggedUserProfileDetailsSuccess,
    getLoggedUserProfileDetailsError,
    GET_LOGGED_USER_PROFILE_DETAILS_REQUEST,
    saveLoggedUserProfileDetailsSuccess,
    saveLoggedUserProfileDetailsError,
    SAVE_LOGGED_USER_PROFILE_DETAILS_REQUEST,
} from '../actions/profile';

import api from 'api/profile';

function fetchLoggedUserProfileDetailsData() {
    return function* (action) {
        try {
            const data = yield call(() => api.getLoggedUserProfileDetails());
            yield put(getLoggedUserProfileDetailsSuccess(data));
        } catch (error) {
            yield put(getLoggedUserProfileDetailsError(error));
        }
    }
}

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

function updateAboutProfileDetailsData() {
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

function updateLoggedUserProfileDetailsData() {
    return function* (action) {
        try {
            var formData = action.formData;
            const data = yield call(() => api.saveLoggedUserProfileDetails(formData));
            yield put(saveLoggedUserProfileDetailsSuccess(data));
        } catch (error) {
            yield put(saveLoggedUserProfileDetailsError(error));
        }
    }
}

export function* watchProfileDetailsData() {
    yield takeLatest(GET_LOGGED_USER_PROFILE_DETAILS_REQUEST, fetchLoggedUserProfileDetailsData());
    yield takeLatest(GET_PROFILE_DETAILS_REQUEST, fetchProfileDetailsData());
    yield takeLatest(SAVE_ABOUT_PROFILE_DETAILS_REQUEST, updateAboutProfileDetailsData());
    yield takeLatest(SAVE_LOGGED_USER_PROFILE_DETAILS_REQUEST, updateLoggedUserProfileDetailsData());
}

export default [
    watchProfileDetailsData()
];