export const EQUIPMENT_CATEGORIES_LIST_REQUEST = 'EQUIPMENT_CATEGORIES_LIST_REQUEST';
export const EQUIPMENT_CATEGORIES_LIST_SUCCESS = 'EQUIPMENT_CATEGORIES_LIST_SUCCESS';
export const EQUIPMENT_CATEGORIES_LIST_ERROR = 'EQUIPMENT_CATEGORIES_LIST_ERROR';

export const FILTER_EQUIPMENT_CATEGORIES_REQUEST = 'FILTER_EQUIPMENT_CATEGORIES_REQUEST';
export const FILTER_EQUIPMENT_CATEGORIES_SUCCESS = 'FILTER_EQUIPMENT_CATEGORIES_SUCCESS';
export const FILTER_EQUIPMENT_CATEGORIES_ERROR = 'FILTER_EQUIPMENT_CATEGORIES_ERROR';

export const EQUIPMENT_CATEGORIES_SELECT_ONE_REQUEST = 'EQUIPMENT_CATEGORIES_SELECT_ONE_REQUEST';
export const EQUIPMENT_CATEGORIES_SELECT_ONE_SUCCESS = 'EQUIPMENT_CATEGORIES_SELECT_ONE_SUCCESS';
export const EQUIPMENT_CATEGORIES_SELECT_ONE_ERROR = 'EQUIPMENT_CATEGORIES_SELECT_ONE_ERROR';

export const EQUIPMENT_CATEGORIES_ADD_REQUEST = 'EQUIPMENT_CATEGORIES_ADD_REQUEST';
export const EQUIPMENT_CATEGORIES_ADD_SUCCESS = 'EQUIPMENT_CATEGORIES_ADD_SUCCESS';
export const EQUIPMENT_CATEGORIES_ADD_ERROR = 'EQUIPMENT_CATEGORIES_ADD_ERROR';

export const EQUIPMENT_CATEGORIES_UPDATE_REQUEST = 'EQUIPMENT_CATEGORIES_UPDATE_REQUEST';
export const EQUIPMENT_CATEGORIES_UPDATE_SUCCESS = 'EQUIPMENT_CATEGORIES_UPDATE_SUCCESS';
export const EQUIPMENT_CATEGORIES_UPDATE_ERROR = 'EQUIPMENT_CATEGORIES_UPDATE_ERROR';

export const EQUIPMENT_CATEGORIES_DELETE_REQUEST = 'EQUIPMENT_CATEGORIES_DELETE_REQUEST';
export const EQUIPMENT_CATEGORIES_DELETE_SUCCESS = 'EQUIPMENT_CATEGORIES_DELETE_SUCCESS';
export const EQUIPMENT_CATEGORIES_DELETE_ERROR = 'EQUIPMENT_CATEGORIES_DELETE_ERROR';

export const SET_EQUIPMENT_CATEGORIES_STATE = 'SET_EQUIPMENT_CATEGORIES_STATE';

export function equipmentCategoryListRequest() {
    return {
        type: EQUIPMENT_CATEGORIES_LIST_REQUEST,
    }
}

export function equipmentCategoryListSuccess(data) {
    return {
        type: EQUIPMENT_CATEGORIES_LIST_SUCCESS,
        data
    }
}

export function equipmentCategoryListError(error) {
    return {
        type: EQUIPMENT_CATEGORIES_LIST_ERROR,
        error
    }
}

export function filterEquipmentCategoriesRequest(filterData) {
    return {
        type: FILTER_EQUIPMENT_CATEGORIES_REQUEST,
        filterData
    }
}

export function filterEquipmentCategoriesSuccess(data) {
    return {
        type: FILTER_EQUIPMENT_CATEGORIES_SUCCESS,
        data
    }
}

export function filterEquipmentCategoriesError(error) {
    return {
        type: FILTER_EQUIPMENT_CATEGORIES_ERROR,
        error
    }
}

export function equipmentCategorySelectOneRequest(_id) {
    return {
        type: EQUIPMENT_CATEGORIES_SELECT_ONE_REQUEST,
        _id
    }
}

export function equipmentCategorySelectOneSuccess(data) {
    return {
        type: EQUIPMENT_CATEGORIES_SELECT_ONE_SUCCESS,
        data
    }
}

export function equipmentCategorySelectOneError(error) {
    return {
        type: EQUIPMENT_CATEGORIES_SELECT_ONE_ERROR,
        error
    }
}

export function equipmentCategoryAddRequest(requestData) {
    return {
        type: EQUIPMENT_CATEGORIES_ADD_REQUEST,
        requestData
    }
}

export function equipmentCategoryAddSuccess(data) {
    return {
        type: EQUIPMENT_CATEGORIES_ADD_SUCCESS,
        data
    }
}

export function equipmentCategoryAddError(error) {
    return {
        type: EQUIPMENT_CATEGORIES_ADD_ERROR,
        error
    }
}

export function equipmentCategoryUpdateRequest(_id, requestData) {
    return {
        type: EQUIPMENT_CATEGORIES_UPDATE_REQUEST,
        _id,
        requestData
    }
}

export function equipmentCategoryUpdateSuccess(data) {
    return {
        type: EQUIPMENT_CATEGORIES_UPDATE_SUCCESS,
        data
    }
}

export function equipmentCategoryUpdateError(error) {
    return {
        type: EQUIPMENT_CATEGORIES_UPDATE_ERROR,
        error
    }
}

export function equipmentCategoryDeleteRequest(_id) {
    return {
        type: EQUIPMENT_CATEGORIES_DELETE_REQUEST,
        _id
    }
}

export function equipmentCategoryDeleteSuccess(data) {
    return {
        type: EQUIPMENT_CATEGORIES_DELETE_SUCCESS,
        data
    }
}

export function equipmentCategoryDeleteError(error) {
    return {
        type: EQUIPMENT_CATEGORIES_DELETE_ERROR,
        error
    }
}

export function setEquipmentCategoriesState(stateData = {}) {
    return {
        type: SET_EQUIPMENT_CATEGORIES_STATE,
        stateData
    }
}