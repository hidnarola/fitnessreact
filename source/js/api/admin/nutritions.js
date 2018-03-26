import { fetchResource } from '..';
import { extraHeaders } from '../../helpers/funs';

const requestUrl = 'admin/nutrition';

function getNutritions() {
    let headers = extraHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }

    return fetchResource(requestUrl, options);
}

function getNutrition(_id) {
    let headers = extraHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }

    return fetchResource(requestUrl + '/' + _id, options);
}

function addNutrition(nutritionData) {
    let headers = extraHeaders();
    var options = {
        method: 'POST',
        body: nutritionData,
        headers: headers,
    }

    return fetchResource(requestUrl, options);
}

function updateNutrition(_id, nutritionData) {
    let headers = extraHeaders();
    var options = {
        method: 'PUT',
        body: nutritionData,
        headers: headers,
    }

    return fetchResource(requestUrl + '/' + _id, options);
}

function deleteNutrition(_id) {
    let headers = extraHeaders();
    var options = {
        method: 'DELETE',
        headers: headers,
    }

    return fetchResource((requestUrl + '/' + _id), options);
}

export default {
    getNutritions,
    getNutrition,
    addNutrition,
    updateNutrition,
    deleteNutrition
}