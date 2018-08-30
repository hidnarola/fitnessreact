import { takeLatest, put, call } from 'redux-saga/effects';
import api from 'api/admin/equipmentCategories';
import {
    equipmentCategoryListSuccess,
    equipmentCategoryListError,
    EQUIPMENT_CATEGORIES_LIST_REQUEST,
    equipmentCategorySelectOneSuccess,
    equipmentCategorySelectOneError,
    filterEquipmentCategoriesSuccess,
    filterEquipmentCategoriesError,
    equipmentCategoryAddSuccess,
    equipmentCategoryAddError,
    equipmentCategoryUpdateSuccess,
    equipmentCategoryUpdateError,
    equipmentCategoryDeleteSuccess,
    equipmentCategoryDeleteError,
    EQUIPMENT_CATEGORIES_SELECT_ONE_REQUEST,
    FILTER_EQUIPMENT_CATEGORIES_REQUEST,
    EQUIPMENT_CATEGORIES_ADD_REQUEST,
    EQUIPMENT_CATEGORIES_UPDATE_REQUEST,
    EQUIPMENT_CATEGORIES_DELETE_REQUEST
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

function getAdminEquipmentCategoryData() {
    return function* (action) {
        try {
            const _id = action._id;
            const data = yield call(() => api.getEquipmentCategory(_id));
            yield put(equipmentCategorySelectOneSuccess(data));
        } catch (error) {
            yield put(equipmentCategorySelectOneError(error));
        }
    }
}

function filterAdminEquipmentCategoriesData() {
    return function* (action) {
        try {
            const filterData = action.filterData;
            const data = yield call(() => api.filterEquipmentCategories(filterData));
            yield put(filterEquipmentCategoriesSuccess(data));
        } catch (error) {
            yield put(filterEquipmentCategoriesError(error));
        }
    }
}

function postAdminEquipmentCategoryData() {
    return function* (action) {
        try {
            const requestData = action.requestData;
            const data = yield call(() => api.addEquipmentCategory(requestData));
            yield put(equipmentCategoryAddSuccess(data));
        } catch (error) {
            yield put(equipmentCategoryAddError(error));
        }
    }
}

function putAdminEquipmentCategoryData() {
    return function* (action) {
        try {
            const _id = action._id;
            const requestData = action.requestData;
            const data = yield call(() => api.updateEquipmentCategory(_id, requestData));
            yield put(equipmentCategoryUpdateSuccess(data));
        } catch (error) {
            yield put(equipmentCategoryUpdateError(error));
        }
    }
}

function deleteAdminEquipmentCategoryData() {
    return function* (action) {
        try {
            const _id = action._id;
            const data = yield call(() => api.deleteEquipmentCategory(_id));
            yield put(equipmentCategoryDeleteSuccess(data));
        } catch (error) {
            yield put(equipmentCategoryDeleteError(error));
        }
    }
}

export function* watchAdminEquipmentCategories() {
    yield takeLatest(EQUIPMENT_CATEGORIES_LIST_REQUEST, getAdminEquipmentCategoriesData());
    yield takeLatest(EQUIPMENT_CATEGORIES_SELECT_ONE_REQUEST, getAdminEquipmentCategoryData());
    yield takeLatest(FILTER_EQUIPMENT_CATEGORIES_REQUEST, filterAdminEquipmentCategoriesData());
    yield takeLatest(EQUIPMENT_CATEGORIES_ADD_REQUEST, postAdminEquipmentCategoryData());
    yield takeLatest(EQUIPMENT_CATEGORIES_UPDATE_REQUEST, putAdminEquipmentCategoryData());
    yield takeLatest(EQUIPMENT_CATEGORIES_DELETE_REQUEST, deleteAdminEquipmentCategoryData());
}

export default [
    watchAdminEquipmentCategories(),
]