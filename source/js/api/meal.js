import { postFormData } from './index';
import { extraUserHeaders } from '../helpers/funs';
import { fetchResource } from './index';

const requestUrl = 'user/meals';
const requestMeal = 'user/meals/search';
const recent_meal_url = 'user/user_meals/get_favourite_meals';
const add_to_favourite_url = 'user/user_meals/add_to_favourite';
const meal_request_by_id_url = 'user/meals/';

function addMeal(requestData) {
  console.log('api => ');
  let headers = extraUserHeaders();
  return postFormData(requestUrl, requestData, headers);
}

function searchMeal(requestData) {
  console.log('api => ', requestData);

  let headers = extraUserHeaders();
  var options = {
    method: 'POST',
    headers: headers,
    body: requestData,
  };
  return fetchResource(requestMeal, options);
}

function addToFavourite(requestData) {
  console.log('api => ', requestData);

  let headers = extraUserHeaders();
  var options = {
    method: 'POST',
    headers: headers,
    body: requestData,
  };
  return fetchResource(add_to_favourite_url, options);
}

function recentMeal() {
  console.log('api => ');

  let headers = extraUserHeaders();
  var options = {
    method: 'GET',
    headers: headers,
  };
  return fetchResource(recent_meal_url, options);
}

function requestMealById(requestData) {
  let headers = extraUserHeaders();
  var options = {
    method: 'GET',
    headers: headers,
  };
  return fetchResource(meal_request_by_id_url + requestData, options);
}

export default {
  addMeal,
  searchMeal,
  recentMeal,
  addToFavourite,
  requestMealById,
};
