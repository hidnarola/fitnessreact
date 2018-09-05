export const GET_DASHBOARD_PAGE_REQUEST = 'GET_DASHBOARD_PAGE_REQUEST';
export const GET_DASHBOARD_PAGE_SUCCESS = 'GET_DASHBOARD_PAGE_SUCCESS';
export const GET_DASHBOARD_PAGE_ERROR = 'GET_DASHBOARD_PAGE_ERROR';

export function getDashboardPageRequest() {
    return {
        type: GET_DASHBOARD_PAGE_REQUEST
    }
}

export function getDashboardPageSuccess(data) {
    return {
        type: GET_DASHBOARD_PAGE_SUCCESS,
        data
    }
}

export function getDashboardPageError(error) {
    return {
        type: GET_DASHBOARD_PAGE_ERROR,
        error
    }
}