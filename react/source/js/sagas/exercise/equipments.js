import { takeLatest, put, call } from 'redux-saga/effects';
import { exerciseEquipmentsSuccess, exerciseEquipmentsError, GET_EXERCISE_EQUIPMENT_START } from '../../actions/exercise/equipments';
import api from 'api/newapi';

function fetchExerciseEquipmentsData() {
    return function* (action) {
        try {
            const data = yield call(() => api.getExerciseEquipmentsData());
            yield put(exerciseEquipmentsSuccess(data));
        } catch (error) {
            yield put(exerciseEquipmentsError(error));
        }
    }
}

export function* watchExerciseEquipmentsData() {
    yield takeLatest(GET_EXERCISE_EQUIPMENT_START, fetchExerciseEquipmentsData());
}

export default [
    watchExerciseEquipmentsData()
];