import { Map } from "immutable";
import { VALIDATION_FAILURE_STATUS } from "../../constants/consts";
import { generateValidationErrorMsgArr } from "../../helpers/funs";
import { GET_ADMIN_DASHBOARD_REQUEST, GET_ADMIN_DASHBOARD_SUCCESS, GET_ADMIN_DASHBOARD_ERROR, SET_ADMIN_DASHBOARD_STATE, RESET_ADMIN_DASHBOARD_STATE } from "../../actions/admin/dashboard";

const initialState = Map({
    loading: false,
    data: null,
    error: [],
});

const actionMap = {
    [GET_ADMIN_DASHBOARD_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            data: null,
            error: [],
        }));
    },
    [GET_ADMIN_DASHBOARD_SUCCESS]: (state, action) => {
        let newState = { loading: false };
        if (action.data && action.data.status && action.data.status === 1) {
            newState.data = action.data.data;
        } else {
            let msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [GET_ADMIN_DASHBOARD_ERROR]: (state, action) => {
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
    [SET_ADMIN_DASHBOARD_STATE]: (state, action) => {
        return state.merge(Map(action.stateData));
    },
    [RESET_ADMIN_DASHBOARD_STATE]: (state, action) => {
        return initialState;
    },
};

export default function reducer(state = initialState, action = {}) {
    if (action && action.type) {
        var fn = actionMap[action.type];
        return fn ? fn(state, action) : state;
    }
    return state;
}