import { fetchResource, postFormData } from ".";
import { extraUserHeaders } from "../helpers/funs";

const requestUrl = "user/badge";

function getUserFavouriteBadge() {
  let headers = extraUserHeaders();
  var options = {
    method: "POST",
    headers: headers
  };
  return fetchResource(requestUrl + "/get_favourite_badges", options);
}

function addUserFavouriteBadge(requestData) {
  let headers = extraUserHeaders();
  return postFormData(
    requestUrl + "/add_favourite_badges",
    requestData,
    headers
  );
}

export default {
  getUserFavouriteBadge,
  addUserFavouriteBadge
};
