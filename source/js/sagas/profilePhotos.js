import { takeLatest, put, call } from 'redux-saga/effects';
import { GET_PROFILE_PHOTOS_START, profilePhotosError, profilePhotosSuccess } from '../actions/profilePhotos';

import api from 'api/newapi';

export function fetchProfilePhotosData() {
    return function* (action) {
        try {
            const data = yield call(() => api.getProfilePhotosData());
            yield put(profilePhotosSuccess(data));
        } catch (error) {
            yield put(profilePhotosError(error));
        }
    }
}

export function* watchProfilePhotosData() {
    yield takeLatest(GET_PROFILE_PHOTOS_START, fetchProfilePhotosData());
}

export default [
    watchProfilePhotosData()
];