import { fetchResource, putFormData } from '.';
import { extraUserHeaders } from '../helpers/funs';

const requestUrl = 'user/notification';

function getUserUnreadNotifications() {
    let headers = extraUserHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }

    return fetchResource(requestUrl + '/0', options);
}

function putReadOneUserNotification(_id) {
    let headers = extraUserHeaders();
    return putFormData(requestUrl + '/' + _id, {}, headers);
}

function putReadAllUserNotification() {
    let headers = extraUserHeaders();
    return putFormData(requestUrl, {}, headers);
}

function getAllUserNotifications(skip = 0, limit = 10, sort = -1) {
    let headers = extraUserHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }
    return fetchResource(`${requestUrl}/all/${skip}/${limit}/${sort}`, options);
}

export default {
    getUserUnreadNotifications,
    putReadOneUserNotification,
    putReadAllUserNotification,
    getAllUserNotifications,
}