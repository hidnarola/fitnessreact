import { takeLatest, put, call } from 'redux-saga/effects';
import api from 'api/userExercisePreferences';
import {
    getUserExercisePreferencesSuccess,
    getUserExercisePreferencesError,
    GET_USER_EXERCISE_PREFERENCES_REQUEST,
    SAVE_USER_EXERCISE_PREFERENCES_REQUEST,
    saveUserExercisePreferencesError,
    saveUserExercisePreferencesSuccess,
    resetUserExercisePreferencesSuccess,
    resetUserExercisePreferencesError,
    RESET_USER_EXERCISE_PREFERENCES_REQUEST
} from '../actions/userExercisePreferences';

function fetchUserExercisePreferencesData() {
    return function* (action) {
        try {
            const data = yield call(() => api.getUserExercisePreferences());
            yield put(getUserExercisePreferencesSuccess(data));
        } catch (error) {
            yield put(getUserExercisePreferencesError(error));
        }
    }
}


function saveUserExercisePreferencesData() {
    return function* (action) {
        try {
            let requestData = action.requestData;
            const data = yield call(() => api.postUserExercisePreferences(requestData));
            yield put(saveUserExercisePreferencesSuccess(data));
        } catch (error) {
            yield put(saveUserExercisePreferencesError(error));
        }
    }
}

function resetUserExercisePreferencesData() {
    return function* (action) {
        try {
            const data = yield call(() => api.resetUserExercisePreferences());
            yield put(resetUserExercisePreferencesSuccess(data));
        } catch (error) {
            yield put(resetUserExercisePreferencesError(error));
        }
    }
}

export function* watchUserExercisePreferencesData() {
    yield takeLatest(GET_USER_EXERCISE_PREFERENCES_REQUEST, fetchUserExercisePreferencesData());
    yield takeLatest(SAVE_USER_EXERCISE_PREFERENCES_REQUEST, saveUserExercisePreferencesData());
    yield takeLatest(RESET_USER_EXERCISE_PREFERENCES_REQUEST, resetUserExercisePreferencesData());
}

export default [
    watchUserExercisePreferencesData()
];