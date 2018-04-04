import { takeLatest, put, call } from 'redux-saga/effects';
import {
    RECIPES_ADD_REQUEST,
    recipeAddError,
    recipeAddSuccess,
    recipeListSuccess,
    recipeListError,
    RECIPES_LIST_REQUEST,
    recipeDeleteSuccess,
    recipeDeleteError,
    RECIPES_DELETE_REQUEST,
    recipeSelectOneSuccess,
    recipeSelectOneError,
    RECIPES_SELECT_ONE_REQUEST,
    recipeUpdateSuccess,
    recipeUpdateError,
    RECIPES_UPDATE_REQUEST,
    recipeFilterSuccess,
    recipeFilterError,
    RECIPES_FILTER_REQUEST
} from "../../actions/admin/recipes";
import api from 'api/admin/recipes';

function getAdminRecipesData() {
    return function* (action) {
        try {
            const data = yield call(() => api.getRecipes());
            yield put(recipeListSuccess(data));
        } catch (error) {
            yield put(recipeListError(error));
        }
    }
}

function getAdminRecipeData() {
    return function* (action) {
        try {
            const _id = action._id;
            const data = yield call(() => api.getRecipe(_id));
            yield put(recipeSelectOneSuccess(data));
        } catch (error) {
            yield put(recipeSelectOneError(error));
        }
    }
}

function postAdminRecipeData() {
    return function* (action) {
        try {
            const recipeData = action.recipeData;
            const data = yield call(() => api.addRecipe(recipeData));
            yield put(recipeAddSuccess(data));
        } catch (error) {
            yield put(recipeAddError(error));
        }
    }
}

function putAdminRecipeData() {
    return function* (action) {
        try {
            const _id = action._id;
            const recipeData = action.recipeData;
            const data = yield call(() => api.updateRecipe(_id, recipeData));
            yield put(recipeUpdateSuccess(data));
        } catch (error) {
            yield put(recipeUpdateError(error));
        }
    }
}

function deleteAdminRecipeData() {
    return function* (action) {
        try {
            const _id = action._id;
            const data = yield call(() => api.deleteRecipe(_id));
            yield put(recipeDeleteSuccess(data));
        } catch (error) {
            yield put(recipeDeleteError(error));
        }
    }
}

function filterAdminRecipeData() {
    return function* (action) {
        try {
            const filterData = action.filterData;
            const data = yield call(() => api.filterRecipe(filterData));
            yield put(recipeFilterSuccess(data.data));
        } catch (error) {
            yield put(recipeFilterError(error));
        }
    }
}

export function* watchAdminRecipes() {
    yield takeLatest(RECIPES_LIST_REQUEST, getAdminRecipesData());
    yield takeLatest(RECIPES_SELECT_ONE_REQUEST, getAdminRecipeData());
    yield takeLatest(RECIPES_ADD_REQUEST, postAdminRecipeData());
    yield takeLatest(RECIPES_UPDATE_REQUEST, putAdminRecipeData());
    yield takeLatest(RECIPES_DELETE_REQUEST, deleteAdminRecipeData());
    yield takeLatest(RECIPES_FILTER_REQUEST, filterAdminRecipeData());
}

export default [
    watchAdminRecipes(),
]