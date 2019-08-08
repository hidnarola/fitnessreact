import { takeLatest, put, call } from 'redux-saga/effects';
import api from '../api/user_meal';
import {
  userMealAddSuccess,
  userMealAddError,
  USER_MEAL_ADD_REQUEST,
  getUserMealsLogDatesSuccess,
  getUserMealsLogDatesError,
  GET_USER_MEALS_LOG_DATES_REQUEST,
  getUserMealSuccess,
  getUserMealError,
  GET_USER_MEAL_REQUEST,
} from '../actions/user_meal';

function postUserMealData() {
  console.log('saga => ');
  return function*(action) {
    try {
      const requestData = action.requestData;
      console.log('action.requestData => ', action.requestData);
      const data = yield call(() => api.addUserMeal(requestData));
      yield put(userMealAddSuccess(data));
    } catch (error) {
      console.log('error => ', error);
      yield put(userMealAddError(error));
    }
  };
}

function fetchUserMealsLogDatesData() {
  return function*(action) {
    try {
      const data = yield call(() =>
        api.getUserMealLogDatesData(action.requestData),
      );
      yield put(getUserMealsLogDatesSuccess(data));
    } catch (error) {
      yield put(getUserMealsLogDatesError(error));
    }
  };
}

function getUserMealByDate() {
  return function*(action) {
    try {
      const data = yield call(() => api.getUserMeal(action.requestData));
      console.log('USER DATA ====>', data);
      yield put(getUserMealSuccess(data));
    } catch (error) {
      yield put(getUserMealError(error));
    }
  };
}

export function* watchUserMeal() {
  yield takeLatest(USER_MEAL_ADD_REQUEST, postUserMealData());
  yield takeLatest(GET_USER_MEAL_REQUEST, getUserMealByDate());
  yield takeLatest(
    GET_USER_MEALS_LOG_DATES_REQUEST,
    fetchUserMealsLogDatesData(),
  );
}

export default [watchUserMeal()];
