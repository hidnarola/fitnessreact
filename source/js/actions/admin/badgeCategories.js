export const BADGE_CATEGORIES_LIST_REQUEST = 'BADGE_CATEGORIES_LIST_REQUEST';
export const BADGE_CATEGORIES_LIST_SUCCESS = 'BADGE_CATEGORIES_LIST_SUCCESS';
export const BADGE_CATEGORIES_LIST_ERROR = 'BADGE_CATEGORIES_LIST_ERROR';

export const BADGE_CATEGORIES_FILTER_REQUEST = 'BADGE_CATEGORIES_FILTER_REQUEST';
export const BADGE_CATEGORIES_FILTER_SUCCESS = 'BADGE_CATEGORIES_FILTER_SUCCESS';
export const BADGE_CATEGORIES_FILTER_ERROR = 'BADGE_CATEGORIES_FILTER_ERROR';

export const BADGE_CATEGORIES_SELECT_ONE_REQUEST = 'BADGE_CATEGORIES_SELECT_ONE_REQUEST';
export const BADGE_CATEGORIES_SELECT_ONE_SUCCESS = 'BADGE_CATEGORIES_SELECT_ONE_SUCCESS';
export const BADGE_CATEGORIES_SELECT_ONE_ERROR = 'BADGE_CATEGORIES_SELECT_ONE_ERROR';

export const BADGE_CATEGORIES_ADD_REQUEST = 'BADGE_CATEGORIES_ADD_REQUEST';
export const BADGE_CATEGORIES_ADD_SUCCESS = 'BADGE_CATEGORIES_ADD_SUCCESS';
export const BADGE_CATEGORIES_ADD_ERROR = 'BADGE_CATEGORIES_ADD_ERROR';

export const BADGE_CATEGORIES_UPDATE_REQUEST = 'BADGE_CATEGORIES_UPDATE_REQUEST';
export const BADGE_CATEGORIES_UPDATE_SUCCESS = 'BADGE_CATEGORIES_UPDATE_SUCCESS';
export const BADGE_CATEGORIES_UPDATE_ERROR = 'BADGE_CATEGORIES_UPDATE_ERROR';

export const BADGE_CATEGORIES_DELETE_REQUEST = 'BADGE_CATEGORIES_DELETE_REQUEST';
export const BADGE_CATEGORIES_DELETE_SUCCESS = 'BADGE_CATEGORIES_DELETE_SUCCESS';
export const BADGE_CATEGORIES_DELETE_ERROR = 'BADGE_CATEGORIES_DELETE_ERROR';

export function badgeCategoryListRequest() {
    return {
        type: BADGE_CATEGORIES_LIST_REQUEST,
    }
}

export function badgeCategoryListSuccess(data) {
    return {
        type: BADGE_CATEGORIES_LIST_SUCCESS,
        data
    }
}

export function badgeCategoryListError(error) {
    return {
        type: BADGE_CATEGORIES_LIST_ERROR,
        error
    }
}

export function badgeCategoryFilterRequest(filterData) {
    return {
        type: BADGE_CATEGORIES_FILTER_REQUEST,
        filterData
    }
}

export function badgeCategoryFilterSuccess(data) {
    return {
        type: BADGE_CATEGORIES_FILTER_SUCCESS,
        data
    }
}

export function badgeCategoryFilterError(error) {
    return {
        type: BADGE_CATEGORIES_FILTER_ERROR,
        error
    }
}

export function badgeCategorySelectOneRequest(_id) {
    return {
        type: BADGE_CATEGORIES_SELECT_ONE_REQUEST,
        _id
    }
}

export function badgeCategorySelectOneSuccess(data) {
    return {
        type: BADGE_CATEGORIES_SELECT_ONE_SUCCESS,
        data
    }
}

export function badgeCategorySelectOneError(error) {
    return {
        type: BADGE_CATEGORIES_SELECT_ONE_ERROR,
        error
    }
}

export function badgeCategoryAddRequest(badgeCategoryData) {
    return {
        type: BADGE_CATEGORIES_ADD_REQUEST,
        badgeCategoryData
    }
}

export function badgeCategoryAddSuccess(data) {
    return {
        type: BADGE_CATEGORIES_ADD_SUCCESS,
        data
    }
}

export function badgeCategoryAddError(error) {
    return {
        type: BADGE_CATEGORIES_ADD_ERROR,
        error
    }
}

export function badgeCategoryUpdateRequest(_id, badgeCategoryData) {
    return {
        type: BADGE_CATEGORIES_UPDATE_REQUEST,
        _id,
        badgeCategoryData
    }
}

export function badgeCategoryUpdateSuccess(data) {
    return {
        type: BADGE_CATEGORIES_UPDATE_SUCCESS,
        data
    }
}

export function badgeCategoryUpdateError(error) {
    return {
        type: BADGE_CATEGORIES_UPDATE_ERROR,
        error
    }
}

export function badgeCategoryDeleteRequest(_id) {
    return {
        type: BADGE_CATEGORIES_DELETE_REQUEST,
        _id
    }
}

export function badgeCategoryDeleteSuccess(data) {
    return {
        type: BADGE_CATEGORIES_DELETE_SUCCESS,
        data
    }
}

export function badgeCategoryDeleteError(error) {
    return {
        type: BADGE_CATEGORIES_DELETE_ERROR,
        error
    }
}