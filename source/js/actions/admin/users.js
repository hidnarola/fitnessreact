export const USERS_LIST_REQUEST = 'USERS_LIST_REQUEST';
export const USERS_LIST_SUCCESS = 'USERS_LIST_SUCCESS';
export const USERS_LIST_ERROR = 'USERS_LIST_ERROR';

export const USERS_FILTER_REQUEST = 'USERS_FILTER_REQUEST';
export const USERS_FILTER_SUCCESS = 'USERS_FILTER_SUCCESS';
export const USERS_FILTER_ERROR = 'USERS_FILTER_ERROR';

export const USERS_SELECT_ONE_REQUEST = 'USERS_SELECT_ONE_REQUEST';
export const USERS_SELECT_ONE_SUCCESS = 'USERS_SELECT_ONE_SUCCESS';
export const USERS_SELECT_ONE_ERROR = 'USERS_SELECT_ONE_ERROR';

export const USERS_UPDATE_REQUEST = 'USERS_UPDATE_REQUEST';
export const USERS_UPDATE_SUCCESS = 'USERS_UPDATE_SUCCESS';
export const USERS_UPDATE_ERROR = 'USERS_UPDATE_ERROR';

export const USERS_DELETE_REQUEST = 'USERS_DELETE_REQUEST';
export const USERS_DELETE_SUCCESS = 'USERS_DELETE_SUCCESS';
export const USERS_DELETE_ERROR = 'USERS_DELETE_ERROR';

export function userListRequest() {
    return {
        type: USERS_LIST_REQUEST,
    }
}

export function userListSuccess(data) {
    return {
        type: USERS_LIST_SUCCESS,
        data
    }
}

export function userListError(error) {
    return {
        type: USERS_LIST_ERROR,
        error
    }
}

export function userFilterRequest(filterData) {
    return {
        type: USERS_FILTER_REQUEST,
        filterData
    }
}

export function userFilterSuccess(data) {
    return {
        type: USERS_FILTER_SUCCESS,
        data
    }
}

export function userFilterError(error) {
    return {
        type: USERS_FILTER_ERROR,
        error
    }
}

export function userSelectOneRequest(_id) {
    return {
        type: USERS_SELECT_ONE_REQUEST,
        _id
    }
}

export function userSelectOneSuccess(data) {
    return {
        type: USERS_SELECT_ONE_SUCCESS,
        data
    }
}

export function userSelectOneError(error) {
    return {
        type: USERS_SELECT_ONE_ERROR,
        error
    }
}

export function userUpdateRequest(_id, userData) {
    return {
        type: USERS_UPDATE_REQUEST,
        _id,
        userData
    }
}

export function userUpdateSuccess(data) {
    return {
        type: USERS_UPDATE_SUCCESS,
        data
    }
}

export function userUpdateError(error) {
    return {
        type: USERS_UPDATE_ERROR,
        error
    }
}

export function userDeleteRequest(_id) {
    return {
        type: USERS_DELETE_REQUEST,
        _id
    }
}

export function userDeleteSuccess(data) {
    return {
        type: USERS_DELETE_SUCCESS,
        data
    }
}

export function userDeleteError(error) {
    return {
        type: USERS_DELETE_ERROR,
        error
    }
}