import { postFormData } from '.';
import { extraUserHeaders } from '../helpers/funs';

const requestUrl = 'user/search';

function getUserSearch(requestData) {
    let headers = extraUserHeaders();
    return postFormData(requestUrl, requestData, headers);
}

export default {
    getUserSearch,
}