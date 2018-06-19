import { postFormData, fetchResource, putFormData } from '.';
import { extraUserHeaders } from '../helpers/funs';

const requestUrl = 'user/profile';

function getLoggedUserProfileDetails() {
    let headers = extraUserHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }

    return fetchResource(requestUrl, options);
}


function getLoggedUserProfileSettings() {
    let headers = extraUserHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }

    return fetchResource(requestUrl + '/preferences', options);
}

function getProfileDetails(username) {
    let headers = extraUserHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }

    return fetchResource(requestUrl + '/' + username, options);
}

function saveAboutProfileDetails(requestData) {
    let headers = extraUserHeaders();
    return putFormData(requestUrl + '/update_aboutme', requestData, headers);
}

function saveLoggedUserProfileDetails(formData) {
    let headers = extraUserHeaders();
    return putFormData(requestUrl, formData, headers);
}

function saveLoggedUserProfileSettings(formData) {
    let headers = extraUserHeaders();
    return putFormData(requestUrl + '/preferences', formData, headers);
}

function saveLoggedUserProfilePhoto(requestData) {
    let headers = extraUserHeaders();
    return putFormData(requestUrl + '/photo', requestData, headers);
}

export default {
    getLoggedUserProfileDetails,
    getLoggedUserProfileSettings,
    getProfileDetails,
    saveAboutProfileDetails,
    saveLoggedUserProfileDetails,
    saveLoggedUserProfileSettings,
    saveLoggedUserProfilePhoto,
}