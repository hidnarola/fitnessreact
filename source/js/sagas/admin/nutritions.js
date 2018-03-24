import { takeLatest, put, call } from 'redux-saga/effects';
import { NUTRITIONS_ADD_REQUEST, nutritionAddError, nutritionAddSuccess } from "../../actions/admin/nutritions";
import api from 'api/admin/nutritions';

function postAdminNutritionData() {
    return function* (action) {
        try {
            const nutritionData = action.nutritionData;
            const data = yield call(() => api.addNutrition(nutritionData));
            yield put(nutritionAddSuccess(data));
        } catch (error) {
            yield put(nutritionAddError(error));
        }
    }
}

export function* watchAdminNutritionAdd() {
    yield takeLatest(NUTRITIONS_ADD_REQUEST, postAdminNutritionData());
}

export default [
    watchAdminNutritionAdd(),
]