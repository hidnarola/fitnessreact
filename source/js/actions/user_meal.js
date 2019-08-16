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

export const GET_USER_MEALS_LOG_DATES_REQUEST =
  'GET_USER_MEALS_LOG_DATES_REQUEST';
export const GET_USER_MEALS_LOG_DATES_SUCCESS =
  'GET_USER_MEALS_LOG_DATES_SUCCESS';
export const GET_USER_MEALS_LOG_DATES_ERROR = 'GET_USER_MEALS_LOG_DATES_ERROR';

export function userMealAddRequest(requestData, callback) {
  console.log('action => ', requestData);
  return {
    type: USER_MEAL_ADD_REQUEST,
    requestData,
    callback,
  };
}

export function userMealAddSuccess(data) {
  console.log('SUCCESS====>', data);
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

export function userMealUpdateRequest(id, requestData) {
  console.log('update action => ', requestData);
  return {
    type: USER_MEAL_UPDATE_REQUEST,
    id,
    requestData,
  };
}

export function userMealUpdateSuccess(data) {
  console.log('SUCCESS====>', data);
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
  console.log('action===========>', data);
  return {
    type: GET_USER_MEALS_LOG_DATES_SUCCESS,
    data,
  };
}

export function getUserMealsLogDatesError(error) {
  console.log('Error=====>', error);
  return {
    type: GET_USER_MEALS_LOG_DATES_ERROR,
    error,
  };
}

export function getUserMealRequest(requestData) {
  console.log('GET USER MEAL =======>', requestData);
  return {
    type: GET_USER_MEAL_REQUEST,
    requestData,
  };
}

export function getUserMealSuccess(data) {
  console.log('GET USER MEAL action===========>', data);
  let meals = [];
  const { userMeals } = data;
  userMeals.forEach(item => {
    item.meals.forEach(mealsdata => {
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
  console.log('Error=====>', error);
  return {
    type: GET_USER_MEAL_ERROR,
    error,
  };
}
