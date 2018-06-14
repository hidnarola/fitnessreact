import { takeLatest, put, call } from 'redux-saga/effects';
import api from 'api/userPrimaryGoals';
import {
    getUserPrimaryGoalSuccess,
    getUserPrimaryGoalError,
    GET_USER_PRIMARY_GOAL_REQUEST,
} from '../actions/userPrimaryGoals';

function getUserPrimaryGoalsData() {
    return function* (action) {
        try {
            const data = yield call(() => api.getUserPrimaryGoals());
            yield put(getUserPrimaryGoalSuccess(data));
        } catch (error) {
            yield put(getUserPrimaryGoalError(error));
        }
    }
}

export function* watchUserPrimaryGoalData() {
    yield takeLatest(GET_USER_PRIMARY_GOAL_REQUEST, getUserPrimaryGoalsData());
}

export default [
    watchUserPrimaryGoalData()
];