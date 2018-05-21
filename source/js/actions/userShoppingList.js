export const GET_USER_SHOPPING_LIST_REQUEST = 'GET_USER_SHOPPING_LIST_REQUEST';
export const GET_USER_SHOPPING_LIST_SUCCESS = 'GET_USER_SHOPPING_LIST_SUCCESS';
export const GET_USER_SHOPPING_LIST_ERROR = 'GET_USER_SHOPPING_LIST_ERROR';

export function getUserShoppingListRequest(requestData) {
    return {
        type: GET_USER_SHOPPING_LIST_REQUEST,
        requestData,
    }
}

export function getUserShoppingListSuccess(data) {
    return {
        type: GET_USER_SHOPPING_LIST_SUCCESS,
        data,
    }
}

export function getUserShoppingListError(error) {
    return {
        type: GET_USER_SHOPPING_LIST_SUCCESS,
        error,
    }
}