import { Map } from "immutable";
import { NUTRITIONS_ADD_REQUEST, NUTRITIONS_ADD_SUCCESS, NUTRITIONS_ADD_ERROR, NUTRITIONS_LIST_REQUEST, NUTRITIONS_LIST_SUCCESS, NUTRITIONS_LIST_ERROR, NUTRITIONS_DELETE_REQUEST, NUTRITIONS_DELETE_SUCCESS, NUTRITIONS_DELETE_ERROR, NUTRITIONS_SELECT_ONE_REQUEST, NUTRITIONS_SELECT_ONE_SUCCESS, NUTRITIONS_SELECT_ONE_ERROR, NUTRITIONS_UPDATE_REQUEST, NUTRITIONS_UPDATE_SUCCESS, NUTRITIONS_UPDATE_ERROR } from "../../actions/admin/nutritions";

const initialState = Map({
    loading: false,
    error: null,
    nutrition: null,
    nutritions: null,
});

const actionMap = {
    [NUTRITIONS_LIST_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null,
            nutritions: null,
        }));
    },
    [NUTRITIONS_LIST_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: null,
            nutritions: action.data.nutritions,
        }));
    },
    [NUTRITIONS_LIST_ERROR]: (state, action) => {
        let error = 'Server error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: error,
            nutritions: null,
        }));
    },
    [NUTRITIONS_SELECT_ONE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null,
            nutrition: null,
        }));
    },
    [NUTRITIONS_SELECT_ONE_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: null,
            nutrition: action.data.nutrition,
        }));
    },
    [NUTRITIONS_SELECT_ONE_ERROR]: (state, action) => {
        let error = 'Server error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: error,
            nutrition: null,
        }));
    },
    [NUTRITIONS_ADD_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null,
            nutrition: null
        }));
    },
    [NUTRITIONS_ADD_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: null,
            nutrition: action.data.nutrition
        }));
    },
    [NUTRITIONS_ADD_ERROR]: (state, action) => {
        let error = 'Server error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: error,
            nutrition: null
        }));
    },
    [NUTRITIONS_UPDATE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null,
            nutrition: null
        }));
    },
    [NUTRITIONS_UPDATE_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: null,
            nutrition: action.data.nutrition
        }));
    },
    [NUTRITIONS_UPDATE_ERROR]: (state, action) => {
        let error = 'Server error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: error,
            nutrition: null
        }));
    },
    [NUTRITIONS_DELETE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null
        }));
    },
    [NUTRITIONS_DELETE_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: null
        }));
    },
    [NUTRITIONS_DELETE_ERROR]: (state, action) => {
        let error = 'Server error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: error,
        }));
    },
};

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}