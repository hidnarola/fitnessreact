export const GET_USER_BODY_MEASUREMENT_REQUEST =
  "GET_USER_BODY_MEASUREMENT_REQUEST";
export const GET_USER_BODY_MEASUREMENT_SUCCESS =
  "GET_USER_BODY_MEASUREMENT_SUCCESS";
export const GET_USER_BODY_MEASUREMENT_ERROR =
  "GET_USER_BODY_MEASUREMENT_ERROR";

export const UPDATE_USER_BODY_MEASUREMENT_REQUEST =
  "UPDATE_USER_BODY_MEASUREMENT_REQUEST";
export const UPDATE_USER_BODY_MEASUREMENT_SUCCESS =
  "UPDATE_USER_BODY_MEASUREMENT_SUCCESS";
export const UPDATE_USER_BODY_MEASUREMENT_ERROR =
  "UPDATE_USER_BODY_MEASUREMENT_ERROR";

export const PASTE_USER_BODY_MEASUREMENT_REQUEST =
  "PASTE_USER_BODY_MEASUREMENT_REQUEST";
export const PASTE_USER_BODY_MEASUREMENT_SUCCESS =
  "PASTE_USER_BODY_MEASUREMENT_SUCCESS";
export const PASTE_USER_BODY_MEASUREMENT_ERROR =
  "PASTE_USER_BODY_MEASUREMENT_ERROR";

export const GET_USER_BODY_MEASUREMENT_LOG_DATES_REQUEST =
  "GET_USER_BODY_MEASUREMENT_LOG_DATES_REQUEST";
export const GET_USER_BODY_MEASUREMENT_LOG_DATES_SUCCESS =
  "GET_USER_BODY_MEASUREMENT_LOG_DATES_SUCCESS";
export const GET_USER_BODY_MEASUREMENT_LOG_DATES_ERROR =
  "GET_USER_BODY_MEASUREMENT_LOG_DATES_ERROR";

export const SAVE_USER_BODY_MEASUREMENT_REQUEST =
  "SAVE_USER_BODY_MEASUREMENT_REQUEST";
export const SAVE_USER_BODY_MEASUREMENT_SUCCESS =
  "SAVE_USER_BODY_MEASUREMENT_SUCCESS";
export const SAVE_USER_BODY_MEASUREMENT_ERROR =
  "SAVE_USER_BODY_MEASUREMENT_ERROR";

export const SAVE_USER_BODY_FAT_REQUEST = "SAVE_USER_BODY_FAT_REQUEST";
export const SAVE_USER_BODY_FAT_SUCCESS = "SAVE_USER_BODY_FAT_SUCCESS";
export const SAVE_USER_BODY_FAT_ERROR = "SAVE_USER_BODY_FAT_ERROR";

export const GET_PROGRESS_PHOTOS_BY_DATE_REQUEST =
  "GET_PROGRESS_PHOTOS_BY_DATE_REQUEST";
export const GET_PROGRESS_PHOTOS_BY_DATE_SUCCESS =
  "GET_PROGRESS_PHOTOS_BY_DATE_SUCCESS";
export const GET_PROGRESS_PHOTOS_BY_DATE_ERROR =
  "GET_PROGRESS_PHOTOS_BY_DATE_ERROR";

export const SET_USER_BODY_MEASUREMENT_STATE =
  "SET_USER_BODY_MEASUREMENT_STATE";

export const CUT_USER_BODY_MEASUREMENT_SCHEDULE =
  "CUT_USER_BODY_MEASUREMENT_SCHEDULE";

export const COPY_USER_BODY_MEASUREMENT_SCHEDULE =
  "COPY_USER_BODY_MEASUREMENT_SCHEDULE";

export const SET_BODY_MEASUREMENT_DATA_IN_IDB =
  "SET_BODY_MEASUREMENT_DATA_IN_IDB";

export function getUserBodyMeasurementRequest(requestData) {
  return {
    type: GET_USER_BODY_MEASUREMENT_REQUEST,
    requestData
  };
}

export function getUserBodyMeasurementSuccess(data) {
  return {
    type: GET_USER_BODY_MEASUREMENT_SUCCESS,
    data
  };
}

export function getUserBodyMeasurementError(error) {
  return {
    type: GET_USER_BODY_MEASUREMENT_ERROR,
    error
  };
}

export function updateUserBodyMeasurementRequest(
  requestData,
  callback = res => {}
) {
  return {
    type: UPDATE_USER_BODY_MEASUREMENT_REQUEST,
    requestData,
    callback
  };
}

export function updateUserBodyMeasurementSuccess(data) {
  return {
    type: UPDATE_USER_BODY_MEASUREMENT_SUCCESS,
    data
  };
}

export function updateUserBodyMeasurementError(error) {
  return {
    type: UPDATE_USER_BODY_MEASUREMENT_ERROR,
    error: error.response.error
  };
}
export function pasteUserBodyMeasurementRequest(
  requestData,
  callback = res => {}
) {
  return {
    type: PASTE_USER_BODY_MEASUREMENT_REQUEST,
    requestData,
    callback
  };
}

export function pasteUserBodyMeasurementSuccess(data) {
  return {
    type: PASTE_USER_BODY_MEASUREMENT_SUCCESS,
    data
  };
}

export function pasteUserBodyMeasurementError(error) {
  return {
    type: PASTE_USER_BODY_MEASUREMENT_ERROR,
    error: error.response.error
  };
}

export function getUserBodyMeasurementLogDatesRequest(requestData) {
  return {
    type: GET_USER_BODY_MEASUREMENT_LOG_DATES_REQUEST,
    requestData
  };
}

export function getUserBodyMeasurementLogDatesSuccess(data) {
  return {
    type: GET_USER_BODY_MEASUREMENT_LOG_DATES_SUCCESS,
    data
  };
}

export function getUserBodyMeasurementLogDatesError(error) {
  return {
    type: GET_USER_BODY_MEASUREMENT_LOG_DATES_ERROR,
    error
  };
}

export function saveUserBodyMeasurementRequest(data) {
  return {
    type: SAVE_USER_BODY_MEASUREMENT_REQUEST,
    data
  };
}

export function saveUserBodyMeasurementSuccess(data) {
  return {
    type: SAVE_USER_BODY_MEASUREMENT_SUCCESS,
    data
  };
}

export function saveUserBodyMeasurementError(error) {
  return {
    type: SAVE_USER_BODY_MEASUREMENT_ERROR,
    error
  };
}

export function saveUserBodyFatRequest(requestData) {
  return {
    type: SAVE_USER_BODY_FAT_REQUEST,
    requestData
  };
}

export function saveUserBodyFatSuccess(data) {
  return {
    type: SAVE_USER_BODY_FAT_SUCCESS,
    data
  };
}

export function saveUserBodyFatError(error) {
  return {
    type: SAVE_USER_BODY_FAT_ERROR,
    error
  };
}

export function getProgressPhotosByDateRequest(requestData) {
  return {
    type: GET_PROGRESS_PHOTOS_BY_DATE_REQUEST,
    requestData
  };
}

export function getProgressPhotosByDateSuccess(data) {
  return {
    type: GET_PROGRESS_PHOTOS_BY_DATE_SUCCESS,
    data
  };
}

export function getProgressPhotosByDateError(error) {
  return {
    type: GET_PROGRESS_PHOTOS_BY_DATE_ERROR,
    error
  };
}

export function setUserBodyMeasurementState(newState) {
  return {
    type: SET_USER_BODY_MEASUREMENT_STATE,
    newState
  };
}

export function cutUserBodyMeasurementSchedule(
  selectedData,
  bodyMeasurementData
) {
  return {
    type: CUT_USER_BODY_MEASUREMENT_SCHEDULE,
    selectedData,
    bodyMeasurementData
  };
}

export function copyUserBodyMeasurementSchedule(selectedData) {
  return {
    type: COPY_USER_BODY_MEASUREMENT_SCHEDULE,
    selectedData
  };
}

export function setBodyMeasurementDatainIdb(data) {
  return {
    type: SET_BODY_MEASUREMENT_DATA_IN_IDB,
    data
  };
}
