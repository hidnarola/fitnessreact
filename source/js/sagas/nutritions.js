import { takeLatest, call, put } from 'redux-saga/effects';
import { GET_NUTRITION_REQUEST, getNutritionsSuccess, getNutritionsError } from '../actions/nutritions';

import api from 'api/nutritions';

function fetchNutritionsData() {
    return function* (action) {
        try {
            const data = yield call(() => api.getNutritions());
            yield put(getNutritionsSuccess(data));
        } catch (error) {
            yield put(getNutritionsError(error));
        }
    }
}

export function* watchNutritionsData() {
    yield takeLatest(GET_NUTRITION_REQUEST, fetchNutritionsData());
}

export default [
    watchNutritionsData()
];