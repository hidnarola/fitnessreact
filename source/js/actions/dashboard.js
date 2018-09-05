export const GET_DASHBOARD_PAGE_REQUEST = 'GET_DASHBOARD_PAGE_REQUEST';
export const GET_DASHBOARD_PAGE_SUCCESS = 'GET_DASHBOARD_PAGE_SUCCESS';
export const GET_DASHBOARD_PAGE_ERROR = 'GET_DASHBOARD_PAGE_ERROR';

export const SAVE_DASHBOARD_WIDGETS_DATA_REQUEST = 'SAVE_DASHBOARD_WIDGETS_DATA_REQUEST';
export const SAVE_DASHBOARD_WIDGETS_DATA_SUCCESS = 'SAVE_DASHBOARD_WIDGETS_DATA_SUCCESS';
export const SAVE_DASHBOARD_WIDGETS_DATA_ERROR = 'SAVE_DASHBOARD_WIDGETS_DATA_ERROR';

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

export function saveDashboardWidgetsDataRequest(requestData) {
    return {
        type: SAVE_DASHBOARD_WIDGETS_DATA_REQUEST,
        requestData
    }
}

export function saveDashboardWidgetsDataSuccess(data) {
    return {
        type: SAVE_DASHBOARD_WIDGETS_DATA_SUCCESS,
        data
    }
}

export function saveDashboardWidgetsDataError(error) {
    return {
        type: SAVE_DASHBOARD_WIDGETS_DATA_ERROR,
        error
    }
}