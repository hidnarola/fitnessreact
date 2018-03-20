import { takeLatest, call, put } from 'redux-saga/effects';
import { GET_NUTRITION_START, nutritutionErrorAction, nutritutionSuccessAction } from "../actions/nutrition";

import api from 'api/newapi';

function fetchNutritutiondata() {
    return function* (action) {
        try {
            const data = yield call(() => api.getNutritutionData());
            yield put(nutritutionSuccessAction(data));
        } catch (error) {
            yield put(nutritutionErrorAction(error));
        }
    }
}

export function* watchNutritionData() {
    yield takeLatest(GET_NUTRITION_START, fetchNutritutiondata());
}

export default [
    watchNutritionData()
];