import { takeLatest, put, call } from 'redux-saga/effects';
import api from 'api/userFitnessTests';
import {
    getUserFitnessTestsSuccess,
    getUserFitnessTestsError,
    GET_USER_FITNESS_TESTS_REQUEST,
    saveUserFitnessTestsSuccess,
    saveUserFitnessTestsError,
    SAVE_USER_FITNESS_TESTS_REQUEST,
    RESET_USER_FITNESS_TESTS_REQUEST,
    resetUserFitnessTestsSuccess,
    resetUserFitnessTestsError
} from '../actions/userFitnessTests';

function getUserFitnessTestsData() {
    return function* (action) {
        try {
            var today = action.today;
            const data = yield call(() => api.getUserFitnessTests(today));
            yield put(getUserFitnessTestsSuccess(data));
        } catch (error) {
            yield put(getUserFitnessTestsError(error));
        }
    }
}

function saveUserFitnessTestsData() {
    return function* (action) {
        try {
            const requestData = action.requestData;
            const data = yield call(() => api.saveUserFitnessTests(requestData));
            yield put(saveUserFitnessTestsSuccess(data));
        } catch (error) {
            yield put(saveUserFitnessTestsError(error));
        }
    }
}

function resetUserFitnessTestsData() {
    return function* (action) {
        try {
            var date = action.date;
            const data = yield call(() => api.resetUserFitnessTests(date));
            yield put(resetUserFitnessTestsSuccess(data));
        } catch (error) {
            yield put(resetUserFitnessTestsError(error));
        }
    }
}

export function* watchUserFitnessTestsData() {
    yield takeLatest(GET_USER_FITNESS_TESTS_REQUEST, getUserFitnessTestsData());
    yield takeLatest(SAVE_USER_FITNESS_TESTS_REQUEST, saveUserFitnessTestsData());
    yield takeLatest(RESET_USER_FITNESS_TESTS_REQUEST, resetUserFitnessTestsData());
}

export default [
    watchUserFitnessTestsData()
];