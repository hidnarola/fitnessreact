import { fetchResource, postFormData, putFormData } from '..';
import { extraHeaders } from '../../helpers/funs';

const requestUrl = 'admin/user';

function getUsers() {
    let headers = extraHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }
    return fetchResource(requestUrl, options);
}

function getUser(_id) {
    let headers = extraHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }
    return fetchResource(requestUrl + '/' + _id, options);
}

function updateUser(_id, userData) {
    let headers = extraHeaders();
    return putFormData(requestUrl + '/' + _id, userData, headers);
}

function deleteUser(_id) {
    let headers = extraHeaders();
    var options = {
        method: 'DELETE',
        headers: headers,
    }
    return fetchResource((requestUrl + '/' + _id), options);
}

function filterUser(filterData) {
    let headers = extraHeaders();
    return postFormData(requestUrl + '/filter', filterData, headers);
}

function changeBlockStatus(requestData) {
    let headers = extraHeaders();
    return putFormData(requestUrl + '/change_block_status', requestData, headers);
}

export default {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    filterUser,
    changeBlockStatus,
}