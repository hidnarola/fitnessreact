export const GET_USER_SEARCH_REQUEST = 'GET_USER_SEARCH_REQUEST';
export const GET_USER_SEARCH_SUCCESS = 'GET_USER_SEARCH_SUCCESS';
export const GET_USER_SEARCH_ERROR = 'GET_USER_SEARCH_ERROR';

export const GET_USERS_PAGE_SEARCH_REQUEST = 'GET_USERS_PAGE_SEARCH_REQUEST';
export const GET_USERS_PAGE_SEARCH_SUCCESS = 'GET_USERS_PAGE_SEARCH_SUCCESS';
export const GET_USERS_PAGE_SEARCH_ERROR = 'GET_USERS_PAGE_SEARCH_ERROR';

export const RESET_USER_SEARCH = 'RESET_USER_SEARCH';

export const HANDLE_CHANGE_USER_SEARCH_FOR = 'HANDLE_CHANGE_USER_SEARCH_FOR';

export const SET_USER_SEARCH_STATE = 'SET_USER_SEARCH_STATE';

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

export function getUsersPageSearchRequest(requestData) {
    return {
        type: GET_USERS_PAGE_SEARCH_REQUEST,
        requestData,
    }
}

export function getUsersPageSearchSuccess(data) {
    return {
        type: GET_USERS_PAGE_SEARCH_SUCCESS,
        data
    }
}

export function getUsersPageSearchError(error) {
    return {
        type: GET_USERS_PAGE_SEARCH_ERROR,
        error
    }
}

export function resetUserSearch(resetState) {
    return {
        type: RESET_USER_SEARCH,
        resetState,
    }
}

export function handleChangeUserSearchFor(name, value) {
    return {
        type: HANDLE_CHANGE_USER_SEARCH_FOR,
        name,
        value,
    }
}

export function setUserSearchState(data) {
    return {
        type: SET_USER_SEARCH_STATE,
        data
    }
}

