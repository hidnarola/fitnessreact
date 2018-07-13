import { fetchResource, postFormData, putFormData } from ".";
import { extraUserHeaders } from "../helpers/funs";

const requestUrl = 'user/user_program';

function getUserPrograms() {
    var headers = extraUserHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }
    return fetchResource(requestUrl, options);
}

function getUserProgram(_id) {
    var headers = extraUserHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }
    return fetchResource(requestUrl + '/' + _id, options);
}

function addUserProgramMaster(requestData) {
    let headers = extraUserHeaders();
    return postFormData(requestUrl, requestData, headers);
}

function deleteUserProgram(_id) {
    let headers = extraUserHeaders();
    var options = {
        method: 'DELETE',
        headers: headers,
    }

    return fetchResource(requestUrl + '/' + _id, options);
}

function addUsersProgramWorkoutSchedule(requestData) {
    let headers = extraUserHeaders();
    return postFormData(requestUrl + '/exercises', requestData, headers);
}

function changeUsersProgramWorkoutSchedule(_id, requestData) {
    let headers = extraUserHeaders();
    return putFormData(requestUrl + '/exercises/' + _id, requestData, headers);
}

function deleteUsersProgramWorkoutSchedule(requestData) {
    let headers = extraUserHeaders();
    return postFormData(requestUrl + '/delete/exercises', requestData, headers);
}

export default {
    getUserPrograms,
    getUserProgram,
    addUserProgramMaster,
    deleteUserProgram,
    addUsersProgramWorkoutSchedule,
    changeUsersProgramWorkoutSchedule,
    deleteUsersProgramWorkoutSchedule,
}