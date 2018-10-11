export const GET_USER_GALLERY_PHOTO_REQUEST = 'GET_USER_GALLERY_PHOTO_REQUEST';
export const GET_USER_GALLERY_PHOTO_SUCCESS = 'GET_USER_GALLERY_PHOTO_SUCCESS';
export const GET_USER_GALLERY_PHOTO_ERROR = 'GET_USER_GALLERY_PHOTO_ERROR';

export const LOAD_MORE_USER_GALLERY_PHOTO_REQUEST = 'LOAD_MORE_USER_GALLERY_PHOTO_REQUEST';
export const LOAD_MORE_USER_GALLERY_PHOTO_SUCCESS = 'LOAD_MORE_USER_GALLERY_PHOTO_SUCCESS';
export const LOAD_MORE_USER_GALLERY_PHOTO_ERROR = 'LOAD_MORE_USER_GALLERY_PHOTO_ERROR';

export const ADD_USER_GALLERY_PHOTO_REQUEST = 'ADD_USER_GALLERY_PHOTO_REQUEST';
export const ADD_USER_GALLERY_PHOTO_SUCCESS = 'ADD_USER_GALLERY_PHOTO_SUCCESS';
export const ADD_USER_GALLERY_PHOTO_ERROR = 'ADD_USER_GALLERY_PHOTO_ERROR';

export const DELETE_USER_GALLERY_PHOTO_REQUEST = 'DELETE_USER_GALLERY_PHOTO_REQUEST';
export const DELETE_USER_GALLERY_PHOTO_SUCCESS = 'DELETE_USER_GALLERY_PHOTO_SUCCESS';
export const DELETE_USER_GALLERY_PHOTO_ERROR = 'DELETE_USER_GALLERY_PHOTO_ERROR';

export function getUserGalleryPhotoRequest(username, start = 0, offset = 5, sort = -1) {
    return {
        type: GET_USER_GALLERY_PHOTO_REQUEST,
        username,
        start,
        offset,
        sort
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

export function loadMoreUserGalleryPhotoRequest(username, start, offset, sort) {
    return {
        type: LOAD_MORE_USER_GALLERY_PHOTO_REQUEST,
        username,
        start,
        offset,
        sort,
    }
}

export function loadMoreUserGalleryPhotoSuccess(data) {
    return {
        type: LOAD_MORE_USER_GALLERY_PHOTO_SUCCESS,
        data,
    }
}

export function loadMoreUserGalleryPhotoError(error) {
    return {
        type: LOAD_MORE_USER_GALLERY_PHOTO_ERROR,
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

export function deleteUserGalleryPhotoRequest(id, postId) {
    return {
        type: DELETE_USER_GALLERY_PHOTO_REQUEST,
        id,
        postId,
    }
}

export function deleteUserGalleryPhotoSuccess(data) {
    return {
        type: DELETE_USER_GALLERY_PHOTO_SUCCESS,
        data,
    }
}

export function deleteUserGalleryPhotoError(error) {
    return {
        type: DELETE_USER_GALLERY_PHOTO_ERROR,
        error,
    }
}