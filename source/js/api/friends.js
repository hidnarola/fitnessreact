import { postFormData, fetchResource, putFormData } from '.';
import { extraUserHeaders } from '../helpers/funs';

const requestUrl = 'user/friend';

function getFriends(username, approvedStatus = 1, skip = 0, limit = 10, sort = -1) {
    let headers = extraUserHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }
    return fetchResource(`${requestUrl}/${username}/${approvedStatus}/${skip}/${limit}/${sort}`, options);
}

function sendRequest(requestData) {
    let headers = extraUserHeaders();
    return postFormData(requestUrl, requestData, headers);
}

function cancelRequest(friendshipId) {
    let headers = extraUserHeaders();
    var options = {
        method: 'DELETE',
        headers: headers,
    }

    return fetchResource(requestUrl + '/' + friendshipId, options);
}

function acceptRequest(friendshipId) {
    let headers = extraUserHeaders();
    return putFormData(requestUrl + '/' + friendshipId, null, headers);
}

export default {
    getFriends,
    sendRequest,
    cancelRequest,
    acceptRequest,
}