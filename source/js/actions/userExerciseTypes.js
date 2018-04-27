export const GET_USER_EXERCISE_TYPES_REQUEST = 'GET_USER_EXERCISE_TYPES_REQUEST';
export const GET_USER_EXERCISE_TYPES_SUCCESS = 'GET_USER_EXERCISE_TYPES_SUCCESS';
export const GET_USER_EXERCISE_TYPES_ERROR = 'GET_USER_EXERCISE_TYPES_ERROR';

export function getUserExerciseTypesRequest() {
    return {
        type: GET_USER_EXERCISE_TYPES_REQUEST,
    }
}

export function getUserExerciseTypesSuccess(data) {
    return {
        type: GET_USER_EXERCISE_TYPES_SUCCESS,
        data
    }
}

export function getUserExerciseTypesError(error) {
    return {
        type: GET_USER_EXERCISE_TYPES_ERROR,
        error
    }
}