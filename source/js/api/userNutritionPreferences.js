import { postFormData, fetchResource } from '.';
import { extraUserHeaders } from '../helpers/funs';

const requestUrl = 'user/nutrition_preference';

function getUserNutritionPreferences() {
    let headers = extraUserHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }

    return fetchResource(requestUrl, options);
}

function postUserNutritionPreferences(requestData) {
    let headers = extraUserHeaders();
    return postFormData(requestUrl, requestData, headers);
}

function resetUserNutritionPreferences() {
    let headers = extraUserHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }

    return fetchResource(requestUrl + '/reset', options);
}

export default {
    getUserNutritionPreferences,
    postUserNutritionPreferences,
    resetUserNutritionPreferences,
}