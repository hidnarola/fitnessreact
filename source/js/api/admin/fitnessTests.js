import { postFormData, fetchResource } from '..';
import { extraHeaders } from '../../helpers/funs';

const requestUrl = 'admin/test_exercise';

function filterFitnessTests(filterData) {
    let headers = extraHeaders();
    return postFormData(requestUrl + '/filter', filterData, headers);
}

function deleteFitnessTest(_id) {
    let headers = extraHeaders();
    var options = {
        method: 'DELETE',
        headers: headers,
    }

    return fetchResource((requestUrl + '/' + _id), options);
}

export default {
    filterFitnessTests,
    deleteFitnessTest
}