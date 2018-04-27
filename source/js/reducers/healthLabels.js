import { Map } from "immutable";
import {
    GET_HEALTH_LABELS_REQUEST,
    GET_HEALTH_LABELS_SUCCESS,
    GET_HEALTH_LABELS_ERROR,
} from "../actions/healthLabels";

const initialState = Map({
    loading: false,
    error: null,
    healthLabels: {},
});

const actionMap = {
    [GET_HEALTH_LABELS_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
        }));
    },
    [GET_HEALTH_LABELS_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            healthLabels: action.data.health_labels,
        }));
    },
    [GET_HEALTH_LABELS_ERROR]: (state, action) => {
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