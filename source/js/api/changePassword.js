import { putFormData } from ".";
import { extraUserHeaders } from "../helpers/funs";

const requestUrl = 'user/change_password';

function changePassword(requestData) {
    let headers = extraUserHeaders();
    return putFormData(requestUrl, requestData, headers);
}

export default {
    changePassword,
}