import { takeLatest, put, call } from 'redux-saga/effects';
import api from 'api/userNutritions';
import {
    GET_USER_TODAYS_MEAL_REQUEST,
    getUserTodaysMealSuccess,
    getUserTodaysMealError
} from '../actions/userNutritions';

function getUserTodaysMealData() {
    return function* (action) {
        try {
            let requestData = action.requestData;
            const data = yield call(() => api.getUserTodaysMeal(requestData));
            yield put(getUserTodaysMealSuccess(data));
        } catch (error) {
            yield put(getUserTodaysMealError(error));
        }
    }
}

export function* watchUserNutritionsData() {
    yield takeLatest(GET_USER_TODAYS_MEAL_REQUEST, getUserTodaysMealData());
}

export default [
    watchUserNutritionsData()
];