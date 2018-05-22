import { takeLatest, put, call } from 'redux-saga/effects';
import api from 'api/userWorkouts';
import {
    getUserWorkoutByDateSuccess,
    getUserWorkoutByDateError,
    GET_USER_WORKOUT_BY_DATE_REQUEST
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

export function* watchUserWorkoutData() {
    yield takeLatest(GET_USER_WORKOUT_BY_DATE_REQUEST, getUserWorkoutByDateData());
}

export default [
    watchUserWorkoutData()
];