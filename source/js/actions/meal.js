export const MEAL_ADD_REQUEST = 'MEAL_ADD_REQUEST';
export const MEAL_ADD_SUCCESS = 'MEAL_ADD_SUCCESS';
export const MEAL_ADD_ERROR = 'MEAL_ADD_ERROR';

// export const SET_BODY_PARTS_STATE = 'SET_BODY_PARTS_STATE';

export function mealAddRequest(requestData) {
    console.log("action => ");
    return {
        type: MEAL_ADD_REQUEST,
        requestData
    }
}

export function mealAddSuccess(data) {
    return {
        type: MEAL_ADD_SUCCESS,
        data
    }
}

export function mealAddError(error) {
    return {
        type: MEAL_ADD_ERROR,
        error
    }
}

// export function setBodyPartState(stateData = {}) {
//     return {
//         type: SET_BODY_PARTS_STATE,
//         stateData
//     }
// }