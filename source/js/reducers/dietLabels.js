import { Map } from "immutable";
import {
    GET_DIET_LABELS_REQUEST,
    GET_DIET_LABELS_SUCCESS,
    GET_DIET_LABELS_ERROR,
} from "../actions/dietLabels";

const initialState = Map({
    loading: false,
    error: null,
    dietLabels: {},
});

const actionMap = {
    [GET_DIET_LABELS_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
        }));
    },
    [GET_DIET_LABELS_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            dietLabels: action.data.labels,
        }));
    },
    [GET_DIET_LABELS_ERROR]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: action.error.message,
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