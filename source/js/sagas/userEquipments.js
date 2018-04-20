import { takeLatest, put, call } from 'redux-saga/effects';
import api from 'api/userEquipments';
import { getUserEquipmentsSuccess, getUserEquipmentsError, GET_USER_EQUIPMENTS_REQUEST } from '../actions/userEquipments';

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

export function* watchUserEquipmentsData() {
    yield takeLatest(GET_USER_EQUIPMENTS_REQUEST, fetchUserEquipmentsData());
}

export default [
    watchUserEquipmentsData()
];