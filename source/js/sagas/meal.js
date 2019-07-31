import { takeLatest, put, call } from 'redux-saga/effects';
import {
    MEAL_ADD_REQUEST,
    mealAddError,
    mealAddSuccess,
} from "../actions/meal";
import api from '../api/meal';

function postMealData() {
    console.log('saga => ');
    return function* (action) {
        try {
            const requestData = action.requestData;
            const data = yield call(() => api.addMeal(requestData));
            yield put(mealAddSuccess(data));
        } catch (error) {
            yield put(mealAddError(error));
        }
    }
}


export function* watchAdminBodyParts() {
    yield takeLatest(MEAL_ADD_REQUEST, postMealData());
}

export default [
    watchAdminBodyParts(),
]