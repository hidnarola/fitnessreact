import { postFormData, fetchResource } from '.';
import { extraUserHeaders } from '../helpers/funs';

const requestUrl = 'user/new_nutrition/ingrident/search';

function getIngridients(data) {
    console.log('api ==================> data => ', data);
    let headers = extraUserHeaders();
    var options = {
        method: 'POST',
        headers: headers,
        body: data
    }

    return fetchResource(requestUrl, options);
}

export default {
    getIngridients,
}