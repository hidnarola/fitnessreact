export const ADD_USER_NUTRITION_PROGRAM_REQUEST =
  "ADD_USER_NUTRITION_PROGRAM_REQUEST";
export const ADD_USER_NUTRITION_PROGRAM_SUCCESS =
  "ADD_USER_NUTRITION_PROGRAM_SUCCESS";
export const ADD_USER_NUTRITION_PROGRAM_ERROR =
  "ADD_USER_NUTRITION_PROGRAM_ERROR";

export const UPDATE_USER_NUTRITION_PROGRAM_REQUEST =
  "UPDATE_USER_NUTRITION_PROGRAM_REQUEST";
export const UPDATE_USER_NUTRITION_PROGRAM_SUCCESS =
  "UPDATE_USER_NUTRITION_PROGRAM_SUCCESS";
export const UPDATE_USER_NUTRITION_PROGRAM_ERROR =
  "UPDATE_USER_NUTRITION_PROGRAM_ERROR";

export const GET_USER_NUTRITION_PROGRAM_REQUEST =
  "GET_USER_NUTRITION_PROGRAM_REQUEST";
export const GET_USER_NUTRITION_PROGRAM_SUCCESS =
  "GET_USER_NUTRITION_PROGRAM_SUCCESS";
export const GET_USER_NUTRITION_PROGRAM_ERROR =
  "GET_USER_NUTRITION_PROGRAM_ERROR";

export const GET_USER_NUTRITION_PROGRAM_DETAILS_REQUEST =
  "GET_USER_NUTRITION_PROGRAM_DETAILS_REQUEST";
export const GET_USER_NUTRITION_PROGRAM_DETAILS_SUCCESS =
  "GET_USER_NUTRITION_PROGRAM_DETAILS_SUCCESS";
export const GET_USER_NUTRITION_PROGRAM_DETAILS_ERROR =
  "GET_USER_NUTRITION_PROGRAM_DETAILS_ERROR";

export const GET_USER_NUTRITION_PROGRAM_PLAN_DETAILS_REQUEST =
  "GET_USER_NUTRITION_PROGRAM_PLAN_DETAILS_REQUEST";
export const GET_USER_NUTRITION_PROGRAM_PLAN_DETAILS_SUCCESS =
  "GET_USER_NUTRITION_PROGRAM_PLAN_DETAILS_SUCCESS";
export const GET_USER_NUTRITION_PROGRAM_PLAN_DETAILS_ERROR =
  "GET_USER_NUTRITION_PROGRAM_PLAN_DETAILS_ERROR";

export const PASTE_USER_NUTIRION_PROGRAM_MEALS_REQUEST =
  "PASTE_USER_NUTIRION_PROGRAM_MEALS_REQUEST";
export const PASTE_USER_NUTIRION_PROGRAM_MEALS_SUCCESS =
  "PASTE_USER_NUTIRION_PROGRAM_MEALS_SUCCESS";
export const PASTE_USER_NUTIRION_PROGRAM_MEALS_ERROR =
  "PASTE_USER_NUTIRION_PROGRAM_MEALS_ERROR";

export const DELETE_USER_NUTRITION_PROGRAMS_MEALS_REQUEST =
  "DELETE_USER_NUTRITION_PROGRAMS_MEALS_REQUEST";
export const DELETE_USER_NUTRITION_PROGRAMS_MEALS_SUCCESS =
  "DELETE_USER_NUTRITION_PROGRAMS_MEALS_SUCCESS";
export const DELETE_USER_NUTRITION_PROGRAMS_MEALS_ERROR =
  "DELETE_USER_NUTRITION_PROGRAMS_MEALS_ERROR";

export const ADD_USER_PROGRAMS_MEALS_REQUEST =
  "ADD_USER_PROGRAMS_MEALS_REQUEST";
export const ADD_USER_PROGRAMS_MEALS_SUCCESS =
  "ADD_USER_PROGRAMS_MEALS_SUCCESS";
export const ADD_USER_PROGRAMS_MEALS_ERROR = "ADD_USER_PROGRAMS_MEALS_ERROR";

export function addUserNutritionProgramRequest(
  requestData,
  callback = res => {}
) {
  return {
    type: ADD_USER_NUTRITION_PROGRAM_REQUEST,
    requestData,
    callback
  };
}
export function addUserNutritionProgramSuccess(data) {
  return {
    type: ADD_USER_NUTRITION_PROGRAM_SUCCESS,
    data
  };
}
export function addUserNutritionProgramError(error) {
  return {
    type: ADD_USER_NUTRITION_PROGRAM_ERROR,
    error
  };
}

export function getUserNutritionProgramRequest(
  requestData,
  callback = res => {}
) {
  return {
    type: GET_USER_NUTRITION_PROGRAM_REQUEST,
    requestData,
    callback
  };
}
export function getUserNutritionProgramSuccess(data) {
  return {
    type: GET_USER_NUTRITION_PROGRAM_SUCCESS,
    data
  };
}
export function getUserNutritionProgramError(error) {
  return {
    type: GET_USER_NUTRITION_PROGRAM_ERROR,
    error
  };
}
export function getUserNutritionProgramDetailsRequest(
  programId,
  callback = res => {}
) {
  return {
    type: GET_USER_NUTRITION_PROGRAM_DETAILS_REQUEST,
    programId,
    callback
  };
}
export function getUserNutritionProgramDetailsSuccess(data) {
  return {
    type: GET_USER_NUTRITION_PROGRAM_DETAILS_SUCCESS,
    data
  };
}
export function getUserNutritionProgramDetailsError(error) {
  return {
    type: GET_USER_NUTRITION_PROGRAM_DETAILS_ERROR,
    error
  };
}
export function updateUserNutritionProgramRequest(
  programId,
  requestData,
  callback = res => {}
) {
  return {
    type: UPDATE_USER_NUTRITION_PROGRAM_REQUEST,
    programId,
    requestData,
    callback
  };
}
export function updateUserNutritionProgramSuccess(data) {
  return {
    type: UPDATE_USER_NUTRITION_PROGRAM_SUCCESS,
    data
  };
}
export function updateUserNutritionProgramError(error) {
  return {
    type: UPDATE_USER_NUTRITION_PROGRAM_ERROR,
    error
  };
}
export function getUserNutritionProgramPlansDetailsRequest(
  programId,
  callback = res => {}
) {
  return {
    type: GET_USER_NUTRITION_PROGRAM_PLAN_DETAILS_REQUEST,
    programId,
    callback
  };
}
export function getUserNutritionProgramPlansDetailsSuccess(data) {
  return {
    type: GET_USER_NUTRITION_PROGRAM_PLAN_DETAILS_SUCCESS,
    data
  };
}
export function getUserNutritionProgramPlansDetailsError(error) {
  return {
    type: GET_USER_NUTRITION_PROGRAM_PLAN_DETAILS_ERROR,
    error
  };
}
export function pasteUserNutritionMealsRequest(
  meal_id,
  requestData,
  actiontype = "cut",
  callback = res => {}
) {
  return {
    type: PASTE_USER_NUTIRION_PROGRAM_MEALS_REQUEST,
    meal_id,
    requestData,
    actiontype,
    callback
  };
}
export function pasteUserNutritionMealsSuccess(data) {
  return {
    type: PASTE_USER_NUTIRION_PROGRAM_MEALS_SUCCESS,
    data
  };
}
export function pasteUserNutritionMealsError(error) {
  return {
    type: PASTE_USER_NUTIRION_PROGRAM_MEALS_ERROR,
    error
  };
}
export function deleteUserNutritionProgramsMealsRequest(
  requestData,
  callback = res => {}
) {
  return {
    type: DELETE_USER_NUTRITION_PROGRAMS_MEALS_REQUEST,
    requestData,
    callback
  };
}
export function deleteUserNutritionProgramsMealsSuccess(data) {
  return {
    type: DELETE_USER_NUTRITION_PROGRAMS_MEALS_SUCCESS,
    data
  };
}
export function deleteUserNutritionProgramsMealsError(error) {
  return {
    type: DELETE_USER_NUTRITION_PROGRAMS_MEALS_ERROR,
    error
  };
}
export function addUserProgramsMealRequest(requestData, callback = res => {}) {
  return {
    type: ADD_USER_PROGRAMS_MEALS_REQUEST,
    requestData,
    callback
  };
}
export function addUserProgramsMealSuccess(data) {
  return {
    type: ADD_USER_PROGRAMS_MEALS_SUCCESS,
    data
  };
}
export function addUserProgramsMealError(error) {
  return {
    type: ADD_USER_PROGRAMS_MEALS_ERROR,
    error
  };
}
