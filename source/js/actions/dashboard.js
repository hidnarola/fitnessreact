export const GET_DASHBOARD_START = 'GET_DASHBOARD_START';
export const GET_DASHBOARD_ERROR = 'GET_DASHBOARD_ERROR';
export const GET_DASHBOARD_SUCCESS = 'GET_DASHBOARD_SUCCESS';

export function getDashboardData(){
    return {
        type:GET_DASHBOARD_START
    }
}