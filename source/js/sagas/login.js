import { takeLatest, put, call } from 'redux-saga/effects';
import { LOGIN_REQUEST, loginSuccess, loginError, LOGOUT_REQUEST, logoutSuccess, logoutError } from "../actions/login";

import api from 'api/login';
import {
    LOCALSTORAGE_ROLE_KEY,
    USER_ROLE,
    ADMIN_ROLE,
    LOCALSTORAGE_ACCESS_TOKEN_KEY,
    LOCALSTORAGE_ID_TOKEN_KEY,
    LOCALSTORAGE_REFRESH_TOKEN_KEY
} from '../constants/consts';

function authenticate() {
    return function* (action) {
        try {
            var loginData = action.loginData;
            let data = {};
            let encodedUserRole = '';
            if (loginData.userRole === ADMIN_ROLE) {
                data = yield call(() => api.adminLogin(loginData));
                encodedUserRole = window.btoa(ADMIN_ROLE)
            } else if (loginData.userRole === USER_ROLE) {
                data = yield call(() => api.userLogin(loginData));
                encodedUserRole = window.btoa(USER_ROLE)
            }
            localStorage.setItem(LOCALSTORAGE_ROLE_KEY, encodedUserRole);
            localStorage.setItem(LOCALSTORAGE_ID_TOKEN_KEY, JSON.stringify(data.user));
            localStorage.setItem(LOCALSTORAGE_ACCESS_TOKEN_KEY, data.token);
            localStorage.setItem(LOCALSTORAGE_REFRESH_TOKEN_KEY, data.refresh_token);
            yield put(loginSuccess());
        } catch (error) {
            yield put(loginError(error));
        }
    }
}

function logout() {
    return function* (action) {
        try {
            localStorage.removeItem(LOCALSTORAGE_ROLE_KEY);
            localStorage.removeItem(LOCALSTORAGE_ID_TOKEN_KEY);
            localStorage.removeItem(LOCALSTORAGE_ACCESS_TOKEN_KEY);
            localStorage.removeItem(LOCALSTORAGE_REFRESH_TOKEN_KEY);
            yield put(logoutSuccess());
        } catch (error) {
            yield put(logoutError());
        }
    }
}

export function* watchLogin() {
    yield takeLatest(LOGIN_REQUEST, authenticate());
}

export function* watchLogout() {
    yield takeLatest(LOGOUT_REQUEST, logout());
}

export default [
    watchLogin(),
    watchLogout(),
]