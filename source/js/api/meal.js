import { postFormData } from '..';
import { extraHeaders } from '../../helpers/funs';

const requestUrl = '/user/meals';

function addMeal(requestData) {
    console.log('api => ');
    let headers = extraHeaders();
    return postFormData(requestUrl, requestData, headers);
}

export default {
    addMeal,
}