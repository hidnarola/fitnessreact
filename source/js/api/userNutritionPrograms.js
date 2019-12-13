import { fetchResource, postFormData, putFormData } from ".";
import { extraUserHeaders } from "../helpers/funs";

const requestUrl = "user/user_nutrition_program";
const requestUrl2 = "user/user_nutrition_program_meals";

function addUserNutritionProgram(requestData) {
  let headers = extraUserHeaders();
  return postFormData(requestUrl, requestData, headers);
}

function updateUserNutritionProgram(programId, requestData) {
  let headers = extraUserHeaders();
  return putFormData(requestUrl + `/${programId}`, requestData, headers);
}

function getUserNutritionProgram(requestData) {
  let headers = extraUserHeaders();
  return postFormData(requestUrl + "/program", requestData, headers);
}

function getUserNutritionProgramDetails(programId) {
  let headers = extraUserHeaders();
  var options = {
    method: "GET",
    headers: headers
  };
  return fetchResource(requestUrl + `/program/${programId}`, options);
}

function getUserNutritionProgramPlanDetails(programId) {
  let headers = extraUserHeaders();
  var options = {
    method: "GET",
    headers: headers
  };
  return fetchResource(requestUrl + `/${programId}`, options);
}

function pasteUserNutritionProgramMeals(meal_id, requestData, actionType) {
  let headers = extraUserHeaders();
  if (actionType === "cut") {
    return putFormData(requestUrl2 + `/meal/${meal_id}`, requestData, headers);
  } else {
    return postFormData(requestUrl2 + `/meal/copy`, requestData, headers);
  }
}

function deleteUserNutritionProgramMeals(requestData) {
  let headers = extraUserHeaders();
  return postFormData(requestUrl2 + `/meal/delete`, requestData, headers);
}

function addUserProgramMeal(requestData) {
  let headers = extraUserHeaders();
  return postFormData(requestUrl2, requestData, headers);
}

export default {
  addUserNutritionProgram,
  updateUserNutritionProgram,
  getUserNutritionProgram,
  getUserNutritionProgramDetails,
  getUserNutritionProgramPlanDetails,
  pasteUserNutritionProgramMeals,
  deleteUserNutritionProgramMeals,
  addUserProgramMeal
};
