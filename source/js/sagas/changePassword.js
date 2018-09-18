import { takeLatest, put, call } from 'redux-saga/effects';
import api from 'api/changePassword';
import { USER_CHANGE_PASSWORD_REQUEST, userChangePasswordSuccess, userChangePasswordError } from '../actions/changePassword';

function changePasswordData() {
    return function* (action) {
        try {
            let requestData = action.requestData;
            const data = yield call(() => api.changePassword(requestData));
            yield put(userChangePasswordSuccess(data));
        } catch (error) {
            yield put(userChangePasswordError(error));
        }
    }
}

export function* watchUserChangePassword() {
    yield takeLatest(USER_CHANGE_PASSWORD_REQUEST, changePasswordData());
}
export default [
    watchUserChangePassword(),
]