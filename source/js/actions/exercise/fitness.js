export const GET_EXERCISE_FITNESS_START = 'GET_EXERCISE_FITNESS_START';
export const GET_EXERCISE_FITNESS_SUCCESS = 'GET_EXERCISE_FITNESS_SUCCESS';
export const GET_EXERCISE_FITNESS_ERROR = 'GET_EXERCISE_FITNESS_ERROR';

export function getExerciseFitnessData() {
    return {
        type: GET_EXERCISE_FITNESS_START,
    }
}

export function exerciseFitnessSuccess(data) {
    return {
        type: GET_EXERCISE_FITNESS_SUCCESS,
        data
    }
}

export function exerciseFitnessError(error) {
    return {
        type: GET_EXERCISE_FITNESS_ERROR,
        error
    }
}