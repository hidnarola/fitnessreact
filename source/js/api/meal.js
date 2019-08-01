import { postFormData } from "./index";
import { extraHeaders, extraUserHeaders } from "../helpers/funs";
import { fetchResource } from "./index";

const requestUrl = "/user/meals";
const requestMeal = "user/meals/search";

function addMeal(requestData) {
  console.log("api => ");
  let headers = extraHeaders();
  return postFormData(requestUrl, requestData, headers);
}

function searchMeal(requestData) {
  console.log("api => ", requestData);

  let headers = extraUserHeaders();
  var options = {
    method: "POST",
    headers: headers,
    body: requestData
  };
  return fetchResource(requestMeal, options);
}

export default {
  addMeal,
  searchMeal
};
