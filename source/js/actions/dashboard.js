export const GET_DASHBOARD_PAGE_REQUEST = "GET_DASHBOARD_PAGE_REQUEST";
export const GET_DASHBOARD_PAGE_SUCCESS = "GET_DASHBOARD_PAGE_SUCCESS";
export const GET_DASHBOARD_PAGE_ERROR = "GET_DASHBOARD_PAGE_ERROR";

export const SAVE_DASHBOARD_WIDGETS_DATA_REQUEST =
  "SAVE_DASHBOARD_WIDGETS_DATA_REQUEST";
export const SAVE_DASHBOARD_WIDGETS_DATA_SUCCESS =
  "SAVE_DASHBOARD_WIDGETS_DATA_SUCCESS";
export const SAVE_DASHBOARD_WIDGETS_DATA_ERROR =
  "SAVE_DASHBOARD_WIDGETS_DATA_ERROR";

export const CHANGE_DASHBOARD_BODY_FAT_WIDGET_REQUEST =
  "CHANGE_DASHBOARD_BODY_FAT_WIDGET_REQUEST";
export const CHANGE_DASHBOARD_BODY_FAT_WIDGET_SUCCESS =
  "CHANGE_DASHBOARD_BODY_FAT_WIDGET_SUCCESS";
export const CHANGE_DASHBOARD_BODY_FAT_WIDGET_ERROR =
  "CHANGE_DASHBOARD_BODY_FAT_WIDGET_ERROR";

export const CHANGE_COMPLETE_STATUS_OF_WORKOUT_REQUEST =
  "CHANGE_COMPLETE_STATUS_OF_WORKOUT_REQUEST";
export const CHANGE_COMPLETE_STATUS_OF_WORKOUT_SUCCESS =
  "CHANGE_COMPLETE_STATUS_OF_WORKOUT_SUCCESS";
export const CHANGE_COMPLETE_STATUS_OF_WORKOUT_ERROR =
  "CHANGE_COMPLETE_STATUS_OF_WORKOUT_ERROR";

export const CHANGE_DASHBOARD_MUSCLE_INNER_DATA_REQUEST =
  "CHANGE_DASHBOARD_MUSCLE_INNER_DATA_REQUEST";
export const CHANGE_DASHBOARD_MUSCLE_INNER_DATA_SUCCESS =
  "CHANGE_DASHBOARD_MUSCLE_INNER_DATA_SUCCESS";
export const CHANGE_DASHBOARD_MUSCLE_INNER_DATA_ERROR =
  "CHANGE_DASHBOARD_MUSCLE_INNER_DATA_ERROR";

export const FOLLOWING_USER_ACTIVITY_DATA_REQUEST =
  "FOLLOWING_USER_ACTIVITY_DATA_REQUEST";
export const FOLLOWING_USER_ACTIVITY_DATA_SUCCESS =
  "FOLLOWING_USER_ACTIVITY_DATA_SUCCESS";
export const FOLLOWING_USER_ACTIVITY_DATA_ERROR =
  "FOLLOWING_USER_ACTIVITY_DATA_ERROR";

export const SET_NEW_STATE_OF_SINGLE_POST = "SET_NEW_STATE_OF_SINGLE_POST";

export const SET_DASHBOARD_PAGE = "SET_DASHBOARD_PAGE";

export function getDashboardPageRequest(requestData, callback = res => {}) {
  return {
    type: GET_DASHBOARD_PAGE_REQUEST,
    requestData,
    callback
  };
}

export function getDashboardPageSuccess(data) {
  return {
    type: GET_DASHBOARD_PAGE_SUCCESS,
    data
  };
}

export function getDashboardPageError(error) {
  return {
    type: GET_DASHBOARD_PAGE_ERROR,
    error
  };
}

export function setDashboardPage(data) {
  return {
    type: SET_DASHBOARD_PAGE,
    data
  };
}

export function saveDashboardWidgetsDataRequest(requestData) {
  return {
    type: SAVE_DASHBOARD_WIDGETS_DATA_REQUEST,
    requestData
  };
}

export function saveDashboardWidgetsDataSuccess(data) {
  return {
    type: SAVE_DASHBOARD_WIDGETS_DATA_SUCCESS,
    data
  };
}

export function saveDashboardWidgetsDataError(error) {
  return {
    type: SAVE_DASHBOARD_WIDGETS_DATA_ERROR,
    error
  };
}

export function changeDashboardBodyFatWidgetRequest(requestData) {
  return {
    type: CHANGE_DASHBOARD_BODY_FAT_WIDGET_REQUEST,
    requestData
  };
}

export function changeDashboardBodyFatWidgetSuccess(data) {
  return {
    type: CHANGE_DASHBOARD_BODY_FAT_WIDGET_SUCCESS,
    data
  };
}

export function changeDashboardBodyFatWidgetError(error) {
  return {
    type: CHANGE_DASHBOARD_BODY_FAT_WIDGET_ERROR,
    error
  };
}

export function changeCompleteStatusOfWorkoutRequest(requestData) {
  return {
    type: CHANGE_COMPLETE_STATUS_OF_WORKOUT_REQUEST,
    requestData
  };
}

export function changeCompleteStatusOfWorkoutSuccess(data) {
  return {
    type: CHANGE_COMPLETE_STATUS_OF_WORKOUT_SUCCESS,
    data
  };
}

export function changeCompleteStatusOfWorkoutError(error) {
  return {
    type: CHANGE_COMPLETE_STATUS_OF_WORKOUT_ERROR,
    error
  };
}

export function changeDashboardMuscleInnerDataRequest(requestData) {
  return {
    type: CHANGE_DASHBOARD_MUSCLE_INNER_DATA_REQUEST,
    requestData
  };
}

export function changeDashboardMuscleInnerDataSuccess(data) {
  return {
    type: CHANGE_DASHBOARD_MUSCLE_INNER_DATA_SUCCESS,
    data
  };
}

export function changeDashboardMuscleInnerDataError(error) {
  return {
    type: CHANGE_DASHBOARD_MUSCLE_INNER_DATA_ERROR,
    error
  };
}

export function setNewStateOfSinglePost(singlePost) {
  return {
    type: SET_NEW_STATE_OF_SINGLE_POST,
    singlePost
  };
}

export function followingUserActivityDataRequest(start = 0, offset = 30) {
  return {
    type: FOLLOWING_USER_ACTIVITY_DATA_REQUEST,
    start,
    offset
  };
}
export function followingUserActivityDataSuccess(data) {
  console.log("===========Following Activity Data===========");
  console.log(data);
  console.log("==========================");
  return {
    type: FOLLOWING_USER_ACTIVITY_DATA_SUCCESS,
    data
  };
}
export function followingUserActivityDataError(error) {
  return {
    type: FOLLOWING_USER_ACTIVITY_DATA_ERROR,
    error
  };
}
