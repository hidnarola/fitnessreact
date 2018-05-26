import { fetchResource } from '.';
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

export default {
    getUserTimeline,
}