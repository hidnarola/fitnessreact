export const EXERCISES_LIST_REQUEST = 'EXERCISES_LIST_REQUEST';
export const EXERCISES_LIST_SUCCESS = 'EXERCISES_LIST_SUCCESS';
export const EXERCISES_LIST_ERROR = 'EXERCISES_LIST_ERROR';

export const EXERCISES_FILTER_REQUEST = 'EXERCISES_FILTER_REQUEST';
export const EXERCISES_FILTER_SUCCESS = 'EXERCISES_FILTER_SUCCESS';
export const EXERCISES_FILTER_ERROR = 'EXERCISES_FILTER_ERROR';

export const EXERCISES_SELECT_ONE_REQUEST = 'EXERCISES_SELECT_ONE_REQUEST';
export const EXERCISES_SELECT_ONE_SUCCESS = 'EXERCISES_SELECT_ONE_SUCCESS';
export const EXERCISES_SELECT_ONE_ERROR = 'EXERCISES_SELECT_ONE_ERROR';

export const EXERCISES_ADD_REQUEST = 'EXERCISES_ADD_REQUEST';
export const EXERCISES_ADD_SUCCESS = 'EXERCISES_ADD_SUCCESS';
export const EXERCISES_ADD_ERROR = 'EXERCISES_ADD_ERROR';

export const EXERCISES_UPDATE_REQUEST = 'EXERCISES_UPDATE_REQUEST';
export const EXERCISES_UPDATE_SUCCESS = 'EXERCISES_UPDATE_SUCCESS';
export const EXERCISES_UPDATE_ERROR = 'EXERCISES_UPDATE_ERROR';

export const EXERCISES_DELETE_REQUEST = 'EXERCISES_DELETE_REQUEST';
export const EXERCISES_DELETE_SUCCESS = 'EXERCISES_DELETE_SUCCESS';
export const EXERCISES_DELETE_ERROR = 'EXERCISES_DELETE_ERROR';

export const EXERCISES_RECOVER_REQUEST = 'EXERCISES_RECOVER_REQUEST';
export const EXERCISES_RECOVER_SUCCESS = 'EXERCISES_RECOVER_SUCCESS';
export const EXERCISES_RECOVER_ERROR = 'EXERCISES_RECOVER_ERROR';

export const SET_EXERCISE_STATE = 'SET_EXERCISE_STATE';

export function exerciseListRequest() {
    return {
        type: EXERCISES_LIST_REQUEST,
    }
}

export function exerciseListSuccess(data) {
    return {
        type: EXERCISES_LIST_SUCCESS,
        data
    }
}

export function exerciseListError(error) {
    return {
        type: EXERCISES_LIST_ERROR,
        error
    }
}

export function exerciseFilterRequest(filterData) {
    return {
        type: EXERCISES_FILTER_REQUEST,
        filterData
    }
}

export function exerciseFilterSuccess(data) {
    return {
        type: EXERCISES_FILTER_SUCCESS,
        data
    }
}

export function exerciseFilterError(error) {
    return {
        type: EXERCISES_FILTER_ERROR,
        error
    }
}

export function exerciseSelectOneRequest(_id) {
    return {
        type: EXERCISES_SELECT_ONE_REQUEST,
        _id
    }
}

export function exerciseSelectOneSuccess(data) {
    return {
        type: EXERCISES_SELECT_ONE_SUCCESS,
        data
    }
}

export function exerciseSelectOneError(error) {
    return {
        type: EXERCISES_SELECT_ONE_ERROR,
        error
    }
}

export function exerciseAddRequest(exerciseData) {
    return {
        type: EXERCISES_ADD_REQUEST,
        exerciseData
    }
}

export function exerciseAddSuccess(data) {
    return {
        type: EXERCISES_ADD_SUCCESS,
        data
    }
}

export function exerciseAddError(error) {
    return {
        type: EXERCISES_ADD_ERROR,
        error
    }
}

export function exerciseUpdateRequest(_id, exerciseData) {
    return {
        type: EXERCISES_UPDATE_REQUEST,
        _id,
        exerciseData
    }
}

export function exerciseUpdateSuccess(data) {
    return {
        type: EXERCISES_UPDATE_SUCCESS,
        data
    }
}

export function exerciseUpdateError(error) {
    return {
        type: EXERCISES_UPDATE_ERROR,
        error
    }
}

export function exerciseDeleteRequest(_id) {
    return {
        type: EXERCISES_DELETE_REQUEST,
        _id
    }
}

export function exerciseDeleteSuccess(data) {
    return {
        type: EXERCISES_DELETE_SUCCESS,
        data
    }
}

export function exerciseDeleteError(error) {
    return {
        type: EXERCISES_DELETE_ERROR,
        error
    }
}

export function exerciseRecoverRequest(_id) {
    return {
        type: EXERCISES_RECOVER_REQUEST,
        _id
    }
}

export function exerciseRecoverSuccess(data) {
    return {
        type: EXERCISES_RECOVER_SUCCESS,
        data
    }
}

export function exerciseRecoverError(error) {
    return {
        type: EXERCISES_RECOVER_ERROR,
        error
    }
}

export function setExerciseState(stateData = {}) {
    return {
        type: SET_EXERCISE_STATE,
        stateData
    }
}