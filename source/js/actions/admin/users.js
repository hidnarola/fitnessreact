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

export const USERS_BLOCK_REQUEST = 'USERS_BLOCK_REQUEST';
export const USERS_BLOCK_SUCCESS = 'USERS_BLOCK_SUCCESS';
export const USERS_BLOCK_ERROR = 'USERS_BLOCK_ERROR';

export const USERS_UNBLOCK_REQUEST = 'USERS_UNBLOCK_REQUEST';
export const USERS_UNBLOCK_SUCCESS = 'USERS_UNBLOCK_SUCCESS';
export const USERS_UNBLOCK_ERROR = 'USERS_UNBLOCK_ERROR';

export const SET_USERS_STATE = 'SET_USERS_STATE';
export const RESET_USERS_STATE = 'RESET_USERS_STATE';

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

export function userBlockRequest(requestData) {
    return {
        type: USERS_BLOCK_REQUEST,
        requestData
    }
}

export function userBlockSuccess(data) {
    return {
        type: USERS_BLOCK_SUCCESS,
        data
    }
}

export function userBlockError(error) {
    return {
        type: USERS_BLOCK_ERROR,
        error
    }
}

export function userUnblockRequest(requestData) {
    return {
        type: USERS_UNBLOCK_REQUEST,
        requestData
    }
}

export function userUnblockSuccess(data) {
    return {
        type: USERS_UNBLOCK_SUCCESS,
        data
    }
}

export function userUnblockError(error) {
    return {
        type: USERS_UNBLOCK_ERROR,
        error
    }
}

export function setUserState(stateData) {
    return {
        type: SET_USERS_STATE,
        stateData,
    }
}

export function resetUserState() {
    return {
        type: RESET_USERS_STATE,
    }
}