import { fetchResource, postFormData } from ".";
import { extraUserHeaders } from "../helpers/funs";

const requestUrl = 'user/progress';

function getUserProgressByCategoryAndDate(requestData) {
    let headers = extraUserHeaders();
    return postFormData(requestUrl, requestData, headers);
}

export default {
    getUserProgressByCategoryAndDate,
}