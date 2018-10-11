import { postFormData, fetchResource } from '.';
import { extraUserHeaders } from '../helpers/funs';

const requestUrl = 'user/gallery';

function getUserGalleryPhoto(username, start = 0, offset = 10, sort = -1) {
    let headers = extraUserHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }

    return fetchResource(requestUrl + '/' + username + '/' + start + '/' + offset + '/' + sort, options);
}

function postUserGalleryPhoto(requestData) {
    let headers = extraUserHeaders();
    return postFormData(requestUrl, requestData, headers);
}

function deleteUserGalleryPhoto(id, postId) {
    let headers = extraUserHeaders();
    var options = {
        method: 'DELETE',
        headers: headers,
    }

    return fetchResource(requestUrl + '/' + id + '/' + postId, options);
}

export default {
    getUserGalleryPhoto,
    postUserGalleryPhoto,
    deleteUserGalleryPhoto,
}