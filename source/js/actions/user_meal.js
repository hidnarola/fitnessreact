import { ts } from '../helpers/funs';

export const USER_MEAL_ADD_REQUEST = 'USER_MEAL_ADD_REQUEST';
export const USER_MEAL_ADD_SUCCESS = 'USER_MEAL_ADD_SUCCESS';
export const USER_MEAL_ADD_ERROR = 'USER_MEAL_ADD_ERROR';

export const USER_MEAL_UPDATE_REQUEST = 'USER_MEAL_UPDATE_REQUEST';
export const USER_MEAL_UPDATE_SUCCESS = 'USER_MEAL_UPDATE_SUCCESS';
export const USER_MEAL_UPDATE_ERROR = 'USER_MEAL_UPDATE_ERROR';

export const GET_USER_MEAL_REQUEST = 'GET_USER_MEAL_REQUEST';
export const GET_USER_MEAL_SUCCESS = 'GET_USER_MEAL_SUCCESS';
export const GET_USER_MEAL_ERROR = 'GET_USER_MEAL_ERROR';

export const CUT_USER_MEAL_SCHEDULE = 'CUT_USER_MEAL_SCHEDULE';
export const COPY_USER_MEAL_SCHEDULE = 'COPY_USER_MEAL_SCHEDULE';
export const SET_SCHEDULE_MEALS_STATE = 'SET_SCHEDULE_MEALS_STATE';

export const GET_USER_MEALS_LOG_DATES_REQUEST =
  'GET_USER_MEALS_LOG_DATES_REQUEST';
export const GET_USER_MEALS_LOG_DATES_SUCCESS =
  'GET_USER_MEALS_LOG_DATES_SUCCESS';
export const GET_USER_MEALS_LOG_DATES_ERROR = 'GET_USER_MEALS_LOG_DATES_ERROR';

export const SET_MEAL_DATA_IN_IDB = 'SET_MEAL_DATA_IN_IDB';
export const SET_USER_MEAL = 'SET_USER_MEAL';

export function userMealAddRequest(requestData, callback) {
  return {
    type: USER_MEAL_ADD_REQUEST,
    requestData,
    callback,
  };
}

export function userMealAddSuccess(data) {
  ts('Meal Successfully Added');
  return {
    type: USER_MEAL_ADD_SUCCESS,
    data,
  };
}

export function userMealAddError(error) {
  return {
    type: USER_MEAL_ADD_ERROR,
    error,
  };
}

export function userMealUpdateRequest(id, requestData, callback = res => {}) {
  return {
    type: USER_MEAL_UPDATE_REQUEST,
    id,
    requestData,
    callback,
  };
}

export function userMealUpdateSuccess(data) {
  ts('Meal Successfully Added');
  return {
    type: USER_MEAL_UPDATE_SUCCESS,
    data,
  };
}

export function userMealUpdateError(error) {
  return {
    type: USER_MEAL_UPDATE_ERROR,
    error,
  };
}

export function getUserMealsLogDatesRequest(requestData) {
  return {
    type: GET_USER_MEALS_LOG_DATES_REQUEST,
    requestData,
  };
}

export function getUserMealsLogDatesSuccess(data) {
  return {
    type: GET_USER_MEALS_LOG_DATES_SUCCESS,
    data,
  };
}

export function getUserMealsLogDatesError(error) {
  return {
    type: GET_USER_MEALS_LOG_DATES_ERROR,
    error,
  };
}

export function getUserMealRequest(requestData) {
  return {
    type: GET_USER_MEAL_REQUEST,
    requestData,
  };
}

export function getUserMealSuccess(data) {
  let meals = [];
  const { userMeals } = data;
  userMeals.forEach(item => {
    item.meals.forEach(mealsdata => {
      mealsdata.date = item.date;
      meals.push(mealsdata);
    });
  });
  data.meals = meals;
  return {
    type: GET_USER_MEAL_SUCCESS,
    data,
  };
}

export function getUserMealError(error) {
  return {
    type: GET_USER_MEAL_ERROR,
    error,
  };
}

export function cutUserMealSchedule(mealId, mealDetailId, mealData) {
  return {
    type: CUT_USER_MEAL_SCHEDULE,
    mealId,
    mealDetailId,
    mealData,
  };
}

export function copyUserMealSchedule(mealId, mealDetailId) {
  return {
    type: COPY_USER_MEAL_SCHEDULE,
    mealId,
    mealDetailId,
  };
}

export function setScheduleMealsState(stateData) {
  return {
    type: SET_SCHEDULE_MEALS_STATE,
    stateData,
  };
}

export function setMealDatainIdb(data) {
  return {
    type: SET_MEAL_DATA_IN_IDB,
    data,
  };
}

export function setUserMeals(data) {
  return {
    type: SET_USER_MEAL,
    data,
  };
}
