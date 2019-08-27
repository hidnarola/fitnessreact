import { te, ts } from '../helpers/funs';

export const MEAL_ADD_REQUEST = 'MEAL_ADD_REQUEST';
export const MEAL_ADD_SUCCESS = 'MEAL_ADD_SUCCESS';
export const MEAL_ADD_ERROR = 'MEAL_ADD_ERROR';

export const MEAL_EDIT_REQUEST = 'MEAL_EDIT_REQUEST';
export const MEAL_EDIT_SUCCESS = 'MEAL_EDIT_SUCCESS';
export const MEAL_EDIT_ERROR = 'MEAL_EDIT_ERROR';

export const MEAL_REQUEST_BY_ID = 'MEAL_REQUEST_BY_ID';
export const MEAL_REQUEST_BY_ID_SUCCESS = 'MEAL_REQUEST_BY_ID_SUCCESS';
export const MEAL_REQUEST_BY_ID_ERROR = 'MEAL_REQUEST_BY_ID_ERROR';

export const MEAL_SEARCH_REQUEST = 'MEAL_SEARCH_REQUEST';
export const MEAL_SEARCH_SUCCESS = 'MEAL_SEARCH_SUCCESS';
export const MEAL_SEARCH_ERROR = 'MEAL_SEARCH_ERROR';

export const RECENT_MEAL_REQUEST = 'RECENT_MEAL_REQUEST';
export const RECENT_MEAL_SUCCESS = 'RECENT_MEAL_SUCCESS';
export const RECENT_MEAL_ERROR = 'RECENT_MEAL_ERROR';

export const ADD_MEAL_TO_FAVOURITE_REQUEST = 'ADD_MEAL_TO_FAVOURITE_REQUEST';
export const ADD_MEAL_TO_FAVOURITE_SUCCESS = 'ADD_MEAL_TO_FAVOURITE_SUCCESS';
export const ADD_MEAL_TO_FAVOURITE_ERROR = 'ADD_MEAL_TO_FAVOURITE_ERROR';

export const HANDLE_CHANGE_MEAL_SEARCH_VALUE =
  'HANDLE_CHANGE_MEAL_SEARCH_VALUE';

export const SET_RECENT_MEALS = 'SET_RECENT_MEALS';

// export const SET_BODY_PARTS_STATE = 'SET_BODY_PARTS_STATE';

export function recentMealRequest(requestData) {
  return {
    type: RECENT_MEAL_REQUEST,
  };
}

export function recentMealSuccess(data) {
  return {
    type: RECENT_MEAL_SUCCESS,
    data,
  };
}

export function recentMealError(error) {
  return {
    type: RECENT_MEAL_ERROR,
    error,
  };
}

export function mealAddRequest(requestData) {
  return {
    type: MEAL_ADD_REQUEST,
    requestData,
  };
}

export function mealAddSuccess(data) {
  return {
    type: MEAL_ADD_SUCCESS,
    data,
  };
}

export function mealAddError(error) {
  return {
    type: MEAL_ADD_ERROR,
    error,
  };
}

export function mealEditRequest(mealID, requestData) {
  return {
    type: MEAL_EDIT_REQUEST,
    mealID,
    requestData,
  };
}

export function mealEditSuccess(data) {
  ts('Meal Successfully Updated');
  return {
    type: MEAL_EDIT_SUCCESS,
    data,
  };
}

export function mealEditError(error) {
  te('Error while updating meal');
  return {
    type: MEAL_EDIT_ERROR,
    error,
  };
}

export function mealSearchRequest(data) {
  return {
    type: MEAL_SEARCH_REQUEST,
    data,
  };
}

export function mealSearchSuccess(data) {
  return {
    type: MEAL_SEARCH_SUCCESS,
    data,
  };
}

export function mealSearchError(error) {
  return {
    type: MEAL_SEARCH_ERROR,
    error,
  };
}

export function addMealToFavouriteRequest(data) {
  return {
    type: ADD_MEAL_TO_FAVOURITE_REQUEST,
    data,
  };
}

export function addMealToFavouriteSuccess(data) {
  return {
    type: ADD_MEAL_TO_FAVOURITE_SUCCESS,
    data,
  };
}

export function addMealToFavouriteError(error) {
  return {
    type: ADD_MEAL_TO_FAVOURITE_ERROR,
    error,
  };
}

export function handleChnageSearchMeal(requestData) {
  return {
    type: HANDLE_CHANGE_MEAL_SEARCH_VALUE,
    requestData,
  };
}

export function requestMealById(mealID) {
  return {
    type: MEAL_REQUEST_BY_ID,
    mealID,
  };
}

export function requestMealByIdSuccess(data) {
  return {
    type: MEAL_REQUEST_BY_ID_SUCCESS,
    data,
  };
}
export function requestMealByIdError(error) {
  return {
    type: MEAL_REQUEST_BY_ID_ERROR,
    error,
  };
}

export function setRecentMeals(data) {
  return {
    type: SET_RECENT_MEALS,
    data,
  };
}
