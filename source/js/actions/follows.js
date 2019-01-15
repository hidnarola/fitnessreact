export const START_FOLLOWING_REQUEST = 'START_FOLLOWING_REQUEST';
export const START_FOLLOWING_SUCCESS = 'START_FOLLOWING_SUCCESS';
export const START_FOLLOWING_ERROR = 'START_FOLLOWING_ERROR';

export const STOP_FOLLOWING_REQUEST = 'STOP_FOLLOWING_REQUEST';
export const STOP_FOLLOWING_SUCCESS = 'STOP_FOLLOWING_SUCCESS';
export const STOP_FOLLOWING_ERROR = 'STOP_FOLLOWING_ERROR';

export function startFollowingRequest(requestData) {
    return {
        type: START_FOLLOWING_REQUEST,
        requestData
    }
}

export function startFollowingSuccess(data) {
    return {
        type: START_FOLLOWING_SUCCESS,
        data
    }
}

export function startFollowingError(error) {
    return {
        type: START_FOLLOWING_ERROR,
        error
    }
}

export function stopFollowingRequest(requestData) {
    return {
        type: STOP_FOLLOWING_REQUEST,
        requestData
    }
}

export function stopFollowingSuccess(data) {
    return {
        type: STOP_FOLLOWING_SUCCESS,
        data
    }
}

export function stopFollowingError(error) {
    return {
        type: STOP_FOLLOWING_ERROR,
        error
    }
}