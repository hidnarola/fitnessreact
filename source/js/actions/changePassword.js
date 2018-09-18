export const USER_CHANGE_PASSWORD_REQUEST = 'USER_CHANGE_PASSWORD_REQUEST';
export const USER_CHANGE_PASSWORD_SUCCESS = 'USER_CHANGE_PASSWORD_SUCCESS';
export const USER_CHANGE_PASSWORD_ERROR = 'USER_CHANGE_PASSWORD_ERROR';

export const SET_USER_CHANGE_PASSWORD_STATE = 'SET_USER_CHANGE_PASSWORD_STATE';

export function userChangePasswordRequest(requestData) {
    return {
        type: USER_CHANGE_PASSWORD_REQUEST,
        requestData,
    }
}

export function userChangePasswordSuccess(data) {
    return {
        type: USER_CHANGE_PASSWORD_SUCCESS,
        data
    }
}

export function userChangePasswordError(error) {
    return {
        type: USER_CHANGE_PASSWORD_ERROR,
        error
    }
}

export function setUserChangePasswordState(stateData) {
    return {
        type: SET_USER_CHANGE_PASSWORD_STATE,
        stateData
    }
}