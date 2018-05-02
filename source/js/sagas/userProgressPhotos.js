import { takeLatest, put, call } from 'redux-saga/effects';
import api from 'api/userProgressPhotos';
import {
    addUserProgressPhotoSuccess,
    addUserProgressPhotoError,
    ADD_USER_PROGRESS_PHOTO_REQUEST
} from '../actions/userProgressPhotos';

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
    yield takeLatest(ADD_USER_PROGRESS_PHOTO_REQUEST, addUserProgressPhotoData());
}

export default [
    watchUserProgressPhotosData()
];