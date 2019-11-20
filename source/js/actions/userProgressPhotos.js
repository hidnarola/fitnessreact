export const GET_USER_PROGRESS_PHOTO_REQUEST =
  "GET_USER_PROGRESS_PHOTO_REQUEST";
export const GET_USER_PROGRESS_PHOTO_SUCCESS =
  "GET_USER_PROGRESS_PHOTO_SUCCESS";
export const GET_USER_PROGRESS_PHOTO_ERROR = "GET_USER_PROGRESS_PHOTO_ERROR";

export const LOAD_MORE_USER_PROGRESS_PHOTO_REQUEST =
  "LOAD_MORE_USER_PROGRESS_PHOTO_REQUEST";
export const LOAD_MORE_USER_PROGRESS_PHOTO_SUCCESS =
  "LOAD_MORE_USER_PROGRESS_PHOTO_SUCCESS";
export const LOAD_MORE_USER_PROGRESS_PHOTO_ERROR =
  "LOAD_MORE_USER_PROGRESS_PHOTO_ERROR";

export const GET_USER_LATEST_PROGRESS_PHOTO_REQUEST =
  "GET_USER_LATEST_PROGRESS_PHOTO_REQUEST";
export const GET_USER_LATEST_PROGRESS_PHOTO_SUCCESS =
  "GET_USER_LATEST_PROGRESS_PHOTO_SUCCESS";
export const GET_USER_LATEST_PROGRESS_PHOTO_ERROR =
  "GET_USER_LATEST_PROGRESS_PHOTO_ERROR";

export const ADD_USER_PROGRESS_PHOTO_REQUEST =
  "ADD_USER_PROGRESS_PHOTO_REQUEST";
export const ADD_USER_PROGRESS_PHOTO_SUCCESS =
  "ADD_USER_PROGRESS_PHOTO_SUCCESS";
export const ADD_USER_PROGRESS_PHOTO_ERROR = "ADD_USER_PROGRESS_PHOTO_ERROR";

export const DELETE_USER_PROGRESS_PHOTO_REQUEST =
  "DELETE_USER_PROGRESS_PHOTO_REQUEST";
export const DELETE_USER_PROGRESS_PHOTO_SUCCESS =
  "DELETE_USER_PROGRESS_PHOTO_SUCCESS";
export const DELETE_USER_PROGRESS_PHOTO_ERROR =
  "DELETE_USER_PROGRESS_PHOTO_ERROR";

export const FORWARD_IMAGE_TO_DETAILS_PAGE = "FORWARD_IMAGE_TO_DETAILS_PAGE";
export const CANCEL_IMAGE_SELECTED_FROM_DETAILS_PAGE =
  "CANCEL_IMAGE_SELECTED_FROM_DETAILS_PAGE";
export const ADD_IMAGE_SELECTED_FROM_DETAILS_PAGE =
  "ADD_IMAGE_SELECTED_FROM_DETAILS_PAGE";
export const DELETE_IMAGE_SELECTED_FROM_DETAILS_PAGE =
  "DELETE_IMAGE_SELECTED_FROM_DETAILS_PAGE";
export const REMOVE_SELECTED_PROGRESS_PHOTOS_TO_UPLOAD =
  "REMOVE_SELECTED_PROGRESS_PHOTOS_TO_UPLOAD";

export const SET_PROGRESS_PHOTOS = "SET_PROGRESS_PHOTOS";

export const ADD_USER_PROGRESS_ACTIVITY_PHOTO_REQUEST =
  "ADD_USER_PROGRESS_ACTIVITY_PHOTO_REQUEST";
export const ADD_USER_PROGRESS_ACTIVITY_PHOTO_SUCCESS =
  "ADD_USER_PROGRESS_ACTIVITY_PHOTO_SUCCESS";
export const ADD_USER_PROGRESS_ACTIVITY_PHOTO_ERROR =
  "ADD_USER_PROGRESS_ACTIVITY_PHOTO_ERROR";

export const GET_RECENT_TAGS_PROGRESS_PHOTOS_REQUEST =
  "GET_RECENT_TAGS_PROGRESS_PHOTOS_REQUEST";
export const GET_RECENT_TAGS_PROGRESS_PHOTOS_SUCCESS =
  "GET_RECENT_TAGS_PROGRESS_PHOTOS_SUCCESS";
export const GET_RECENT_TAGS_PROGRESS_PHOTOS_ERROR =
  "GET_RECENT_TAGS_PROGRESS_PHOTOS_ERROR";

export function getUserProgressPhotoRequest(
  username,
  start = 0,
  noOfPhotos = 5,
  sort = -1
) {
  return {
    type: GET_USER_PROGRESS_PHOTO_REQUEST,
    username,
    start,
    noOfPhotos,
    sort
  };
}

export function getUserProgressPhotoSuccess(data) {
  return {
    type: GET_USER_PROGRESS_PHOTO_SUCCESS,
    data
  };
}

export function getUserProgressPhotoError(error) {
  return {
    type: GET_USER_PROGRESS_PHOTO_ERROR,
    error
  };
}

export function loadMoreUserProgressPhotoRequest(
  username,
  start,
  noOfPhotos,
  sort
) {
  return {
    type: LOAD_MORE_USER_PROGRESS_PHOTO_REQUEST,
    username,
    start,
    noOfPhotos,
    sort
  };
}

export function loadMoreUserProgressPhotoSuccess(data) {
  return {
    type: LOAD_MORE_USER_PROGRESS_PHOTO_SUCCESS,
    data
  };
}

export function loadMoreUserProgressPhotoError(error) {
  return {
    type: LOAD_MORE_USER_PROGRESS_PHOTO_ERROR,
    error
  };
}

export function getUserLatestProgressPhotoRequest(username, noOfPhotos = 5) {
  return {
    type: GET_USER_LATEST_PROGRESS_PHOTO_REQUEST,
    username,
    noOfPhotos
  };
}

export function getUserLatestProgressPhotoSuccess(data) {
  return {
    type: GET_USER_LATEST_PROGRESS_PHOTO_SUCCESS,
    data
  };
}

export function getUserLatestProgressPhotoError(error) {
  return {
    type: GET_USER_LATEST_PROGRESS_PHOTO_ERROR,
    error
  };
}

export function addUserProgressPhotoRequest(formData, callback = res => {}) {
  return {
    type: ADD_USER_PROGRESS_PHOTO_REQUEST,
    formData,
    callback
  };
}

export function addUserProgressPhotoSuccess(data) {
  return {
    type: ADD_USER_PROGRESS_PHOTO_SUCCESS,
    data
  };
}

export function addUserProgressPhotoError(error) {
  return {
    type: ADD_USER_PROGRESS_PHOTO_ERROR,
    error
  };
}

export function deleteUserProgressPhotoRequest(id) {
  return {
    type: DELETE_USER_PROGRESS_PHOTO_REQUEST,
    id
  };
}

export function deleteUserProgressPhotoSuccess(data) {
  return {
    type: DELETE_USER_PROGRESS_PHOTO_SUCCESS,
    data
  };
}

export function deleteUserProgressPhotoError(error) {
  return {
    type: DELETE_USER_PROGRESS_PHOTO_ERROR,
    error
  };
}

export function forwardImageToDetailsPage(image) {
  return {
    type: FORWARD_IMAGE_TO_DETAILS_PAGE,
    image
  };
}

export function cancelImageSelectedFromDetailsPage() {
  return {
    type: CANCEL_IMAGE_SELECTED_FROM_DETAILS_PAGE
  };
}

export function addImageSelectedFromDetailsPage(imageData) {
  return {
    type: ADD_IMAGE_SELECTED_FROM_DETAILS_PAGE,
    imageData
  };
}

export function deleteImageSelectedFromDetailsPage(index) {
  return {
    type: DELETE_IMAGE_SELECTED_FROM_DETAILS_PAGE,
    index
  };
}

export function removeSelectedProgressPhotosToUpload() {
  return {
    type: REMOVE_SELECTED_PROGRESS_PHOTOS_TO_UPLOAD
  };
}

export function setProgressPhoto(data) {
  return {
    type: SET_PROGRESS_PHOTOS,
    data
  };
}

export function addUserProgressActivityPhotoRequest(formData) {
  return {
    type: ADD_USER_PROGRESS_ACTIVITY_PHOTO_REQUEST,
    formData
  };
}

export function addUserProgressActivityPhotoSuccess(data) {
  return {
    type: ADD_USER_PROGRESS_ACTIVITY_PHOTO_SUCCESS,
    data
  };
}

export function addUserProgressActivityPhotoError(error) {
  return {
    type: ADD_USER_PROGRESS_ACTIVITY_PHOTO_ERROR,
    error
  };
}

export function getUserRecentHashTagsRequest(limit = 5) {
  return {
    type: GET_RECENT_TAGS_PROGRESS_PHOTOS_REQUEST,
    requestData: { limit }
  };
}

export function getUserRecentHashTagsSuccess(data) {
  return {
    type: GET_RECENT_TAGS_PROGRESS_PHOTOS_SUCCESS,
    data
  };
}

export function getUserRecentHashTagsError(error) {
  return {
    type: GET_RECENT_TAGS_PROGRESS_PHOTOS_ERROR,
    error
  };
}
