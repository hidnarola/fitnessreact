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
    shoppingList: {},
});

const actionMap = {
    [GET_USER_SHOPPING_LIST_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
        }));
    },
    [GET_USER_SHOPPING_LIST_SUCCESS]: (state, action) => {
        var newState = {
            loading: false,
        };
        if (action.data.status === 1) {
            newState.shoppingList = action.data.ingredients;
        } else {
            newState.shoppingList = {};
        }
        return state.merge(Map(newState));
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
    if (action && action.type) {
        var fn = actionMap[action.type];
        return fn ? fn(state, action) : state;
    }
    return state;
}