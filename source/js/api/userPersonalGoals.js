import { postFormData, fetchResource } from '.';
import { extraUserHeaders } from '../helpers/funs';

const requestUrl = 'user/personal_goal';

function getUserPersonalGoals(type, start, offset) {
    let headers = extraUserHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }

    return fetchResource(requestUrl + '/' + type + '/' + start + '/' + offset, options);
}

function postUserPersonalGoal(requestData) {
    let headers = extraUserHeaders();
    return postFormData(requestUrl, requestData, headers);
}

function deleteUserPersonalGoal(_id) {
    let headers = extraUserHeaders();
    var options = {
        method: 'DELETE',
        headers: headers,
    }

    return fetchResource(requestUrl + '/' + _id, options);
}


export default {
    getUserPersonalGoals,
    postUserPersonalGoal,
    deleteUserPersonalGoal,
}