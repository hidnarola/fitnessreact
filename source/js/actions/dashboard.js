export const GET_PEOPLE_START_NEW = 'GET_PEOPLE_START_NEW';
export const GET_PEOPLE_ERROR_NEW = 'GET_PEOPLE_ERROR_NEW';
export const GET_PEOPLE_SUCCESS_NEW = 'GET_PEOPLE_SUCCESS_NEW';

export function getPeopleNew2() {
    return {
        type: GET_PEOPLE_START_NEW,
    };
}

export const GET_DASHBOARD_START = 'GET_DASHBOARD_START';
export const GET_DASHBOARD_ERROR = 'GET_DASHBOARD_ERROR';
export const GET_DASHBOARD_SUCCESS = 'GET_DASHBOARD_SUCCESS';

export function getDashboardData(){
    return {
        type:GET_DASHBOARD_START
    }
}