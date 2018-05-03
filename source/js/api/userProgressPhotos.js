import { postFormData } from '.';
import { extraUserHeaders } from '../helpers/funs';

const requestUrl = 'user/progress_photo';

function getUserProgressPhotos(username, start = 0, noOfPhotos = 10) {
    let headers = extraUserHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }

    return fetchResource(requestUrl + '/' + username + '/' + start + '/' + noOfPhotos, options);
}

function getUserLatestProgressPhotos(username, noOfPhotos = 5) {
    let headers = extraUserHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }

    return fetchResource(requestUrl + '/latest/' + username + '/' + noOfPhotos, options);
}

function postUserProgressPhoto(formData) {
    let headers = extraUserHeaders();
    return postFormData(requestUrl, formData, headers);
}

export default {
    getUserProgressPhoto,
    getUserLatestProgressPhotos,
    postUserProgressPhoto,
}