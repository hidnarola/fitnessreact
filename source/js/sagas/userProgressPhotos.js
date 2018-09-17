import { takeLatest, put, call } from 'redux-saga/effects';
import api from 'api/userProgressPhotos';
import {
    addUserProgressPhotoSuccess,
    addUserProgressPhotoError,
    ADD_USER_PROGRESS_PHOTO_REQUEST,
    getUserProgressPhotoSuccess,
    getUserProgressPhotoError,
    GET_USER_PROGRESS_PHOTO_REQUEST,
    getUserLatestProgressPhotoSuccess,
    getUserLatestProgressPhotoError,
    GET_USER_LATEST_PROGRESS_PHOTO_REQUEST,
    LOAD_MORE_USER_PROGRESS_PHOTO_REQUEST
} from '../actions/userProgressPhotos';

function fetchUserProgressPhotosData() {
    return function* (action) {
        try {
            let username = action.username;
            let start = action.start;
            let noOfPhotos = action.noOfPhotos;
            let sort = action.sort;
            const data = yield call(() => api.getUserProgressPhotos(username, start, noOfPhotos, sort));
            yield put(getUserProgressPhotoSuccess(data));
        } catch (error) {
            yield put(getUserProgressPhotoError(error));
        }
    }
}

function fetchUserLatestProgressPhotosData() {
    return function* (action) {
        try {
            let username = action.username;
            let noOfPhotos = action.noOfPhotos;
            const data = yield call(() => api.getUserLatestProgressPhotos(username, noOfPhotos));
            yield put(getUserLatestProgressPhotoSuccess(data));
        } catch (error) {
            yield put(getUserLatestProgressPhotoError(error));
        }
    }
}

function addUserProgressPhotoData() {
    return function* (action) {
        try {
            let formData = action.formData;
            const data = yield call(() => api.postUserProgressPhoto(formData));
            yield put(addUserProgressPhotoSuccess(data));
        } catch (error) {
            yield put(addUserProgressPhotoError(error));
        }
    }
}

export function* watchUserProgressPhotosData() {
    yield takeLatest(GET_USER_PROGRESS_PHOTO_REQUEST, fetchUserProgressPhotosData());
    yield takeLatest(LOAD_MORE_USER_PROGRESS_PHOTO_REQUEST, fetchUserProgressPhotosData());
    yield takeLatest(GET_USER_LATEST_PROGRESS_PHOTO_REQUEST, fetchUserLatestProgressPhotosData());
    yield takeLatest(ADD_USER_PROGRESS_PHOTO_REQUEST, addUserProgressPhotoData());
}

export default [
    watchUserProgressPhotosData()
];