import { takeLatest, put, call } from 'redux-saga/effects';
import {
    EXERCISES_ADD_REQUEST,
    exerciseAddError,
    exerciseAddSuccess,
    exerciseListSuccess,
    exerciseListError,
    EXERCISES_LIST_REQUEST,
    exerciseDeleteSuccess,
    exerciseDeleteError,
    EXERCISES_DELETE_REQUEST,
    exerciseSelectOneSuccess,
    exerciseSelectOneError,
    EXERCISES_SELECT_ONE_REQUEST,
    exerciseUpdateSuccess,
    exerciseUpdateError,
    EXERCISES_UPDATE_REQUEST,
    exerciseFilterSuccess,
    exerciseFilterError,
    EXERCISES_FILTER_REQUEST,
    EXERCISES_RECOVER_REQUEST,
    exerciseRecoverSuccess,
    exerciseRecoverError
} from "../../actions/admin/exercises";
import api from 'api/admin/exercises';

function getAdminExercisesData() {
    return function* (action) {
        try {
            const data = yield call(() => api.getExercises());
            yield put(exerciseListSuccess(data));
        } catch (error) {
            yield put(exerciseListError(error));
        }
    }
}

function getAdminExerciseData() {
    return function* (action) {
        try {
            const _id = action._id;
            const data = yield call(() => api.getExercise(_id));
            yield put(exerciseSelectOneSuccess(data));
        } catch (error) {
            yield put(exerciseSelectOneError(error));
        }
    }
}

function postAdminExerciseData() {
    return function* (action) {
        try {
            const exerciseData = action.exerciseData;
            const data = yield call(() => api.addExercise(exerciseData));
            yield put(exerciseAddSuccess(data));
        } catch (error) {
            yield put(exerciseAddError(error));
        }
    }
}

function putAdminExerciseData() {
    return function* (action) {
        try {
            const _id = action._id;
            const exerciseData = action.exerciseData;
            const data = yield call(() => api.updateExercise(_id, exerciseData));
            yield put(exerciseUpdateSuccess(data));
        } catch (error) {
            yield put(exerciseUpdateError(error));
        }
    }
}

function deleteAdminExerciseData() {
    return function* (action) {
        try {
            const _id = action._id;
            const data = yield call(() => api.deleteExercise(_id));
            yield put(exerciseDeleteSuccess(data));
        } catch (error) {
            yield put(exerciseDeleteError(error));
        }
    }
}

function recoverAdminExerciseData() {
    return function* (action) {
        try {
            const _id = action._id;
            const data = yield call(() => api.recoverExercise(_id));
            yield put(exerciseRecoverSuccess(data));
        } catch (error) {
            yield put(exerciseRecoverError(error));
        }
    }
}

function filterAdminExerciseData() {
    return function* (action) {
        try {
            const filterData = action.filterData;
            const data = yield call(() => api.filterExercise(filterData));
            yield put(exerciseFilterSuccess(data));
        } catch (error) {
            yield put(exerciseFilterError(error));
        }
    }
}

export function* watchAdminExercises() {
    yield takeLatest(EXERCISES_LIST_REQUEST, getAdminExercisesData());
    yield takeLatest(EXERCISES_SELECT_ONE_REQUEST, getAdminExerciseData());
    yield takeLatest(EXERCISES_ADD_REQUEST, postAdminExerciseData());
    yield takeLatest(EXERCISES_UPDATE_REQUEST, putAdminExerciseData());
    yield takeLatest(EXERCISES_DELETE_REQUEST, deleteAdminExerciseData());
    yield takeLatest(EXERCISES_RECOVER_REQUEST, recoverAdminExerciseData());
    yield takeLatest(EXERCISES_FILTER_REQUEST, filterAdminExerciseData());
}

export default [
    watchAdminExercises(),
]