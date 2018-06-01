export const GET_USER_PROGRESS_PHOTO_REQUEST = 'GET_USER_PROGRESS_PHOTO_REQUEST';
export const GET_USER_PROGRESS_PHOTO_SUCCESS = 'GET_USER_PROGRESS_PHOTO_SUCCESS';
export const GET_USER_PROGRESS_PHOTO_ERROR = 'GET_USER_PROGRESS_PHOTO_ERROR';

export const GET_USER_LATEST_PROGRESS_PHOTO_REQUEST = 'GET_USER_LATEST_PROGRESS_PHOTO_REQUEST';
export const GET_USER_LATEST_PROGRESS_PHOTO_SUCCESS = 'GET_USER_LATEST_PROGRESS_PHOTO_SUCCESS';
export const GET_USER_LATEST_PROGRESS_PHOTO_ERROR = 'GET_USER_LATEST_PROGRESS_PHOTO_ERROR';

export const ADD_USER_PROGRESS_PHOTO_REQUEST = 'ADD_USER_PROGRESS_PHOTO_REQUEST';
export const ADD_USER_PROGRESS_PHOTO_SUCCESS = 'ADD_USER_PROGRESS_PHOTO_SUCCESS';
export const ADD_USER_PROGRESS_PHOTO_ERROR = 'ADD_USER_PROGRESS_PHOTO_ERROR';

export function getUserProgressPhotoRequest(username, start = 0, noOfPhotos = 5, sort = -1) {
    return {
        type: GET_USER_PROGRESS_PHOTO_REQUEST,
        username,
        start,
        noOfPhotos,
        sort,
    }
}

export function getUserProgressPhotoSuccess(data) {
    return {
        type: GET_USER_PROGRESS_PHOTO_SUCCESS,
        data,
    }
}

export function getUserProgressPhotoError(error) {
    return {
        type: GET_USER_PROGRESS_PHOTO_ERROR,
        error,
    }
}

export function getUserLatestProgressPhotoRequest(username, noOfPhotos = 5) {
    return {
        type: GET_USER_LATEST_PROGRESS_PHOTO_REQUEST,
        username,
        noOfPhotos,
    }
}

export function getUserLatestProgressPhotoSuccess(data) {
    return {
        type: GET_USER_LATEST_PROGRESS_PHOTO_SUCCESS,
        data,
    }
}

export function getUserLatestProgressPhotoError(error) {
    return {
        type: GET_USER_LATEST_PROGRESS_PHOTO_ERROR,
        error,
    }
}

export function addUserProgressPhotoRequest(formData) {
    return {
        type: ADD_USER_PROGRESS_PHOTO_REQUEST,
        formData,
    }
}

export function addUserProgressPhotoSuccess(data) {
    return {
        type: ADD_USER_PROGRESS_PHOTO_SUCCESS,
        data,
    }
}

export function addUserProgressPhotoError(error) {
    return {
        type: ADD_USER_PROGRESS_PHOTO_ERROR,
        error,
    }
}