export const SET_USER_NOTIFICATION_COUNT = 'SET_USER_NOTIFICATION_COUNT';

export const GET_USER_UNREAD_NOTIFICATIONS_REQUEST = 'GET_USER_UNREAD_NOTIFICATIONS_REQUEST';
export const GET_USER_UNREAD_NOTIFICATIONS_SUCCESS = 'GET_USER_UNREAD_NOTIFICATIONS_SUCCESS';
export const GET_USER_UNREAD_NOTIFICATIONS_ERROR = 'GET_USER_UNREAD_NOTIFICATIONS_ERROR';

export const READ_ONE_USER_NOTIFICATION_REQUEST = 'READ_ONE_USER_NOTIFICATION_REQUEST';
export const READ_ONE_USER_NOTIFICATION_SUCCESS = 'READ_ONE_USER_NOTIFICATION_SUCCESS';
export const READ_ONE_USER_NOTIFICATION_ERROR = 'READ_ONE_USER_NOTIFICATION_ERROR';

export const READ_ALL_USER_NOTIFICATION_REQUEST = 'READ_ALL_USER_NOTIFICATION_REQUEST';
export const READ_ALL_USER_NOTIFICATION_SUCCESS = 'READ_ALL_USER_NOTIFICATION_SUCCESS';
export const READ_ALL_USER_NOTIFICATION_ERROR = 'READ_ALL_USER_NOTIFICATION_ERROR';

export const GET_ALL_USER_NOTIFICATION_REQUEST = 'GET_ALL_USER_NOTIFICATION_REQUEST';
export const GET_ALL_USER_NOTIFICATION_SUCCESS = 'GET_ALL_USER_NOTIFICATION_SUCCESS';
export const GET_ALL_USER_NOTIFICATION_ERROR = 'GET_ALL_USER_NOTIFICATION_ERROR';

export function setUserNotificationCount(count) {
    return {
        type: SET_USER_NOTIFICATION_COUNT,
        count,
    }
}

export function getUserUnreadNotificationsRequest() {
    return {
        type: GET_USER_UNREAD_NOTIFICATIONS_REQUEST,
    }
}

export function getUserUnreadNotificationsSuccess(data) {
    return {
        type: GET_USER_UNREAD_NOTIFICATIONS_SUCCESS,
        data,
    }
}

export function getUserUnreadNotificationsError(error) {
    return {
        type: GET_USER_UNREAD_NOTIFICATIONS_ERROR,
        error,
    }
}

export function readOneUserNotificationRequest(_id) {
    return {
        type: READ_ONE_USER_NOTIFICATION_REQUEST,
        _id,
    }
}

export function readOneUserNotificationSuccess(data) {
    return {
        type: READ_ONE_USER_NOTIFICATION_SUCCESS,
        data,
    }
}

export function readOneUserNotificationError(error) {
    return {
        type: READ_ONE_USER_NOTIFICATION_ERROR,
        error,
    }
}

export function readAllUserNotificationRequest() {
    return {
        type: READ_ALL_USER_NOTIFICATION_REQUEST,
    }
}

export function readAllUserNotificationSuccess(data) {
    return {
        type: READ_ALL_USER_NOTIFICATION_SUCCESS,
        data,
    }
}

export function readAllUserNotificationError(error) {
    return {
        type: READ_ALL_USER_NOTIFICATION_ERROR,
        error,
    }
}

export function getAllUserNotificationRequest() {
    return {
        type: GET_ALL_USER_NOTIFICATION_REQUEST,
    }
}

export function getAllUserNotificationSuccess(data) {
    return {
        type: GET_ALL_USER_NOTIFICATION_SUCCESS,
        data,
    }
}

export function getAllUserNotificationError(error) {
    return {
        type: GET_ALL_USER_NOTIFICATION_ERROR,
        error,
    }
}