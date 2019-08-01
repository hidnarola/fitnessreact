import { takeLatest, put, call } from 'redux-saga/effects';
import {
    MEAL_ADD_REQUEST,
    mealAddError,
    mealAddSuccess,
} from "../actions/meal";
import api from 'api/meal';

function postMealData() {
    console.log('saga => ');
    return function* (action) {
        try {
            const requestData = action.requestData;
            console.log('action.requestData => ', action.requestData);
            const data = yield call(() => api.addMeal(requestData));
            yield put(mealAddSuccess(data));
        } catch (error) {
            console.log('error => ', error);
            yield put(mealAddError(error));
        }
    }
}

export function* watchMeal() {
    console.log('watch => ');
    yield takeLatest(MEAL_ADD_REQUEST, postMealData());
}

export default [
    watchMeal(),
]