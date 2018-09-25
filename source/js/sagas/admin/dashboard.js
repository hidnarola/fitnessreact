import { takeLatest, put, call } from 'redux-saga/effects';
import { GET_ADMIN_DASHBOARD_REQUEST, getAdminDashboardSuccess, getAdminDashboardError } from '../../actions/admin/dashboard';
import api from 'api/admin/dashboard';

function getAdminDashboardData() {
    return function* (action) {
        try {
            let requestData = action.requestData;
            const data = yield call(() => api.getAdminDashboard(requestData));
            yield put(getAdminDashboardSuccess(data));
        } catch (error) {
            yield put(getAdminDashboardError(error));
        }
    }
}

export function* watchAdminDashboard() {
    yield takeLatest(GET_ADMIN_DASHBOARD_REQUEST, getAdminDashboardData());
}

export default [
    watchAdminDashboard(),
]