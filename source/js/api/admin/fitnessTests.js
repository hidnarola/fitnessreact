import { postFormData, fetchResource, putFormData } from '..';
import { extraHeaders } from '../../helpers/funs';

const requestUrl = 'admin/test_exercise';

function getFitnessTest(_id) {
    let headers = extraHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }

    return fetchResource((requestUrl + '/' + _id), options);
}

function filterFitnessTests(filterData) {
    let headers = extraHeaders();
    return postFormData(requestUrl + '/filter', filterData, headers);
}

function addFitnessTest(formData) {
    let headers = extraHeaders();
    return postFormData(requestUrl, formData, headers);
}

function updateFitnessTest(_id, formData) {
    let headers = extraHeaders();
    return putFormData((requestUrl + '/' + _id), formData, headers);
}

function deleteFitnessTest(_id) {
    let headers = extraHeaders();
    var options = {
        method: 'DELETE',
        headers: headers,
    }

    return fetchResource((requestUrl + '/' + _id), options);
}

function recoverFitnessTest(_id) {
    let headers = extraHeaders();
    return putFormData(requestUrl + '/undo/' + _id, null, headers);
}

export default {
    getFitnessTest,
    filterFitnessTests,
    addFitnessTest,
    updateFitnessTest,
    deleteFitnessTest,
    recoverFitnessTest
}