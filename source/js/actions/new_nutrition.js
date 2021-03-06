export const GET_INGRIDIENTS_REQUEST = 'GET_INGRIDIENTS_REQUEST';
export const GET_INGRIDIENTS_SUCCESS = 'GET_INGRIDIENTS_SUCCESS';
export const GET_INGRIDIENTS_ERROR = 'GET_INGRIDIENTS_ERROR';
export const HANDLE_CHANGE_INGRIDIENTS_SEARCH_FOR =
  'HANDLE_CHANGE_INGRIDIENTS_SEARCH_FOR';
export const RESET_NGRIDIENTS_SEARCH = 'RESET_NGRIDIENTS_SEARCH';

export const GET_RECENT_INGRIDIENTS_REQUEST = 'GET_RECENT_INGRIDIENTS_REQUEST';
export const GET_RECENT_INGRIDIENTS_SUCCESS = 'GET_RECENT_INGRIDIENTS_SUCCESS';
export const GET_RECENT_INGRIDIENTS_ERROR = 'GET_RECENT_INGRIDIENTS_ERROR';

export const VALIDATION_FAILURE_STATUS = 'VALIDATION_FAILURE_STATUS';

export function getIngridientsRequest(data) {
  return {
    type: GET_INGRIDIENTS_REQUEST,
    data,
  };
}

export function getIngridientsSuccess(data) {
  return {
    type: GET_INGRIDIENTS_SUCCESS,
    data,
  };
}

export function getIngridientsError(error) {
  return {
    type: GET_INGRIDIENTS_ERROR,
    error,
  };
}

export function getRecentIngridientsRequest() {
  return {
    type: GET_RECENT_INGRIDIENTS_REQUEST,
  };
}

export function getRecentIngridientsSuccess(data) {
  return {
    type: GET_RECENT_INGRIDIENTS_SUCCESS,
    data,
  };
}

export function getRecentIngridientsError(error) {
  return {
    type: GET_RECENT_INGRIDIENTS_ERROR,
    error,
  };
}

export function handleChangeIngridientsSearchFor(name, value) {
  return {
    type: HANDLE_CHANGE_INGRIDIENTS_SEARCH_FOR,
    name,
    value,
  };
}

export function resetIngridientsSearch(resetState) {
  return {
    type: RESET_NGRIDIENTS_SEARCH,
    resetState,
  };
}
