import { takeLatest, put, call } from 'redux-saga/effects';
import api from 'api/userNotifications';
import {
    getUserUnreadNotificationsSuccess,
    getUserUnreadNotificationsError,
    GET_USER_UNREAD_NOTIFICATIONS_REQUEST
} from '../actions/userNotifications';

function getUserUnreadNotificationsData() {
    return function* (action) {
        try {
            const data = yield call(() => api.getUserUnreadNotifications());
            yield put(getUserUnreadNotificationsSuccess(data));
        } catch (error) {
            yield put(getUserUnreadNotificationsError(error));
        }
    }
}

export function* watchUserUnreadNotificationsData() {
    yield takeLatest(GET_USER_UNREAD_NOTIFICATIONS_REQUEST, getUserUnreadNotificationsData());
}

export default [
    watchUserUnreadNotificationsData()
];