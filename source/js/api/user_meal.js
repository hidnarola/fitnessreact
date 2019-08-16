import { postFormData } from './index';
import { extraUserHeaders } from '../helpers/funs';
import { fetchResource } from './index';

const requestAddUserMealUrl = 'user/user_meals';
const requestGetUserMealUrl = 'user/user_meals/get_by_id_user_meal';
const request_GetLogDates_UserMealUrl = 'user/user_meals/get_log_dates_by_date';

function getUserMeal(requestData) {
  console.log('api => ');
  let headers = extraUserHeaders();
  return postFormData(requestGetUserMealUrl, requestData, headers);
}

function addUserMeal(requestData) {
  console.log('api => ');
  let headers = extraUserHeaders();
  return postFormData(requestAddUserMealUrl, requestData, headers);
}

function updateUserMeal(id, requestData) {
  console.log('api => ');
  let headers = extraUserHeaders();
  return postFormData(`${requestAddUserMealUrl}/${id}`, requestData, headers);
}

function getUserMealLogDatesData(requestData) {
  let headers = extraUserHeaders();
  return postFormData(request_GetLogDates_UserMealUrl, requestData, headers);
}

export default {
  addUserMeal,
  getUserMeal,
  updateUserMeal,
  getUserMealLogDatesData,
};
