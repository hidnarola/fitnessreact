export const BODY_PARTS_LIST_REQUEST = 'BODY_PARTS_LIST_REQUEST';
export const BODY_PARTS_LIST_SUCCESS = 'BODY_PARTS_LIST_SUCCESS';
export const BODY_PARTS_LIST_ERROR = 'BODY_PARTS_LIST_ERROR';

export const BODY_PARTS_SELECT_ONE_REQUEST = 'BODY_PARTS_SELECT_ONE_REQUEST';
export const BODY_PARTS_SELECT_ONE_SUCCESS = 'BODY_PARTS_SELECT_ONE_SUCCESS';
export const BODY_PARTS_SELECT_ONE_ERROR = 'BODY_PARTS_SELECT_ONE_ERROR';

export const BODY_PARTS_ADD_REQUEST = 'BODY_PARTS_ADD_REQUEST';
export const BODY_PARTS_ADD_SUCCESS = 'BODY_PARTS_ADD_SUCCESS';
export const BODY_PARTS_ADD_ERROR = 'BODY_PARTS_ADD_ERROR';

export const BODY_PARTS_UPDATE_REQUEST = 'BODY_PARTS_UPDATE_REQUEST';
export const BODY_PARTS_UPDATE_SUCCESS = 'BODY_PARTS_UPDATE_SUCCESS';
export const BODY_PARTS_UPDATE_ERROR = 'BODY_PARTS_UPDATE_ERROR';

export const BODY_PARTS_DELETE_REQUEST = 'BODY_PARTS_DELETE_REQUEST';
export const BODY_PARTS_DELETE_SUCCESS = 'BODY_PARTS_DELETE_SUCCESS';
export const BODY_PARTS_DELETE_ERROR = 'BODY_PARTS_DELETE_ERROR';

export function bodyPartListRequest() {
    return {
        type: BODY_PARTS_LIST_REQUEST,
    }
}

export function bodyPartListSuccess(data) {
    return {
        type: BODY_PARTS_LIST_SUCCESS,
        data
    }
}

export function bodyPartListError(error) {
    return {
        type: BODY_PARTS_LIST_ERROR,
        error
    }
}

export function bodyPartSelectOneRequest(_id) {
    return {
        type: BODY_PARTS_SELECT_ONE_REQUEST,
        _id
    }
}

export function bodyPartSelectOneSuccess(data) {
    return {
        type: BODY_PARTS_SELECT_ONE_SUCCESS,
        data
    }
}

export function bodyPartSelectOneError(error) {
    return {
        type: BODY_PARTS_SELECT_ONE_ERROR,
        error
    }
}

export function bodyPartAddRequest(bodyPartData) {
    return {
        type: BODY_PARTS_ADD_REQUEST,
        bodyPartData
    }
}

export function bodyPartAddSuccess(data) {
    return {
        type: BODY_PARTS_ADD_SUCCESS,
        data
    }
}

export function bodyPartAddError(error) {
    return {
        type: BODY_PARTS_ADD_ERROR,
        error
    }
}

export function bodyPartUpdateRequest(_id, bodyPartData) {
    return {
        type: BODY_PARTS_UPDATE_REQUEST,
        _id,
        bodyPartData
    }
}

export function bodyPartUpdateSuccess(data) {
    return {
        type: BODY_PARTS_UPDATE_SUCCESS,
        data
    }
}

export function bodyPartUpdateError(error) {
    return {
        type: BODY_PARTS_UPDATE_ERROR,
        error
    }
}

export function bodyPartDeleteRequest(_id) {
    return {
        type: BODY_PARTS_DELETE_REQUEST,
        _id
    }
}

export function bodyPartDeleteSuccess(data) {
    return {
        type: BODY_PARTS_DELETE_SUCCESS,
        data
    }
}

export function bodyPartDeleteError(error) {
    return {
        type: BODY_PARTS_DELETE_ERROR,
        error
    }
}