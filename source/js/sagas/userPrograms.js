import { takeLatest, put, call } from 'redux-saga/effects';
import api from 'api/userPrograms';
import {
    GET_USER_PROGRAMS_REQUEST,
    getUserProgramsSuccess,
    getUserProgramsError
} from "../actions/userPrograms";

function getUserProgramsData() {
    return function* (action) {
        try {
            const data = yield call(() => api.getUserPrograms());
            yield put(getUserProgramsSuccess(data));
        } catch (error) {
            yield put(getUserProgramsError(error));
        }
    }
}

export function* watchUserProgramsData() {
    yield takeLatest(GET_USER_PROGRAMS_REQUEST, getUserProgramsData());
}

export default [
    watchUserProgramsData(),
];