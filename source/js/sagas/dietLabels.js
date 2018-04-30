import { takeLatest, put, call } from 'redux-saga/effects';
import api from 'api/nutritionalLabels';
import {
    getDietLabelsSuccess,
    getDietLabelsError,
    GET_DIET_LABELS_REQUEST,
    SAVE_DIET_LABELS_REQUEST,
    saveDietLabelsError,
    saveDietLabelsSuccess,
    resetDietLabelsSuccess,
    resetDietLabelsError,
    RESET_DIET_LABELS_REQUEST
} from '../actions/dietLabels';

function fetchDietLabelsData() {
    return function* (action) {
        try {
            const data = yield call(() => api.getDietLabels());
            yield put(getDietLabelsSuccess(data));
        } catch (error) {
            yield put(getDietLabelsError(error));
        }
    }
}

export function* watchDietLabelsData() {
    yield takeLatest(GET_DIET_LABELS_REQUEST, fetchDietLabelsData());
}

export default [
    watchDietLabelsData()
];