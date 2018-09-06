import { takeLatest, call, put } from "redux-saga/effects";
import {
    GET_DASHBOARD_PAGE_REQUEST,
    getDashboardPageSuccess,
    getDashboardPageError,
    SAVE_DASHBOARD_WIDGETS_DATA_REQUEST,
    saveDashboardWidgetsDataSuccess,
    saveDashboardWidgetsDataError,
    CHANGE_DASHBOARD_BODY_FAT_WIDGET_REQUEST,
    changeDashboardBodyFatWidgetSuccess,
    changeDashboardBodyFatWidgetError
} from "../actions/dashboard";

import api from "../api/dashboard";

function getDashboardPageData() {
    return function* (action) {
        try {
            const data = yield call(() => api.getDashboardPage());
            yield put(getDashboardPageSuccess(data));
        } catch (error) {
            yield put(getDashboardPageError(error));
        }
    }
}

function saveDashboardWidgetsData() {
    return function* (action) {
        try {
            let requestData = action.requestData;
            const data = yield call(() => api.saveDashboardWidgetsData(requestData));
            yield put(saveDashboardWidgetsDataSuccess(data));
        } catch (error) {
            yield put(saveDashboardWidgetsDataError(error));
        }
    }
}

function changeDashboardBodyFatWidgetData() {
    return function* (action) {
        try {
            let requestData = action.requestData;
            const data = yield call(() => api.changeDashboardBodyFatWidget(requestData));
            yield put(changeDashboardBodyFatWidgetSuccess(data));
        } catch (error) {
            yield put(changeDashboardBodyFatWidgetError(error));
        }
    }
}

export function* watchDashboardData() {
    yield takeLatest(GET_DASHBOARD_PAGE_REQUEST, getDashboardPageData());
    yield takeLatest(SAVE_DASHBOARD_WIDGETS_DATA_REQUEST, saveDashboardWidgetsData());
    yield takeLatest(CHANGE_DASHBOARD_BODY_FAT_WIDGET_REQUEST, changeDashboardBodyFatWidgetData());
}

export default [
    watchDashboardData()
];