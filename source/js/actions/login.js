export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';

export const FREE_LOGIN_LOGOUT_STATE = 'FREE_LOGIN_LOGOUT_STATE';

export function login(loginData) {
    return {
        type: LOGIN_REQUEST,
        loginData
    }
}

export function loginSuccess(data, metaData) {
    return {
        type: LOGIN_SUCCESS,
        data,
        metaData
    }
}

export function loginError(error) {
    return {
        type: LOGIN_ERROR,
        error
    }
}

export function logout() {
    return {
        type: LOGOUT_REQUEST
    }
}

export function logoutSuccess() {
    return {
        type: LOGOUT_SUCCESS
    }
}

export function logoutError() {
    return {
        type: LOGOUT_ERROR
    }
}

export function freeLoginLogoutState() {
    return {
        type: FREE_LOGIN_LOGOUT_STATE
    }
}