import { fetchResource } from ".";
import { extraUserHeaders } from "../helpers/funs";

const requestUrl = 'user/program';

function getUserPrograms() {
    var headers = extraUserHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }
    return fetchResource(requestUrl, options);
}

export default {
    getUserPrograms,
}