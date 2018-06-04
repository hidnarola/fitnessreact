import { postFormData } from '.';
import { extraUserHeaders } from '../helpers/funs';

const requestUrl = 'user/post/comment';

function commentOnPost(requestData) {
    let headers = extraUserHeaders();
    return postFormData(requestUrl, requestData, headers);
}

export default {
    commentOnPost,
}