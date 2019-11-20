import { takeLatest, put, call } from "redux-saga/effects";
import {
  ADD_USER_FAVOURITE_BADGES,
  addUserFavouriteBadgesSuccess,
  addUserFavouriteBadgesError,
  GET_USER_FAVOURITE_BADGES,
  getUserFavouriteBadgesSuccess,
  getUserFavouriteBadgesError
} from "../actions/userFavouriteBadges";
import api from "api/userFavouriteBadges";

function getUserFavouriteBadges() {
  return function*(action) {
    try {
      const data = yield call(() => api.getUserFavouriteBadge());
      yield put(getUserFavouriteBadgesSuccess(data));
    } catch (error) {
      yield put(getUserFavouriteBadgesError(error));
    }
  };
}

function addUserFavouriteBadges() {
  return function*(action) {
    try {
      const data = yield call(() =>
        api.addUserFavouriteBadge(action.requestData)
      );
      yield put(addUserFavouriteBadgesSuccess(data));
      action.callback(data);
    } catch (error) {
      yield put(addUserFavouriteBadgesError(error));
    }
  };
}

export function* watchUserFavouriteBadgesData() {
  yield takeLatest(GET_USER_FAVOURITE_BADGES, getUserFavouriteBadges());
  yield takeLatest(ADD_USER_FAVOURITE_BADGES, addUserFavouriteBadges());
}

export default [watchUserFavouriteBadgesData()];
