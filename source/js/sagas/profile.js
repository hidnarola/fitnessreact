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
    saveLoggedUserProfilePhotoSuccess,
    saveLoggedUserProfilePhotoError,
    SAVE_LOGGED_USER_PROFILE_PHOTO_REQUEST,
    getLoggedUserProfileSettingsSuccess,
    getLoggedUserProfileSettingsError,
    GET_LOGGED_USER_PROFILE_SETTINGS_REQUEST,
    saveLoggedUserProfileSettingsSuccess,
    saveLoggedUserProfileSettingsError,
    SAVE_LOGGED_USER_PROFILE_SETTINGS_REQUEST,
    showFollUserListSuccess,
    showFollUserListError,
    SHOW_FOLL_USER_LIST_REQUEST,
    deleteUserProfileImageSuccess,
    deleteUserProfileImageError,
    DELETE_USER_PROFILE_IMG_REQUEST,
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

function fetchLoggedUserProfileSettingsData() {
    return function* (action) {
        try {
            const data = yield call(() => api.getLoggedUserProfileSettings());
            yield put(getLoggedUserProfileSettingsSuccess(data));
        } catch (error) {
            yield put(getLoggedUserProfileSettingsError(error));
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

function updateLoggedUserProfileSettingsData() {
    return function* (action) {
        try {
            var formData = action.formData;
            const data = yield call(() => api.saveLoggedUserProfileSettings(formData));
            yield put(saveLoggedUserProfileSettingsSuccess(data));
        } catch (error) {
            yield put(saveLoggedUserProfileSettingsError(error));
        }
    }
}

function updateLoggedUserProfilePhotoData() {
    return function* (action) {
        try {
            var requestData = action.requestData;
            const data = yield call(() => api.saveLoggedUserProfilePhoto(requestData));
            yield put(saveLoggedUserProfilePhotoSuccess(data));
        } catch (error) {
            yield put(saveLoggedUserProfilePhotoError(error));
        }
    }
}

function showFollUserData() {
    return function* (action) {
        try {
            var _for = action._for;
            var username = action.username;
            const data = yield call(() => api.showFollUserList(_for, username));
            yield put(showFollUserListSuccess(data));
        } catch (error) {
            yield put(showFollUserListError(error));
        }
    }
}

function deleteProfileImage() {
    return function* (action) {
        try {
            const data = yield call(() => api.deleteProfileImage());
            yield put(deleteUserProfileImageSuccess(data));
        } catch (error) {
            yield put(deleteUserProfileImageError(error));
        }
    }
}


export function* watchProfileDetailsData() {
    yield takeLatest(GET_LOGGED_USER_PROFILE_DETAILS_REQUEST, fetchLoggedUserProfileDetailsData());
    yield takeLatest(GET_PROFILE_DETAILS_REQUEST, fetchProfileDetailsData());
    yield takeLatest(SAVE_ABOUT_PROFILE_DETAILS_REQUEST, updateAboutProfileDetailsData());
    yield takeLatest(SAVE_LOGGED_USER_PROFILE_DETAILS_REQUEST, updateLoggedUserProfileDetailsData());
    yield takeLatest(SAVE_LOGGED_USER_PROFILE_SETTINGS_REQUEST, updateLoggedUserProfileSettingsData());
    yield takeLatest(SAVE_LOGGED_USER_PROFILE_PHOTO_REQUEST, updateLoggedUserProfilePhotoData());
    yield takeLatest(GET_LOGGED_USER_PROFILE_SETTINGS_REQUEST, fetchLoggedUserProfileSettingsData());
    yield takeLatest(SHOW_FOLL_USER_LIST_REQUEST, showFollUserData());
    yield takeLatest(DELETE_USER_PROFILE_IMG_REQUEST,deleteProfileImage());
}

export default [
    watchProfileDetailsData()
];