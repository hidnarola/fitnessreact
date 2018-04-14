import { fetchResource, postFormData, putFormData } from '..';
import { extraHeaders } from '../../helpers/funs';

const requestUrl = 'admin/exercise_type';

function getExerciseTypes() {
    let headers = extraHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }

    return fetchResource(requestUrl, options);
}

function filterExerciseTypes(filterData) {
    let headers = extraHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }

    return fetchResource(requestUrl, options);
    // let headers = extraHeaders();
    // return postFormData(requestUrl, filterData, headers);
}

function getExerciseType(_id) {
    let headers = extraHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }

    return fetchResource(requestUrl + '/' + _id, options);
}

function addExerciseType(exerciseData) {
    let headers = extraHeaders();
    return postFormData(requestUrl, exerciseData, headers);
}

function updateExerciseType(_id, exerciseData) {
    let headers = extraHeaders();
    return putFormData(requestUrl + '/' + _id, exerciseData, headers);
}

function deleteExerciseType(_id) {
    let headers = extraHeaders();
    var options = {
        method: 'DELETE',
        headers: headers,
    }

    return fetchResource((requestUrl + '/' + _id), options);
}

export default {
    getExerciseTypes,
    filterExerciseTypes,
    getExerciseType,
    addExerciseType,
    updateExerciseType,
    deleteExerciseType
}