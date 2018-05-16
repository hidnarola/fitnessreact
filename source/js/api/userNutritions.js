import { postFormData, fetchResource } from '.';
import { extraUserHeaders } from '../helpers/funs';

const requestUrl = 'user/nutrition';

function getUserTodaysMeal(requestData) {
    let headers = extraUserHeaders();
    return postFormData(requestUrl + '/todays_meal', requestData, headers);
}

function getUserRecipeDetails(_id) {
    let headers = extraUserHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }
    return fetchResource(requestUrl + '/recipe/' + _id, options);
}

export default {
    getUserTodaysMeal,
    getUserRecipeDetails,
}