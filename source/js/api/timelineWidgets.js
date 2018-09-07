import { postFormData, fetchResource, putFormData } from '.';
import { extraUserHeaders } from '../helpers/funs';

const requestUrlTimeline = 'user/timeline';

function getWidgetsAndWidgetsData() {
    let headers = extraUserHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }
    return fetchResource(requestUrlTimeline + '/widgets', options);
}

export default {
    getWidgetsAndWidgetsData,
}