import { postFormData, fetchResource, putFormData } from '.';
import { extraUserHeaders } from '../helpers/funs';

const requestUrl = 'user/user_workouts';

function getUsersWorkoutSchedulesByMonths(requestData, username) {
    let headers = extraUserHeaders();
    if (username) {
        return postFormData(requestUrl + '/get_by_month/' + username, requestData, headers);
    } else {
        return postFormData(requestUrl + '/get_by_month', requestData, headers);
    }
}

function getExercisesName() {
    let headers = extraUserHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }

    return fetchResource('user/exercise/names', options);
}

function getExerciseMeasurement() {
    let headers = extraUserHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }

    return fetchResource('user/exercise_measurements', options);
}

function getUsersWorkoutSchedule(_id) {
    let headers = extraUserHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }

    return fetchResource(requestUrl + '/' + _id, options);
}

function addUsersWorkoutSchedule(requestData) {
    let headers = extraUserHeaders();
    return postFormData(requestUrl + '/workout', requestData, headers);
}

function updateUsersWorkoutSchedule(requestData) {
    let headers = extraUserHeaders();
    return putFormData(requestUrl + '/workout', requestData, headers);
}

function pasteUsersWorkoutSchedule(requestData) {
    let headers = extraUserHeaders();
    return postFormData(requestUrl + '/copy', requestData, headers);
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
    }

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

function getUserFirstWorkoutByDate(requestData) {
    let headers = extraUserHeaders();
    return postFormData(requestUrl + '/first_workout', requestData, headers);
}

function getUserWorkoutCalendarList(requestData) {
    let headers = extraUserHeaders();
    return postFormData(requestUrl + '/calendar_list', requestData, headers);
}

function getWorkoutsListByDate(requestData) {
    let headers = extraUserHeaders();
    return postFormData(requestUrl + '/workouts_list_by_date', requestData, headers);
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
}