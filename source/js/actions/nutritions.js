export const GET_NUTRITION_REQUEST = 'GET_NUTRITION_REQUEST';
export const GET_NUTRITION_SUCCESS = 'GET_NUTRITION_SUCCESS';
export const GET_NUTRITION_ERROR = 'GET_NUTRITION_ERROR';

export function getNutritionsRequest() {
    return {
        type: GET_NUTRITION_REQUEST
    }
}

export function getNutritionsSuccess(data) {
    return {
        type: GET_NUTRITION_SUCCESS,
        data
    }
}

export function getNutritionsError(error) {
    return {
        type: GET_NUTRITION_ERROR,
        error
    }
}