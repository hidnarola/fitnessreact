import { takeLatest, put, call } from 'redux-saga/effects';
import api from 'api/userNutritionPreferences';
import {
    getUserNutritionPreferencesSuccess,
    getUserNutritionPreferencesError,
    GET_USER_NUTRITION_PREFERENCES_REQUEST,
    SAVE_USER_NUTRITION_PREFERENCES_REQUEST,
    saveUserNutritionPreferencesError,
    saveUserNutritionPreferencesSuccess,
    resetUserNutritionPreferencesSuccess,
    resetUserNutritionPreferencesError,
    RESET_USER_NUTRITION_PREFERENCES_REQUEST
} from '../actions/userNutritionPreferences';

function fetchUserNutritionPreferencesData() {
    return function* (action) {
        try {
            const data = yield call(() => api.getUserNutritionPreferences());
            yield put(getUserNutritionPreferencesSuccess(data));
        } catch (error) {
            yield put(getUserNutritionPreferencesError(error));
        }
    }
}

function saveUserNutritionPreferencesData() {
    return function* (action) {
        try {
            let requestData = action.requestData;
            const data = yield call(() => api.postUserNutritionPreferences(requestData));
            yield put(saveUserNutritionPreferencesSuccess(data));
        } catch (error) {
            yield put(saveUserNutritionPreferencesError(error));
        }
    }
}

function resetUserNutritionPreferencesData() {
    return function* (action) {
        try {
            const data = yield call(() => api.resetUserNutritionPreferences());
            yield put(resetUserNutritionPreferencesSuccess(data));
        } catch (error) {
            yield put(resetUserNutritionPreferencesError(error));
        }
    }
}

export function* watchUserNutritionPreferencesData() {
    yield takeLatest(GET_USER_NUTRITION_PREFERENCES_REQUEST, fetchUserNutritionPreferencesData());
    yield takeLatest(SAVE_USER_NUTRITION_PREFERENCES_REQUEST, saveUserNutritionPreferencesData());
    yield takeLatest(RESET_USER_NUTRITION_PREFERENCES_REQUEST, resetUserNutritionPreferencesData());
}

export default [
    watchUserNutritionPreferencesData()
];