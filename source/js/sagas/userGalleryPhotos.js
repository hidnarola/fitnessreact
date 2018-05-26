import { takeLatest, put, call } from 'redux-saga/effects';
import api from 'api/userGalleryPhotos';
import {
    addUserGalleryPhotoSuccess,
    addUserGalleryPhotoError,
    ADD_USER_GALLERY_PHOTO_REQUEST,
    getUserGalleryPhotoSuccess,
    getUserGalleryPhotoError,
    GET_USER_GALLERY_PHOTO_REQUEST,
} from '../actions/userGalleryPhotos';

function fetchUserGalleryPhotosData() {
    return function* (action) {
        try {
            let username = action.username;
            let start = action.start;
            let offset = action.offset;
            const data = yield call(() => api.getUserGalleryPhoto(username, start, offset));
            yield put(getUserGalleryPhotoSuccess(data));
        } catch (error) {
            yield put(getUserGalleryPhotoError(error));
        }
    }
}

function addUserGalleryPhotoData() {
    return function* (action) {
        try {
            let requestData = action.requestData;
            const data = yield call(() => api.postUserGalleryPhoto(requestData));
            yield put(addUserGalleryPhotoSuccess(data));
        } catch (error) {
            yield put(addUserGalleryPhotoError(error));
        }
    }
}

export function* watchUserGalleryPhotosData() {
    yield takeLatest(GET_USER_GALLERY_PHOTO_REQUEST, fetchUserGalleryPhotosData());
    yield takeLatest(ADD_USER_GALLERY_PHOTO_REQUEST, addUserGalleryPhotoData());
}

export default [
    watchUserGalleryPhotosData()
];