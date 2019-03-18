export const SET_USER_PROGRESS_DATE_RANGE = 'SET_USER_PROGRESS_DATE_RANGE';

export const GET_USER_PROGRESS_BY_CATEGORY_AND_DATE_REQUEST = 'GET_USER_PROGRESS_BY_CATEGORY_AND_DATE_REQUEST';
export const GET_USER_PROGRESS_BY_CATEGORY_AND_DATE_SUCCESS = 'GET_USER_PROGRESS_BY_CATEGORY_AND_DATE_SUCCESS';
export const GET_USER_PROGRESS_BY_CATEGORY_AND_DATE_ERROR = 'GET_USER_PROGRESS_BY_CATEGORY_AND_DATE_ERROR';
export const SET_USER_PROGRESS_BY_CATEGORY_AND_DATE = 'SET_USER_PROGRESS_BY_CATEGORY_AND_DATE';

export function setUserProgresDateRange(dateRange) {
    return {
        type: SET_USER_PROGRESS_DATE_RANGE,
        dateRange,
    }
}

export function getUserProgressByCategoryAndDateRequest(requestData) {
    return {
        type: GET_USER_PROGRESS_BY_CATEGORY_AND_DATE_REQUEST,
        requestData,
    }
}

export function getUserProgressByCategoryAndDateSuccess(data) {
    return {
        type: GET_USER_PROGRESS_BY_CATEGORY_AND_DATE_SUCCESS,
        data,
    }
}

export function getUserProgressByCategoryAndDateError(error) {
    return {
        type: GET_USER_PROGRESS_BY_CATEGORY_AND_DATE_ERROR,
        error,
    }
}

export function setUerProgressByCategoryAndDate(data) {
    return {
        type: SET_USER_PROGRESS_BY_CATEGORY_AND_DATE,
        data,
    };
}
