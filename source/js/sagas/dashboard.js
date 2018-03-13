import { takeLatest, call, put } from 'redux-saga/effects';

import {
    GET_PEOPLE_START_NEW,
    GET_PEOPLE_ERROR_NEW,
    GET_PEOPLE_SUCCESS_NEW
} from '../actions/dashboard';

import api from 'api/newapi';

// -------- Get people

function createGetWidget() {
    return function* (options) { // eslint-disable-line consistent-return
        try {
            const data = yield call(() => api.getPeople(options.id));
            const action = { type: GET_PEOPLE_SUCCESS_NEW, data };
            yield put(action);
        } catch (error) {
            const action = { type: GET_PEOPLE_ERROR_NEW, error };
            yield put(action);
        }
    };
}

export const getWidget = createGetWidget();

export function* getWidgetWatcher() {
    yield takeLatest(GET_PEOPLE_START_NEW, getWidget);
}

export default [
    getWidgetWatcher(),
];
