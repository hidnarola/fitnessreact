import { fetchResource, putFormData } from '.';
import { extraUserHeaders } from '../helpers/funs';

const requestUrl = 'user/notification';

function getUserUnreadNotifications() {
    let headers = extraUserHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }

    return fetchResource(requestUrl, options);
}

function putReadOneUserNotification(_id) {
    let headers = extraUserHeaders();
    return putFormData(requestUrl + '/' + _id, {}, headers);
}

function putReadAllUserNotification() {
    let headers = extraUserHeaders();
    return putFormData(requestUrl, {}, headers);
}

function getAllUserNotifications() {
    let headers = extraUserHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }

    return fetchResource(requestUrl, options);
}

export default {
    getUserUnreadNotifications,
    putReadOneUserNotification,
    putReadAllUserNotification,
    getAllUserNotifications,
}