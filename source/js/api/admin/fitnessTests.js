import { postFormData } from '..';
import { extraHeaders } from '../../helpers/funs';

const requestUrl = 'admin/test_exercise';

function filterFitnessTests(filterData) {
    let headers = extraHeaders();
    return postFormData(requestUrl + '/filter', filterData, headers);
}

export default {
    filterFitnessTests
}