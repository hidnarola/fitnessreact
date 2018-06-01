export const TOGGLE_LIKE_ON_POST_REQUEST = 'TOGGLE_LIKE_ON_POST_REQUEST';
export const TOGGLE_LIKE_ON_POST_SUCCESS = 'TOGGLE_LIKE_ON_POST_SUCCESS';
export const TOGGLE_LIKE_ON_POST_ERROR = 'TOGGLE_LIKE_ON_POST_ERROR';

export function toggleLikeOnPostRequest(requestData) {
    return {
        type: TOGGLE_LIKE_ON_POST_REQUEST,
        requestData
    }
}

export function toggleLikeOnPostSuccess(data) {
    return {
        type: TOGGLE_LIKE_ON_POST_SUCCESS,
        data
    }
}

export function toggleLikeOnPostError(error) {
    return {
        type: TOGGLE_LIKE_ON_POST_ERROR,
        error
    }
}