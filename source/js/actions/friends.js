export const GET_APPROVED_FRIENDS_REQUEST = 'GET_APPROVED_FRIENDS_REQUEST';
export const GET_APPROVED_FRIENDS_SUCCESS = 'GET_APPROVED_FRIENDS_SUCCESS';
export const GET_APPROVED_FRIENDS_ERROR = 'GET_APPROVED_FRIENDS_ERROR';

export const GET_PENDING_FRIENDS_REQUEST = 'GET_PENDING_FRIENDS_REQUEST';
export const GET_PENDING_FRIENDS_SUCCESS = 'GET_PENDING_FRIENDS_SUCCESS';
export const GET_PENDING_FRIENDS_ERROR = 'GET_PENDING_FRIENDS_ERROR';

export function getApprovedFriendsRequest() {
    return {
        type: GET_APPROVED_FRIENDS_REQUEST,
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

export function getPendingFriendsRequest() {
    return {
        type: GET_PENDING_FRIENDS_REQUEST,
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