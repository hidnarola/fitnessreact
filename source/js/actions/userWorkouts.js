export const GET_USER_WORKOUT_BY_DATE_REQUEST = 'GET_USER_WORKOUT_BY_DATE_REQUEST';
export const GET_USER_WORKOUT_BY_DATE_SUCCESS = 'GET_USER_WORKOUT_BY_DATE_SUCCESS';
export const GET_USER_WORKOUT_BY_DATE_ERROR = 'GET_USER_WORKOUT_BY_DATE_ERROR';

export const GET_USER_WORKOUT_BY_ID_REQUEST = 'GET_USER_WORKOUT_BY_ID_REQUEST';
export const GET_USER_WORKOUT_BY_ID_SUCCESS = 'GET_USER_WORKOUT_BY_ID_SUCCESS';
export const GET_USER_WORKOUT_BY_ID_ERROR = 'GET_USER_WORKOUT_BY_ID_ERROR';

export const DELETE_USER_WORKOUT_BY_ID_REQUEST = 'DELETE_USER_WORKOUT_BY_ID_REQUEST';
export const DELETE_USER_WORKOUT_BY_ID_SUCCESS = 'DELETE_USER_WORKOUT_BY_ID_SUCCESS';
export const DELETE_USER_WORKOUT_BY_ID_ERROR = 'DELETE_USER_WORKOUT_BY_ID_ERROR';

export function getUserWorkoutByDateRequest(requestData) {
    return {
        type: GET_USER_WORKOUT_BY_DATE_REQUEST,
        requestData,
    }
}

export function getUserWorkoutByDateSuccess(data) {
    return {
        type: GET_USER_WORKOUT_BY_DATE_SUCCESS,
        data
    }
}

export function getUserWorkoutByDateError(error) {
    return {
        type: GET_USER_WORKOUT_BY_DATE_ERROR,
        error
    }
}

export function getUserWorkoutByIdRequest(_id) {
    return {
        type: GET_USER_WORKOUT_BY_ID_REQUEST,
        _id,
    }
}

export function getUserWorkoutByIdSuccess(data) {
    return {
        type: GET_USER_WORKOUT_BY_ID_SUCCESS,
        data
    }
}

export function getUserWorkoutByIdError(error) {
    return {
        type: GET_USER_WORKOUT_BY_ID_ERROR,
        error
    }
}

export function deleteUserWorkoutByIdRequest(_id) {
    return {
        type: DELETE_USER_WORKOUT_BY_ID_REQUEST,
        _id,
    }
}

export function deleteUserWorkoutByIdSuccess(data) {
    return {
        type: DELETE_USER_WORKOUT_BY_ID_SUCCESS,
        data
    }
}

export function deleteUserWorkoutByIdError(error) {
    return {
        type: DELETE_USER_WORKOUT_BY_ID_ERROR,
        error
    }
}