import { Map } from "immutable";
import {
    BADGE_CATEGORIES_ADD_REQUEST,
    BADGE_CATEGORIES_ADD_SUCCESS,
    BADGE_CATEGORIES_ADD_ERROR,
    BADGE_CATEGORIES_LIST_REQUEST,
    BADGE_CATEGORIES_LIST_SUCCESS,
    BADGE_CATEGORIES_LIST_ERROR,
    BADGE_CATEGORIES_DELETE_REQUEST,
    BADGE_CATEGORIES_DELETE_SUCCESS,
    BADGE_CATEGORIES_DELETE_ERROR,
    BADGE_CATEGORIES_SELECT_ONE_REQUEST,
    BADGE_CATEGORIES_SELECT_ONE_SUCCESS,
    BADGE_CATEGORIES_SELECT_ONE_ERROR,
    BADGE_CATEGORIES_UPDATE_REQUEST,
    BADGE_CATEGORIES_UPDATE_SUCCESS,
    BADGE_CATEGORIES_UPDATE_ERROR,
    BADGE_CATEGORIES_FILTER_REQUEST,
    BADGE_CATEGORIES_FILTER_SUCCESS,
    BADGE_CATEGORIES_FILTER_ERROR
} from "../../actions/admin/badgeCategories";

const initialState = Map({
    loading: false,
    error: null,
    badgeCategories: [],
    filteredBudgeCategories: [],
    filteredTotalPages: 0,
    badgeCategory: null,
});

const actionMap = {
    [BADGE_CATEGORIES_LIST_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
        }));
    },
    [BADGE_CATEGORIES_LIST_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            badgeCategories: action.data.badge_categories,
        }));
    },
    [BADGE_CATEGORIES_LIST_ERROR]: (state, action) => {
        let error = 'Server error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: error,
        }));
    },
    [BADGE_CATEGORIES_FILTER_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
        }));
    },
    [BADGE_CATEGORIES_FILTER_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            filteredBudgeCategories: action.data.filtered_badge_categories,
            filteredTotalPages: action.data.filtered_total_pages,
        }));
    },
    [BADGE_CATEGORIES_FILTER_ERROR]: (state, action) => {
        let error = 'Server error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: error,
        }));
    },
    [BADGE_CATEGORIES_SELECT_ONE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
        }));
    },
    [BADGE_CATEGORIES_SELECT_ONE_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            badgeCategory: action.data.badge_category,
        }));
    },
    [BADGE_CATEGORIES_SELECT_ONE_ERROR]: (state, action) => {
        let error = 'Server error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: error,
        }));
    },
    [BADGE_CATEGORIES_ADD_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
        }));
    },
    [BADGE_CATEGORIES_ADD_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            badgeCategory: action.data.badge_category
        }));
    },
    [BADGE_CATEGORIES_ADD_ERROR]: (state, action) => {
        let error = 'Server error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: error,
        }));
    },
    [BADGE_CATEGORIES_UPDATE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
        }));
    },
    [BADGE_CATEGORIES_UPDATE_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            badgeCategory: action.data.badge_category
        }));
    },
    [BADGE_CATEGORIES_UPDATE_ERROR]: (state, action) => {
        let error = 'Server error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: error,
        }));
    },
    [BADGE_CATEGORIES_DELETE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
        }));
    },
    [BADGE_CATEGORIES_DELETE_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
        }));
    },
    [BADGE_CATEGORIES_DELETE_ERROR]: (state, action) => {
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