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

function filterBodyParts(filterData) {
    let headers = extraHeaders();
    return postFormData(requestUrl + '/filter', filterData, headers);
}

function addBodyPart(requestData) {
    let headers = extraHeaders();
    return postFormData(requestUrl, requestData, headers);
}

function updateBodyPart(_id, requestData) {
    let headers = extraHeaders();
    return putFormData(requestUrl + '/' + _id, requestData, headers);
}

function deleteBodyPart(_id) {
    let headers = extraHeaders();
    var options = {
        method: 'DELETE',
        headers: headers,
    }

    return fetchResource((requestUrl + '/' + _id), options);
}

function recoverBodyPart(_id) {
    let headers = extraHeaders();
    return putFormData(requestUrl + '/undo/' + _id, null, headers);
}

export default {
    getBodyParts,
    getBodyPart,
    filterBodyParts,
    addBodyPart,
    updateBodyPart,
    deleteBodyPart,
    recoverBodyPart
}