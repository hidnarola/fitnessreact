export const ADD_USER_PERSONAL_GOAL_REQUEST = 'ADD_USER_PERSONAL_GOAL_REQUEST';
export const ADD_USER_PERSONAL_GOAL_SUCCESS = 'ADD_USER_PERSONAL_GOAL_SUCCESS';
export const ADD_USER_PERSONAL_GOAL_ERROR = 'ADD_USER_PERSONAL_GOAL_ERROR';

export function addUserPersonalGoalRequest(requestData) {
    return {
        type: ADD_USER_PERSONAL_GOAL_REQUEST,
        requestData,
    }
}

export function addUserPersonalGoalSuccess(data) {
    return {
        type: ADD_USER_PERSONAL_GOAL_SUCCESS,
        data
    }
}

export function addUserPersonalGoalError(error) {
    return {
        type: ADD_USER_PERSONAL_GOAL_ERROR,
        error
    }
}