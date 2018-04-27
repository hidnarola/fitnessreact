import { Map } from "immutable";
import {
    GET_USER_BODYPARTS_REQUEST,
    GET_USER_BODYPARTS_SUCCESS,
    GET_USER_BODYPARTS_ERROR,
} from "../actions/userBodyparts";

const initialState = Map({
    loading: false,
    error: null,
    bodyparts: 0,
});

const actionMap = {
    [GET_USER_BODYPARTS_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
        }));
    },

    [GET_USER_BODYPARTS_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            bodyparts: action.data.bodyparts,
        }));
    },
    [GET_USER_BODYPARTS_ERROR]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: action.error.message,
        }));
    },
}

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}