import { takeLatest, put, call } from 'redux-saga/effects';
import api from 'api/userExerciseTypes';
import {
    getUserExerciseTypesSuccess,
    getUserExerciseTypesError,
    GET_USER_EXERCISE_TYPES_REQUEST,
} from '../actions/userExerciseTypes';

function fetchUserExerciseTypesData() {
    return function* (action) {
        try {
            const data = yield call(() => api.getUserExerciseTypes());
            yield put(getUserExerciseTypesSuccess(data));
        } catch (error) {
            yield put(getUserExerciseTypesError(error));
        }
    }
}

export function* watchUserExerciseTypesData() {
    yield takeLatest(GET_USER_EXERCISE_TYPES_REQUEST, fetchUserExerciseTypesData());
}

export default [
    watchUserExerciseTypesData()
];