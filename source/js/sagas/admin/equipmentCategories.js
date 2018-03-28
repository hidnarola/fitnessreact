import { takeLatest, put, call } from 'redux-saga/effects';
import api from 'api/admin/equipmentCategories';
import {
    equipmentCategoryListSuccess,
    equipmentCategoryListError,
    EQUIPMENT_CATEGORIES_LIST_REQUEST
} from '../../actions/admin/equipmentCategories';

function getAdminEquipmentCategoriesData() {
    return function* (action) {
        try {
            const data = yield call(() => api.getEquipmentCategories());
            yield put(equipmentCategoryListSuccess(data));
        } catch (error) {
            yield put(equipmentCategoryListError(error));
        }
    }
}

export function* watchAdminEquipmentCategories() {
    yield takeLatest(EQUIPMENT_CATEGORIES_LIST_REQUEST, getAdminEquipmentCategoriesData());
}

export default [
    watchAdminEquipmentCategories(),
]