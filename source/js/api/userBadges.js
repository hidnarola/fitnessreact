import { fetchResource } from '.';
import { extraUserHeaders } from '../helpers/funs';

const requestUrl = 'user/badge';

function getUserBadgesByType(badgeType) {
    let headers = extraUserHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }
    return fetchResource(requestUrl + '/' + badgeType, options);
}

export default {
    getUserBadgesByType,
}