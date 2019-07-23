import { takeLatest, call, put } from 'redux-saga/effects';
import { GET_INGRIDIENTS_REQUEST, getIngridientsSuccess, getIngridientsError } from '../actions/new_nutrition';

import api from 'api/new_nutrition';

function fetchIngridientsData() {
    console.log('Inside fetchIngridientsData => ');
    return function* (action) {
        try {
            console.log('fetchIngridientsData => action => ', action);
            const data = yield call(() => api.getIngridients(action.data));
            yield put(getIngridientsSuccess(data));
        } catch (error) {
            console.log('error => ', error);
            yield put(getIngridientsError(error));
        }
    }
}

export function* watchIngridientsData() {
    yield takeLatest(GET_INGRIDIENTS_REQUEST, fetchIngridientsData());
}

export default [
    watchIngridientsData()
];