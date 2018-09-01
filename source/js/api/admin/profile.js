import { putFormData, fetchResource } from '..';
import { extraHeaders } from '../../helpers/funs';

const requestUrl = 'admin/profile';

function getAdminProfile() {
    let headers = extraHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }
    return fetchResource(requestUrl, options);
}

function updateProfile(requestData) {
    let headers = extraHeaders();
    return putFormData(requestUrl, requestData, headers);
}

export default {
    getAdminProfile,
    updateProfile,
}