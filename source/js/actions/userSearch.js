export const GET_USER_SEARCH_REQUEST = 'GET_USER_SEARCH_REQUEST';
export const GET_USER_SEARCH_SUCCESS = 'GET_USER_SEARCH_SUCCESS';
export const GET_USER_SEARCH_ERROR = 'GET_USER_SEARCH_ERROR';

export function getUserSearchRequest(requestData) {
    return {
        type: GET_USER_SEARCH_REQUEST,
        requestData,
    }
}

export function getUserSearchSuccess(data) {
    return {
        type: GET_USER_SEARCH_SUCCESS,
        data
    }
}

export function getUserSearchError(error) {
    return {
        type: GET_USER_SEARCH_ERROR,
        error
    }
}