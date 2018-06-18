import { fetchResource } from '.';
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

export default {
    getUserUnreadNotifications,
}