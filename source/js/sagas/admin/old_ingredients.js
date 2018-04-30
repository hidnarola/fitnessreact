// import { takeLatest, put, call } from 'redux-saga/effects';
// import {
//     INGREDIENTS_ADD_REQUEST,
//     ingredientAddError,
//     ingredientAddSuccess,
//     ingredientListSuccess,
//     ingredientListError,
//     INGREDIENTS_LIST_REQUEST,
//     ingredientDeleteSuccess,
//     ingredientDeleteError,
//     INGREDIENTS_DELETE_REQUEST,
//     ingredientSelectOneSuccess,
//     ingredientSelectOneError,
//     INGREDIENTS_SELECT_ONE_REQUEST,
//     ingredientUpdateSuccess,
//     ingredientUpdateError,
//     INGREDIENTS_UPDATE_REQUEST,
//     ingredientFilterSuccess,
//     ingredientFilterError,
//     INGREDIENTS_FILTER_REQUEST
// } from "../../actions/admin/ingredients";
// import api from 'api/admin/ingredients';

// function getAdminIngredientsData() {
//     return function* (action) {
//         try {
//             const data = yield call(() => api.getIngredients());
//             yield put(ingredientListSuccess(data));
//         } catch (error) {
//             yield put(ingredientListError(error));
//         }
//     }
// }

// function getAdminIngredientData() {
//     return function* (action) {
//         try {
//             const _id = action._id;
//             const data = yield call(() => api.getIngredient(_id));
//             yield put(ingredientSelectOneSuccess(data));
//         } catch (error) {
//             yield put(ingredientSelectOneError(error));
//         }
//     }
// }

// function postAdminIngredientData() {
//     return function* (action) {
//         try {
//             const ingredientData = action.ingredientData;
//             const data = yield call(() => api.addIngredient(ingredientData));
//             yield put(ingredientAddSuccess(data));
//         } catch (error) {
//             yield put(ingredientAddError(error));
//         }
//     }
// }

// function putAdminIngredientData() {
//     return function* (action) {
//         try {
//             const _id = action._id;
//             const ingredientData = action.ingredientData;
//             const data = yield call(() => api.updateIngredient(_id, ingredientData));
//             yield put(ingredientUpdateSuccess(data));
//         } catch (error) {
//             yield put(ingredientUpdateError(error));
//         }
//     }
// }

// function deleteAdminIngredientData() {
//     return function* (action) {
//         try {
//             const _id = action._id;
//             const data = yield call(() => api.deleteIngredient(_id));
//             yield put(ingredientDeleteSuccess(data));
//         } catch (error) {
//             yield put(ingredientDeleteError(error));
//         }
//     }
// }

// function filterAdminIngredientData() {
//     return function* (action) {
//         try {
//             const filterData = action.filterData;
//             const data = yield call(() => api.filterIngredient(filterData));
//             yield put(ingredientFilterSuccess(data.data));
//         } catch (error) {
//             yield put(ingredientFilterError(error));
//         }
//     }
// }

// export function* watchAdminIngredients() {
//     yield takeLatest(INGREDIENTS_LIST_REQUEST, getAdminIngredientsData());
//     yield takeLatest(INGREDIENTS_SELECT_ONE_REQUEST, getAdminIngredientData());
//     yield takeLatest(INGREDIENTS_ADD_REQUEST, postAdminIngredientData());
//     yield takeLatest(INGREDIENTS_UPDATE_REQUEST, putAdminIngredientData());
//     yield takeLatest(INGREDIENTS_DELETE_REQUEST, deleteAdminIngredientData());
//     yield takeLatest(INGREDIENTS_FILTER_REQUEST, filterAdminIngredientData());
// }

// export default [
//     watchAdminIngredients(),
// ]