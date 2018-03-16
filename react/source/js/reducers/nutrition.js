import { Map } from "immutable";
import { GET_NUTRITION_START, GET_NUTRITION_SUCCESS, GET_NUTRITION_ERROR } from "../actions/nutrition";

const initialState = Map({
    loading: false,
    error: null,
    todaysMeal: null,
    mealPlanStatus: null,
    mealPlanNutritionChart: null,
});

const actionMap = {
    [GET_NUTRITION_START]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null,
            todaysMeal: null,
            mealPlanStatus: null,
            mealPlanNutritionChart: null,
        }));
    },
    [GET_NUTRITION_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: null,
            todaysMeal: action.data.todaysMeal,
            mealPlanStatus: action.data.mealPlanStatus,
            mealPlanNutritionChart: action.data.mealPlanNutritionChart,
        }));
    },
    [GET_NUTRITION_ERROR]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: action.error.message,
            todaysMeal: null,
            mealPlanStatus: null,
            mealPlanNutritionChart: null,
        }));
    }
};

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}