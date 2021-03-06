import { postFormData } from '.';
import { extraUserHeaders } from '../helpers/funs';

const requestUrl = 'user/post/like';

function toggleLikeOnPost(requestData) {
    let headers = extraUserHeaders();
    return postFormData(requestUrl, requestData, headers);
}

export default {
    toggleLikeOnPost,
}