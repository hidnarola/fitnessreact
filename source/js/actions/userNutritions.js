export const GET_USER_TODAYS_MEAL_REQUEST = 'GET_USER_TODAYS_MEAL_REQUEST';
export const GET_USER_TODAYS_MEAL_SUCCESS = 'GET_USER_TODAYS_MEAL_SUCCESS';
export const GET_USER_TODAYS_MEAL_ERROR = 'GET_USER_TODAYS_MEAL_ERROR';

export const GET_USER_NUTRITION_RECIPE_DETAILS_REQUEST = 'GET_USER_NUTRITION_RECIPE_DETAILS_REQUEST';
export const GET_USER_NUTRITION_RECIPE_DETAILS_SUCCESS = 'GET_USER_NUTRITION_RECIPE_DETAILS_SUCCESS';
export const GET_USER_NUTRITION_RECIPE_DETAILS_ERROR = 'GET_USER_NUTRITION_RECIPE_DETAILS_ERROR';

export const DELETE_USER_RECIPE_REQUEST = 'DELETE_USER_RECIPE_REQUEST';
export const DELETE_USER_RECIPE_SUCCESS = 'DELETE_USER_RECIPE_SUCCESS';
export const DELETE_USER_RECIPE_ERROR = 'DELETE_USER_RECIPE_ERROR';

export function getUserTodaysMealRequest(requestData) {
    return {
        type: GET_USER_TODAYS_MEAL_REQUEST,
        requestData
    }
}

export function getUserTodaysMealSuccess(data) {
    return {
        type: GET_USER_TODAYS_MEAL_SUCCESS,
        data
    }
}

export function getUserTodaysMealError(error) {
    return {
        type: GET_USER_TODAYS_MEAL_ERROR,
        error
    }
}

export function getUserNutritionRecipeDetailsRequest(_id) {
    return {
        type: GET_USER_NUTRITION_RECIPE_DETAILS_REQUEST,
        _id
    }
}

export function getUserNutritionRecipeDetailsSuccess(data) {
    return {
        type: GET_USER_NUTRITION_RECIPE_DETAILS_SUCCESS,
        data
    }
}

export function getUserNutritionRecipeDetailsError(error) {
    return {
        type: GET_USER_NUTRITION_RECIPE_DETAILS_ERROR,
        error
    }
}

export function deleteUserRecipeRequest(_id) {
    return {
        type: DELETE_USER_RECIPE_REQUEST,
        _id
    }
}

export function deleteUserRecipeSuccess(data) {
    return {
        type: DELETE_USER_RECIPE_SUCCESS,
        data
    }
}

export function deleteUserRecipeError(error) {
    return {
        type: DELETE_USER_RECIPE_ERROR,
        error
    }
}