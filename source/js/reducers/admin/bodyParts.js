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
    BODY_PARTS_UPDATE_ERROR,
    FILTER_BODY_PARTS_REQUEST,
    FILTER_BODY_PARTS_SUCCESS,
    FILTER_BODY_PARTS_ERROR
} from "../../actions/admin/bodyParts";
import { VALIDATION_FAILURE_STATUS } from "../../constants/consts";
import { generateValidationErrorMsgArr } from "../../helpers/funs";

const initialState = Map({
    loading: false,
    error: null,
    bodyPart: null,
    bodyParts: null,
    filteredBodyParts: [],
    filteredTotalPages: 0,
    filteredLoading: false,
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
            bodyParts: action.data.bodyparts,
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
    [FILTER_BODY_PARTS_REQUEST]: (state, action) => {
        return state.merge(Map({
            filteredLoading: true,
            filteredBodyParts: [],
            filteredTotalPages: 0,
            error: [],
        }));
    },
    [FILTER_BODY_PARTS_SUCCESS]: (state, action) => {
        let newState = {
            filteredLoading: false
        };
        if (action.data && action.data.filtered_bodyparts && action.data.filtered_bodyparts.length > 0) {
            newState.filteredBodyParts = action.data.filtered_bodyparts;
            newState.filteredTotalPages = action.data.filtered_total_pages;
        }
        return state.merge(Map(newState));
    },
    [FILTER_BODY_PARTS_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            filteredLoading: false,
            error: error,
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
            bodyPart: action.data.bodypart,
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
            bodyPart: action.data.bodypart
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
            bodyPart: action.data.bodypart
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
    if (action && action.type) {
        var fn = actionMap[action.type];
        return fn ? fn(state, action) : state;
    }
    return state;
}