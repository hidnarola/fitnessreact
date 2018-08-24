export const GET_APPROVED_FRIENDS_REQUEST = 'GET_APPROVED_FRIENDS_REQUEST';
export const GET_APPROVED_FRIENDS_SUCCESS = 'GET_APPROVED_FRIENDS_SUCCESS';
export const GET_APPROVED_FRIENDS_ERROR = 'GET_APPROVED_FRIENDS_ERROR';

export const GET_PENDING_FRIENDS_REQUEST = 'GET_PENDING_FRIENDS_REQUEST';
export const GET_PENDING_FRIENDS_SUCCESS = 'GET_PENDING_FRIENDS_SUCCESS';
export const GET_PENDING_FRIENDS_ERROR = 'GET_PENDING_FRIENDS_ERROR';

export const SEND_FRIEND_REQUEST_REQUEST = 'SEND_FRIEND_REQUEST_REQUEST';
export const SEND_FRIEND_REQUEST_SUCCESS = 'SEND_FRIEND_REQUEST_SUCCESS';
export const SEND_FRIEND_REQUEST_ERROR = 'SEND_FRIEND_REQUEST_ERROR';

export const CANCEL_FRIEND_REQUEST_REQUEST = 'CANCEL_FRIEND_REQUEST_REQUEST';
export const CANCEL_FRIEND_REQUEST_SUCCESS = 'CANCEL_FRIEND_REQUEST_SUCCESS';
export const CANCEL_FRIEND_REQUEST_ERROR = 'CANCEL_FRIEND_REQUEST_ERROR';

export const ACCEPT_FRIEND_REQUEST_REQUEST = 'ACCEPT_FRIEND_REQUEST_REQUEST';
export const ACCEPT_FRIEND_REQUEST_SUCCESS = 'ACCEPT_FRIEND_REQUEST_SUCCESS';
export const ACCEPT_FRIEND_REQUEST_ERROR = 'ACCEPT_FRIEND_REQUEST_ERROR';

export const SET_USER_FRIEND_REQUESTS_COUNT = 'SET_USER_FRIEND_REQUESTS_COUNT';

export function getApprovedFriendsRequest(username) {
    return {
        type: GET_APPROVED_FRIENDS_REQUEST,
        username
    }
}

export function getApprovedFriendsSuccess(data) {
    return {
        type: GET_APPROVED_FRIENDS_SUCCESS,
        data
    }
}

export function getApprovedFriendsError(error) {
    return {
        type: GET_APPROVED_FRIENDS_ERROR,
        error
    }
}

export function getPendingFriendsRequest(username) {
    return {
        type: GET_PENDING_FRIENDS_REQUEST,
        username
    }
}

export function getPendingFriendsSuccess(data) {
    return {
        type: GET_PENDING_FRIENDS_SUCCESS,
        data
    }
}

export function getPendingFriendsError(error) {
    return {
        type: GET_PENDING_FRIENDS_ERROR,
        error
    }
}

export function sendFriendRequestRequest(requestData) {
    return {
        type: SEND_FRIEND_REQUEST_REQUEST,
        requestData
    }
}

export function sendFriendRequestSuccess(data) {
    return {
        type: SEND_FRIEND_REQUEST_SUCCESS,
        data
    }
}

export function sendFriendRequestError(error) {
    return {
        type: SEND_FRIEND_REQUEST_ERROR,
        error
    }
}

export function cancelFriendRequestRequest(friendshipId) {
    return {
        type: CANCEL_FRIEND_REQUEST_REQUEST,
        friendshipId
    }
}

export function cancelFriendRequestSuccess(data) {
    return {
        type: CANCEL_FRIEND_REQUEST_SUCCESS,
        data
    }
}

export function cancelFriendRequestError(error) {
    return {
        type: CANCEL_FRIEND_REQUEST_ERROR,
        error
    }
}

export function acceptFriendRequestRequest(friendshipId) {
    return {
        type: ACCEPT_FRIEND_REQUEST_REQUEST,
        friendshipId
    }
}

export function acceptFriendRequestSuccess(data) {
    return {
        type: ACCEPT_FRIEND_REQUEST_SUCCESS,
        data
    }
}

export function acceptFriendRequestError(error) {
    return {
        type: ACCEPT_FRIEND_REQUEST_ERROR,
        error
    }
}

export function setUserFriendRequestsCount(count) {
    return {
        type: SET_USER_FRIEND_REQUESTS_COUNT,
        count,
    }
}