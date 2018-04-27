import { takeLatest, put, call } from 'redux-saga/effects';
import api from 'api/userExercises';
import {
    getUserExercisesSuccess,
    getUserExercisesError,
    GET_USER_EXERCISES_REQUEST,
} from '../actions/userExercises';

function fetchUserExercisesData() {
    return function* (action) {
        try {
            const data = yield call(() => api.getUserExercises());
            yield put(getUserExercisesSuccess(data));
        } catch (error) {
            yield put(getUserExercisesError(error));
        }
    }
}

export function* watchUserExercisesData() {
    yield takeLatest(GET_USER_EXERCISES_REQUEST, fetchUserExercisesData());
}

export default [
    watchUserExercisesData()
];