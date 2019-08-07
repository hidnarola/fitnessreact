import { takeLatest, put, call } from "redux-saga/effects";
import {
  MEAL_ADD_REQUEST,
  MEAL_SEARCH_REQUEST,
  RECENT_MEAL_REQUEST,
  mealAddError,
  mealAddSuccess,
  mealSearchError,
  mealSearchSuccess,
  recentMealError,
  recentMealSuccess,
  ADD_MEAL_TO_FAVOURITE_REQUEST,
  addMealToFavouriteSuccess,
  addMealToFavouriteError
} from "../actions/meal";
import api from "api/meal";

function postMealData() {
  console.log("saga => ");
  return function* (action) {
    try {
      const requestData = action.requestData;
      console.log("action.requestData => ", action.requestData);
      const data = yield call(() => api.addMeal(requestData));
      yield put(mealAddSuccess(data));
    } catch (error) {
      console.log("error => ", error);
      yield put(mealAddError(error));
    }
  };
}

function searchMealData() {
  console.log("Inside searchMealsData => ");
  return function* (action) {
    try {
      console.log("searchMealsData => action => ", action);
      const data = yield call(() => api.searchMeal(action.data));
      console.log("response", data);
      yield put(mealSearchSuccess(data));
    } catch (error) {
      yield put(mealSearchError(error));
    }
  };
}

function addToFavouriteMealData() {
  console.log("Inside addToFavouriteMealData => ");
  return function* (action) {
    try {
      console.log("addToFavouriteMealData => action => ", action);
      const data = yield call(() => api.addToFavourite(action.data));
      console.log("response", data);
      yield put(addMealToFavouriteSuccess(data));
    } catch (error) {
      yield put(addMealToFavouriteError(error));
    }
  };
}


function recentMealData() {
  console.log("Inside recentMealData => ");
  return function* (action) {
    try {
      console.log("recentMealData => action => ", action);
      const data = yield call(() => api.recentMeal());
      console.log("response", data);
      yield put(recentMealSuccess(data));
    } catch (error) {
      yield put(recentMealError(error));
    }
  };
}

export function* watchMeal() {
  yield takeLatest(MEAL_ADD_REQUEST, postMealData());
  yield takeLatest(MEAL_SEARCH_REQUEST, searchMealData());
  yield takeLatest(RECENT_MEAL_REQUEST, recentMealData());
  yield takeLatest(ADD_MEAL_TO_FAVOURITE_REQUEST, addToFavouriteMealData());

}

export default [watchMeal()];
