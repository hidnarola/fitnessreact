export const GET_USER_BODYPARTS_REQUEST = 'GET_USER_BODYPARTS_REQUEST';
export const GET_USER_BODYPARTS_SUCCESS = 'GET_USER_BODYPARTS_SUCCESS';
export const GET_USER_BODYPARTS_ERROR = 'GET_USER_BODYPARTS_ERROR';

export function getUserBodypartsRequest() {
    return {
        type: GET_USER_BODYPARTS_REQUEST,
    }
}

export function getUserBodypartsSuccess(data) {
    return {
        type: GET_USER_BODYPARTS_SUCCESS,
        data
    }
}

export function getUserBodypartsError(error) {
    return {
        type: GET_USER_BODYPARTS_ERROR,
        error
    }
}