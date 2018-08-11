export const GET_USER_BADGES_REQUEST = 'GET_USER_BADGES_REQUEST';
export const GET_USER_BADGES_SUCCESS = 'GET_USER_BADGES_SUCCESS';
export const GET_USER_BADGES_ERROR = 'GET_USER_BADGES_ERRPR';

export function getUserBadgesRequest(badgeType) {
    return {
        type: GET_USER_BADGES_REQUEST,
        badgeType,
    }
}

export function getUserBadgesSuccess(data) {
    return {
        type: GET_USER_BADGES_SUCCESS,
        data,
    }
}

export function getUserBadgesError(error) {
    return {
        type: GET_USER_BADGES_ERROR,
        error,
    }
}