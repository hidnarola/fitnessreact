import { postFormData } from '.';
import { extraUserHeaders } from '../helpers/funs';

const requestUrl = 'user/measurement';
const requestUrl1 = 'user/body_fat_log';
const requestUrl2 = 'user/progress_photo';

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

function saveBodyFatData(requestData) {
    let headers = extraUserHeaders();
    return postFormData(requestUrl1, requestData, headers);
}

function getProgressPhotosByDateData(requestData) {
    let headers = extraUserHeaders();
    return postFormData(requestUrl2 + '/get_by_date', requestData, headers);
}

export default {
    getBodyMeasurementData,
    getBodyMeasurementLogDatesData,
    saveBodyMeasurementData,
    saveBodyFatData,
    getProgressPhotosByDateData
}