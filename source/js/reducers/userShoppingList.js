import { Map } from "immutable";
import {
    GET_USER_SHOPPING_LIST_REQUEST,
    GET_USER_SHOPPING_LIST_SUCCESS,
    GET_USER_SHOPPING_LIST_ERROR
} from "../actions/userShoppingList";
import { VALIDATION_FAILURE_STATUS } from "../constants/consts";
import { generateValidationErrorMsgArr } from "../helpers/funs";

const initialState = Map({
    loading: false,
    error: [],
    shoppingList: [],
});

const actionMap = {
    [GET_USER_SHOPPING_LIST_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
        }));
    },
    [GET_USER_SHOPPING_LIST_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            shoppingList: action.data.shoppingcart,
        }));
    },
    [GET_USER_SHOPPING_LIST_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            loading: false,
            error: error,
        }));
    },
}

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}