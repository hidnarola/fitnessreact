import { fetchResource, postFormData } from ".";
import { extraUserHeaders } from "../helpers/funs";

const requestUrl = 'user/user_program';

function getUserPrograms() {
    var headers = extraUserHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }
    return fetchResource(requestUrl, options);
}

function addUserProgramMaster(requestData) {
    let headers = extraUserHeaders();
    return postFormData(requestUrl, requestData, headers);
}

export default {
    getUserPrograms,
    addUserProgramMaster,
}