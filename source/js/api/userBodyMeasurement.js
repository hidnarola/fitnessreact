import { postFormData } from '.';
import { extraUserHeaders } from '../helpers/funs';

const requestUrl = 'user/measurement';

function getBodyMeasurementData(requestData) {
    let headers = extraUserHeaders();
    return postFormData(requestUrl + '/get_by_id_logdate', requestData, headers);
}

function getBodyMeasurementLogDatesData(requestData) {
    let headers = extraUserHeaders();
    return postFormData(requestUrl + '/get_log_dates_by_date', requestData, headers);
}

function saveBodyMeasurementData(data) {
    let headers = extraUserHeaders();
    return postFormData(requestUrl, data, headers);
}

export default {
    getBodyMeasurementData,
    getBodyMeasurementLogDatesData,
    saveBodyMeasurementData
}