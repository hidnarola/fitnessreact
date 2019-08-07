export const MEAL_ADD_REQUEST = "MEAL_ADD_REQUEST";
export const MEAL_ADD_SUCCESS = "MEAL_ADD_SUCCESS";
export const MEAL_ADD_ERROR = "MEAL_ADD_ERROR";

export const MEAL_SEARCH_REQUEST = "MEAL_SEARCH_REQUEST";
export const MEAL_SEARCH_SUCCESS = "MEAL_SEARCH_SUCCESS";
export const MEAL_SEARCH_ERROR = "MEAL_SEARCH_ERROR";

export const RECENT_MEAL_REQUEST = "RECENT_MEAL_REQUEST";
export const RECENT_MEAL_SUCCESS = "RECENT_MEAL_SUCCESS";
export const RECENT_MEAL_ERROR = "RECENT_MEAL_ERROR";

export const ADD_MEAL_TO_FAVOURITE_REQUEST = "ADD_MEAL_TO_FAVOURITE_REQUEST";
export const ADD_MEAL_TO_FAVOURITE_SUCCESS = "ADD_MEAL_TO_FAVOURITE_SUCCESS";
export const ADD_MEAL_TO_FAVOURITE_ERROR = "ADD_MEAL_TO_FAVOURITE_ERROR";


export const HANDLE_CHANGE_MEAL_SEARCH_VALUE =
  "HANDLE_CHANGE_MEAL_SEARCH_VALUE";

// export const SET_BODY_PARTS_STATE = 'SET_BODY_PARTS_STATE';


export function recentMealRequest(requestData) {
  return {
    type: RECENT_MEAL_REQUEST
  };
}

export function recentMealSuccess(data) {
  return {
    type: RECENT_MEAL_SUCCESS,
    data
  };
}

export function recentMealError(error) {
  return {
    type: RECENT_MEAL_ERROR,
    error
  };
}

export function mealAddRequest(requestData) {
  console.log("action => ");
  return {
    type: MEAL_ADD_REQUEST,
    requestData
  };
}

export function mealAddSuccess(data) {
  return {
    type: MEAL_ADD_SUCCESS,
    data
  };
}

export function mealAddError(error) {
  return {
    type: MEAL_ADD_ERROR,
    error
  };
}

export function mealSearchRequest(data) {
  console.log("action => ");
  return {
    type: MEAL_SEARCH_REQUEST,
    data
  };
}

export function mealSearchSuccess(data) {
  console.log("action search success => ");
  return {
    type: MEAL_SEARCH_SUCCESS,
    data
  };
}

export function mealSearchError(error) {
  return {
    type: MEAL_SEARCH_ERROR,
    error
  };
}

export function addMealToFavouriteRequest(data) {
  console.log("action => ");
  return {
    type: ADD_MEAL_TO_FAVOURITE_REQUEST,
    data
  };
}

export function addMealToFavouriteSuccess(data) {
  console.log("action search success => ");
  return {
    type: ADD_MEAL_TO_FAVOURITE_SUCCESS,
    data
  };
}

export function addMealToFavouriteError(error) {
  return {
    type: ADD_MEAL_TO_FAVOURITE_ERROR,
    error
  };
}

export function handleChnageSearchMeal(requestData) {
  return {
    type: HANDLE_CHANGE_MEAL_SEARCH_VALUE,
    requestData
  };
}

