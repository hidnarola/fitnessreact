export const EQUIPMENT_CATEGORIES_LIST_REQUEST = 'EQUIPMENT_CATEGORIES_LIST_REQUEST';
export const EQUIPMENT_CATEGORIES_LIST_SUCCESS = 'EQUIPMENT_CATEGORIES_LIST_SUCCESS';
export const EQUIPMENT_CATEGORIES_LIST_ERROR = 'EQUIPMENT_CATEGORIES_LIST_ERROR';

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