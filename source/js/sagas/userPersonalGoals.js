import { takeLatest, put, call } from 'redux-saga/effects';
import api from 'api/userPersonalGoals';
import {
    addUserPersonalGoalSuccess,
    addUserPersonalGoalError,
    ADD_USER_PERSONAL_GOAL_REQUEST
} from '../actions/userPersonalGoals';

function addUserPersonalGoalData() {
    return function* (action) {
        try {
            let requestData = action.requestData;
            const data = yield call(() => api.postUserPersonalGoal(requestData));
            yield put(addUserPersonalGoalSuccess(data));
        } catch (error) {
            yield put(addUserPersonalGoalError(error));
        }
    }
}

export function* watchUserPersonalGoalData() {
    yield takeLatest(ADD_USER_PERSONAL_GOAL_REQUEST, addUserPersonalGoalData());
}

export default [
    watchUserPersonalGoalData()
];