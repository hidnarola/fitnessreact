import { Map } from "immutable";
import { VALIDATION_FAILURE_STATUS } from "../constants/consts";
import { generateValidationErrorMsgArr } from "../helpers/funs";
import { GET_USER_SEARCH_REQUEST, GET_USER_SEARCH_SUCCESS, GET_USER_SEARCH_ERROR } from "../actions/userSearch";

const initialState = Map({
    loading: false,
    users: [],
    error: [],
});

const actionMap = {
    [GET_USER_SEARCH_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            users: [],
            error: [],
        }));
    },
    [GET_USER_SEARCH_SUCCESS]: (state, action) => {
        var newState = {
            loading: false,
        };
        if (action.data.status === 1) {
            newState.users = action.data.users;
            newState.error = [];
        } else {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.users = [];
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [GET_USER_SEARCH_ERROR]: (state, action) => {
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