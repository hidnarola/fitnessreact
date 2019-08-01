import { takeLatest, put, call } from "redux-saga/effects";
import {
  MEAL_ADD_REQUEST,
  MEAL_SEARCH_REQUEST,
  mealAddError,
  mealAddSuccess,
  mealSearchError,
  mealSearchSuccess
} from "../actions/meal";
import api from "../api/meal";

function postMealData() {
  console.log("saga => ");
  return function*(action) {
    try {
      const requestData = action.requestData;
      const data = yield call(() => api.addMeal(requestData));
      yield put(mealAddSuccess(data));
    } catch (error) {
      yield put(mealAddError(error));
    }
  };
}

function searchMealData() {
  console.log("Inside searchMealsData => ");
  return function*(action) {
    try {
      console.log("searchMealsData => action => ", action);
      const data = yield call(() => api.searchMeal(action.data));
      yield put(mealSearchSuccess(data));
    } catch (error) {
      yield put(mealSearchError(error));
    }
  };
}

export function* watchAdminBodyParts() {
  yield takeLatest(MEAL_ADD_REQUEST, postMealData());
  yield takeLatest(MEAL_SEARCH_REQUEST, searchMealData());
}

export default [watchAdminBodyParts()];
