import { takeLatest, call, put } from 'redux-saga/effects';
import { GET_FRIENDS_START, friendsSuccessAction, friendsErrorAction } from "../actions/friends";

import api from 'api/newapi';

function fetchFriendsData() {
    return function* (action) {
        try {
            const data = yield call(() => api.getFriendsData());
            yield put(friendsSuccessAction(data));
        } catch (error) {
            yield put(friendsErrorAction(error));
        }
    }
}

export function* watchFriendsData() {
    yield takeLatest(GET_FRIENDS_START, fetchFriendsData());
}

export default [
    watchFriendsData()
];