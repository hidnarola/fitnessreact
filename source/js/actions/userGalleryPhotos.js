export const GET_USER_GALLERY_PHOTO_REQUEST = 'GET_USER_GALLERY_PHOTO_REQUEST';
export const GET_USER_GALLERY_PHOTO_SUCCESS = 'GET_USER_GALLERY_PHOTO_SUCCESS';
export const GET_USER_GALLERY_PHOTO_ERROR = 'GET_USER_GALLERY_PHOTO_ERROR';

export const ADD_USER_GALLERY_PHOTO_REQUEST = 'ADD_USER_GALLERY_PHOTO_REQUEST';
export const ADD_USER_GALLERY_PHOTO_SUCCESS = 'ADD_USER_GALLERY_PHOTO_SUCCESS';
export const ADD_USER_GALLERY_PHOTO_ERROR = 'ADD_USER_GALLERY_PHOTO_ERROR';

export function getUserGalleryPhotoRequest(username, start, offset) {
    return {
        type: GET_USER_GALLERY_PHOTO_REQUEST,
        username,
        start,
        offset,
    }
}

export function getUserGalleryPhotoSuccess(data) {
    return {
        type: GET_USER_GALLERY_PHOTO_SUCCESS,
        data,
    }
}

export function getUserGalleryPhotoError(error) {
    return {
        type: GET_USER_GALLERY_PHOTO_ERROR,
        error,
    }
}

export function addUserGalleryPhotoRequest(requestData) {
    return {
        type: ADD_USER_GALLERY_PHOTO_REQUEST,
        requestData,
    }
}

export function addUserGalleryPhotoSuccess(data) {
    return {
        type: ADD_USER_GALLERY_PHOTO_SUCCESS,
        data,
    }
}

export function addUserGalleryPhotoError(error) {
    return {
        type: ADD_USER_GALLERY_PHOTO_ERROR,
        error,
    }
}