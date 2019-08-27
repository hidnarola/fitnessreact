import { postFormData, fetchResource } from '.';
import { extraUserHeaders } from '../helpers/funs';

const requestUrl = 'user/new_nutrition';

function getIngridients(data) {
  let headers = extraUserHeaders();
  var options = {
    method: 'POST',
    headers: headers,
    body: data,
  };

  return fetchResource(requestUrl + '/ingrident/search', options);
}

function getRecentIngridients() {
  let headers = extraUserHeaders();
  var options = {
    method: 'GET',
    headers: headers,
  };

  return fetchResource(requestUrl + '/ingrident/recent_ingredient', options);
}

export default {
  getIngridients,
  getRecentIngridients,
};
