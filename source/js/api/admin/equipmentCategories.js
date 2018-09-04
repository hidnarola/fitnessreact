import { fetchResource, postFormData, putFormData } from '..';
import { extraHeaders } from '../../helpers/funs';

const requestUrl = 'admin/equipment_category';

function getEquipmentCategories() {
    let headers = extraHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }

    return fetchResource(requestUrl, options);
}

function getEquipmentCategory(_id) {
    let headers = extraHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }

    return fetchResource(requestUrl + '/' + _id, options);
}

function filterEquipmentCategories(filterData) {
    let headers = extraHeaders();
    return postFormData(requestUrl + '/filter', filterData, headers);
}

function addEquipmentCategory(requestData) {
    let headers = extraHeaders();
    return postFormData(requestUrl, requestData, headers);
}

function updateEquipmentCategory(_id, requestData) {
    let headers = extraHeaders();
    return putFormData(requestUrl + '/' + _id, requestData, headers);
}

function deleteEquipmentCategory(_id) {
    let headers = extraHeaders();
    var options = {
        method: 'DELETE',
        headers: headers,
    }

    return fetchResource((requestUrl + '/' + _id), options);
}

function recoverEquipmentCategory(_id) {
    let headers = extraHeaders();
    return putFormData(requestUrl + '/undo/' + _id, null, headers);
}

export default {
    getEquipmentCategories,
    getEquipmentCategory,
    filterEquipmentCategories,
    addEquipmentCategory,
    updateEquipmentCategory,
    deleteEquipmentCategory,
    recoverEquipmentCategory
}