export const EXERCISE_TYPES_LIST_REQUEST = 'EXERCISE_TYPES_LIST_REQUEST';
export const EXERCISE_TYPES_LIST_SUCCESS = 'EXERCISE_TYPES_LIST_SUCCESS';
export const EXERCISE_TYPES_LIST_ERROR = 'EXERCISE_TYPES_LIST_ERROR';

export const EXERCISE_TYPES_SELECT_ONE_REQUEST = 'EXERCISE_TYPES_SELECT_ONE_REQUEST';
export const EXERCISE_TYPES_SELECT_ONE_SUCCESS = 'EXERCISE_TYPES_SELECT_ONE_SUCCESS';
export const EXERCISE_TYPES_SELECT_ONE_ERROR = 'EXERCISE_TYPES_SELECT_ONE_ERROR';

export const EXERCISE_TYPES_ADD_REQUEST = 'EXERCISE_TYPES_ADD_REQUEST';
export const EXERCISE_TYPES_ADD_SUCCESS = 'EXERCISE_TYPES_ADD_SUCCESS';
export const EXERCISE_TYPES_ADD_ERROR = 'EXERCISE_TYPES_ADD_ERROR';

export const EXERCISE_TYPES_UPDATE_REQUEST = 'EXERCISE_TYPES_UPDATE_REQUEST';
export const EXERCISE_TYPES_UPDATE_SUCCESS = 'EXERCISE_TYPES_UPDATE_SUCCESS';
export const EXERCISE_TYPES_UPDATE_ERROR = 'EXERCISE_TYPES_UPDATE_ERROR';

export const EXERCISE_TYPES_DELETE_REQUEST = 'EXERCISE_TYPES_DELETE_REQUEST';
export const EXERCISE_TYPES_DELETE_SUCCESS = 'EXERCISE_TYPES_DELETE_SUCCESS';
export const EXERCISE_TYPES_DELETE_ERROR = 'EXERCISE_TYPES_DELETE_ERROR';

export function exerciseTypeListRequest() {
    return {
        type: EXERCISE_TYPES_LIST_REQUEST,
    }
}

export function exerciseTypeListSuccess(data) {
    return {
        type: EXERCISE_TYPES_LIST_SUCCESS,
        data
    }
}

export function exerciseTypeListError(error) {
    return {
        type: EXERCISE_TYPES_LIST_ERROR,
        error
    }
}

export function exerciseTypeSelectOneRequest(_id) {
    return {
        type: EXERCISE_TYPES_SELECT_ONE_REQUEST,
        _id
    }
}

export function exerciseTypeSelectOneSuccess(data) {
    return {
        type: EXERCISE_TYPES_SELECT_ONE_SUCCESS,
        data
    }
}

export function exerciseTypeSelectOneError(error) {
    return {
        type: EXERCISE_TYPES_SELECT_ONE_ERROR,
        error
    }
}

export function exerciseTypeAddRequest(exerciseTypeData) {
    return {
        type: EXERCISE_TYPES_ADD_REQUEST,
        exerciseTypeData
    }
}

export function exerciseTypeAddSuccess(data) {
    return {
        type: EXERCISE_TYPES_ADD_SUCCESS,
        data
    }
}

export function exerciseTypeAddError(error) {
    return {
        type: EXERCISE_TYPES_ADD_ERROR,
        error
    }
}

export function exerciseTypeUpdateRequest(_id, exerciseTypeData) {
    return {
        type: EXERCISE_TYPES_UPDATE_REQUEST,
        _id,
        exerciseTypeData
    }
}

export function exerciseTypeUpdateSuccess(data) {
    return {
        type: EXERCISE_TYPES_UPDATE_SUCCESS,
        data
    }
}

export function exerciseTypeUpdateError(error) {
    return {
        type: EXERCISE_TYPES_UPDATE_ERROR,
        error
    }
}

export function exerciseTypeDeleteRequest(_id) {
    return {
        type: EXERCISE_TYPES_DELETE_REQUEST,
        _id
    }
}

export function exerciseTypeDeleteSuccess(data) {
    return {
        type: EXERCISE_TYPES_DELETE_SUCCESS,
        data
    }
}

export function exerciseTypeDeleteError(error) {
    return {
        type: EXERCISE_TYPES_DELETE_ERROR,
        error
    }
}