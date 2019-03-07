export const GET_PROFILE_DETAILS_REQUEST = 'GET_PROFILE_DETAILS_REQUEST';
export const GET_PROFILE_DETAILS_SUCCESS = 'GET_PROFILE_DETAILS_SUCCESS';
export const GET_PROFILE_DETAILS_ERROR = 'GET_PROFILE_DETAILS_ERROR';

export const GET_LOGGED_USER_PROFILE_DETAILS_REQUEST = 'GET_LOGGED_USER_PROFILE_DETAILS_REQUEST';
export const GET_LOGGED_USER_PROFILE_DETAILS_SUCCESS = 'GET_LOGGED_USER_PROFILE_DETAILS_SUCCESS';
export const GET_LOGGED_USER_PROFILE_DETAILS_ERROR = 'GET_LOGGED_USER_PROFILE_DETAILS_ERROR';

export const GET_LOGGED_USER_PROFILE_SETTINGS_REQUEST = 'GET_LOGGED_USER_PROFILE_SETTINGS_REQUEST';
export const GET_LOGGED_USER_PROFILE_SETTINGS_SUCCESS = 'GET_LOGGED_USER_PROFILE_SETTINGS_SUCCESS';
export const GET_LOGGED_USER_PROFILE_SETTINGS_ERROR = 'GET_LOGGED_USER_PROFILE_SETTINGS_ERROR';

export const SAVE_ABOUT_PROFILE_DETAILS_REQUEST = 'SAVE_ABOUT_PROFILE_DETAILS_REQUEST';
export const SAVE_ABOUT_PROFILE_DETAILS_SUCCESS = 'SAVE_ABOUT_PROFILE_DETAILS_SUCCESS';
export const SAVE_ABOUT_PROFILE_DETAILS_ERROR = 'SAVE_ABOUT_PROFILE_DETAILS_ERROR';

export const SAVE_LOGGED_USER_PROFILE_DETAILS_REQUEST = 'SAVE_LOGGED_USER_PROFILE_DETAILS_REQUEST';
export const SAVE_LOGGED_USER_PROFILE_DETAILS_SUCCESS = 'SAVE_LOGGED_USER_PROFILE_DETAILS_SUCCESS';
export const SAVE_LOGGED_USER_PROFILE_DETAILS_ERROR = 'SAVE_LOGGED_USER_PROFILE_DETAILS_ERROR';

export const SAVE_LOGGED_USER_PROFILE_SETTINGS_REQUEST = 'SAVE_LOGGED_USER_PROFILE_SETTINGS_REQUEST';
export const SAVE_LOGGED_USER_PROFILE_SETTINGS_SUCCESS = 'SAVE_LOGGED_USER_PROFILE_SETTINGS_SUCCESS';
export const SAVE_LOGGED_USER_PROFILE_SETTINGS_ERROR = 'SAVE_LOGGED_USER_PROFILE_SETTINGS_ERROR';

export const SAVE_LOGGED_USER_PROFILE_PHOTO_REQUEST = 'SAVE_LOGGED_USER_PROFILE_PHOTO_REQUEST';
export const SAVE_LOGGED_USER_PROFILE_PHOTO_SUCCESS = 'SAVE_LOGGED_USER_PROFILE_PHOTO_SUCCESS';
export const SAVE_LOGGED_USER_PROFILE_PHOTO_ERROR = 'SAVE_LOGGED_USER_PROFILE_PHOTO_ERROR';

export const SHOW_FOLL_USER_LIST_REQUEST = 'SHOW_FOLL_USER_LIST_REQUEST';
export const SHOW_FOLL_USER_LIST_SUCCESS = 'SHOW_FOLL_USER_LIST_SUCCESS';
export const SHOW_FOLL_USER_LIST_ERROR = 'SHOW_FOLL_USER_LIST_ERROR';

export const DELETE_USER_PROFILE_IMG_REQUEST = 'DELETE_USER_PROFILE_IMG_REQUEST';
export const DELETE_USER_PROFILE_IMG_SUCCESS = 'DELETE_USER_PROFILE_IMG_SUCCESS';
export const DELETE_USER_PROFILE_IMG_ERROR = 'DELETE_USER_PROFILE_IMG_ERROR';

export const SET_USER_PROFILE_STATE = 'SET_USER_PROFILE_STATE';

export function getProfileDetailsRequest(username) {
    return {
        type: GET_PROFILE_DETAILS_REQUEST,
        username
    }
}

export function getProfileDetailsSuccess(data) {
    return {
        type: GET_PROFILE_DETAILS_SUCCESS,
        data
    }
}

export function getProfileDetailsError(error) {
    return {
        type: GET_PROFILE_DETAILS_ERROR,
        error
    }
}

export function getLoggedUserProfileDetailsRequest() {
    return {
        type: GET_LOGGED_USER_PROFILE_DETAILS_REQUEST,
    }
}

export function getLoggedUserProfileDetailsSuccess(data) {
    return {
        type: GET_LOGGED_USER_PROFILE_DETAILS_SUCCESS,
        data
    }
}

export function getLoggedUserProfileDetailsError(error) {
    return {
        type: GET_LOGGED_USER_PROFILE_DETAILS_ERROR,
        error
    }
}

export function getLoggedUserProfileSettingsRequest() {
    return {
        type: GET_LOGGED_USER_PROFILE_SETTINGS_REQUEST,
    }
}

export function getLoggedUserProfileSettingsSuccess(data) {
    return {
        type: GET_LOGGED_USER_PROFILE_SETTINGS_SUCCESS,
        data
    }
}

export function getLoggedUserProfileSettingsError(error) {
    return {
        type: GET_LOGGED_USER_PROFILE_SETTINGS_ERROR,
        error
    }
}

export function saveAboutProfileDetailsRequest(requestData) {
    return {
        type: SAVE_ABOUT_PROFILE_DETAILS_REQUEST,
        requestData
    }
}

export function saveAboutProfileDetailsSuccess(data) {
    return {
        type: SAVE_ABOUT_PROFILE_DETAILS_SUCCESS,
        data
    }
}

export function saveAboutProfileDetailsError(error) {
    return {
        type: SAVE_ABOUT_PROFILE_DETAILS_ERROR,
        error
    }
}

export function saveLoggedUserProfileSettingsRequest(formData) {
    return {
        type: SAVE_LOGGED_USER_PROFILE_SETTINGS_REQUEST,
        formData
    }
}

export function saveLoggedUserProfileSettingsSuccess(data) {
    return {
        type: SAVE_LOGGED_USER_PROFILE_SETTINGS_SUCCESS,
        data
    }
}

export function saveLoggedUserProfileSettingsError(error) {
    return {
        type: SAVE_LOGGED_USER_PROFILE_SETTINGS_ERROR,
        error
    }
}

export function saveLoggedUserProfileDetailsRequest(formData) {
    return {
        type: SAVE_LOGGED_USER_PROFILE_DETAILS_REQUEST,
        formData
    }
}

export function saveLoggedUserProfileDetailsSuccess(data) {
    return {
        type: SAVE_LOGGED_USER_PROFILE_DETAILS_SUCCESS,
        data
    }
}

export function saveLoggedUserProfileDetailsError(error) {
    return {
        type: SAVE_LOGGED_USER_PROFILE_DETAILS_ERROR,
        error
    }
}

export function saveLoggedUserProfilePhotoRequest(requestData) {
    return {
        type: SAVE_LOGGED_USER_PROFILE_PHOTO_REQUEST,
        requestData
    }
}

export function saveLoggedUserProfilePhotoSuccess(data) {
    return {
        type: SAVE_LOGGED_USER_PROFILE_PHOTO_SUCCESS,
        data
    }
}

export function saveLoggedUserProfilePhotoError(error) {
    return {
        type: SAVE_LOGGED_USER_PROFILE_PHOTO_ERROR,
        error
    }
}

export function showFollUserListRequest(_for, username) {
    return {
        type: SHOW_FOLL_USER_LIST_REQUEST,
        _for,
        username
    }
}

export function showFollUserListSuccess(data) {
    return {
        type: SHOW_FOLL_USER_LIST_SUCCESS,
        data
    }
}

export function showFollUserListError(error) {
    return {
        type: SHOW_FOLL_USER_LIST_ERROR,
        error
    }
}

export function deleteUserProfileImageRequest() {
    return {
        type: DELETE_USER_PROFILE_IMG_REQUEST,
    }
}

export function deleteUserProfileImageSuccess(data) {
    return {
        type: DELETE_USER_PROFILE_IMG_SUCCESS,
        data
    }
}

export function deleteUserProfileImageError(error) {
    return {
        type: DELETE_USER_PROFILE_IMG_ERROR,
        error
    }
}

export function setUserProfileState(newState) {
    return {
        type: SET_USER_PROFILE_STATE,
        newState
    }
}