import { takeLatest, put, call } from 'redux-saga/effects';
import api from 'api/userPrograms';
import {
    GET_USER_PROGRAMS_REQUEST,
    getUserProgramsSuccess,
    getUserProgramsError,
    ADD_USER_PROGRAM_MASTER_REQUEST,
    addUserProgramMasterSuccess,
    addUserProgramMasterError
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

function addUserProgramMasterData() {
    return function* (action) {
        try {
            let requestData = action.requestData;
            const data = yield call(() => api.addUserProgramMaster(requestData));
            yield put(addUserProgramMasterSuccess(data));
        } catch (error) {
            yield put(addUserProgramMasterError(error));
        }
    }
}

export function* watchUserProgramsData() {
    yield takeLatest(GET_USER_PROGRAMS_REQUEST, getUserProgramsData());
    yield takeLatest(ADD_USER_PROGRAM_MASTER_REQUEST, addUserProgramMasterData());
}

export default [
    watchUserProgramsData(),
];