import { postFormData } from '.';
import { extraUserHeaders } from '../helpers/funs';

const requestUrl = 'user/progress_photo';

function postUserProgressPhoto(formData) {
    let headers = extraUserHeaders();
    return postFormData(requestUrl, formData, headers);
}

export default {
    postUserProgressPhoto,
}