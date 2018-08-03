export const GET_USER_WORKOUT_BY_DATE_REQUEST = 'GET_USER_WORKOUT_BY_DATE_REQUEST';
export const GET_USER_WORKOUT_BY_DATE_SUCCESS = 'GET_USER_WORKOUT_BY_DATE_SUCCESS';
export const GET_USER_WORKOUT_BY_DATE_ERROR = 'GET_USER_WORKOUT_BY_DATE_ERROR';

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