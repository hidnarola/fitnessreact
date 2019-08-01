export const MEAL_ADD_REQUEST = "MEAL_ADD_REQUEST";
export const MEAL_ADD_SUCCESS = "MEAL_ADD_SUCCESS";
export const MEAL_ADD_ERROR = "MEAL_ADD_ERROR";

export const MEAL_SEARCH_REQUEST = "MEAL_SEARCH_REQUEST";
export const MEAL_SEARCH_SUCCESS = "MEAL_SEARCH_SUCCESS";
export const MEAL_SEARCH_ERROR = "MEAL_SEARCH_ERROR";

export const HANDLE_CHANGE_MEAL_SEARCH_VALUE =
  "HANDLE_CHANGE_MEAL_SEARCH_VALUE";

// export const SET_BODY_PARTS_STATE = 'SET_BODY_PARTS_STATE';

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

export function handleChnageSearchMeal(requestData) {
  return {
    type: HANDLE_CHANGE_MEAL_SEARCH_VALUE,
    requestData
  };
}

// export function setBodyPartState(stateData = {}) {
//     return {
//         type: SET_BODY_PARTS_STATE,
//         stateData
//     }
// }
