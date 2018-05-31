export const GET_PROFILE_DETAILS_REQUEST = 'GET_PROFILE_DETAILS_REQUEST'
export const GET_PROFILE_DETAILS_SUCCESS = 'GET_PROFILE_DETAILS_SUCCESS'
export const GET_PROFILE_DETAILS_ERROR = 'GET_PROFILE_DETAILS_ERROR'

export const GET_LOGGED_USER_PROFILE_DETAILS_REQUEST = 'GET_LOGGED_USER_PROFILE_DETAILS_REQUEST'
export const GET_LOGGED_USER_PROFILE_DETAILS_SUCCESS = 'GET_LOGGED_USER_PROFILE_DETAILS_SUCCESS'
export const GET_LOGGED_USER_PROFILE_DETAILS_ERROR = 'GET_LOGGED_USER_PROFILE_DETAILS_ERROR'

export const SAVE_ABOUT_PROFILE_DETAILS_REQUEST = 'SAVE_ABOUT_PROFILE_DETAILS_REQUEST'
export const SAVE_ABOUT_PROFILE_DETAILS_SUCCESS = 'SAVE_ABOUT_PROFILE_DETAILS_SUCCESS'
export const SAVE_ABOUT_PROFILE_DETAILS_ERROR = 'SAVE_ABOUT_PROFILE_DETAILS_ERROR'

export const SAVE_LOGGED_USER_PROFILE_DETAILS_REQUEST = 'SAVE_LOGGED_USER_PROFILE_DETAILS_REQUEST'
export const SAVE_LOGGED_USER_PROFILE_DETAILS_SUCCESS = 'SAVE_LOGGED_USER_PROFILE_DETAILS_SUCCESS'
export const SAVE_LOGGED_USER_PROFILE_DETAILS_ERROR = 'SAVE_LOGGED_USER_PROFILE_DETAILS_ERROR'

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