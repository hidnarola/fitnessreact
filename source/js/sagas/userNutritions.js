import { takeLatest, put, call } from 'redux-saga/effects';
import api from 'api/userNutritions';
import {
    GET_USER_TODAYS_MEAL_REQUEST,
    getUserTodaysMealSuccess,
    getUserTodaysMealError,
    getUserNutritionRecipeDetailsSuccess,
    getUserNutritionRecipeDetailsError,
    GET_USER_NUTRITION_RECIPE_DETAILS_REQUEST,
    deleteUserRecipeError,
    deleteUserRecipeSuccess,
    DELETE_USER_RECIPE_REQUEST
} from '../actions/userNutritions';

function getUserTodaysMealData() {
    return function* (action) {
        try {
            let requestData = action.requestData;
            const data = yield call(() => api.getUserTodaysMeal(requestData));
            yield put(getUserTodaysMealSuccess(data));
        } catch (error) {
            yield put(getUserTodaysMealError(error));
        }
    }
}

function getUserRecipeDetailsData() {
    return function* (action) {
        try {
            let _id = action._id;
            const data = yield call(() => api.getUserRecipeDetails(_id));
            yield put(getUserNutritionRecipeDetailsSuccess(data));
        } catch (error) {
            yield put(getUserNutritionRecipeDetailsError(error));
        }
    }
}

function deleteUserRecipeData() {
    return function* (action) {
        try {
            let _id = action._id;
            const data = yield call(() => api.deleteUserRecipe(_id));
            yield put(deleteUserRecipeSuccess(data));
        } catch (error) {
            yield put(deleteUserRecipeError(error));
        }
    }
}

export function* watchUserNutritionsData() {
    yield takeLatest(GET_USER_TODAYS_MEAL_REQUEST, getUserTodaysMealData());
    yield takeLatest(GET_USER_NUTRITION_RECIPE_DETAILS_REQUEST, getUserRecipeDetailsData());
    yield takeLatest(DELETE_USER_RECIPE_REQUEST, deleteUserRecipeData());
}

export default [
    watchUserNutritionsData()
];