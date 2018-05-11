import { takeLatest, put, call } from 'redux-saga/effects';
import {
    fitnessTestsFilterSuccess,
    fitnessTestsFilterError,
    FITNESS_TESTS_FILTER_REQUEST
} from '../../actions/admin/FitnessTests';

import api from 'api/admin/exercises';

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

export function* watchAdminFitnessTests() {
    yield takeLatest(FITNESS_TESTS_FILTER_REQUEST, filterAdminFitnessTestData());
}

export default [
    watchAdminFitnessTests(),
]