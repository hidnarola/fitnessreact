export const ADD_USER_PROGRESS_PHOTO_REQUEST = 'ADD_USER_PROGRESS_PHOTO_REQUEST';
export const ADD_USER_PROGRESS_PHOTO_SUCCESS = 'ADD_USER_PROGRESS_PHOTO_SUCCESS';
export const ADD_USER_PROGRESS_PHOTO_ERROR = 'ADD_USER_PROGRESS_PHOTO_ERROR';

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