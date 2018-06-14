export const GET_USER_PRIMARY_GOAL_REQUEST = 'GET_USER_PRIMARY_GOAL_REQUEST';
export const GET_USER_PRIMARY_GOAL_SUCCESS = 'GET_USER_PRIMARY_GOAL_SUCCESS';
export const GET_USER_PRIMARY_GOAL_ERROR = 'GET_USER_PRIMARY_GOAL_ERROR';

export function getUserPrimaryGoalRequest() {
    return {
        type: GET_USER_PRIMARY_GOAL_REQUEST,
    }
}

export function getUserPrimaryGoalSuccess(data) {
    return {
        type: GET_USER_PRIMARY_GOAL_SUCCESS,
        data
    }
}

export function getUserPrimaryGoalError(error) {
    return {
        type: GET_USER_PRIMARY_GOAL_ERROR,
        error
    }
}