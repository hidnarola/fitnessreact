import { fetchResource, postFormData, putFormData } from '..';
import { extraHeaders } from '../../helpers/funs';

const requestUrl = 'admin/bodypart';

function getBodyParts() {
    let headers = extraHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }

    return fetchResource(requestUrl, options);
}

function getBodyPart(_id) {
    let headers = extraHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }

    return fetchResource(requestUrl + '/' + _id, options);
}

function addBodyPart(exerciseData) {
    let headers = extraHeaders();
    return postFormData(requestUrl, exerciseData, headers);
}

function updateBodyPart(_id, exerciseData) {
    let headers = extraHeaders();
    return putFormData(requestUrl + '/' + _id, exerciseData, headers);
}

function deleteBodyPart(_id) {
    let headers = extraHeaders();
    var options = {
        method: 'DELETE',
        headers: headers,
    }

    return fetchResource((requestUrl + '/' + _id), options);
}

export default {
    getBodyParts,
    getBodyPart,
    addBodyPart,
    updateBodyPart,
    deleteBodyPart
}