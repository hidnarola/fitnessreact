
import { extraUserHeaders } from '../helpers/funs';
import { postFormData } from '.';

const requestUrl = 'user/follows';

function startFollowing(requestData) {
    let headers = extraUserHeaders();
    return postFormData(`${requestUrl}`, requestData, headers);
}

function stopFollowing(requestData) {
    let headers = extraUserHeaders();
    return postFormData(`${requestUrl}/stop`, requestData, headers);
}

export default {
    startFollowing,
    stopFollowing
}