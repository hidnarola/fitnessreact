import { fetchResource, postFormData, putFormData } from '.';
import { extraUserHeaders } from '../helpers/funs';

const requestUrl = 'user/timeline';

function getUserTimeline(username, start, offset) {
    let headers = extraUserHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }

    return fetchResource(requestUrl + '/' + username + '/' + start + '/' + offset, options);
}

function getUserSingleTimeline(postId) {
    let headers = extraUserHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }

    return fetchResource(requestUrl + '/' + postId, options);
}

function addPostOnUserTimeline(formData) {
    let headers = extraUserHeaders();
    return postFormData(requestUrl, formData, headers);
}

function getPrivacyOfTimelineUser(username) {
    let headers = extraUserHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }

    return fetchResource(requestUrl + '/privacy/' + username, options);
}

function deletePostOfTimeline(id) {
    let headers = extraUserHeaders();
    var options = {
        method: 'DELETE',
        headers: headers,
    }

    return fetchResource(requestUrl + '/' + id, options);
}

function changeAccessLevelPostOfTimeline(id, requestData) {
    let headers = extraUserHeaders();
    return putFormData(requestUrl + '/' + id, requestData, headers);
}

export default {
    getUserTimeline,
    getUserSingleTimeline,
    addPostOnUserTimeline,
    getPrivacyOfTimelineUser,
    deletePostOfTimeline,
    changeAccessLevelPostOfTimeline,
}