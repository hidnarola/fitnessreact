import { fetchResource, postFormData, putFormData } from ".";
import { extraUserHeaders } from "../helpers/funs";

const requestUrl = 'user/user_program';

function getUserPrograms(filterData) {
    let headers = extraUserHeaders();
    return postFormData(requestUrl + '/filter', filterData, headers);
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

function getUserProgram(_id) {
    var headers = extraUserHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }
    return fetchResource(requestUrl + '/' + _id, options);
}

function viewUserPublicProgram(_id) {
    var headers = extraUserHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }
    return fetchResource(requestUrl + '/view/' + _id, options);
}

function getUserProgramMaster(_id) {
    var headers = extraUserHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }
    return fetchResource(requestUrl + '/master/' + _id, options);
}

function deleteUsersProgramWorkoutSchedule(requestData) {
    let headers = extraUserHeaders();
    return postFormData(requestUrl + '/delete/exercises', requestData, headers);
}

function addUserProgramWorkoutTitle(requestData) {
    let headers = extraUserHeaders();
    return postFormData(requestUrl + '/day', requestData, headers);
}

function getUsersProgramWorkoutSchedule(_id) {
    let headers = extraUserHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }

    return fetchResource(requestUrl + '/workout/' + _id, options);
}

function viewUsersPublicProgramWorkoutSchedule(_id) {
    let headers = extraUserHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }

    return fetchResource(requestUrl + '/view_workout/' + _id, options);
}

function addUsersProgramWorkoutSchedule(requestData) {
    let headers = extraUserHeaders();
    return postFormData(requestUrl + '/workout', requestData, headers);
}

function updateUserProgramWorkoutTitle(_id, requestData) {
    let headers = extraUserHeaders();
    return putFormData(requestUrl + '/day/' + _id, requestData, headers);
}

function updateUsersProgramWorkoutSchedule(requestData) {
    let headers = extraUserHeaders();
    return putFormData(requestUrl + '/workout', requestData, headers);
}

function deleteUserProgramSingleExercise(requestData) {
    let headers = extraUserHeaders();
    return postFormData(requestUrl + '/delete/exercise', requestData, headers);
}

function deleteUserProgramWholeExercise(requestData) {
    let headers = extraUserHeaders();
    return postFormData(requestUrl + '/delete', requestData, headers);
}

function deleteUserProgramBulkExercise(requestData) {
    let headers = extraUserHeaders();
    return postFormData(requestUrl + '/workout_delete', requestData, headers);
}

function pasteUsersProgramWorkoutSchedule(requestData) {
    let headers = extraUserHeaders();
    return postFormData(requestUrl + '/copy', requestData, headers);
}

function updateUsersProgramMaster(_id, requestData) {
    let headers = extraUserHeaders();
    return putFormData(requestUrl + '/' + _id, requestData, headers);
}

function getWorkoutsListByProgramDay(requestData) {
    let headers = extraUserHeaders();
    return postFormData(requestUrl + '/workouts_list_by_program_day', requestData, headers);
}

function reorderProgramWorkoutExercises(requestData) {
    let headers = extraUserHeaders();
    return putFormData(requestUrl + '/reorder_exercises', requestData, headers);
}

function getUserProgramRating(_id) {
    var headers = extraUserHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }
    return fetchResource(requestUrl + '/rating/' + _id, options);
}

export default {
    getUserPrograms,
    addUserProgramMaster,
    deleteUserProgram,
    getUserProgram,
    viewUserPublicProgram,
    getUserProgramMaster,
    deleteUsersProgramWorkoutSchedule,
    addUserProgramWorkoutTitle,
    getUsersProgramWorkoutSchedule,
    viewUsersPublicProgramWorkoutSchedule,
    addUsersProgramWorkoutSchedule,
    updateUserProgramWorkoutTitle,
    updateUsersProgramWorkoutSchedule,
    deleteUserProgramSingleExercise,
    deleteUserProgramWholeExercise,
    deleteUserProgramBulkExercise,
    pasteUsersProgramWorkoutSchedule,
    updateUsersProgramMaster,
    getWorkoutsListByProgramDay,
    reorderProgramWorkoutExercises,
    getUserProgramRating
}