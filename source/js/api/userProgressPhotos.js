import { fetchResource, postFormData } from ".";
import { extraUserHeaders } from "../helpers/funs";

const requestUrl = "user/progress_photo";
const requestProgressActivityUrl = "user/progress_activity_photo";

function getUserProgressPhotos(username, start = 0, noOfPhotos = 5, sort = -1) {
  let headers = extraUserHeaders();
  var options = {
    method: "GET",
    headers: headers
  };

  return fetchResource(
    requestUrl + "/" + username + "/" + start + "/" + noOfPhotos + "/" + sort,
    options
  );
}

function getUserLatestProgressPhotos(username, noOfPhotos = 5) {
  let headers = extraUserHeaders();
  var options = {
    method: "GET",
    headers: headers
  };

  return fetchResource(
    requestUrl + "/latest_month_wise/" + username + "/" + noOfPhotos,
    options
  );
}

function postUserProgressPhoto(formData) {
  let headers = extraUserHeaders();
  return postFormData(requestUrl, formData, headers);
}

function getRecentTagsProgressPhoto(formData) {
  let headers = extraUserHeaders();
  return postFormData(requestUrl + "/recent_hashtags", formData, headers);
}

function postUserProgressActivityPhoto(formData) {
  let headers = extraUserHeaders();
  return postFormData(requestProgressActivityUrl, formData, headers);
}

function deleteUserProgressPhoto(id) {
  let headers = extraUserHeaders();
  var options = {
    method: "DELETE",
    headers: headers
  };

  return fetchResource(requestUrl + "/" + id, options);
}

export default {
  getUserProgressPhotos,
  getUserLatestProgressPhotos,
  postUserProgressPhoto,
  postUserProgressActivityPhoto,
  deleteUserProgressPhoto,
  getRecentTagsProgressPhoto
};
