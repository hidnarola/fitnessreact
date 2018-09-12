export const GET_USER_TIMELINE_REQUEST = 'GET_USER_TIMELINE_REQUEST';
export const GET_USER_TIMELINE_SUCCESS = 'GET_USER_TIMELINE_SUCCESS';
export const GET_USER_TIMELINE_ERROR = 'GET_USER_TIMELINE_ERROR';

export const GET_USER_SINGLE_TIMELINE_REQUEST = 'GET_USER_SINGLE_TIMELINE_REQUEST';
export const GET_USER_SINGLE_TIMELINE_SUCCESS = 'GET_USER_SINGLE_TIMELINE_SUCCESS';
export const GET_USER_SINGLE_TIMELINE_ERROR = 'GET_USER_SINGLE_TIMELINE_ERROR';

export const ADD_POST_ON_USER_TIMELINE_REQUEST = 'ADD_POST_ON_USER_TIMELINE_REQUEST';
export const ADD_POST_ON_USER_TIMELINE_SUCCESS = 'ADD_POST_ON_USER_TIMELINE_SUCCESS';
export const ADD_POST_ON_USER_TIMELINE_ERROR = 'ADD_POST_ON_USER_TIMELINE_ERROR';

export const GET_PRIVACY_OF_TIMELINE_USER_REQUEST = 'GET_PRIVACY_OF_TIMELINE_USER_REQUEST';
export const GET_PRIVACY_OF_TIMELINE_USER_SUCCESS = 'GET_PRIVACY_OF_TIMELINE_USER_SUCCESS';
export const GET_PRIVACY_OF_TIMELINE_USER_ERROR = 'GET_PRIVACY_OF_TIMELINE_USER_ERROR';

export function getUserTimelineRequest(username, start, offset) {
    return {
        type: GET_USER_TIMELINE_REQUEST,
        username,
        start,
        offset,
    }
}

export function getUserTimelineSuccess(data) {
    return {
        type: GET_USER_TIMELINE_SUCCESS,
        data
    }
}

export function getUserTimelineError(error) {
    return {
        type: GET_USER_TIMELINE_ERROR,
        error
    }
}

export function getUserSingleTimelineRequest(postId) {
    return {
        type: GET_USER_SINGLE_TIMELINE_REQUEST,
        postId,
    }
}

export function getUserSingleTimelineSuccess(data) {
    return {
        type: GET_USER_SINGLE_TIMELINE_SUCCESS,
        data
    }
}

export function getUserSingleTimelineError(error) {
    return {
        type: GET_USER_SINGLE_TIMELINE_ERROR,
        error
    }
}

export function addPostOnUserTimelineRequest(formData) {
    return {
        type: ADD_POST_ON_USER_TIMELINE_REQUEST,
        formData,
    }
}

export function addPostOnUserTimelineSuccess(data) {
    return {
        type: ADD_POST_ON_USER_TIMELINE_SUCCESS,
        data
    }
}

export function addPostOnUserTimelineError(error) {
    return {
        type: ADD_POST_ON_USER_TIMELINE_ERROR,
        error
    }
}

export function getPrivacyOfTimelineUserRequest(username) {
    return {
        type: GET_PRIVACY_OF_TIMELINE_USER_REQUEST,
        username,
    }
}

export function getPrivacyOfTimelineUserSuccess(data) {
    return {
        type: GET_PRIVACY_OF_TIMELINE_USER_SUCCESS,
        data
    }
}

export function getPrivacyOfTimelineUserError(error) {
    return {
        type: GET_PRIVACY_OF_TIMELINE_USER_ERROR,
        error
    }
}