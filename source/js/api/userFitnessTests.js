import { fetchResource, postFormData } from '.';
import { extraUserHeaders } from '../helpers/funs';

const requestUrl = 'user/test_exercise';

function getUserFitnessTests(date) {
    let headers = extraUserHeaders();
    var requestData = { date };
    return postFormData(requestUrl + '/today', requestData, headers);
}

function saveUserFitnessTests(requestData) {
    let headers = extraUserHeaders();
    return postFormData(requestUrl, requestData, headers);
}

function resetUserFitnessTests(date) {
    var requestData = { date };
    let headers = extraUserHeaders();
    return postFormData(requestUrl + '/reset', requestData, headers);
}

export default {
    getUserFitnessTests,
    saveUserFitnessTests,
    resetUserFitnessTests,
}