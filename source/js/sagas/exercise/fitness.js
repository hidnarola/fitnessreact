import { takeLatest, put, call } from 'redux-saga/effects'
import { GET_EXERCISE_FITNESS_START, exerciseFitnessError, exerciseFitnessSuccess } from '../../actions/exercise/fitness';
import api from 'api/newapi'

function fetchExerciseFitnessData() {
    return function* (action) {
        try {
            const data = yield call(() => api.getExerciseFitnessData());
            yield put(exerciseFitnessSuccess(data));
        } catch (error) {
            yield put(exerciseFitnessError(error));
        }
    }
}

export function* watchExerciseFitnessData() {
    yield takeLatest(GET_EXERCISE_FITNESS_START, fetchExerciseFitnessData())
}

export default [
    watchExerciseFitnessData()
];