import { Map } from "../../../node_modules/immutable";
import {
    GET_USER_STATS_REQUEST,
    GET_USER_STATS_SUCCESS,
    GET_USER_STATS_ERROR,
} from "../actions/userStats";
import { VALIDATION_FAILURE_STATUS } from "../constants/consts";
import { generateValidationErrorMsgArr } from "../helpers/funs";

const initialState = Map({
    loading: false,
    stats: null,
    selectedType: null,
    error: [],
});

const actionMap = {
    [GET_USER_STATS_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            stats: null,
            selectedType: (action.requestData && action.requestData.type) ? action.requestData.type : null,
            error: [],
        }));
    },
    [GET_USER_STATS_SUCCESS]: (state, action) => {
        var newState = {
            loading: false,
        };
        if (action.data && typeof action.data.status !== 'undefined' && action.data.status === 1) {
            newState.stats = action.data.stats;
        } else {
            let msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [GET_USER_STATS_ERROR]: (state, action) => {
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
};

export default function reducer(state = initialState, action = {}) {
    var fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}