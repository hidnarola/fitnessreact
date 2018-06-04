export const COMMENT_ON_POST_REQUEST = 'COMMENT_ON_POST_REQUEST';
export const COMMENT_ON_POST_SUCCESS = 'COMMENT_ON_POST_SUCCESS';
export const COMMENT_ON_POST_ERROR = 'COMMENT_ON_POST_ERROR';

export function commentOnPostRequest(requestData) {
    return {
        type: COMMENT_ON_POST_REQUEST,
        requestData
    }
}

export function commentOnPostSuccess(data) {
    return {
        type: COMMENT_ON_POST_SUCCESS,
        data
    }
}

export function commentOnPostError(error) {
    return {
        type: COMMENT_ON_POST_ERROR,
        error
    }
}