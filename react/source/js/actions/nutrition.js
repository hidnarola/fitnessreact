export const GET_NUTRITION_START = 'GET_NUTRITION_START';
export const GET_NUTRITION_SUCCESS = 'GET_NUTRITION_SUCCESS';
export const GET_NUTRITION_ERROR = 'GET_NUTRITION_ERROR';

export function getNutritionData() {
    return {
        type: GET_NUTRITION_START
    }
}

export function nutritutionSuccessAction(data) {
    return {
        type: GET_NUTRITION_SUCCESS,
        data
    }
}

export function nutritutionErrorAction(error) {
    return {
        type: GET_NUTRITION_ERROR,
        error
    }
}