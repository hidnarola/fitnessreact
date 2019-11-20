export const GET_USER_FAVOURITE_BADGES = "GET_USER_FAVOURITE_BADGES";
export const GET_USER_FAVOURITE_BADGES_SUCCESS =
  "GET_USER_FAVOURITE_BADGES_SUCCESS";
export const GET_USER_FAVOURITE_BADGES_ERROR =
  "GET_USER_FAVOURITE_BADGES_ERROR";

export const ADD_USER_FAVOURITE_BADGES = "ADD_USER_FAVOURITE_BADGES";
export const ADD_USER_FAVOURITE_BADGES_SUCCESS =
  "ADD_USER_FAVOURITE_BADGES_SUCCESS";
export const ADD_USER_FAVOURITE_BADGES_ERROR =
  "ADD_USER_FAVOURITE_BADGES_ERROR";

export function getUserFavouriteBadgesRequest() {
  return {
    type: GET_USER_FAVOURITE_BADGES
  };
}

export function getUserFavouriteBadgesSuccess(data) {
  return {
    type: GET_USER_FAVOURITE_BADGES_SUCCESS,
    data
  };
}

export function getUserFavouriteBadgesError(error) {
  return {
    type: GET_USER_FAVOURITE_BADGES_ERROR,
    error
  };
}

export function addUserFavouriteBadgesRequest(
  requestData,
  callback = res => {}
) {
  return {
    type: ADD_USER_FAVOURITE_BADGES,
    requestData,
    callback
  };
}

export function addUserFavouriteBadgesSuccess(data) {
  return {
    type: ADD_USER_FAVOURITE_BADGES_SUCCESS,
    data
  };
}

export function addUserFavouriteBadgesError(error) {
  return {
    type: ADD_USER_FAVOURITE_BADGES_ERROR,
    error
  };
}
