import { takeLatest, call, put } from 'redux-saga/effects';

import api from 'api/userBodyMeasurement';
import {
    getUserBodyMeasurementSuccess,
    getUserBodyMeasurementError,
    GET_USER_BODY_MEASUREMENT_REQUEST,
    saveUserBodyMeasurementSuccess,
    saveUserBodyMeasurementError,
    SAVE_USER_BODY_MEASUREMENT_REQUEST,
    getUserBodyMeasurementLogDatesSuccess,
    getUserBodyMeasurementLogDatesError,
    GET_USER_BODY_MEASUREMENT_LOG_DATES_REQUEST
} from '../actions/userBodyMeasurement';

function fetchBodyMeasurementData() {
    return function* (action) {
        try {
            const data = yield call(() => api.getBodyMeasurementData(action.requestData));
            yield put(getUserBodyMeasurementSuccess(data));
        } catch (error) {
            yield put(getUserBodyMeasurementError(error));
        }
    }
}

function fetchBodyMeasurementLogDatesData() {
    return function* (action) {
        try {
            const data = yield call(() => api.getBodyMeasurementLogDatesData(action.requestData));
            yield put(getUserBodyMeasurementLogDatesSuccess(data));
        } catch (error) {
            yield put(getUserBodyMeasurementLogDatesError(error));
        }
    }
}

function saveBodyMeasurementData() {
    return function* (action) {
        try {
            const data = yield call(() => api.saveBodyMeasurementData(action.data));
            yield put(saveUserBodyMeasurementSuccess(data));
        } catch (error) {
            yield put(saveUserBodyMeasurementError(error));
        }
    }
}

export function* watchBodyMeasurementData() {
    yield takeLatest(GET_USER_BODY_MEASUREMENT_REQUEST, fetchBodyMeasurementData());
    yield takeLatest(GET_USER_BODY_MEASUREMENT_LOG_DATES_REQUEST, fetchBodyMeasurementLogDatesData());
    yield takeLatest(SAVE_USER_BODY_MEASUREMENT_REQUEST, saveBodyMeasurementData());
}

export default [
    watchBodyMeasurementData()
];