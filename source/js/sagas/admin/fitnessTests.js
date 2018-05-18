import { takeLatest, put, call } from 'redux-saga/effects';
import {
    fitnessTestsFilterSuccess,
    fitnessTestsFilterError,
    FITNESS_TESTS_FILTER_REQUEST,
    fitnessTestsDeleteSuccess,
    fitnessTestsDeleteError,
    FITNESS_TESTS_DELETE_REQUEST,
    fitnessTestsAddSuccess,
    fitnessTestsAddError,
    FITNESS_TESTS_ADD_REQUEST,
    fitnessTestsSelectOneSuccess,
    fitnessTestsSelectOneError,
    FITNESS_TESTS_SELECT_ONE_REQUEST,
    fitnessTestsUpdateSuccess,
    fitnessTestsUpdateError,
    FITNESS_TESTS_UPDATE_REQUEST
} from '../../actions/admin/fitness_tests';

import api from 'api/admin/fitnessTests';

function getAdminFitnessTestData() {
    return function* (action) {
        try {
            const _id = action._id;
            const data = yield call(() => api.getFitnessTest(_id));
            yield put(fitnessTestsSelectOneSuccess(data));
        } catch (error) {
            yield put(fitnessTestsSelectOneError(error));
        }
    }
}

function filterAdminFitnessTestData() {
    return function* (action) {
        try {
            const filterData = action.filterData;
            const data = yield call(() => api.filterFitnessTests(filterData));
            yield put(fitnessTestsFilterSuccess(data));
        } catch (error) {
            yield put(fitnessTestsFilterError(error));
        }
    }
}

function addAdminFitnessTestData() {
    return function* (action) {
        try {
            const formData = action.formData;
            const data = yield call(() => api.addFitnessTest(formData));
            yield put(fitnessTestsAddSuccess(data));
        } catch (error) {
            yield put(fitnessTestsAddError(error));
        }
    }
}

function updateAdminFitnessTestData() {
    return function* (action) {
        try {
            const _id = action._id;
            const formData = action.formData;
            const data = yield call(() => api.updateFitnessTest(_id, formData));
            yield put(fitnessTestsUpdateSuccess(data));
        } catch (error) {
            yield put(fitnessTestsUpdateError(error));
        }
    }
}

function deleteAdminFitnessTestData() {
    return function* (action) {
        try {
            const _id = action._id;
            const data = yield call(() => api.deleteFitnessTest(_id));
            yield put(fitnessTestsDeleteSuccess(data));
        } catch (error) {
            yield put(fitnessTestsDeleteError(error));
        }
    }
}

export function* watchAdminFitnessTests() {
    yield takeLatest(FITNESS_TESTS_SELECT_ONE_REQUEST, getAdminFitnessTestData());
    yield takeLatest(FITNESS_TESTS_FILTER_REQUEST, filterAdminFitnessTestData());
    yield takeLatest(FITNESS_TESTS_ADD_REQUEST, addAdminFitnessTestData());
    yield takeLatest(FITNESS_TESTS_UPDATE_REQUEST, updateAdminFitnessTestData());
    yield takeLatest(FITNESS_TESTS_DELETE_REQUEST, deleteAdminFitnessTestData());
}

export default [
    watchAdminFitnessTests(),
]