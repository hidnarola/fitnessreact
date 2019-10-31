import { takeLatest, put, call } from "redux-saga/effects";
import api from "api/userPersonalGoals";
import {
  addUserPersonalGoalSuccess,
  addUserPersonalGoalError,
  ADD_USER_PERSONAL_GOAL_REQUEST,
  getUserPersonalGoalSuccess,
  getUserPersonalGoalError,
  GET_USER_PERSONAL_GOAL_REQUEST,
  deleteUserPersonalGoalSuccess,
  deleteUserPersonalGoalError,
  DELETE_USER_PERSONAL_GOAL_REQUEST
} from "../actions/userPersonalGoals";

function getUserPersonalGoalsData() {
  return function*(action) {
    try {
      let type = action.isCompleted;
      let start = action.start;
      let offset = action.offset;
      const data = yield call(() =>
        api.getUserPersonalGoals(type, start, offset)
      );
      yield put(getUserPersonalGoalSuccess(data));
    } catch (error) {
      yield put(getUserPersonalGoalError(error));
    }
  };
}

function addUserPersonalGoalData() {
  return function*(action) {
    try {
      let requestData = action.requestData;
      const data = yield call(() => api.postUserPersonalGoal(requestData));
      yield put(addUserPersonalGoalSuccess(data));
      action.callback(data);
    } catch (error) {
      yield put(addUserPersonalGoalError(error));
    }
  };
}

function deleteUserPersonalGoalData() {
  return function*(action) {
    try {
      let _id = action._id;
      const data = yield call(() => api.deleteUserPersonalGoal(_id));
      yield put(deleteUserPersonalGoalSuccess(data));
    } catch (error) {
      yield put(deleteUserPersonalGoalError(error));
    }
  };
}

export function* watchUserPersonalGoalData() {
  yield takeLatest(GET_USER_PERSONAL_GOAL_REQUEST, getUserPersonalGoalsData());
  yield takeLatest(ADD_USER_PERSONAL_GOAL_REQUEST, addUserPersonalGoalData());
  yield takeLatest(
    DELETE_USER_PERSONAL_GOAL_REQUEST,
    deleteUserPersonalGoalData()
  );
}

export default [watchUserPersonalGoalData()];
