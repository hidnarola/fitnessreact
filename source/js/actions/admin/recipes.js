export const RECIPES_LIST_REQUEST = 'RECIPES_LIST_REQUEST';
export const RECIPES_LIST_SUCCESS = 'RECIPES_LIST_SUCCESS';
export const RECIPES_LIST_ERROR = 'RECIPES_LIST_ERROR';

export const RECIPES_FILTER_REQUEST = 'RECIPES_FILTER_REQUEST';
export const RECIPES_FILTER_SUCCESS = 'RECIPES_FILTER_SUCCESS';
export const RECIPES_FILTER_ERROR = 'RECIPES_FILTER_ERROR';

export const RECIPES_SELECT_ONE_REQUEST = 'RECIPES_SELECT_ONE_REQUEST';
export const RECIPES_SELECT_ONE_SUCCESS = 'RECIPES_SELECT_ONE_SUCCESS';
export const RECIPES_SELECT_ONE_ERROR = 'RECIPES_SELECT_ONE_ERROR';

export const RECIPES_ADD_REQUEST = 'RECIPES_ADD_REQUEST';
export const RECIPES_ADD_SUCCESS = 'RECIPES_ADD_SUCCESS';
export const RECIPES_ADD_ERROR = 'RECIPES_ADD_ERROR';

export const RECIPES_UPDATE_REQUEST = 'RECIPES_UPDATE_REQUEST';
export const RECIPES_UPDATE_SUCCESS = 'RECIPES_UPDATE_SUCCESS';
export const RECIPES_UPDATE_ERROR = 'RECIPES_UPDATE_ERROR';

export const RECIPES_DELETE_REQUEST = 'RECIPES_DELETE_REQUEST';
export const RECIPES_DELETE_SUCCESS = 'RECIPES_DELETE_SUCCESS';
export const RECIPES_DELETE_ERROR = 'RECIPES_DELETE_ERROR';

export function recipeListRequest() {
    return {
        type: RECIPES_LIST_REQUEST,
    }
}

export function recipeListSuccess(data) {
    return {
        type: RECIPES_LIST_SUCCESS,
        data
    }
}

export function recipeListError(error) {
    return {
        type: RECIPES_LIST_ERROR,
        error
    }
}

export function recipeFilterRequest(filterData) {
    return {
        type: RECIPES_FILTER_REQUEST,
        filterData
    }
}

export function recipeFilterSuccess(data) {
    return {
        type: RECIPES_FILTER_SUCCESS,
        data
    }
}

export function recipeFilterError(error) {
    return {
        type: RECIPES_FILTER_ERROR,
        error
    }
}

export function recipeSelectOneRequest(_id) {
    return {
        type: RECIPES_SELECT_ONE_REQUEST,
        _id
    }
}

export function recipeSelectOneSuccess(data) {
    return {
        type: RECIPES_SELECT_ONE_SUCCESS,
        data
    }
}

export function recipeSelectOneError(error) {
    return {
        type: RECIPES_SELECT_ONE_ERROR,
        error
    }
}

export function recipeAddRequest(recipeData) {
    return {
        type: RECIPES_ADD_REQUEST,
        recipeData
    }
}

export function recipeAddSuccess(data) {
    return {
        type: RECIPES_ADD_SUCCESS,
        data
    }
}

export function recipeAddError(error) {
    return {
        type: RECIPES_ADD_ERROR,
        error
    }
}

export function recipeUpdateRequest(_id, recipeData) {
    return {
        type: RECIPES_UPDATE_REQUEST,
        _id,
        recipeData
    }
}

export function recipeUpdateSuccess(data) {
    return {
        type: RECIPES_UPDATE_SUCCESS,
        data
    }
}

export function recipeUpdateError(error) {
    return {
        type: RECIPES_UPDATE_ERROR,
        error
    }
}

export function recipeDeleteRequest(_id) {
    return {
        type: RECIPES_DELETE_REQUEST,
        _id
    }
}

export function recipeDeleteSuccess(data) {
    return {
        type: RECIPES_DELETE_SUCCESS,
        data
    }
}

export function recipeDeleteError(error) {
    return {
        type: RECIPES_DELETE_ERROR,
        error
    }
}