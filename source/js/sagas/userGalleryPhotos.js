import { takeLatest, put, call } from 'redux-saga/effects';
import api from 'api/userGalleryPhotos';
import {
    addUserGalleryPhotoSuccess,
    addUserGalleryPhotoError,
    ADD_USER_GALLERY_PHOTO_REQUEST,
    getUserGalleryPhotoSuccess,
    getUserGalleryPhotoError,
    GET_USER_GALLERY_PHOTO_REQUEST,
    loadMoreUserGalleryPhotoSuccess,
    loadMoreUserGalleryPhotoError,
    LOAD_MORE_USER_GALLERY_PHOTO_REQUEST,
    deleteUserGalleryPhotoSuccess,
    deleteUserGalleryPhotoError,
    DELETE_USER_GALLERY_PHOTO_REQUEST,
} from '../actions/userGalleryPhotos';

function fetchUserGalleryPhotosData() {
    return function* (action) {
        try {
            let username = action.username;
            let start = action.start;
            let offset = action.offset;
            let sort = action.sort;
            const data = yield call(() => api.getUserGalleryPhoto(username, start, offset, sort));
            yield put(getUserGalleryPhotoSuccess(data));
        } catch (error) {
            yield put(getUserGalleryPhotoError(error));
        }
    }
}

function loadMoreUserGalleryPhotosData() {
    return function* (action) {
        try {
            let username = action.username;
            let start = action.start;
            let offset = action.offset;
            let sort = action.sort;
            const data = yield call(() => api.getUserGalleryPhoto(username, start, offset, sort));
            yield put(loadMoreUserGalleryPhotoSuccess(data));
        } catch (error) {
            yield put(loadMoreUserGalleryPhotoError(error));
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

function deleteUserGalleryPhotoData() {
    return function* (action) {
        try {
            let id = action.id;
            let postId = action.postId;
            const data = yield call(() => api.deleteUserGalleryPhoto(id, postId));
            yield put(deleteUserGalleryPhotoSuccess(data));
        } catch (error) {
            yield put(deleteUserGalleryPhotoError(error));
        }
    }
}

export function* watchUserGalleryPhotosData() {
    yield takeLatest(GET_USER_GALLERY_PHOTO_REQUEST, fetchUserGalleryPhotosData());
    yield takeLatest(LOAD_MORE_USER_GALLERY_PHOTO_REQUEST, loadMoreUserGalleryPhotosData());
    yield takeLatest(ADD_USER_GALLERY_PHOTO_REQUEST, addUserGalleryPhotoData());
    yield takeLatest(DELETE_USER_GALLERY_PHOTO_REQUEST, deleteUserGalleryPhotoData());
}

export default [
    watchUserGalleryPhotosData()
];