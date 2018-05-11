export const FITNESS_TESTS_FILTER_REQUEST = 'FITNESS_TESTS_FILTER_REQUEST';
export const FITNESS_TESTS_FILTER_SUCCESS = 'FITNESS_TESTS_FILTER_SUCCESS';
export const FITNESS_TESTS_FILTER_ERROR = 'FITNESS_TESTS_FILTER_ERROR';

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