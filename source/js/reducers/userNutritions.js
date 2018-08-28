import { Map } from "immutable";
import {
    GET_USER_TODAYS_MEAL_REQUEST,
    GET_USER_TODAYS_MEAL_SUCCESS,
    GET_USER_TODAYS_MEAL_ERROR,
    GET_USER_NUTRITION_RECIPE_DETAILS_REQUEST,
    GET_USER_NUTRITION_RECIPE_DETAILS_SUCCESS,
    GET_USER_NUTRITION_RECIPE_DETAILS_ERROR,
    DELETE_USER_RECIPE_REQUEST,
    DELETE_USER_RECIPE_SUCCESS,
    DELETE_USER_RECIPE_ERROR,
    SEARCH_RECIPES_API_REQUEST,
    SEARCH_RECIPES_API_SUCCESS,
    SEARCH_RECIPES_API_ERROR,
    ADD_USER_RECIPE_REQUEST,
    ADD_USER_RECIPE_SUCCESS,
    ADD_USER_RECIPE_ERROR
} from "../actions/userNutritions";
import { VALIDATION_FAILURE_STATUS } from "../constants/consts";
import { generateValidationErrorMsgArr } from "../helpers/funs";

const initialState = Map({
    loading: false,
    error: [],
    todaysMeal: [],
    recipe: {},
    searchRecipeLoading: false,
    searchRecipes: [],
    searchRecipeError: [],
});

const actionMap = {
    [GET_USER_TODAYS_MEAL_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
        }));
    },
    [GET_USER_TODAYS_MEAL_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            todaysMeal: action.data.todays_meal,
        }));
    },
    [GET_USER_TODAYS_MEAL_ERROR]: (state, action) => {
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
    [GET_USER_NUTRITION_RECIPE_DETAILS_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
        }));
    },
    [GET_USER_NUTRITION_RECIPE_DETAILS_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            recipe: action.data.user_recipe,
        }));
    },
    [GET_USER_NUTRITION_RECIPE_DETAILS_ERROR]: (state, action) => {
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
    [DELETE_USER_RECIPE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
        }));
    },
    [DELETE_USER_RECIPE_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
        }));
    },
    [DELETE_USER_RECIPE_ERROR]: (state, action) => {
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
    [SEARCH_RECIPES_API_REQUEST]: (state, action) => {
        return state.merge(Map({
            searchRecipeLoading: true,
        }));
    },
    [SEARCH_RECIPES_API_SUCCESS]: (state, action) => {
        return state.merge(Map({
            searchRecipeLoading: false,
            searchRecipes: action.data.hits,
        }));
    },
    [SEARCH_RECIPES_API_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            searchRecipeLoading: false,
            error: error,
        }));
    },
    [ADD_USER_RECIPE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: [],
        }));
    },
    [ADD_USER_RECIPE_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: [],
        }));
    },
    [ADD_USER_RECIPE_ERROR]: (state, action) => {
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
}

export default function reducer(state = initialState, action = {}) {
    if (action && action.type) {
        var fn = actionMap[action.type];
        return fn ? fn(state, action) : state;
    }
    return state;
}