import { extraUserHeaders } from "../helpers/funs";
import { postFormData } from ".";
const requestUrl = 'user/stats'

function getUserStatsData(requestData) {
    var headers = extraUserHeaders();
    return postFormData(requestUrl, requestData, headers);
}

export default {
    getUserStatsData,
}