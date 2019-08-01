import { postFormData } from './index';
import { extraUserHeaders } from '../helpers/funs';

const requestUrl = 'user/meals';

function addMeal(requestData) {
    console.log('api => ');
    let headers = extraUserHeaders();
    return postFormData(requestUrl, requestData, headers);
}

export default {
    addMeal,
}