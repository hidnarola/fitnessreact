import { takeLatest, put, call } from 'redux-saga/effects';
import {
    fitnessTestsFilterSuccess,
    fitnessTestsFilterError,
    FITNESS_TESTS_FILTER_REQUEST,
    fitnessTestsDeleteSuccess,
    fitnessTestsDeleteError,
    FITNESS_TESTS_DELETE_REQUEST
} from '../../actions/admin/fitnessTests';

import api from 'api/admin/fitnessTests';

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
    yield takeLatest(FITNESS_TESTS_FILTER_REQUEST, filterAdminFitnessTestData());
    yield takeLatest(FITNESS_TESTS_DELETE_REQUEST, deleteAdminFitnessTestData());
}

export default [
    watchAdminFitnessTests(),
]