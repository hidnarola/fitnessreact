export const BADGE_TASKS_LIST_REQUEST = 'BADGE_TASKS_LIST_REQUEST';
export const BADGE_TASKS_LIST_SUCCESS = 'BADGE_TASKS_LIST_SUCCESS';
export const BADGE_TASKS_LIST_ERROR = 'BADGE_TASKS_LIST_ERROR';

export const BADGE_TASKS_FILTER_REQUEST = 'BADGE_TASKS_FILTER_REQUEST';
export const BADGE_TASKS_FILTER_SUCCESS = 'BADGE_TASKS_FILTER_SUCCESS';
export const BADGE_TASKS_FILTER_ERROR = 'BADGE_TASKS_FILTER_ERROR';

export const BADGE_TASKS_SELECT_ONE_REQUEST = 'BADGE_TASKS_SELECT_ONE_REQUEST';
export const BADGE_TASKS_SELECT_ONE_SUCCESS = 'BADGE_TASKS_SELECT_ONE_SUCCESS';
export const BADGE_TASKS_SELECT_ONE_ERROR = 'BADGE_TASKS_SELECT_ONE_ERROR';

export const BADGE_TASKS_ADD_REQUEST = 'BADGE_TASKS_ADD_REQUEST';
export const BADGE_TASKS_ADD_SUCCESS = 'BADGE_TASKS_ADD_SUCCESS';
export const BADGE_TASKS_ADD_ERROR = 'BADGE_TASKS_ADD_ERROR';

export const BADGE_TASKS_UPDATE_REQUEST = 'BADGE_TASKS_UPDATE_REQUEST';
export const BADGE_TASKS_UPDATE_SUCCESS = 'BADGE_TASKS_UPDATE_SUCCESS';
export const BADGE_TASKS_UPDATE_ERROR = 'BADGE_TASKS_UPDATE_ERROR';

export const BADGE_TASKS_DELETE_REQUEST = 'BADGE_TASKS_DELETE_REQUEST';
export const BADGE_TASKS_DELETE_SUCCESS = 'BADGE_TASKS_DELETE_SUCCESS';
export const BADGE_TASKS_DELETE_ERROR = 'BADGE_TASKS_DELETE_ERROR';

export function badgeTaskListRequest() {
    return {
        type: BADGE_TASKS_LIST_REQUEST,
    }
}

export function badgeTaskListSuccess(data) {
    return {
        type: BADGE_TASKS_LIST_SUCCESS,
        data
    }
}

export function badgeTaskListError(error) {
    return {
        type: BADGE_TASKS_LIST_ERROR,
        error
    }
}

export function badgeTaskFilterRequest(filterData) {
    return {
        type: BADGE_TASKS_FILTER_REQUEST,
        filterData
    }
}

export function badgeTaskFilterSuccess(data) {
    return {
        type: BADGE_TASKS_FILTER_SUCCESS,
        data
    }
}

export function badgeTaskFilterError(error) {
    return {
        type: BADGE_TASKS_FILTER_ERROR,
        error
    }
}

export function badgeTaskSelectOneRequest(_id) {
    return {
        type: BADGE_TASKS_SELECT_ONE_REQUEST,
        _id
    }
}

export function badgeTaskSelectOneSuccess(data) {
    return {
        type: BADGE_TASKS_SELECT_ONE_SUCCESS,
        data
    }
}

export function badgeTaskSelectOneError(error) {
    return {
        type: BADGE_TASKS_SELECT_ONE_ERROR,
        error
    }
}

export function badgeTaskAddRequest(badgeTaskData) {
    return {
        type: BADGE_TASKS_ADD_REQUEST,
        badgeTaskData
    }
}

export function badgeTaskAddSuccess(data) {
    return {
        type: BADGE_TASKS_ADD_SUCCESS,
        data
    }
}

export function badgeTaskAddError(error) {
    return {
        type: BADGE_TASKS_ADD_ERROR,
        error
    }
}

export function badgeTaskUpdateRequest(_id, badgeTaskData) {
    return {
        type: BADGE_TASKS_UPDATE_REQUEST,
        _id,
        badgeTaskData
    }
}

export function badgeTaskUpdateSuccess(data) {
    return {
        type: BADGE_TASKS_UPDATE_SUCCESS,
        data
    }
}

export function badgeTaskUpdateError(error) {
    return {
        type: BADGE_TASKS_UPDATE_ERROR,
        error
    }
}

export function badgeTaskDeleteRequest(_id) {
    return {
        type: BADGE_TASKS_DELETE_REQUEST,
        _id
    }
}

export function badgeTaskDeleteSuccess(data) {
    return {
        type: BADGE_TASKS_DELETE_SUCCESS,
        data
    }
}

export function badgeTaskDeleteError(error) {
    return {
        type: BADGE_TASKS_DELETE_ERROR,
        error
    }
}