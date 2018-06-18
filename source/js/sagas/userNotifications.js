import { takeLatest, put, call } from 'redux-saga/effects';
import api from 'api/userNotifications';
import {
    getUserUnreadNotificationsSuccess,
    getUserUnreadNotificationsError,
    GET_USER_UNREAD_NOTIFICATIONS_REQUEST,
    readOneUserNotificationSuccess,
    readOneUserNotificationError,
    READ_ONE_USER_NOTIFICATION_REQUEST,
    readAllUserNotificationSuccess,
    readAllUserNotificationError,
    READ_ALL_USER_NOTIFICATION_REQUEST
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

function putReadOneUserNotificationData() {
    return function* (action) {
        try {
            var _id = action._id;
            const data = yield call(() => api.putReadOneUserNotification(_id));
            yield put(readOneUserNotificationSuccess(data));
        } catch (error) {
            yield put(readOneUserNotificationError(error));
        }
    }
}

function putReadAllUserNotificationData() {
    return function* (action) {
        try {
            const data = yield call(() => api.putReadAllUserNotification());
            yield put(readAllUserNotificationSuccess(data));
        } catch (error) {
            yield put(readAllUserNotificationError(error));
        }
    }
}

export function* watchUserUnreadNotificationsData() {
    yield takeLatest(GET_USER_UNREAD_NOTIFICATIONS_REQUEST, getUserUnreadNotificationsData());
    yield takeLatest(READ_ONE_USER_NOTIFICATION_REQUEST, putReadOneUserNotificationData());
    yield takeLatest(READ_ALL_USER_NOTIFICATION_REQUEST, putReadAllUserNotificationData());
}

export default [
    watchUserUnreadNotificationsData()
];