import { postFormData, fetchResource, putFormData } from '.';
import { extraUserHeaders } from '../helpers/funs';

const requestUrl = 'user/profile';

function getProfileDetails(username) {
    let headers = extraUserHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }

    return fetchResource(requestUrl + '/' + username, options);
}

function saveAboutProfileDetails(requestData) {
    let headers = extraUserHeaders();
    return putFormData(requestUrl + '/update_aboutme', requestData, headers);
}

export default {
    getProfileDetails,
    saveAboutProfileDetails,
}