import { takeLatest, put, call } from 'redux-saga/effects';
import api from 'api/userSearch';
import {
    getUserSearchSuccess,
    getUserSearchError,
    GET_USER_SEARCH_REQUEST
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

export function* watchUserSearchData() {
    yield takeLatest(GET_USER_SEARCH_REQUEST, getUserSearchData());
}

export default [
    watchUserSearchData()
];