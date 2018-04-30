// import { takeLatest, put, call } from 'redux-saga/effects';
// import { NUTRITIONS_ADD_REQUEST, nutritionAddError, nutritionAddSuccess, nutritionListSuccess, nutritionListError, NUTRITIONS_LIST_REQUEST, nutritionDeleteSuccess, nutritionDeleteError, NUTRITIONS_DELETE_REQUEST, nutritionSelectOneSuccess, nutritionSelectOneError, NUTRITIONS_SELECT_ONE_REQUEST, nutritionUpdateSuccess, nutritionUpdateError, NUTRITIONS_UPDATE_REQUEST } from "../../actions/admin/nutritions";
// import api from 'api/admin/nutritions';

// function getAdminNutritionsData() {
//     return function* (action) {
//         try {
//             const data = yield call(() => api.getNutritions());
//             yield put(nutritionListSuccess(data));
//         } catch (error) {
//             yield put(nutritionListError(error));
//         }
//     }
// }

// function getAdminNutritionData() {
//     return function* (action) {
//         try {
//             const _id = action._id;
//             const data = yield call(() => api.getNutrition(_id));
//             yield put(nutritionSelectOneSuccess(data));
//         } catch (error) {
//             yield put(nutritionSelectOneError(error));
//         }
//     }
// }

// function postAdminNutritionData() {
//     return function* (action) {
//         try {
//             const nutritionData = action.nutritionData;
//             const data = yield call(() => api.addNutrition(nutritionData));
//             yield put(nutritionAddSuccess(data));
//         } catch (error) {
//             yield put(nutritionAddError(error));
//         }
//     }
// }

// function putAdminNutritionData() {
//     return function* (action) {
//         try {
//             const _id = action._id;
//             const nutritionData = action.nutritionData;
//             const data = yield call(() => api.updateNutrition(_id, nutritionData));
//             yield put(nutritionUpdateSuccess(data));
//         } catch (error) {
//             yield put(nutritionUpdateError(error));
//         }
//     }
// }

// function deleteAdminNutritionData() {
//     return function* (action) {
//         try {
//             const _id = action._id;
//             const data = yield call(() => api.deleteNutrition(_id));
//             yield put(nutritionDeleteSuccess(data));
//         } catch (error) {
//             yield put(nutritionDeleteError(error));
//         }
//     }
// }

// export function* watchAdminNutritions() {
//     yield takeLatest(NUTRITIONS_LIST_REQUEST, getAdminNutritionsData());
//     yield takeLatest(NUTRITIONS_SELECT_ONE_REQUEST, getAdminNutritionData());
//     yield takeLatest(NUTRITIONS_ADD_REQUEST, postAdminNutritionData());
//     yield takeLatest(NUTRITIONS_UPDATE_REQUEST, putAdminNutritionData());
//     yield takeLatest(NUTRITIONS_DELETE_REQUEST, deleteAdminNutritionData());
// }

// export default [
//     watchAdminNutritions(),
// ]