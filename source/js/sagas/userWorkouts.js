import { takeLatest, put, call } from 'redux-saga/effects';
import api from 'api/userWorkouts';
import {
    getUserWorkoutByDateSuccess,
    getUserWorkoutByDateError,
    GET_USER_WORKOUT_BY_DATE_REQUEST,
    getUserWorkoutByIdSuccess,
    getUserWorkoutByIdError,
    GET_USER_WORKOUT_BY_ID_REQUEST,
    DELETE_USER_WORKOUT_BY_ID_REQUEST,
    deleteUserWorkoutByIdSuccess,
    deleteUserWorkoutByIdError
} from '../actions/userWorkouts';

function getUserWorkoutByDateData() {
    return function* (action) {
        try {
            let requestData = action.requestData;
            const data = yield call(() => api.getUserWorkoutByDate(requestData));
            yield put(getUserWorkoutByDateSuccess(data));
        } catch (error) {
            yield put(getUserWorkoutByDateError(error));
        }
    }
}

function getUserWorkoutByIdData() {
    return function* (action) {
        try {
            let _id = action._id;
            const data = yield call(() => api.getUserWorkoutById(_id));
            yield put(getUserWorkoutByIdSuccess(data));
        } catch (error) {
            yield put(getUserWorkoutByIdError(error));
        }
    }
}

function deleteUserWorkoutByIdData() {
    return function* (action) {
        try {
            let _id = action._id;
            const data = yield call(() => api.deleteUserWorkoutById(_id));
            yield put(deleteUserWorkoutByIdSuccess(data));
        } catch (error) {
            yield put(deleteUserWorkoutByIdError(error));
        }
    }
}

export function* watchUserWorkoutData() {
    yield takeLatest(GET_USER_WORKOUT_BY_DATE_REQUEST, getUserWorkoutByDateData());
    yield takeLatest(GET_USER_WORKOUT_BY_ID_REQUEST, getUserWorkoutByIdData());
    yield takeLatest(DELETE_USER_WORKOUT_BY_ID_REQUEST, deleteUserWorkoutByIdData());
}

export default [
    watchUserWorkoutData()
];