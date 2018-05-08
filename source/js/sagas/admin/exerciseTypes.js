import { takeLatest, put, call } from 'redux-saga/effects';
import {
    EXERCISE_TYPES_ADD_REQUEST,
    exerciseTypeAddError,
    exerciseTypeAddSuccess,
    exerciseTypeListSuccess,
    exerciseTypeListError,
    EXERCISE_TYPES_LIST_REQUEST,
    exerciseTypeDeleteSuccess,
    exerciseTypeDeleteError,
    EXERCISE_TYPES_DELETE_REQUEST,
    exerciseTypeSelectOneSuccess,
    exerciseTypeSelectOneError,
    EXERCISE_TYPES_SELECT_ONE_REQUEST,
    exerciseTypeUpdateSuccess,
    exerciseTypeUpdateError,
    EXERCISE_TYPES_UPDATE_REQUEST,
    exerciseTypeFilterError,
    exerciseTypeFilterSuccess,
    EXERCISE_TYPES_FILTER_REQUEST
} from "../../actions/admin/exerciseTypes";
import api from 'api/admin/exerciseTypes';

function getAdminExerciseTypesData() {
    return function* (action) {
        try {
            const data = yield call(() => api.getExerciseTypes());
            yield put(exerciseTypeListSuccess(data));
        } catch (error) {
            yield put(exerciseTypeListError(error));
        }
    }
}

function filterAdminExerciseTypesData() {
    return function* (action) {
        try {
            const data = yield call(() => api.filterExerciseTypes(action.filterData));
            yield put(exerciseTypeFilterSuccess(data));
        } catch (error) {
            yield put(exerciseTypeFilterError(error));
        }
    }
}

function getAdminExerciseTypeData() {
    return function* (action) {
        try {
            const _id = action._id;
            const data = yield call(() => api.getExerciseType(_id));
            yield put(exerciseTypeSelectOneSuccess(data));
        } catch (error) {
            yield put(exerciseTypeSelectOneError(error));
        }
    }
}

function postAdminExerciseTypeData() {
    return function* (action) {
        try {
            const exerciseTypeData = action.exerciseTypeData;
            const data = yield call(() => api.addExerciseType(exerciseTypeData));
            yield put(exerciseTypeAddSuccess(data));
        } catch (error) {
            yield put(exerciseTypeAddError(error));
        }
    }
}

function putAdminExerciseTypeData() {
    return function* (action) {
        try {
            const _id = action._id;
            const exerciseTypeData = action.exerciseTypeData;
            const data = yield call(() => api.updateExerciseType(_id, exerciseTypeData));
            yield put(exerciseTypeUpdateSuccess(data));
        } catch (error) {
            yield put(exerciseTypeUpdateError(error));
        }
    }
}

function deleteAdminExerciseTypeData() {
    return function* (action) {
        try {
            const _id = action._id;
            const data = yield call(() => api.deleteExerciseType(_id));
            yield put(exerciseTypeDeleteSuccess(data));
        } catch (error) {
            yield put(exerciseTypeDeleteError(error));
        }
    }
}

export function* watchAdminExerciseTypes() {
    yield takeLatest(EXERCISE_TYPES_LIST_REQUEST, getAdminExerciseTypesData());
    yield takeLatest(EXERCISE_TYPES_FILTER_REQUEST, filterAdminExerciseTypesData());
    yield takeLatest(EXERCISE_TYPES_SELECT_ONE_REQUEST, getAdminExerciseTypeData());
    yield takeLatest(EXERCISE_TYPES_ADD_REQUEST, postAdminExerciseTypeData());
    yield takeLatest(EXERCISE_TYPES_UPDATE_REQUEST, putAdminExerciseTypeData());
    yield takeLatest(EXERCISE_TYPES_DELETE_REQUEST, deleteAdminExerciseTypeData());
}

export default [
    watchAdminExerciseTypes(),
]