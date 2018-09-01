import { putFormData } from '..';
import { extraHeaders } from '../../helpers/funs';

const requestUrl = 'admin/change_password';

function changePassword(requestData) {
    let headers = extraHeaders();
    return putFormData(requestUrl, requestData, headers);
}

export default {
    changePassword,
}