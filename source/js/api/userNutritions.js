import { postFormData, fetchResource } from '.';
import { extraUserHeaders } from '../helpers/funs';

const requestUrl = 'user/nutrition';

function getUserTodaysMeal(requestData) {
    let headers = extraUserHeaders();
    return postFormData(requestUrl + '/todays_meal', requestData, headers);
}

export default {
    getUserTodaysMeal,
}