import { Map } from "../../../node_modules/immutable";
import { GET_DASHBOARD_PAGE_REQUEST, GET_DASHBOARD_PAGE_SUCCESS, GET_DASHBOARD_PAGE_ERROR } from "../actions/dashboard";
import { VALIDATION_FAILURE_STATUS } from "../constants/consts";
import { generateValidationErrorMsgArr } from "../helpers/funs";

const initialState = Map({
    loading: false,
    userWidgets: {},
    error: [],
});

const actionMap = {
    [GET_DASHBOARD_PAGE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            userWidgets: {},
            error: [],
        }));
    },
    [GET_DASHBOARD_PAGE_SUCCESS]: (state, action) => {
        let newState = { loading: false };
        if (action.data && action.data.status && action.data.status === 1) {
            newState.userWidgets = action.data.user_widgets;
        } else {
            let msg = (newState.data.message) ? newState.data.message : 'Something went wrong! please try again later';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [GET_DASHBOARD_PAGE_ERROR]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: prepareResponseError(),
        }));
    },
};

function prepareResponseError() {
    let error = [];
    if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
        error = generateValidationErrorMsgArr(action.error.response.message);
    } else if (action.error && action.error.message) {
        error = [action.error.message];
    } else {
        error = ['Something went wrong! please try again later'];
    }
    return error;
}

export default function reducer(state = initialState, action = {}) {
    if (action && action.type) {
        var fn = actionMap[action.type];
        return fn ? fn(state, action) : state;
    }
    return state;
}