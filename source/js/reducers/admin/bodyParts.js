import { Map } from "immutable";
import {
    BODY_PARTS_ADD_REQUEST,
    BODY_PARTS_ADD_SUCCESS,
    BODY_PARTS_ADD_ERROR,
    BODY_PARTS_LIST_REQUEST,
    BODY_PARTS_LIST_SUCCESS,
    BODY_PARTS_LIST_ERROR,
    BODY_PARTS_DELETE_REQUEST,
    BODY_PARTS_DELETE_SUCCESS,
    BODY_PARTS_DELETE_ERROR,
    BODY_PARTS_SELECT_ONE_REQUEST,
    BODY_PARTS_SELECT_ONE_SUCCESS,
    BODY_PARTS_SELECT_ONE_ERROR,
    BODY_PARTS_UPDATE_REQUEST,
    BODY_PARTS_UPDATE_SUCCESS,
    BODY_PARTS_UPDATE_ERROR
} from "../../actions/admin/bodyParts";

const initialState = Map({
    loading: false,
    error: null,
    bodyPart: null,
    bodyParts: null,
});

const actionMap = {
    [BODY_PARTS_LIST_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null,
            bodyParts: null,
            bodyPart: null,
        }));
    },
    [BODY_PARTS_LIST_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: null,
            bodyParts: action.data.bodyParts,
            bodyPart: null,
        }));
    },
    [BODY_PARTS_LIST_ERROR]: (state, action) => {
        let error = 'Server error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: error,
            bodyParts: null,
            bodyPart: null,
        }));
    },
    [BODY_PARTS_SELECT_ONE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null,
            bodyParts: null,
            bodyPart: null,
        }));
    },
    [BODY_PARTS_SELECT_ONE_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: null,
            bodyParts: null,
            bodyPart: action.data.bodyPart,
        }));
    },
    [BODY_PARTS_SELECT_ONE_ERROR]: (state, action) => {
        let error = 'Server error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: error,
            bodyParts: null,
            bodyPart: null,
        }));
    },
    [BODY_PARTS_ADD_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null,
            bodyParts: null,
            bodyPart: null
        }));
    },
    [BODY_PARTS_ADD_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: null,
            bodyParts: null,
            bodyPart: action.data.bodyPart
        }));
    },
    [BODY_PARTS_ADD_ERROR]: (state, action) => {
        let error = 'Server error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: error,
            bodyParts: null,
            bodyPart: null
        }));
    },
    [BODY_PARTS_UPDATE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null,
            bodyParts: null,
            bodyPart: null
        }));
    },
    [BODY_PARTS_UPDATE_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: null,
            bodyParts: null,
            bodyPart: action.data.bodyPart
        }));
    },
    [BODY_PARTS_UPDATE_ERROR]: (state, action) => {
        let error = 'Server error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: error,
            bodyParts: null,
            bodyPart: null
        }));
    },
    [BODY_PARTS_DELETE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null,
            bodyParts: null,
            bodyPart: null
        }));
    },
    [BODY_PARTS_DELETE_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: null,
            bodyParts: null,
            bodyPart: null
        }));
    },
    [BODY_PARTS_DELETE_ERROR]: (state, action) => {
        let error = 'Server error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: error,
            bodyParts: null,
            bodyPart: null
        }));
    },
};

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}