import { fetchResource, postFormData, putFormData } from '..';
import { extraHeaders } from '../../helpers/funs';

const requestUrl = 'admin/badge';

function getBadges() {
    let headers = extraHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }

    return fetchResource(requestUrl, options);
}

function filterBadges(filterData) {
    let headers = extraHeaders();
    return postFormData(requestUrl + '/filter', filterData, headers);
}

function getBadge(_id) {
    let headers = extraHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }

    return fetchResource(requestUrl + '/' + _id, options);
}

function addBadge(exerciseData) {
    let headers = extraHeaders();
    return postFormData(requestUrl, exerciseData, headers);
}

function updateBadge(_id, exerciseData) {
    let headers = extraHeaders();
    return putFormData(requestUrl + '/' + _id, exerciseData, headers);
}

function deleteBadge(_id) {
    let headers = extraHeaders();
    var options = {
        method: 'DELETE',
        headers: headers,
    }

    return fetchResource((requestUrl + '/' + _id), options);
}

export default {
    getBadges,
    filterBadges,
    getBadge,
    addBadge,
    updateBadge,
    deleteBadge
}