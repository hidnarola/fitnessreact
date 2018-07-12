import { takeLatest, put, call } from 'redux-saga/effects';
import api from 'api/userPrograms';
import {
    GET_USER_PROGRAMS_REQUEST,
    getUserProgramsSuccess,
    getUserProgramsError,
    ADD_USER_PROGRAM_MASTER_REQUEST,
    addUserProgramMasterSuccess,
    addUserProgramMasterError,
    GET_USER_PROGRAM_REQUEST,
    getUserProgramSuccess,
    getUserProgramError,
    deleteUserProgramSuccess,
    deleteUserProgramError,
    DELETE_USER_PROGRAM_REQUEST,
    ADD_USERS_PROGRAM_WORKOUT_SCHEDULE_REQUEST,
    addUsersProgramWorkoutScheduleSuccess,
    addUsersProgramWorkoutScheduleError,
    DELETE_USERS_PROGRAM_WORKOUT_SCHEDULE_REQUEST,
    deleteUsersProgramWorkoutScheduleSuccess,
    deleteUsersProgramWorkoutScheduleError
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

function getUserProgramData() {
    return function* (action) {
        try {
            var _id = action._id;
            const data = yield call(() => api.getUserProgram(_id));
            yield put(getUserProgramSuccess(data));
        } catch (error) {
            yield put(getUserProgramError(error));
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

function deleteUserProgramData() {
    return function* (action) {
        try {
            let _id = action._id;
            const data = yield call(() => api.deleteUserProgram(_id));
            yield put(deleteUserProgramSuccess(data));
        } catch (error) {
            yield put(deleteUserProgramError(error));
        }
    }
}

function addUsersProgramWorkoutScheduleData() {
    return function* (action) {
        try {
            let requestData = action.requestData;
            const data = yield call(() => api.addUsersProgramWorkoutSchedule(requestData));
            yield put(addUsersProgramWorkoutScheduleSuccess(data));
        } catch (error) {
            yield put(addUsersProgramWorkoutScheduleError(error));
        }
    }
}

function deleteUsersProgramWorkoutScheduleData() {
    return function* (action) {
        try {
            let requestData = action.requestData;
            const data = yield call(() => api.deleteUsersProgramWorkoutSchedule(requestData));
            yield put(deleteUsersProgramWorkoutScheduleSuccess(data));
        } catch (error) {
            yield put(deleteUsersProgramWorkoutScheduleError(error));
        }
    }
}

export function* watchUserProgramsData() {
    yield takeLatest(GET_USER_PROGRAMS_REQUEST, getUserProgramsData());
    yield takeLatest(GET_USER_PROGRAM_REQUEST, getUserProgramData());
    yield takeLatest(ADD_USER_PROGRAM_MASTER_REQUEST, addUserProgramMasterData());
    yield takeLatest(DELETE_USER_PROGRAM_REQUEST, deleteUserProgramData());
    yield takeLatest(ADD_USERS_PROGRAM_WORKOUT_SCHEDULE_REQUEST, addUsersProgramWorkoutScheduleData());
    yield takeLatest(DELETE_USERS_PROGRAM_WORKOUT_SCHEDULE_REQUEST, deleteUsersProgramWorkoutScheduleData());
}

export default [
    watchUserProgramsData(),
];