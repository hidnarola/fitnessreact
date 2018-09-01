export const GET_USER_STATS_REQUEST = 'GET_USER_STATS_REQUEST';
export const GET_USER_STATS_SUCCESS = 'GET_USER_STATS_SUCCESS';
export const GET_USER_STATS_ERROR = 'GET_USER_STATS_ERROR';

export const GET_USER_GRAPH_DATA_REQUEST = 'GET_USER_GRAPH_DATA_REQUEST';
export const GET_USER_GRAPH_DATA_SUCCESS = 'GET_USER_GRAPH_DATA_SUCCESS';
export const GET_USER_GRAPH_DATA_ERROR = 'GET_USER_GRAPH_DATA_ERROR';

export const GET_USER_SINGLE_STATS_REQUEST = 'GET_USER_SINGLE_STATS_REQUEST';
export const GET_USER_SINGLE_STATS_SUCCESS = 'GET_USER_SINGLE_STATS_SUCCESS';
export const GET_USER_SINGLE_STATS_ERROR = 'GET_USER_SINGLE_STATS_ERROR';

export const SET_USER_STATS_STATE = 'SET_USER_STATS_STATE';

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

export function getUserGraphDataRequest(requestData) {
    return {
        type: GET_USER_GRAPH_DATA_REQUEST,
        requestData,
    }
}

export function getUserGraphDataSuccess(data) {
    return {
        type: GET_USER_GRAPH_DATA_SUCCESS,
        data,
    }
}

export function getUserGraphDataError(error) {
    return {
        type: GET_USER_GRAPH_DATA_ERROR,
        error,
    }
}

export function getUserSingleStatsRequest(requestData) {
    return {
        type: GET_USER_SINGLE_STATS_REQUEST,
        requestData,
    }
}

export function getUserSingleStatsSuccess(data) {
    return {
        type: GET_USER_SINGLE_STATS_SUCCESS,
        data,
    }
}

export function getUserSingleStatsError(error) {
    return {
        type: GET_USER_SINGLE_STATS_ERROR,
        error,
    }
}

export function setUserStatsState(stateData) {
    return {
        type: SET_USER_STATS_STATE,
        stateData,
    }
}