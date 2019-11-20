import { takeLatest, put, call } from "redux-saga/effects";
import api from "api/userBodyparts";
import {
  getUserBodypartsSuccess,
  getUserBodypartsError,
  GET_USER_BODYPARTS_REQUEST
} from "../actions/userBodyparts";

function fetchUserBodypartsData() {
  return function*(action) {
    try {
      const data = yield call(() => api.getUserBodyparts());
      yield put(getUserBodypartsSuccess(data));
      action.callback(data);
    } catch (error) {
      yield put(getUserBodypartsError(error));
    }
  };
}

export function* watchUserBodypartsData() {
  yield takeLatest(GET_USER_BODYPARTS_REQUEST, fetchUserBodypartsData());
}

export default [watchUserBodypartsData()];
