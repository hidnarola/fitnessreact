import { takeLatest, put, call } from 'redux-saga/effects';
import api from 'api/admin/profile';
import {
    UPDATE_PROFILE_REQUEST,
    updateProfileSuccess,
    updateProfileError,
    GET_ADMIN_PROFILE_REQUEST,
    getAdminProfileSuccess,
    getAdminProfileError
} from '../../actions/admin/profile';

function getAdminProfileData() {
    return function* (action) {
        try {
            let requestData = action.requestData;
            const data = yield call(() => api.getAdminProfile(requestData));
            yield put(getAdminProfileSuccess(data));
        } catch (error) {
            yield put(getAdminProfileError(error));
        }
    }
}

function updateProfileData() {
    return function* (action) {
        try {
            let requestData = action.requestData;
            const data = yield call(() => api.updateProfile(requestData));
            yield put(updateProfileSuccess(data));
        } catch (error) {
            yield put(updateProfileError(error));
        }
    }
}

export function* watchAdminProfile() {
    yield takeLatest(GET_ADMIN_PROFILE_REQUEST, getAdminProfileData());
    yield takeLatest(UPDATE_PROFILE_REQUEST, updateProfileData());
}
export default [
    watchAdminProfile(),
]