export const NUTRITIONS_ADD_REQUEST = 'NUTRITIONS_ADD_REQUEST';
export const NUTRITIONS_ADD_SUCCESS = 'NUTRITIONS_ADD_SUCCESS';
export const NUTRITIONS_ADD_ERROR = 'NUTRITIONS_ADD_ERROR';

export function nutritionAddRequest(nutritionData) {
    return {
        type: NUTRITIONS_ADD_REQUEST,
        nutritionData
    }
}

export function nutritionAddSuccess(data) {
    return {
        type: NUTRITIONS_ADD_SUCCESS,
        data
    }
}

export function nutritionAddError(error) {
    return {
        type: NUTRITIONS_ADD_ERROR,
        error
    }
}