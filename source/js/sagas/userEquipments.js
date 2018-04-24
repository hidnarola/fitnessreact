import { takeLatest, put, call } from 'redux-saga/effects';
import api from 'api/userEquipments';
import {
    getUserEquipmentsSuccess,
    getUserEquipmentsError,
    GET_USER_EQUIPMENTS_REQUEST,
    SAVE_USER_EQUIPMENTS_REQUEST,
    saveUserEquipmentsError,
    saveUserEquipmentsSuccess
} from '../actions/userEquipments';

function fetchUserEquipmentsData() {
    return function* (action) {
        try {
            const data = yield call(() => api.getUserEquipments());
            yield put(getUserEquipmentsSuccess(data));
        } catch (error) {
            yield put(getUserEquipmentsError(error));
        }
    }
}

function saveUserEquipmentsData() {
    return function* (action) {
        try {
            let requestData = action.requestData;
            const data = yield call(() => api.postUserEquipments(requestData));
            yield put(saveUserEquipmentsSuccess(data));
        } catch (error) {
            yield put(saveUserEquipmentsError(error));
        }
    }
}

export function* watchUserEquipmentsData() {
    yield takeLatest(GET_USER_EQUIPMENTS_REQUEST, fetchUserEquipmentsData());
    yield takeLatest(SAVE_USER_EQUIPMENTS_REQUEST, saveUserEquipmentsData());
}

export default [
    watchUserEquipmentsData()
];