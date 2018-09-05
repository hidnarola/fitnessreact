import { takeLatest, call, put } from "redux-saga/effects";
import { GET_DASHBOARD_PAGE_REQUEST, getDashboardPageSuccess, getDashboardPageError } from "../actions/dashboard";

function getDashboardPageData() {
    return function* (action) {
        try {
            const data = yield call(() => api.getFriends(username, FRIEND_APPROVED));
            yield put(getDashboardPageSuccess(data));
        } catch (error) {
            yield put(getDashboardPageError(error));
        }
    }
}

export function* watchDashboardData() {
    yield takeLatest(GET_DASHBOARD_PAGE_REQUEST, getDashboardPageData());
}

export default [
    watchDashboardData()
];