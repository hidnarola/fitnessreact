import { takeLatest, put, call } from 'redux-saga/effects';
import {
    EQUIPMENTS_ADD_REQUEST,
    equipmentAddError,
    equipmentAddSuccess,
    equipmentListSuccess,
    equipmentListError,
    EQUIPMENTS_LIST_REQUEST,
    equipmentDeleteSuccess,
    equipmentDeleteError,
    EQUIPMENTS_DELETE_REQUEST,
    equipmentSelectOneSuccess,
    equipmentSelectOneError,
    EQUIPMENTS_SELECT_ONE_REQUEST,
    equipmentUpdateSuccess,
    equipmentUpdateError,
    EQUIPMENTS_UPDATE_REQUEST
} from "../../actions/admin/equipments";
import api from 'api/admin/equipments';

function getAdminEquipmentsData() {
    return function* (action) {
        try {
            const data = yield call(() => api.getEquipments());
            yield put(equipmentListSuccess(data));
        } catch (error) {
            yield put(equipmentListError(error));
        }
    }
}

function getAdminEquipmentData() {
    return function* (action) {
        try {
            const _id = action._id;
            const data = yield call(() => api.getEquipment(_id));
            yield put(equipmentSelectOneSuccess(data));
        } catch (error) {
            yield put(equipmentSelectOneError(error));
        }
    }
}

function postAdminEquipmentData() {
    return function* (action) {
        try {
            const equipmentData = action.equipmentData;
            const data = yield call(() => api.addEquipment(equipmentData));
            yield put(equipmentAddSuccess(data));
        } catch (error) {
            yield put(equipmentAddError(error));
        }
    }
}

function putAdminEquipmentData() {
    return function* (action) {
        try {
            const _id = action._id;
            const equipmentData = action.equipmentData;
            const data = yield call(() => api.updateEquipment(_id, equipmentData));
            yield put(equipmentUpdateSuccess(data));
        } catch (error) {
            yield put(equipmentUpdateError(error));
        }
    }
}

function deleteAdminEquipmentData() {
    return function* (action) {
        try {
            const _id = action._id;
            const data = yield call(() => api.deleteEquipment(_id));
            yield put(equipmentDeleteSuccess(data));
        } catch (error) {
            yield put(equipmentDeleteError(error));
        }
    }
}

export function* watchAdminEquipments() {
    yield takeLatest(EQUIPMENTS_LIST_REQUEST, getAdminEquipmentsData());
    yield takeLatest(EQUIPMENTS_SELECT_ONE_REQUEST, getAdminEquipmentData());
    yield takeLatest(EQUIPMENTS_ADD_REQUEST, postAdminEquipmentData());
    yield takeLatest(EQUIPMENTS_UPDATE_REQUEST, putAdminEquipmentData());
    yield takeLatest(EQUIPMENTS_DELETE_REQUEST, deleteAdminEquipmentData());
}

export default [
    watchAdminEquipments(),
]