export const GET_HEALTH_LABELS_REQUEST = 'GET_HEALTH_LABELS_REQUEST';
export const GET_HEALTH_LABELS_SUCCESS = 'GET_HEALTH_LABELS_SUCCESS';
export const GET_HEALTH_LABELS_ERROR = 'GET_HEALTH_LABELS_ERROR';

export function getUserNutritionPreferencesRequest() {
    return {
        type: GET_HEALTH_LABELS_REQUEST,
    }
}

export function getUserNutritionPreferencesSuccess(data) {
    return {
        type: GET_HEALTH_LABELS_SUCCESS,
        data
    }
}

export function getUserNutritionPreferencesError(error) {
    return {
        type: GET_HEALTH_LABELS_ERROR,
        error
    }
}