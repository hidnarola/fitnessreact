import { postFormData, fetchResource, putFormData } from '.';
import { extraUserHeaders } from '../helpers/funs';

const requestUrl = 'user/user_workouts';

function getUsersWorkoutSchedulesByMonths(requestData, username) {
  let headers = extraUserHeaders();
  if (username) {
    return postFormData(
      requestUrl + '/get_by_month/' + username,
      requestData,
      headers,
    );
  } else {
    return postFormData(requestUrl + '/get_by_month', requestData, headers);
  }
}

function getExercisesName() {
  let headers = extraUserHeaders();
  var options = {
    method: 'GET',
    headers: headers,
  };

  return fetchResource('user/exercise/names', options);
}

function getExerciseMeasurement() {
  let headers = extraUserHeaders();
  var options = {
    method: 'GET',
    headers: headers,
  };

  return fetchResource('user/exercise_measurements', options);
}

function getUsersWorkoutSchedule(_id, username = null) {
  let headers = extraUserHeaders();
  var options = {
    method: 'GET',
    headers: headers,
  };
  let url = `${requestUrl}`;
  if (username) {
    url += `/${username}/${_id}`;
    return fetchResource(url, options);
  } else {
    url += `/${_id}`;
    return fetchResource(url, options);
  }
}

function getUsersWorkoutOverview(requestData) {
  let headers = extraUserHeaders();
  return postFormData(requestUrl + '/overview', requestData, headers);
}

function addUsersWorkoutSchedule(requestData) {
  let headers = extraUserHeaders();
  return postFormData(requestUrl + '/workout', requestData, headers);
}

function updateUsersWorkoutSchedule(requestData) {
  let headers = extraUserHeaders();
  return putFormData(requestUrl + '/workout', requestData, headers);
}

function pasteUsersWorkoutSchedule(requestData, action = 'copy') {
  let headers = extraUserHeaders();
  if (action === 'cut') {
    return postFormData(requestUrl + '/cut', requestData, headers);
  } else {
    return postFormData(requestUrl + '/copy', requestData, headers);
  }
}

function changeUsersWorkoutSchedule(_id, requestData) {
  let headers = extraUserHeaders();
  return putFormData(requestUrl + '/' + _id, requestData, headers);
}

function deleteUsersBulkWorkoutSchedule(requestData) {
  let headers = extraUserHeaders();
  return postFormData(requestUrl + '/workout_delete', requestData, headers);
}

function completeUsersBulkWorkoutSchedule(requestData) {
  let headers = extraUserHeaders();
  return postFormData(requestUrl + '/bulk_complete', requestData, headers);
}

function getProgramsName() {
  let headers = extraUserHeaders();
  var options = {
    method: 'GET',
    headers: headers,
  };

  return fetchResource('user/user_program/names', options);
}

function userAssignProgram(requestData) {
  let headers = extraUserHeaders();
  return postFormData(requestUrl + '/assign_program', requestData, headers);
}

function addUserWorkoutTitle(requestData) {
  let headers = extraUserHeaders();
  return postFormData(requestUrl + '/day', requestData, headers);
}

function updateUserWorkoutTitle(_id, requestData) {
  let headers = extraUserHeaders();
  return putFormData(requestUrl + '/' + _id, requestData, headers);
}

function deleteUserWholeExercise(requestData) {
  let headers = extraUserHeaders();
  return postFormData(requestUrl + '/delete', requestData, headers);
}

function deleteUserSingleExercise(requestData) {
  let headers = extraUserHeaders();
  return postFormData(requestUrl + '/delete/exercise', requestData, headers);
}

function getUserWorkoutByDate(requestData) {
  let headers = extraUserHeaders();
  return postFormData(requestUrl + '/by_date', requestData, headers);
}

function getUserFirstWorkoutByDate(requestData, username = null) {
  let headers = extraUserHeaders();
  if (username) {
    return postFormData(
      requestUrl + '/first_workout/' + username,
      requestData,
      headers,
    );
  } else {
    return postFormData(requestUrl + '/first_workout', requestData, headers);
  }
}

function getUserWorkoutCalendarList(requestData, username = null) {
  let headers = extraUserHeaders();
  if (username) {
    return postFormData(
      requestUrl + '/calendar_list/' + username,
      requestData,
      headers,
    );
  } else {
    return postFormData(requestUrl + '/calendar_list', requestData, headers);
  }
}

function getWorkoutsListByDate(requestData) {
  let headers = extraUserHeaders();
  return postFormData(
    requestUrl + '/workouts_list_by_date',
    requestData,
    headers,
  );
}

function reorderWorkoutExercises(requestData) {
  let headers = extraUserHeaders();
  return putFormData(requestUrl + '/reorder_exercises', requestData, headers);
}

export default {
  getUsersWorkoutSchedulesByMonths,
  getExercisesName,
  getExerciseMeasurement,
  getUsersWorkoutSchedule,
  getUsersWorkoutOverview,
  addUsersWorkoutSchedule,
  updateUsersWorkoutSchedule,
  pasteUsersWorkoutSchedule,
  changeUsersWorkoutSchedule,
  deleteUsersBulkWorkoutSchedule,
  completeUsersBulkWorkoutSchedule,
  getProgramsName,
  userAssignProgram,
  addUserWorkoutTitle,
  updateUserWorkoutTitle,
  deleteUserWholeExercise,
  deleteUserSingleExercise,
  getUserWorkoutByDate,
  getUserFirstWorkoutByDate,
  getUserWorkoutCalendarList,
  getWorkoutsListByDate,
  reorderWorkoutExercises,
};
