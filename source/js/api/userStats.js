import { extraUserHeaders } from "../helpers/funs";
import { postFormData } from ".";
const requestUrl = 'user/statistics'

function getUserStatsData(requestData) {
    var headers = extraUserHeaders();
    return postFormData(requestUrl, requestData, headers);
}

function getUserGraphData(requestData) {
    var headers = extraUserHeaders();
    return postFormData(requestUrl + '/graph_data', requestData, headers);
}

function getUserSingleStatsData(requestData) {
    var headers = extraUserHeaders();
    return postFormData(requestUrl + '/single', requestData, headers);
}

export default {
    getUserStatsData,
    getUserGraphData,
    getUserSingleStatsData,
}