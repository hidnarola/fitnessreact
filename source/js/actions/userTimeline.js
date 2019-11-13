export const GET_USER_TIMELINE_REQUEST = "GET_USER_TIMELINE_REQUEST";
export const GET_USER_TIMELINE_SUCCESS = "GET_USER_TIMELINE_SUCCESS";
export const GET_USER_TIMELINE_ERROR = "GET_USER_TIMELINE_ERROR";

export const GET_DISCOVER_USER_TIMELINE_REQUEST =
  "GET_DISCOVER_USER_TIMELINE_REQUEST";
export const GET_DISCOVER_USER_TIMELINE_SUCCESS =
  "GET_DISCOVER_USER_TIMELINE_SUCCESS";
export const GET_DISCOVER_USER_TIMELINE_ERROR =
  "GET_DISCOVER_USER_TIMELINE_ERROR";

export const GET_USER_SINGLE_TIMELINE_REQUEST =
  "GET_USER_SINGLE_TIMELINE_REQUEST";
export const GET_USER_SINGLE_TIMELINE_SUCCESS =
  "GET_USER_SINGLE_TIMELINE_SUCCESS";
export const GET_USER_SINGLE_TIMELINE_ERROR = "GET_USER_SINGLE_TIMELINE_ERROR";

export const ADD_POST_ON_USER_TIMELINE_REQUEST =
  "ADD_POST_ON_USER_TIMELINE_REQUEST";
export const ADD_POST_ON_USER_TIMELINE_SUCCESS =
  "ADD_POST_ON_USER_TIMELINE_SUCCESS";
export const ADD_POST_ON_USER_TIMELINE_ERROR =
  "ADD_POST_ON_USER_TIMELINE_ERROR";

export const GET_PRIVACY_OF_TIMELINE_USER_REQUEST =
  "GET_PRIVACY_OF_TIMELINE_USER_REQUEST";
export const GET_PRIVACY_OF_TIMELINE_USER_SUCCESS =
  "GET_PRIVACY_OF_TIMELINE_USER_SUCCESS";
export const GET_PRIVACY_OF_TIMELINE_USER_ERROR =
  "GET_PRIVACY_OF_TIMELINE_USER_ERROR";

export const DELETE_POST_OF_TIMELINE_REQUEST =
  "DELETE_POST_OF_TIMELINE_REQUEST";
export const DELETE_POST_OF_TIMELINE_SUCCESS =
  "DELETE_POST_OF_TIMELINE_SUCCESS";
export const DELETE_POST_OF_TIMELINE_ERROR = "DELETE_POST_OF_TIMELINE_ERROR";

export const CHANGE_ACCESS_LEVEL_POST_OF_TIMELINE_REQUEST =
  "CHANGE_ACCESS_LEVEL_POST_OF_TIMELINE_REQUEST";
export const CHANGE_ACCESS_LEVEL_POST_OF_TIMELINE_SUCCESS =
  "CHANGE_ACCESS_LEVEL_POST_OF_TIMELINE_SUCCESS";
export const CHANGE_ACCESS_LEVEL_POST_OF_TIMELINE_ERROR =
  "CHANGE_ACCESS_LEVEL_POST_OF_TIMELINE_ERROR";

export const SET_TIMELINE_STATE = "SET_TIMELINE_STATE";

export function getUserTimelineRequest(username, start, offset) {
  return {
    type: GET_USER_TIMELINE_REQUEST,
    username,
    start,
    offset
  };
}

export function getUserTimelineSuccess(data) {
  return {
    type: GET_USER_TIMELINE_SUCCESS,
    data
  };
}

export function getUserTimelineError(error) {
  return {
    type: GET_USER_TIMELINE_ERROR,
    error
  };
}

export function getDiscoverUserTimelineRequest(start = 0, offset = 10) {
  return {
    type: GET_DISCOVER_USER_TIMELINE_REQUEST,
    start,
    offset
  };
}

export function getDiscoverUserTimelineSuccess(data) {
  return {
    type: GET_DISCOVER_USER_TIMELINE_SUCCESS,
    data
  };
}

export function getDiscoverUserTimelineError(error) {
  return {
    type: GET_DISCOVER_USER_TIMELINE_ERROR,
    error
  };
}

export function getUserSingleTimelineRequest(postId) {
  return {
    type: GET_USER_SINGLE_TIMELINE_REQUEST,
    postId
  };
}

export function getUserSingleTimelineSuccess(data) {
  return {
    type: GET_USER_SINGLE_TIMELINE_SUCCESS,
    data
  };
}

export function getUserSingleTimelineError(error) {
  return {
    type: GET_USER_SINGLE_TIMELINE_ERROR,
    error
  };
}

export function addPostOnUserTimelineRequest(formData) {
  return {
    type: ADD_POST_ON_USER_TIMELINE_REQUEST,
    formData
  };
}

export function addPostOnUserTimelineSuccess(data) {
  return {
    type: ADD_POST_ON_USER_TIMELINE_SUCCESS,
    data
  };
}

export function addPostOnUserTimelineError(error) {
  return {
    type: ADD_POST_ON_USER_TIMELINE_ERROR,
    error
  };
}

export function getPrivacyOfTimelineUserRequest(username) {
  return {
    type: GET_PRIVACY_OF_TIMELINE_USER_REQUEST,
    username
  };
}

export function getPrivacyOfTimelineUserSuccess(data) {
  return {
    type: GET_PRIVACY_OF_TIMELINE_USER_SUCCESS,
    data
  };
}

export function getPrivacyOfTimelineUserError(error) {
  return {
    type: GET_PRIVACY_OF_TIMELINE_USER_ERROR,
    error
  };
}

export function deletePostOfTimelineRequest(id) {
  return {
    type: DELETE_POST_OF_TIMELINE_REQUEST,
    id
  };
}

export function deletePostOfTimelineSuccess(data) {
  return {
    type: DELETE_POST_OF_TIMELINE_SUCCESS,
    data
  };
}

export function deletePostOfTimelineError(error) {
  return {
    type: DELETE_POST_OF_TIMELINE_ERROR,
    error
  };
}

export function changeAccessLevelPostOfTimelineRequest(id, requestData) {
  return {
    type: CHANGE_ACCESS_LEVEL_POST_OF_TIMELINE_REQUEST,
    id,
    requestData
  };
}

export function changeAccessLevelPostOfTimelineSuccess(data) {
  return {
    type: CHANGE_ACCESS_LEVEL_POST_OF_TIMELINE_SUCCESS,
    data
  };
}

export function changeAccessLevelPostOfTimelineError(error) {
  return {
    type: CHANGE_ACCESS_LEVEL_POST_OF_TIMELINE_ERROR,
    error
  };
}

export function setTimelineState(stateData) {
  return {
    type: SET_TIMELINE_STATE,
    stateData
  };
}
