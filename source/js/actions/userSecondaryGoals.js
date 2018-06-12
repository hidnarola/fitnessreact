export const GET_USER_SECONDARY_GOAL_REQUEST = 'GET_USER_SECONDARY_GOAL_REQUEST';
export const GET_USER_SECONDARY_GOAL_SUCCESS = 'GET_USER_SECONDARY_GOAL_SUCCESS';
export const GET_USER_SECONDARY_GOAL_ERROR = 'GET_USER_SECONDARY_GOAL_ERROR';

export const ADD_USER_SECONDARY_GOAL_REQUEST = 'ADD_USER_SECONDARY_GOAL_REQUEST';
export const ADD_USER_SECONDARY_GOAL_SUCCESS = 'ADD_USER_SECONDARY_GOAL_SUCCESS';
export const ADD_USER_SECONDARY_GOAL_ERROR = 'ADD_USER_SECONDARY_GOAL_ERROR';

export const DELETE_USER_SECONDARY_GOAL_REQUEST = 'DELETE_USER_SECONDARY_GOAL_REQUEST';
export const DELETE_USER_SECONDARY_GOAL_SUCCESS = 'DELETE_USER_SECONDARY_GOAL_SUCCESS';
export const DELETE_USER_SECONDARY_GOAL_ERROR = 'DELETE_USER_SECONDARY_GOAL_ERROR';

export function getUserSecondaryGoalRequest() {
    return {
        type: GET_USER_SECONDARY_GOAL_REQUEST,
    }
}

export function getUserSecondaryGoalSuccess(data) {
    return {
        type: GET_USER_SECONDARY_GOAL_SUCCESS,
        data
    }
}

export function getUserSecondaryGoalError(error) {
    return {
        type: GET_USER_SECONDARY_GOAL_ERROR,
        error
    }
}

export function addUserSecondaryGoalRequest(requestData) {
    return {
        type: ADD_USER_SECONDARY_GOAL_REQUEST,
        requestData,
    }
}

export function addUserSecondaryGoalSuccess(data) {
    return {
        type: ADD_USER_SECONDARY_GOAL_SUCCESS,
        data
    }
}

export function addUserSecondaryGoalError(error) {
    return {
        type: ADD_USER_SECONDARY_GOAL_ERROR,
        error
    }
}

export function deleteUserSecondaryGoalRequest(_id) {
    return {
        type: DELETE_USER_SECONDARY_GOAL_REQUEST,
        _id,
    }
}

export function deleteUserSecondaryGoalSuccess(data) {
    return {
        type: DELETE_USER_SECONDARY_GOAL_SUCCESS,
        data
    }
}

export function deleteUserSecondaryGoalError(error) {
    return {
        type: DELETE_USER_SECONDARY_GOAL_ERROR,
        error
    }
}