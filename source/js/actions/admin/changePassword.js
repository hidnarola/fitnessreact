export const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_ERROR = 'CHANGE_PASSWORD_ERROR';

export const SET_CHANGE_PASSWORD_STATE = 'SET_CHANGE_PASSWORD_STATE';

export function changePasswordRequest(requestData) {
    return {
        type: CHANGE_PASSWORD_REQUEST,
        requestData,
    }
}

export function changePasswordSuccess(data) {
    return {
        type: CHANGE_PASSWORD_SUCCESS,
        data
    }
}

export function changePasswordError(error) {
    return {
        type: CHANGE_PASSWORD_ERROR,
        error
    }
}

export function setChangePasswordState(stateData) {
    return {
        type: SET_CHANGE_PASSWORD_STATE,
        stateData
    }
}