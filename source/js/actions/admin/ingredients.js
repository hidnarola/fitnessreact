export const INGREDIENTS_LIST_REQUEST = 'INGREDIENTS_LIST_REQUEST';
export const INGREDIENTS_LIST_SUCCESS = 'INGREDIENTS_LIST_SUCCESS';
export const INGREDIENTS_LIST_ERROR = 'INGREDIENTS_LIST_ERROR';

export const INGREDIENTS_FILTER_REQUEST = 'INGREDIENTS_FILTER_REQUEST';
export const INGREDIENTS_FILTER_SUCCESS = 'INGREDIENTS_FILTER_SUCCESS';
export const INGREDIENTS_FILTER_ERROR = 'INGREDIENTS_FILTER_ERROR';

export const INGREDIENTS_SELECT_ONE_REQUEST = 'INGREDIENTS_SELECT_ONE_REQUEST';
export const INGREDIENTS_SELECT_ONE_SUCCESS = 'INGREDIENTS_SELECT_ONE_SUCCESS';
export const INGREDIENTS_SELECT_ONE_ERROR = 'INGREDIENTS_SELECT_ONE_ERROR';

export const INGREDIENTS_ADD_REQUEST = 'INGREDIENTS_ADD_REQUEST';
export const INGREDIENTS_ADD_SUCCESS = 'INGREDIENTS_ADD_SUCCESS';
export const INGREDIENTS_ADD_ERROR = 'INGREDIENTS_ADD_ERROR';

export const INGREDIENTS_UPDATE_REQUEST = 'INGREDIENTS_UPDATE_REQUEST';
export const INGREDIENTS_UPDATE_SUCCESS = 'INGREDIENTS_UPDATE_SUCCESS';
export const INGREDIENTS_UPDATE_ERROR = 'INGREDIENTS_UPDATE_ERROR';

export const INGREDIENTS_DELETE_REQUEST = 'INGREDIENTS_DELETE_REQUEST';
export const INGREDIENTS_DELETE_SUCCESS = 'INGREDIENTS_DELETE_SUCCESS';
export const INGREDIENTS_DELETE_ERROR = 'INGREDIENTS_DELETE_ERROR';

export function ingredientListRequest() {
    return {
        type: INGREDIENTS_LIST_REQUEST,
    }
}

export function ingredientListSuccess(data) {
    return {
        type: INGREDIENTS_LIST_SUCCESS,
        data
    }
}

export function ingredientListError(error) {
    return {
        type: INGREDIENTS_LIST_ERROR,
        error
    }
}

export function ingredientFilterRequest(filterData) {
    return {
        type: INGREDIENTS_FILTER_REQUEST,
        filterData
    }
}

export function ingredientFilterSuccess(data) {
    return {
        type: INGREDIENTS_FILTER_SUCCESS,
        data
    }
}

export function ingredientFilterError(error) {
    return {
        type: INGREDIENTS_FILTER_ERROR,
        error
    }
}

export function ingredientSelectOneRequest(_id) {
    return {
        type: INGREDIENTS_SELECT_ONE_REQUEST,
        _id
    }
}

export function ingredientSelectOneSuccess(data) {
    return {
        type: INGREDIENTS_SELECT_ONE_SUCCESS,
        data
    }
}

export function ingredientSelectOneError(error) {
    return {
        type: INGREDIENTS_SELECT_ONE_ERROR,
        error
    }
}

export function ingredientAddRequest(ingredientData) {
    return {
        type: INGREDIENTS_ADD_REQUEST,
        ingredientData
    }
}

export function ingredientAddSuccess(data) {
    return {
        type: INGREDIENTS_ADD_SUCCESS,
        data
    }
}

export function ingredientAddError(error) {
    return {
        type: INGREDIENTS_ADD_ERROR,
        error
    }
}

export function ingredientUpdateRequest(_id, ingredientData) {
    return {
        type: INGREDIENTS_UPDATE_REQUEST,
        _id,
        ingredientData
    }
}

export function ingredientUpdateSuccess(data) {
    return {
        type: INGREDIENTS_UPDATE_SUCCESS,
        data
    }
}

export function ingredientUpdateError(error) {
    return {
        type: INGREDIENTS_UPDATE_ERROR,
        error
    }
}

export function ingredientDeleteRequest(_id) {
    return {
        type: INGREDIENTS_DELETE_REQUEST,
        _id
    }
}

export function ingredientDeleteSuccess(data) {
    return {
        type: INGREDIENTS_DELETE_SUCCESS,
        data
    }
}

export function ingredientDeleteError(error) {
    return {
        type: INGREDIENTS_DELETE_ERROR,
        error
    }
}