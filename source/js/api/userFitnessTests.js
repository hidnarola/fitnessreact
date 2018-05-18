import { fetchResource, postFormData } from '.';
import { extraUserHeaders } from '../helpers/funs';

const requestUrl = 'user/test_exercise';

function getUserFitnessTests() {
    let headers = extraUserHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }
    return fetchResource(requestUrl, options);
}

function saveUserFitnessTests(requestData) {
    let headers = extraUserHeaders();
    return postFormData(requestUrl, requestData, headers);
}

function resetUserFitnessTests() {
    let headers = extraUserHeaders();
    var options = {
        method: 'DELETE',
        headers: headers,
    }
    return fetchResource(requestUrl, options);
}

export default {
    getUserFitnessTests,
    saveUserFitnessTests,
    resetUserFitnessTests,
}