import { takeLatest, put, call } from 'redux-saga/effects';
import api from 'api/admin/changePassword';
import { CHANGE_PASSWORD_REQUEST, changePasswordSuccess, changePasswordError, } from '../../actions/admin/changePassword';

function changePasswordData() {
    return function* (action) {
        try {
            let requestData = action.requestData;
            const data = yield call(() => api.changePassword(requestData));
            yield put(changePasswordSuccess(data));
        } catch (error) {
            yield put(changePasswordError(error));
        }
    }
}

export function* watchAdminChangePassword() {
    yield takeLatest(CHANGE_PASSWORD_REQUEST, changePasswordData());
}
export default [
    watchAdminChangePassword(),
]