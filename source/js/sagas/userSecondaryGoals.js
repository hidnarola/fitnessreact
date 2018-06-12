import { takeLatest, put, call } from 'redux-saga/effects';
import api from 'api/userSecondaryGoals';
import {
    addUserSecondaryGoalSuccess,
    addUserSecondaryGoalError,
    ADD_USER_SECONDARY_GOAL_REQUEST,
    getUserSecondaryGoalSuccess,
    getUserSecondaryGoalError,
    GET_USER_SECONDARY_GOAL_REQUEST,
    deleteUserSecondaryGoalSuccess,
    deleteUserSecondaryGoalError,
    DELETE_USER_SECONDARY_GOAL_REQUEST
} from '../actions/userSecondaryGoals';

function getUserSecondaryGoalsData() {
    return function* (action) {
        try {
            const data = yield call(() => api.getUserSecondaryGoals());
            yield put(getUserSecondaryGoalSuccess(data));
        } catch (error) {
            yield put(getUserSecondaryGoalError(error));
        }
    }
}

function addUserSecondaryGoalData() {
    return function* (action) {
        try {
            let requestData = action.requestData;
            const data = yield call(() => api.postUserSecondaryGoal(requestData));
            yield put(addUserSecondaryGoalSuccess(data));
        } catch (error) {
            yield put(addUserSecondaryGoalError(error));
        }
    }
}

function deleteUserSecondaryGoalData() {
    return function* (action) {
        try {
            let _id = action._id;
            const data = yield call(() => api.deleteUserSecondaryGoal(_id));
            yield put(deleteUserSecondaryGoalSuccess(data));
        } catch (error) {
            yield put(deleteUserSecondaryGoalError(error));
        }
    }
}

export function* watchUserSecondaryGoalData() {
    yield takeLatest(GET_USER_SECONDARY_GOAL_REQUEST, getUserSecondaryGoalsData());
    yield takeLatest(ADD_USER_SECONDARY_GOAL_REQUEST, addUserSecondaryGoalData());
    yield takeLatest(DELETE_USER_SECONDARY_GOAL_REQUEST, deleteUserSecondaryGoalData());
}

export default [
    watchUserSecondaryGoalData()
];