import { Map } from "immutable";
import {
    GET_USER_NUTRITION_PREFERENCES_REQUEST,
    GET_USER_NUTRITION_PREFERENCES_SUCCESS,
    GET_USER_NUTRITION_PREFERENCES_ERROR,
    SAVE_USER_NUTRITION_PREFERENCES_REQUEST,
    SAVE_USER_NUTRITION_PREFERENCES_SUCCESS,
    SAVE_USER_NUTRITION_PREFERENCES_ERROR,
    RESET_USER_NUTRITION_PREFERENCES_REQUEST,
    RESET_USER_NUTRITION_PREFERENCES_SUCCESS,
    RESET_USER_NUTRITION_PREFERENCES_ERROR
} from "../actions/userNutritionPreferences";

const initialState = Map({
    loading: false,
    error: null,
    dietRestrictionLabels: [],
    excludeIngredients: [],
    healthRestrictionLabels: [],
    maxRecipeTime: [],
    nutritionTargets: [],
});

const actionMap = {
    [GET_USER_NUTRITION_PREFERENCES_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
        }));
    },
    [GET_USER_NUTRITION_PREFERENCES_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            dietRestrictionLabels: action.data.nutrition_preference.dietRestrictionLabels,
            excludeIngredients: action.data.nutrition_preference.excludeIngredients,
            healthRestrictionLabels: action.data.nutrition_preference.healthRestrictionLabels,
            maxRecipeTime: action.data.nutrition_preference.maxRecipeTime,
            nutritionTargets: action.data.nutrition_preference.nutritionTargets,
        }));
    },
    [GET_USER_NUTRITION_PREFERENCES_ERROR]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: action.error.message,
        }));
    },
    [SAVE_USER_NUTRITION_PREFERENCES_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
        }));
    },
    [SAVE_USER_NUTRITION_PREFERENCES_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
        }));
    },
    [SAVE_USER_NUTRITION_PREFERENCES_ERROR]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: action.error.message,
        }));
    },
    [RESET_USER_NUTRITION_PREFERENCES_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
        }));
    },
    [RESET_USER_NUTRITION_PREFERENCES_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
        }));
    },
    [RESET_USER_NUTRITION_PREFERENCES_ERROR]: (state, action) => {
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