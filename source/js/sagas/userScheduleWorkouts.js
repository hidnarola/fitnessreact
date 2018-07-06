import { takeLatest, put, call } from 'redux-saga/effects';
import api from 'api/userScheduleWorkouts';
import {
    getUsersWorkoutSchedulesSuccess,
    getUsersWorkoutSchedulesError,
    GET_USERS_WORKOUT_SCHEDULES_REQUEST,
    getExercisesNameSuccess,
    getExercisesNameError,
    GET_EXERCISES_NAME_REQUEST,
    addUsersWorkoutScheduleSuccess,
    addUsersWorkoutScheduleError,
    ADD_USERS_WORKOUT_SCHEDULE_REQUEST,
    deleteUsersWorkoutScheduleError,
    deleteUsersWorkoutScheduleSuccess,
    DELETE_USERS_WORKOUT_SCHEDULE_REQUEST,
    changeUsersWorkoutScheduleCompleteSuccess,
    changeUsersWorkoutScheduleCompleteError,
    CHANGE_USERS_WORKOUT_SCHEDULE_COMPLETE_REQUEST,
    changeUsersWorkoutScheduleError,
    changeUsersWorkoutScheduleSuccess,
    CHANGE_USERS_WORKOUT_SCHEDULE_REQUEST
} from '../actions/userScheduleWorkouts';

function getUsersWorkoutSchedulesByMonthData() {
    return function* (action) {
        try {
            let requestData = action.requestData;
            const data = yield call(() => api.getUsersWorkoutSchedulesByMonths(requestData));
            yield put(getUsersWorkoutSchedulesSuccess(data));
        } catch (error) {
            yield put(getUsersWorkoutSchedulesError(error));
        }
    }
}

function getExercisesName() {
    return function* (action) {
        try {
            const data = yield call(() => api.getExercisesName());
            yield put(getExercisesNameSuccess(data));
        } catch (error) {
            yield put(getExercisesNameError(error));
        }
    }
}

function addUsersWorkoutScheduleData() {
    return function* (action) {
        try {
            let requestData = action.requestData;
            const data = yield call(() => api.addUsersWorkoutSchedule(requestData));
            yield put(addUsersWorkoutScheduleSuccess(data));
        } catch (error) {
            yield put(addUsersWorkoutScheduleError(error));
        }
    }
}

function changeUsersWorkoutScheduleData() {
    return function* (action) {
        try {
            let _id = action._id;
            let requestData = action.requestData;
            const data = yield call(() => api.changeUsersWorkoutSchedule(_id, requestData));
            yield put(changeUsersWorkoutScheduleSuccess(data));
        } catch (error) {
            yield put(changeUsersWorkoutScheduleError(error));
        }
    }
}

function deleteUsersWorkoutScheduleData() {
    return function* (action) {
        try {
            let _id = action._id;
            const data = yield call(() => api.deleteUsersWorkoutSchedule(_id));
            yield put(deleteUsersWorkoutScheduleSuccess(data));
        } catch (error) {
            yield put(deleteUsersWorkoutScheduleError(error));
        }
    }
}

function changeUsersWorkoutScheduleCompleteData() {
    return function* (action) {
        try {
            let _id = action._id;
            let isCompleted = action.isCompleted;
            const data = yield call(() => api.changeUsersWorkoutScheduleComplete(_id, isCompleted));
            yield put(changeUsersWorkoutScheduleCompleteSuccess(data));
        } catch (error) {
            yield put(changeUsersWorkoutScheduleCompleteError(error));
        }
    }
}

export function* watchUsersWorkoutSchedulesData() {
    yield takeLatest(GET_USERS_WORKOUT_SCHEDULES_REQUEST, getUsersWorkoutSchedulesByMonthData());
    yield takeLatest(GET_EXERCISES_NAME_REQUEST, getExercisesName());
    yield takeLatest(ADD_USERS_WORKOUT_SCHEDULE_REQUEST, addUsersWorkoutScheduleData());
    yield takeLatest(CHANGE_USERS_WORKOUT_SCHEDULE_REQUEST, changeUsersWorkoutScheduleData());
    yield takeLatest(DELETE_USERS_WORKOUT_SCHEDULE_REQUEST, deleteUsersWorkoutScheduleData());
    yield takeLatest(CHANGE_USERS_WORKOUT_SCHEDULE_COMPLETE_REQUEST, changeUsersWorkoutScheduleCompleteData());
}

export default [
    watchUsersWorkoutSchedulesData()
];