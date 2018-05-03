import { postFormData, fetchResource } from '.';
import { extraUserHeaders } from '../helpers/funs';

const requestUrl = 'user/friend';

function getFriends(username, approvedStatus = '') {
    let headers = extraUserHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }

    return fetchResource(requestUrl + '/' + username + '/' + approvedStatus, options);
}

export default {
    getFriends,
}