export const GET_USER_PERSONAL_GOAL_REQUEST = 'GET_USER_PERSONAL_GOAL_REQUEST';
export const GET_USER_PERSONAL_GOAL_SUCCESS = 'GET_USER_PERSONAL_GOAL_SUCCESS';
export const GET_USER_PERSONAL_GOAL_ERROR = 'GET_USER_PERSONAL_GOAL_ERROR';

export const ADD_USER_PERSONAL_GOAL_REQUEST = 'ADD_USER_PERSONAL_GOAL_REQUEST';
export const ADD_USER_PERSONAL_GOAL_SUCCESS = 'ADD_USER_PERSONAL_GOAL_SUCCESS';
export const ADD_USER_PERSONAL_GOAL_ERROR = 'ADD_USER_PERSONAL_GOAL_ERROR';

export const DELETE_USER_PERSONAL_GOAL_REQUEST = 'DELETE_USER_PERSONAL_GOAL_REQUEST';
export const DELETE_USER_PERSONAL_GOAL_SUCCESS = 'DELETE_USER_PERSONAL_GOAL_SUCCESS';
export const DELETE_USER_PERSONAL_GOAL_ERROR = 'DELETE_USER_PERSONAL_GOAL_ERROR';

export function getUserPersonalGoalRequest(isCompleted = 0, start = 0, offset = 4) {
    return {
        type: GET_USER_PERSONAL_GOAL_REQUEST,
        isCompleted,
        start,
        offset,
    }
}

export function getUserPersonalGoalSuccess(data) {
    return {
        type: GET_USER_PERSONAL_GOAL_SUCCESS,
        data
    }
}

export function getUserPersonalGoalError(error) {
    return {
        type: GET_USER_PERSONAL_GOAL_ERROR,
        error
    }
}

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

export function deleteUserPersonalGoalRequest(_id) {
    return {
        type: DELETE_USER_PERSONAL_GOAL_REQUEST,
        _id,
    }
}

export function deleteUserPersonalGoalSuccess(data) {
    return {
        type: DELETE_USER_PERSONAL_GOAL_SUCCESS,
        data
    }
}

export function deleteUserPersonalGoalError(error) {
    return {
        type: DELETE_USER_PERSONAL_GOAL_ERROR,
        error
    }
}