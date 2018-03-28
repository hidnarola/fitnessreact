import { fetchResource, postFormData, putFormData } from '..';
import { extraHeaders } from '../../helpers/funs';

const requestUrl = 'admin/equipment';

function getEquipments() {
    let headers = extraHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }

    return fetchResource(requestUrl, options);
}

function getEquipment(_id) {
    let headers = extraHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }

    return fetchResource(requestUrl + '/' + _id, options);
}

function addEquipment(equipmentData) {
    let headers = extraHeaders();
    return postFormData(requestUrl, equipmentData, headers);
}

function updateEquipment(_id, equipmentData) {
    let headers = extraHeaders();
    return putFormData(requestUrl + '/' + _id, equipmentData, headers);
}

function deleteEquipment(_id) {
    let headers = extraHeaders();
    var options = {
        method: 'DELETE',
        headers: headers,
    }

    return fetchResource((requestUrl + '/' + _id), options);
}

export default {
    getEquipments,
    getEquipment,
    addEquipment,
    updateEquipment,
    deleteEquipment
}