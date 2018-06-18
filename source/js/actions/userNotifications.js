export const SET_USER_NOTIFICATION_COUNT = 'SET_USER_NOTIFICATION_COUNT';

export const GET_USER_UNREAD_NOTIFICATIONS_REQUEST = 'GET_USER_UNREAD_NOTIFICATIONS_REQUEST';
export const GET_USER_UNREAD_NOTIFICATIONS_SUCCESS = 'GET_USER_UNREAD_NOTIFICATIONS_SUCCESS';
export const GET_USER_UNREAD_NOTIFICATIONS_ERROR = 'GET_USER_UNREAD_NOTIFICATIONS_ERROR';

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
        type: GET_USER_UNREAD_NOTIFICATIONS_SUCCESS,
        error,
    }
}