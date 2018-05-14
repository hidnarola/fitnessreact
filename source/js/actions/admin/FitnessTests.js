export const FITNESS_TESTS_SELECT_ONE_REQUEST = 'FITNESS_TESTS_SELECT_ONE_REQUEST';
export const FITNESS_TESTS_SELECT_ONE_SUCCESS = 'FITNESS_TESTS_SELECT_ONE_SUCCESS';
export const FITNESS_TESTS_SELECT_ONE_ERROR = 'FITNESS_TESTS_SELECT_ONE_ERROR';

export const FITNESS_TESTS_FILTER_REQUEST = 'FITNESS_TESTS_FILTER_REQUEST';
export const FITNESS_TESTS_FILTER_SUCCESS = 'FITNESS_TESTS_FILTER_SUCCESS';
export const FITNESS_TESTS_FILTER_ERROR = 'FITNESS_TESTS_FILTER_ERROR';

export const FITNESS_TESTS_ADD_REQUEST = 'FITNESS_TESTS_ADD_REQUEST';
export const FITNESS_TESTS_ADD_SUCCESS = 'FITNESS_TESTS_ADD_SUCCESS';
export const FITNESS_TESTS_ADD_ERROR = 'FITNESS_TESTS_ADD_ERROR';

export const FITNESS_TESTS_UPDATE_REQUEST = 'FITNESS_TESTS_UPDATE_REQUEST';
export const FITNESS_TESTS_UPDATE_SUCCESS = 'FITNESS_TESTS_UPDATE_SUCCESS';
export const FITNESS_TESTS_UPDATE_ERROR = 'FITNESS_TESTS_UPDATE_ERROR';

export const FITNESS_TESTS_DELETE_REQUEST = 'FITNESS_TESTS_DELETE_REQUEST';
export const FITNESS_TESTS_DELETE_SUCCESS = 'FITNESS_TESTS_DELETE_SUCCESS';
export const FITNESS_TESTS_DELETE_ERROR = 'FITNESS_TESTS_DELETE_ERROR';

export function fitnessTestsSelectOneRequest(_id) {
    return {
        type: FITNESS_TESTS_SELECT_ONE_REQUEST,
        _id
    }
}

export function fitnessTestsSelectOneSuccess(data) {
    return {
        type: FITNESS_TESTS_SELECT_ONE_SUCCESS,
        data
    }
}

export function fitnessTestsSelectOneError(error) {
    return {
        type: FITNESS_TESTS_SELECT_ONE_ERROR,
        error
    }
}

export function fitnessTestsFilterRequest(filterData) {
    return {
        type: FITNESS_TESTS_FILTER_REQUEST,
        filterData
    }
}

export function fitnessTestsFilterSuccess(data) {
    return {
        type: FITNESS_TESTS_FILTER_SUCCESS,
        data
    }
}

export function fitnessTestsFilterError(error) {
    return {
        type: FITNESS_TESTS_FILTER_ERROR,
        error
    }
}

export function fitnessTestsAddRequest(formData) {
    return {
        type: FITNESS_TESTS_ADD_REQUEST,
        formData
    }
}

export function fitnessTestsAddSuccess(data) {
    return {
        type: FITNESS_TESTS_ADD_SUCCESS,
        data
    }
}

export function fitnessTestsAddError(error) {
    return {
        type: FITNESS_TESTS_ADD_ERROR,
        error
    }
}

export function fitnessTestsUpdateRequest(_id, formData) {
    return {
        type: FITNESS_TESTS_UPDATE_REQUEST,
        _id,
        formData
    }
}

export function fitnessTestsUpdateSuccess(data) {
    return {
        type: FITNESS_TESTS_UPDATE_SUCCESS,
        data
    }
}

export function fitnessTestsUpdateError(error) {
    return {
        type: FITNESS_TESTS_UPDATE_ERROR,
        error
    }
}

export function fitnessTestsDeleteRequest(_id) {
    return {
        type: FITNESS_TESTS_DELETE_REQUEST,
        _id
    }
}

export function fitnessTestsDeleteSuccess(data) {
    return {
        type: FITNESS_TESTS_DELETE_SUCCESS,
        data
    }
}

export function fitnessTestsDeleteError(error) {
    return {
        type: FITNESS_TESTS_DELETE_ERROR,
        error
    }
}