export const GET_ADMIN_PROFILE_REQUEST = 'GET_ADMIN_PROFILE_REQUEST';
export const GET_ADMIN_PROFILE_SUCCESS = 'GET_ADMIN_PROFILE_SUCCESS';
export const GET_ADMIN_PROFILE_ERROR = 'GET_ADMIN_PROFILE_ERROR';

export const UPDATE_PROFILE_REQUEST = 'UPDATE_PROFILE_REQUEST';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_ERROR = 'UPDATE_PROFILE_ERROR';

export const SET_PROFILE_STATE = 'SET_PROFILE_STATE';

export function getAdminProfileRequest(requestData) {
    return {
        type: GET_ADMIN_PROFILE_REQUEST,
        requestData,
    }
}

export function getAdminProfileSuccess(data) {
    return {
        type: GET_ADMIN_PROFILE_SUCCESS,
        data
    }
}

export function getAdminProfileError(error) {
    return {
        type: GET_ADMIN_PROFILE_ERROR,
        error
    }
}

export function updateProfileRequest(requestData) {
    return {
        type: UPDATE_PROFILE_REQUEST,
        requestData,
    }
}

export function updateProfileSuccess(data) {
    return {
        type: UPDATE_PROFILE_SUCCESS,
        data
    }
}

export function updateProfileError(error) {
    return {
        type: UPDATE_PROFILE_ERROR,
        error
    }
}

export function setProfileState(stateData) {
    return {
        type: SET_PROFILE_STATE,
        stateData
    }
}