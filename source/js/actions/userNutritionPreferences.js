export const GET_USER_NUTRITION_PREFERENCES_REQUEST = 'GET_USER_NUTRITION_PREFERENCES_REQUEST';
export const GET_USER_NUTRITION_PREFERENCES_SUCCESS = 'GET_USER_NUTRITION_PREFERENCES_SUCCESS';
export const GET_USER_NUTRITION_PREFERENCES_ERROR = 'GET_USER_NUTRITION_PREFERENCES_ERROR';

export const SAVE_USER_NUTRITION_PREFERENCES_REQUEST = 'SAVE_USER_NUTRITION_PREFERENCES_REQUEST';
export const SAVE_USER_NUTRITION_PREFERENCES_SUCCESS = 'SAVE_USER_NUTRITION_PREFERENCES_SUCCESS';
export const SAVE_USER_NUTRITION_PREFERENCES_ERROR = 'SAVE_USER_NUTRITION_PREFERENCES_ERROR';

export const RESET_USER_NUTRITION_PREFERENCES_REQUEST = 'RESET_USER_NUTRITION_PREFERENCES_REQUEST';
export const RESET_USER_NUTRITION_PREFERENCES_SUCCESS = 'RESET_USER_NUTRITION_PREFERENCES_SUCCESS';
export const RESET_USER_NUTRITION_PREFERENCES_ERROR = 'RESET_USER_NUTRITION_PREFERENCES_ERROR';

export function getUserNutritionPreferencesRequest() {
    return {
        type: GET_USER_NUTRITION_PREFERENCES_REQUEST,
    }
}

export function getUserNutritionPreferencesSuccess(data) {
    return {
        type: GET_USER_NUTRITION_PREFERENCES_SUCCESS,
        data
    }
}

export function getUserNutritionPreferencesError(error) {
    return {
        type: GET_USER_NUTRITION_PREFERENCES_ERROR,
        error
    }
}

export function saveUserNutritionPreferencesRequest(requestData) {
    return {
        type: SAVE_USER_NUTRITION_PREFERENCES_REQUEST,
        requestData
    }
}

export function saveUserNutritionPreferencesSuccess(data) {
    return {
        type: SAVE_USER_NUTRITION_PREFERENCES_SUCCESS,
        data
    }
}

export function saveUserNutritionPreferencesError(error) {
    return {
        type: SAVE_USER_NUTRITION_PREFERENCES_ERROR,
        error
    }
}

export function resetUserNutritionPreferencesRequest() {
    return {
        type: RESET_USER_NUTRITION_PREFERENCES_REQUEST,
    }
}

export function resetUserNutritionPreferencesSuccess(data) {
    return {
        type: RESET_USER_NUTRITION_PREFERENCES_SUCCESS,
        data
    }
}

export function resetUserNutritionPreferencesError(error) {
    return {
        type: RESET_USER_NUTRITION_PREFERENCES_ERROR,
        error
    }
}