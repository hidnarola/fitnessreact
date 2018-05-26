export const GET_USER_TIMELINE_REQUEST = 'GET_USER_TIMELINE_REQUEST';
export const GET_USER_TIMELINE_SUCCESS = 'GET_USER_TIMELINE_SUCCESS';
export const GET_USER_TIMELINE_ERROR = 'GET_USER_TIMELINE_ERROR';

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