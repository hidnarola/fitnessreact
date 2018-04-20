import { fetchResource, postFormData, putFormData } from '..';
import { extraHeaders } from '../../helpers/funs';

const requestUrl = 'admin/badge_task';

function getBadgeTasks() {
    let headers = extraHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }

    return fetchResource(requestUrl, options);
}

function filterBadgeTasks(filterData) {
    let headers = extraHeaders();
    return postFormData(requestUrl + '/filter', filterData, headers);
}

function getBadgeTask(_id) {
    let headers = extraHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }

    return fetchResource(requestUrl + '/' + _id, options);
}

function addBadgeTask(exerciseData) {
    let headers = extraHeaders();
    return postFormData(requestUrl, exerciseData, headers);
}

function updateBadgeTask(_id, exerciseData) {
    let headers = extraHeaders();
    return putFormData(requestUrl + '/' + _id, exerciseData, headers);
}

function deleteBadgeTask(_id) {
    let headers = extraHeaders();
    var options = {
        method: 'DELETE',
        headers: headers,
    }

    return fetchResource((requestUrl + '/' + _id), options);
}

export default {
    getBadgeTasks,
    filterBadgeTasks,
    getBadgeTask,
    addBadgeTask,
    updateBadgeTask,
    deleteBadgeTask
}