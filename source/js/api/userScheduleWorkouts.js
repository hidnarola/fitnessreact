import { postFormData, fetchResource, putFormData } from '.';
import { extraUserHeaders } from '../helpers/funs';

const requestUrl = 'user/user_workouts';

function getUsersWorkoutSchedulesByMonths(requestData) {
    let headers = extraUserHeaders();
    return postFormData(requestUrl + '/get_by_month', requestData, headers);
}

function getExercisesName() {
    let headers = extraUserHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }

    return fetchResource('user/exercise/names', options);
}

function addUsersWorkoutSchedule(requestData) {
    let headers = extraUserHeaders();
    return postFormData(requestUrl, requestData, headers);
}

function changeUsersWorkoutSchedule(_id, requestData) {
    let headers = extraUserHeaders();
    return putFormData(requestUrl + '/' + _id, requestData, headers);
}

function deleteUsersWorkoutSchedule(_id) {
    let headers = extraUserHeaders();
    var options = {
        method: 'DELETE',
        headers: headers,
    }

    return fetchResource(requestUrl + '/' + _id, options);
}

function deleteUsersBulkWorkoutSchedule(requestData) {
    let headers = extraUserHeaders();
    return postFormData(requestUrl + '/delete', requestData, headers);
}

function changeUsersWorkoutScheduleComplete(_id, isCompleted) {
    let headers = extraUserHeaders();
    var requestData = {
        parentId: _id,
        isCompleted: isCompleted,
    }
    return putFormData(requestUrl + '/complete_all', requestData, headers);
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


export default {
    getUsersWorkoutSchedulesByMonths,
    getExercisesName,
    addUsersWorkoutSchedule,
    changeUsersWorkoutSchedule,
    deleteUsersWorkoutSchedule,
    deleteUsersBulkWorkoutSchedule,
    changeUsersWorkoutScheduleComplete,
    getProgramsName,
    userAssignProgram,
}