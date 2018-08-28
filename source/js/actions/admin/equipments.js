export const EQUIPMENTS_LIST_REQUEST = 'EQUIPMENTS_LIST_REQUEST';
export const EQUIPMENTS_LIST_SUCCESS = 'EQUIPMENTS_LIST_SUCCESS';
export const EQUIPMENTS_LIST_ERROR = 'EQUIPMENTS_LIST_ERROR';

export const FILTER_EQUIPMENTS_REQUEST = 'FILTER_EQUIPMENTS_REQUEST';
export const FILTER_EQUIPMENTS_SUCCESS = 'FILTER_EQUIPMENTS_SUCCESS';
export const FILTER_EQUIPMENTS_ERROR = 'FILTER_EQUIPMENTS_ERROR';

export const EQUIPMENTS_SELECT_ONE_REQUEST = 'EQUIPMENTS_SELECT_ONE_REQUEST';
export const EQUIPMENTS_SELECT_ONE_SUCCESS = 'EQUIPMENTS_SELECT_ONE_SUCCESS';
export const EQUIPMENTS_SELECT_ONE_ERROR = 'EQUIPMENTS_SELECT_ONE_ERROR';

export const EQUIPMENTS_ADD_REQUEST = 'EQUIPMENTS_ADD_REQUEST';
export const EQUIPMENTS_ADD_SUCCESS = 'EQUIPMENTS_ADD_SUCCESS';
export const EQUIPMENTS_ADD_ERROR = 'EQUIPMENTS_ADD_ERROR';

export const EQUIPMENTS_UPDATE_REQUEST = 'EQUIPMENTS_UPDATE_REQUEST';
export const EQUIPMENTS_UPDATE_SUCCESS = 'EQUIPMENTS_UPDATE_SUCCESS';
export const EQUIPMENTS_UPDATE_ERROR = 'EQUIPMENTS_UPDATE_ERROR';

export const EQUIPMENTS_DELETE_REQUEST = 'EQUIPMENTS_DELETE_REQUEST';
export const EQUIPMENTS_DELETE_SUCCESS = 'EQUIPMENTS_DELETE_SUCCESS';
export const EQUIPMENTS_DELETE_ERROR = 'EQUIPMENTS_DELETE_ERROR';

export const EQUIPMENTS_RECOVER_REQUEST = 'EQUIPMENTS_RECOVER_REQUEST';
export const EQUIPMENTS_RECOVER_SUCCESS = 'EQUIPMENTS_RECOVER_SUCCESS';
export const EQUIPMENTS_RECOVER_ERROR = 'EQUIPMENTS_RECOVER_ERROR';

export function equipmentListRequest() {
    return {
        type: EQUIPMENTS_LIST_REQUEST,
    }
}

export function equipmentListSuccess(data) {
    return {
        type: EQUIPMENTS_LIST_SUCCESS,
        data
    }
}

export function equipmentListError(error) {
    return {
        type: EQUIPMENTS_LIST_ERROR,
        error
    }
}

export function filterEquipmentsRequest(filterData) {
    return {
        type: FILTER_EQUIPMENTS_REQUEST,
        filterData,
    }
}

export function filterEquipmentsSuccess(data) {
    return {
        type: FILTER_EQUIPMENTS_SUCCESS,
        data
    }
}

export function filterEquipmentsError(error) {
    return {
        type: FILTER_EQUIPMENTS_ERROR,
        error
    }
}

export function equipmentSelectOneRequest(_id) {
    return {
        type: EQUIPMENTS_SELECT_ONE_REQUEST,
        _id
    }
}

export function equipmentSelectOneSuccess(data) {
    return {
        type: EQUIPMENTS_SELECT_ONE_SUCCESS,
        data
    }
}

export function equipmentSelectOneError(error) {
    return {
        type: EQUIPMENTS_SELECT_ONE_ERROR,
        error
    }
}

export function equipmentAddRequest(equipmentData) {
    return {
        type: EQUIPMENTS_ADD_REQUEST,
        equipmentData
    }
}

export function equipmentAddSuccess(data) {
    return {
        type: EQUIPMENTS_ADD_SUCCESS,
        data
    }
}

export function equipmentAddError(error) {
    return {
        type: EQUIPMENTS_ADD_ERROR,
        error
    }
}

export function equipmentUpdateRequest(_id, equipmentData) {
    return {
        type: EQUIPMENTS_UPDATE_REQUEST,
        _id,
        equipmentData
    }
}

export function equipmentUpdateSuccess(data) {
    return {
        type: EQUIPMENTS_UPDATE_SUCCESS,
        data
    }
}

export function equipmentUpdateError(error) {
    return {
        type: EQUIPMENTS_UPDATE_ERROR,
        error
    }
}

export function equipmentDeleteRequest(_id) {
    return {
        type: EQUIPMENTS_DELETE_REQUEST,
        _id
    }
}

export function equipmentDeleteSuccess(data) {
    return {
        type: EQUIPMENTS_DELETE_SUCCESS,
        data
    }
}

export function equipmentDeleteError(error) {
    return {
        type: EQUIPMENTS_DELETE_ERROR,
        error
    }
}

export function equipmentRecoverRequest(_id) {
    return {
        type: EQUIPMENTS_RECOVER_REQUEST,
        _id
    }
}

export function equipmentRecoverSuccess(data) {
    return {
        type: EQUIPMENTS_RECOVER_SUCCESS,
        data
    }
}

export function equipmentRecoverError(error) {
    return {
        type: EQUIPMENTS_RECOVER_ERROR,
        error
    }
}