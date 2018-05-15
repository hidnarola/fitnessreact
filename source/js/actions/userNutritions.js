export const GET_USER_TODAYS_MEAL_REQUEST = 'GET_USER_TODAYS_MEAL_REQUEST';
export const GET_USER_TODAYS_MEAL_SUCCESS = 'GET_USER_TODAYS_MEAL_SUCCESS';
export const GET_USER_TODAYS_MEAL_ERROR = 'GET_USER_TODAYS_MEAL_ERROR';

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