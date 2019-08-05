import { takeLatest, call, put } from 'redux-saga/effects';
import { GET_INGRIDIENTS_REQUEST, getIngridientsSuccess, getIngridientsError, GET_RECENT_INGRIDIENTS_REQUEST, getRecentIngridientsSuccess, getRecentIngridientsError } from '../actions/new_nutrition';

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


function fetchRecentIngridientsData() {
    console.log('Inside fetchRecentIngridientsData => ');
    return function* (action) {
        try {
            console.log('fetchRecentIngridientsData => action => ', action);
            const data = yield call(() => api.getRecentIngridients());
            yield put(getRecentIngridientsSuccess(data));
        } catch (error) {
            console.log('error => ', error);
            yield put(getRecentIngridientsError(error));
        }
    }
}

export function* watchIngridientsData() {
    yield takeLatest(GET_INGRIDIENTS_REQUEST, fetchIngridientsData());
    yield takeLatest(GET_RECENT_INGRIDIENTS_REQUEST, fetchRecentIngridientsData());
}

export default [
    watchIngridientsData()
];