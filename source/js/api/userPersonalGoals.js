import { postFormData, fetchResource } from '.';
import { extraUserHeaders } from '../helpers/funs';

const requestUrl = 'user/personal_goal';

function postUserPersonalGoal(requestData) {
    let headers = extraUserHeaders();
    return postFormData(requestUrl, requestData, headers);
}

export default {
    postUserPersonalGoal,
}