export const GET_USER_EXERCISES_REQUEST = 'GET_USER_EXERCISES_REQUEST';
export const GET_USER_EXERCISES_SUCCESS = 'GET_USER_EXERCISES_SUCCESS';
export const GET_USER_EXERCISES_ERROR = 'GET_USER_EXERCISES_ERROR';

export function getUserExercisesRequest() {
    return {
        type: GET_USER_EXERCISES_REQUEST,
    }
}

export function getUserExercisesSuccess(data) {
    return {
        type: GET_USER_EXERCISES_SUCCESS,
        data
    }
}

export function getUserExercisesError(error) {
    return {
        type: GET_USER_EXERCISES_ERROR,
        error
    }
}