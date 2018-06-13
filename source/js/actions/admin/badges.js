export const BADGES_LIST_REQUEST = 'BADGES_LIST_REQUEST';
export const BADGES_LIST_SUCCESS = 'BADGES_LIST_SUCCESS';
export const BADGES_LIST_ERROR = 'BADGES_LIST_ERROR';

export const BADGES_FILTER_REQUEST = 'BADGES_FILTER_REQUEST';
export const BADGES_FILTER_SUCCESS = 'BADGES_FILTER_SUCCESS';
export const BADGES_FILTER_ERROR = 'BADGES_FILTER_ERROR';

export const BADGES_SELECT_ONE_REQUEST = 'BADGES_SELECT_ONE_REQUEST';
export const BADGES_SELECT_ONE_SUCCESS = 'BADGES_SELECT_ONE_SUCCESS';
export const BADGES_SELECT_ONE_ERROR = 'BADGES_SELECT_ONE_ERROR';

export const BADGES_ADD_REQUEST = 'BADGES_ADD_REQUEST';
export const BADGES_ADD_SUCCESS = 'BADGES_ADD_SUCCESS';
export const BADGES_ADD_ERROR = 'BADGES_ADD_ERROR';

export const BADGES_UPDATE_REQUEST = 'BADGES_UPDATE_REQUEST';
export const BADGES_UPDATE_SUCCESS = 'BADGES_UPDATE_SUCCESS';
export const BADGES_UPDATE_ERROR = 'BADGES_UPDATE_ERROR';

export const BADGES_DELETE_REQUEST = 'BADGES_DELETE_REQUEST';
export const BADGES_DELETE_SUCCESS = 'BADGES_DELETE_SUCCESS';
export const BADGES_DELETE_ERROR = 'BADGES_DELETE_ERROR';

export const BADGES_RESET_DATA = 'BADGES_RESET_DATA';

export function badgeListRequest() {
    return {
        type: BADGES_LIST_REQUEST,
    }
}

export function badgeListSuccess(data) {
    return {
        type: BADGES_LIST_SUCCESS,
        data
    }
}

export function badgeListError(error) {
    return {
        type: BADGES_LIST_ERROR,
        error
    }
}

export function badgeFilterRequest(filterData) {
    return {
        type: BADGES_FILTER_REQUEST,
        filterData
    }
}

export function badgeFilterSuccess(data) {
    return {
        type: BADGES_FILTER_SUCCESS,
        data
    }
}

export function badgeFilterError(error) {
    return {
        type: BADGES_FILTER_ERROR,
        error
    }
}

export function badgeSelectOneRequest(_id) {
    return {
        type: BADGES_SELECT_ONE_REQUEST,
        _id
    }
}

export function badgeSelectOneSuccess(data) {
    return {
        type: BADGES_SELECT_ONE_SUCCESS,
        data
    }
}

export function badgeSelectOneError(error) {
    return {
        type: BADGES_SELECT_ONE_ERROR,
        error
    }
}

export function badgeAddRequest(requestData) {
    return {
        type: BADGES_ADD_REQUEST,
        requestData
    }
}

export function badgeAddSuccess(data) {
    return {
        type: BADGES_ADD_SUCCESS,
        data
    }
}

export function badgeAddError(error) {
    return {
        type: BADGES_ADD_ERROR,
        error
    }
}

export function badgeUpdateRequest(_id, requestData) {
    return {
        type: BADGES_UPDATE_REQUEST,
        _id,
        requestData
    }
}

export function badgeUpdateSuccess(data) {
    return {
        type: BADGES_UPDATE_SUCCESS,
        data
    }
}

export function badgeUpdateError(error) {
    return {
        type: BADGES_UPDATE_ERROR,
        error
    }
}

export function badgeDeleteRequest(_id) {
    return {
        type: BADGES_DELETE_REQUEST,
        _id
    }
}

export function badgeDeleteSuccess(data) {
    return {
        type: BADGES_DELETE_SUCCESS,
        data
    }
}

export function badgeDeleteError(error) {
    return {
        type: BADGES_DELETE_ERROR,
        error
    }
}

export function badgeRestData(resetState = null) {
    return {
        type: BADGES_RESET_DATA,
        resetState,
    }
}