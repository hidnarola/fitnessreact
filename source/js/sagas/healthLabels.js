import { takeLatest, put, call } from 'redux-saga/effects';
import api from 'api/healthLabels';
import {
    getHealthLabelsSuccess,
    getHealthLabelsError,
    GET_HEALTH_LABELS_REQUEST,
    SAVE_HEALTH_LABELS_REQUEST,
    saveHealthLabelsError,
    saveHealthLabelsSuccess,
    resetHealthLabelsSuccess,
    resetHealthLabelsError,
    RESET_HEALTH_LABELS_REQUEST
} from '../actions/healthLabels';

function fetchHealthLabelsData() {
    return function* (action) {
        try {
            const data = yield call(() => api.getHealthLabels());
            yield put(getHealthLabelsSuccess(data));
        } catch (error) {
            yield put(getHealthLabelsError(error));
        }
    }
}

export function* watchHealthLabelsData() {
    yield takeLatest(GET_HEALTH_LABELS_REQUEST, fetchHealthLabelsData());
}

export default [
    watchHealthLabelsData()
];