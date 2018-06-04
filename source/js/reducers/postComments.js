import { Map } from "immutable";
import {
    COMMENT_ON_POST_REQUEST,
    COMMENT_ON_POST_SUCCESS,
    COMMENT_ON_POST_ERROR
} from "../actions/postComments";
import { VALIDATION_FAILURE_STATUS } from "../constants/consts";
import { generateValidationErrorMsgArr } from "../helpers/funs";

const initialState = Map({
    loading: false,
    post: null,
    error: [],
});

const actionMap = {
    [COMMENT_ON_POST_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            post: null,
            error: [],
        }));
    },
    [COMMENT_ON_POST_SUCCESS]: (state, action) => {
        var newState = {
            loading: false,
        };
        if (action.data.status === 1) {
            newState.post = action.data.timeline;
        } else {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [COMMENT_ON_POST_ERROR]: (state, action) => {
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
    }
}

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}