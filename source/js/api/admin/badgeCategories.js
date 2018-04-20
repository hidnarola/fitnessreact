import { fetchResource, postFormData, putFormData } from '..';
import { extraHeaders } from '../../helpers/funs';

const requestUrl = 'admin/badge_category';

function getBadgeCategories() {
    let headers = extraHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }

    return fetchResource(requestUrl, options);
}

function filterBadgeCategories(filterData) {
    let headers = extraHeaders();
    return postFormData(requestUrl + '/filter', filterData, headers);
}

function getBadgeCategory(_id) {
    let headers = extraHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }

    return fetchResource(requestUrl + '/' + _id, options);
}

function addBadgeCategory(exerciseData) {
    let headers = extraHeaders();
    return postFormData(requestUrl, exerciseData, headers);
}

function updateBadgeCategory(_id, exerciseData) {
    let headers = extraHeaders();
    return putFormData(requestUrl + '/' + _id, exerciseData, headers);
}

function deleteBadgeCategory(_id) {
    let headers = extraHeaders();
    var options = {
        method: 'DELETE',
        headers: headers,
    }

    return fetchResource((requestUrl + '/' + _id), options);
}

export default {
    getBadgeCategories,
    filterBadgeCategories,
    getBadgeCategory,
    addBadgeCategory,
    updateBadgeCategory,
    deleteBadgeCategory
}