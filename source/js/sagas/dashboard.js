import { takeLatest, call, put } from 'redux-saga/effects';

import {    
    GET_PEOPLE_START_NEW, GET_PEOPLE_ERROR_NEW, GET_PEOPLE_SUCCESS_NEW,
    GET_DASHBOARD_START,GET_DASHBOARD_ERROR,GET_DASHBOARD_SUCCESS
} from '../actions/dashboard';

import api from 'api/newapi';

// -------- Get people

function createGetWidget() {
    return function* (options) { // eslint-disable-line consistent-return
        try {
            const data = yield call(() => api.getAPI(options.id));
            const action = { type: GET_PEOPLE_SUCCESS_NEW, data };
            yield put(action);
        } catch (error) {
            const action = { type: GET_PEOPLE_ERROR_NEW, error };
            yield put(action);
        }
    };
}

export const gettest = createGetWidget();

export function* getWidgetWatcher() {
    yield takeLatest(GET_PEOPLE_START_NEW, gettest);
}

//----------------------------------------------------------------------------------------

function makeDashboardReq() {
    return function* (options) { // eslint-disable-line consistent-return
        try {
            const data = yield call(() => api.getAPI(options.id));
            const action = { type: GET_DASHBOARD_SUCCESS, data };
            yield put(action);
        } catch (error) {
            const action = { type: GET_DASHBOARD_ERROR, error };
            yield put(action);
        }
    };
}

export function* fetchDashboardData(){
    yield takeLatest(GET_DASHBOARD_START,makeDashboardReq())
}
 
export default [
    getWidgetWatcher(),
    fetchDashboardData()
];
