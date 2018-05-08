import { Map } from "immutable";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_ERROR, FREE_LOGIN_LOGOUT_STATE } from "../actions/login";
import { VALIDATION_FAILURE_STATUS } from "../constants/consts";
import { generateValidationErrorMsgArr } from "../helpers/funs";

const initialState = Map({
    loading: false,
    error: [],
});

const actionMap = {
    [LOGIN_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
        }));
    },
    [LOGIN_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
        }));
    },
    [LOGIN_ERROR]: (state, action) => {
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
    [LOGOUT_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
        }));
    },
    [LOGOUT_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
        }));
    },
    [LOGOUT_ERROR]: (state, action) => {
        return state.merge(Map({
            loading: false,
        }));
    },
    [FREE_LOGIN_LOGOUT_STATE]: (state, action) => {
        return initialState;
    },
};

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}