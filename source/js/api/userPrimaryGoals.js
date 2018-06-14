import { fetchResource } from '.';
import { extraUserHeaders } from '../helpers/funs';

const requestUrl = 'user/primary_goal';

function getUserSecondaryGoals() {
    let headers = extraUserHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }

    return fetchResource(requestUrl, options);
}

export default {
    getUserSecondaryGoals,
}