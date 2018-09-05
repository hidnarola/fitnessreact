import { postFormData, fetchResource, putFormData } from '.';
import { extraUserHeaders } from '../helpers/funs';
import { WIDGETS_TYPE_DASHBOARD } from '../constants/consts';

const requestUrl = 'user/dashboard';
const requestUrlWidgets = 'user/widgets';

function getDashboardPage() {
    let headers = extraUserHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }
    return fetchResource(requestUrl, options);
}

function saveDashboardWidgetsData(requestData) {
    let headers = extraUserHeaders();
    return postFormData(requestUrlWidgets + '/' + WIDGETS_TYPE_DASHBOARD, requestData, headers);
}

export default {
    getDashboardPage,
    saveDashboardWidgetsData
}