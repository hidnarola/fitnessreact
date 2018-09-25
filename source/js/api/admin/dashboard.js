import { postFormData } from '..';
import { extraHeaders } from '../../helpers/funs';

const requestUrl = 'admin/dashboard';

function getAdminDashboard(requestData) {
    let headers = extraHeaders();
    return postFormData(requestUrl, requestData, headers);
}

export default {
    getAdminDashboard,
}