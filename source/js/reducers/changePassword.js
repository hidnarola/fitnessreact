import { Map } from "immutable";
import { USER_CHANGE_PASSWORD_REQUEST, USER_CHANGE_PASSWORD_SUCCESS, USER_CHANGE_PASSWORD_ERROR, SET_USER_CHANGE_PASSWORD_STATE } from "../actions/changePassword";
import { generateValidationErrorMsgArr } from "../helpers/funs";
import { VALIDATION_FAILURE_STATUS } from "../constants/consts";

const initialState = Map({
    loading: false,
    error: [],
});

const actionMap = {
    [USER_CHANGE_PASSWORD_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: [],
        }));
    },
    [USER_CHANGE_PASSWORD_SUCCESS]: (state, action) => {
        let newState = { loading: false };
        if (action.data && action.data.status && action.data.status !== 1) {
            let msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [USER_CHANGE_PASSWORD_ERROR]: (state, action) => {
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
    [SET_USER_CHANGE_PASSWORD_STATE]: (state, action) => {
        return state.merge(Map(action.stateData));
    },
};

export default function reducer(state = initialState, action = {}) {
    if (action && action.type) {
        var fn = actionMap[action.type];
        return fn ? fn(state, action) : state;
    }
    return state;
}