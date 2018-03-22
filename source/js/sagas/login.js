import { takeLatest, put, call } from 'redux-saga/effects';
import { LOGIN_REQUEST, loginSuccess, loginError, LOGOUT_REQUEST, logoutSuccess, logoutError } from "../actions/login";

import api from 'api/login';
import { LOCALSTORAGE_USER_ITEM_KEY, LOCALSTORAGE_TOKEN_ITEM_KEY, LOCALSTORAGE_REFRESH_TOKEN_ITEM_KEY } from '../constants/consts';

function authenticate() {
    return function* (action) {
        try {
            var loginData = action.loginData;
            const data = yield call(() => api.userLogin(loginData));
            localStorage.setItem(LOCALSTORAGE_USER_ITEM_KEY, data.user);
            localStorage.setItem(LOCALSTORAGE_TOKEN_ITEM_KEY, data.token);
            localStorage.setItem(LOCALSTORAGE_REFRESH_TOKEN_ITEM_KEY, data.refresh_token);
            yield put(loginSuccess(data));
        } catch (error) {
            yield put(loginError(error));
        }
    }
}

function logout() {
    return function* (action) {
        try {
            localStorage.removeItem(LOCALSTORAGE_USER_ITEM_KEY);
            localStorage.removeItem(LOCALSTORAGE_TOKEN_ITEM_KEY);
            localStorage.removeItem(LOCALSTORAGE_REFRESH_TOKEN_ITEM_KEY);
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