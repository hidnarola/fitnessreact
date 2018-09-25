export const GET_ADMIN_DASHBOARD_REQUEST = 'GET_ADMIN_DASHBOARD_REQUEST';
export const GET_ADMIN_DASHBOARD_SUCCESS = 'GET_ADMIN_DASHBOARD_SUCCESS';
export const GET_ADMIN_DASHBOARD_ERROR = 'GET_ADMIN_DASHBOARD_ERROR';

export const SET_ADMIN_DASHBOARD_STATE = 'SET_ADMIN_DASHBOARD_STATE';
export const RESET_ADMIN_DASHBOARD_STATE = 'SET_ADMIN_DASHBOARD_STATE';

export function getAdminDashboardRequest(requestData) {
    return {
        type: GET_ADMIN_DASHBOARD_REQUEST,
        requestData
    }
}

export function getAdminDashboardSuccess(data) {
    return {
        type: GET_ADMIN_DASHBOARD_SUCCESS,
        data
    }
}

export function getAdminDashboardError(error) {
    return {
        type: GET_ADMIN_DASHBOARD_ERROR,
        error
    }
}

export function setAdminDashboardState(stateData) {
    return {
        type: SET_ADMIN_DASHBOARD_STATE,
        stateData,
    }
}

export function resetAdminDashboardState() {
    return {
        type: RESET_ADMIN_DASHBOARD_STATE,
    }
}