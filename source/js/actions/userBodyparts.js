export const GET_USER_BODYPARTS_REQUEST = "GET_USER_BODYPARTS_REQUEST";
export const GET_USER_BODYPARTS_SUCCESS = "GET_USER_BODYPARTS_SUCCESS";
export const GET_USER_BODYPARTS_ERROR = "GET_USER_BODYPARTS_ERROR";

export function getUserBodypartsRequest(callback = () => {}) {
  return {
    type: GET_USER_BODYPARTS_REQUEST,
    callback
  };
}

export function getUserBodypartsSuccess(data) {
  return {
    type: GET_USER_BODYPARTS_SUCCESS,
    data
  };
}

export function getUserBodypartsError(error) {
  return {
    type: GET_USER_BODYPARTS_ERROR,
    error
  };
}
