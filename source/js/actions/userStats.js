export const GET_USER_STATS_REQUEST = 'GET_USER_STATS_REQUEST';
export const GET_USER_STATS_SUCCESS = 'GET_USER_STATS_SUCCESS';
export const GET_USER_STATS_ERROR = 'GET_USER_STATS_ERROR';

export function getUserStatsRequest(requestData) {
    return {
        type: GET_USER_STATS_REQUEST,
        requestData,
    }
}

export function getUserStatsSuccess(data) {
    return {
        type: GET_USER_STATS_SUCCESS,
        data,
    }
}

export function getUserStatsError(error) {
    return {
        type: GET_USER_STATS_ERROR,
        error,
    }
}