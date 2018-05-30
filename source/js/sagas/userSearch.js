import { takeLatest, put, call } from 'redux-saga/effects';
import api from 'api/userSearch';
import {
    getUserSearchSuccess,
    getUserSearchError,
    GET_USER_SEARCH_REQUEST,
    getUsersPageSearchSuccess,
    getUsersPageSearchError,
    GET_USERS_PAGE_SEARCH_REQUEST
} from '../actions/userSearch';

function getUserSearchData() {
    return function* (action) {
        try {
            let requestData = action.requestData;
            const data = yield call(() => api.getUserSearch(requestData));
            yield put(getUserSearchSuccess(data));
        } catch (error) {
            yield put(getUserSearchError(error));
        }
    }
}

function getUsersPageSearchData() {
    return function* (action) {
        try {
            let requestData = action.requestData;
            const data = yield call(() => api.getUserSearch(requestData));
            yield put(getUsersPageSearchSuccess(data));
        } catch (error) {
            yield put(getUsersPageSearchError(error));
        }
    }
}

export function* watchUserSearchData() {
    yield takeLatest(GET_USER_SEARCH_REQUEST, getUserSearchData());
    yield takeLatest(GET_USERS_PAGE_SEARCH_REQUEST, getUsersPageSearchData());
}

export default [
    watchUserSearchData()
];