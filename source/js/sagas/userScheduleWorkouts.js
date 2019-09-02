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
  getProgramsNameSuccess,
  getProgramsNameError,
  GET_PROGRAMS_NAME_REQUEST,
  userAssignProgramSuccess,
  userAssignProgramError,
  USER_ASSIGN_PROGRAM_REQUEST,
  deleteUsersBulkWorkoutScheduleSuccess,
  deleteUsersBulkWorkoutScheduleError,
  DELETE_USERS_BULK_WORKOUT_SCHEDULE_REQUEST,
  completeUsersBulkWorkoutScheduleSuccess,
  completeUsersBulkWorkoutScheduleError,
  COMPLETE_USERS_BULK_WORKOUT_SCHEDULE_REQUEST,
  addUserWorkoutTitleSuccess,
  addUserWorkoutTitleError,
  ADD_USER_WORKOUT_TITLE_REQUEST,
  getUsersWorkoutScheduleError,
  getUsersWorkoutScheduleSuccess,
  GET_USERS_WORKOUT_SCHEDULE_REQUEST,
  getExerciseMeasurementSuccess,
  getExerciseMeasurementError,
  GET_EXERCISE_MEASUREMENT_REQUEST,
  updateUserWorkoutTitleSuccess,
  updateUserWorkoutTitleError,
  UPDATE_USER_WORKOUT_TITLE_REQUEST,
  deleteUserWholeExerciseSuccess,
  deleteUserWholeExerciseError,
  DELETE_USER_WHOLE_EXERCISE_REQUEST,
  DELETE_USER_SINGLE_EXERCISE_REQUEST,
  deleteUserSingleExerciseSuccess,
  deleteUserSingleExerciseError,
  pasteUsersWorkoutScheduleSuccess,
  pasteUsersWorkoutScheduleError,
  PASTE_USERS_WORKOUT_SCHEDULE_REQUEST,
  updateUsersWorkoutScheduleSuccess,
  updateUsersWorkoutScheduleError,
  UPDATE_USERS_WORKOUT_SCHEDULE_REQUEST,
  getUserFirstWorkoutByDateSuccess,
  getUserFirstWorkoutByDateError,
  GET_USER_FIRST_WORKOUT_BY_DATE_REQUEST,
  GET_USER_WORKOUT_CALENDAR_LIST_REQUEST,
  getUserWorkoutCalendarListSuccess,
  getUserWorkoutCalendarListError,
  getWorkoutsListByDateSuccess,
  getWorkoutsListByDateError,
  GET_WORKOUTS_LIST_BY_DATE_REQUEST,
  REORDER_WORKOUT_EXERCISES_REQUEST,
  reorderWorkoutExercisesSuccess,
  reorderWorkoutExercisesError,
  GET_USERS_WORKOUT_OVERVIEW_REQUEST,
  getUsersWorkoutOverviewSuccess,
  getUsersWorkoutOverviewError,
} from '../actions/userScheduleWorkouts';

function getUsersWorkoutSchedulesByMonthData() {
  return function*(action) {
    try {
      let requestData = action.requestData;
      const username = action.username;
      const data = yield call(() =>
        api.getUsersWorkoutSchedulesByMonths(requestData, username),
      );
      yield put(getUsersWorkoutSchedulesSuccess(data));
      action.callback(data);
    } catch (error) {
      yield put(getUsersWorkoutSchedulesError(error));
    }
  };
}

function getUsersWorkoutScheduleData() {
  return function*(action) {
    try {
      let _id = action._id;
      const username = action.username;
      const data = yield call(() => api.getUsersWorkoutSchedule(_id, username));
      yield put(getUsersWorkoutScheduleSuccess(data));
    } catch (error) {
      yield put(getUsersWorkoutScheduleError(error));
    }
  };
}

function getUsersWorkoutOverviewData() {
  return function*(action) {
    try {
      let requestData = { date: action.date };
      const data = yield call(() => api.getUsersWorkoutOverview(requestData));
      yield put(getUsersWorkoutOverviewSuccess(data));
    } catch (error) {
      yield put(getUsersWorkoutOverviewError(error));
    }
  };
}

function getExercisesName() {
  return function*(action) {
    try {
      const data = yield call(() => api.getExercisesName());
      yield put(getExercisesNameSuccess(data));
    } catch (error) {
      yield put(getExercisesNameError(error));
    }
  };
}

function getProgramsName() {
  return function*(action) {
    try {
      const data = yield call(() => api.getProgramsName());
      yield put(getProgramsNameSuccess(data));
    } catch (error) {
      yield put(getProgramsNameError(error));
    }
  };
}

function addUsersWorkoutScheduleData() {
  return function*(action) {
    try {
      let requestData = action.requestData;
      const data = yield call(() => api.addUsersWorkoutSchedule(requestData));
      yield put(addUsersWorkoutScheduleSuccess(data));
    } catch (error) {
      yield put(addUsersWorkoutScheduleError(error));
    }
  };
}

function updateUsersWorkoutScheduleData() {
  return function*(action) {
    try {
      let requestData = action.requestData;
      const data = yield call(() =>
        api.updateUsersWorkoutSchedule(requestData),
      );
      yield put(updateUsersWorkoutScheduleSuccess(data));
    } catch (error) {
      yield put(updateUsersWorkoutScheduleError(error));
    }
  };
}

function pasteUsersWorkoutScheduleData() {
  return function*(action) {
    try {
      let requestData = action.requestData;
      let _action = action.action;
      const data = yield call(() =>
        api.pasteUsersWorkoutSchedule(requestData, _action),
      );
      yield put(pasteUsersWorkoutScheduleSuccess(data));
    } catch (error) {
      yield put(pasteUsersWorkoutScheduleError(error));
    }
  };
}

function deleteUsersBulkWorkoutScheduleData() {
  return function*(action) {
    try {
      let requestData = action.requestData;
      const data = yield call(() =>
        api.deleteUsersBulkWorkoutSchedule(requestData),
      );
      yield put(deleteUsersBulkWorkoutScheduleSuccess(data));
    } catch (error) {
      yield put(deleteUsersBulkWorkoutScheduleError(error));
    }
  };
}

function completeUsersBulkWorkoutScheduleData() {
  return function*(action) {
    try {
      let requestData = action.requestData;
      const data = yield call(() =>
        api.completeUsersBulkWorkoutSchedule(requestData),
      );
      yield put(completeUsersBulkWorkoutScheduleSuccess(data));
      action.callback(data);
    } catch (error) {
      yield put(completeUsersBulkWorkoutScheduleError(error));
    }
  };
}

function userAssignProgramData() {
  return function*(action) {
    try {
      let requestData = action.requestData;
      const data = yield call(() => api.userAssignProgram(requestData));
      yield put(userAssignProgramSuccess(data));
    } catch (error) {
      yield put(userAssignProgramError(error));
    }
  };
}

function addUserWorkoutTitleData() {
  return function*(action) {
    try {
      let requestData = action.requestData;
      const data = yield call(() => api.addUserWorkoutTitle(requestData));
      yield put(addUserWorkoutTitleSuccess(data));
    } catch (error) {
      yield put(addUserWorkoutTitleError(error));
    }
  };
}

function updateUserWorkoutTitleData() {
  return function*(action) {
    try {
      let _id = action._id;
      let requestData = action.requestData;
      const data = yield call(() =>
        api.updateUserWorkoutTitle(_id, requestData),
      );
      yield put(updateUserWorkoutTitleSuccess(data));
    } catch (error) {
      yield put(updateUserWorkoutTitleError(error));
    }
  };
}

function getExerciseMeasurementData() {
  return function*(action) {
    try {
      const data = yield call(() => api.getExerciseMeasurement());
      yield put(getExerciseMeasurementSuccess(data));
    } catch (error) {
      yield put(getExerciseMeasurementError(error));
    }
  };
}

function deleteUserWholeExerciseData() {
  return function*(action) {
    try {
      let requestData = action.requestData;
      const data = yield call(() => api.deleteUserWholeExercise(requestData));
      yield put(deleteUserWholeExerciseSuccess(data));
    } catch (error) {
      yield put(deleteUserWholeExerciseError(error));
    }
  };
}

function deleteUserSingleExerciseData() {
  return function*(action) {
    try {
      let requestData = action.requestData;
      const data = yield call(() => api.deleteUserSingleExercise(requestData));
      yield put(deleteUserSingleExerciseSuccess(data));
    } catch (error) {
      yield put(deleteUserSingleExerciseError(error));
    }
  };
}

function getUserFirstWorkoutByDateData() {
  return function*(action) {
    try {
      let requestData = action.requestData;
      const username = action.username;
      const data = yield call(() =>
        api.getUserFirstWorkoutByDate(requestData, username),
      );
      yield put(getUserFirstWorkoutByDateSuccess(data));
      action.callback(data);
    } catch (error) {
      yield put(getUserFirstWorkoutByDateError(error));
    }
  };
}

function getUserWorkoutCalendarListData() {
  return function*(action) {
    try {
      let requestData = action.requestData;
      const username = action.username;
      const data = yield call(() =>
        api.getUserWorkoutCalendarList(requestData, username),
      );
      yield put(getUserWorkoutCalendarListSuccess(data));
    } catch (error) {
      yield put(getUserWorkoutCalendarListError(error));
    }
  };
}

function getWorkoutsListByDate() {
  return function*(action) {
    try {
      let requestData = action.requestData;
      const data = yield call(() => api.getWorkoutsListByDate(requestData));
      yield put(getWorkoutsListByDateSuccess(data));
    } catch (error) {
      yield put(getWorkoutsListByDateError(error));
    }
  };
}

function reorderWorkoutExercises() {
  return function*(action) {
    try {
      let requestData = action.requestData;
      const data = yield call(() => api.reorderWorkoutExercises(requestData));
      yield put(reorderWorkoutExercisesSuccess(data));
    } catch (error) {
      yield put(reorderWorkoutExercisesError(error));
    }
  };
}

export function* watchUsersWorkoutSchedulesData() {
  yield takeLatest(
    GET_USERS_WORKOUT_SCHEDULES_REQUEST,
    getUsersWorkoutSchedulesByMonthData(),
  );
  yield takeLatest(
    GET_USERS_WORKOUT_SCHEDULE_REQUEST,
    getUsersWorkoutScheduleData(),
  );
  yield takeLatest(
    GET_USERS_WORKOUT_OVERVIEW_REQUEST,
    getUsersWorkoutOverviewData(),
  );
  yield takeLatest(GET_EXERCISES_NAME_REQUEST, getExercisesName());
  yield takeLatest(
    ADD_USERS_WORKOUT_SCHEDULE_REQUEST,
    addUsersWorkoutScheduleData(),
  );
  yield takeLatest(
    UPDATE_USERS_WORKOUT_SCHEDULE_REQUEST,
    updateUsersWorkoutScheduleData(),
  );
  yield takeLatest(
    PASTE_USERS_WORKOUT_SCHEDULE_REQUEST,
    pasteUsersWorkoutScheduleData(),
  );
  yield takeLatest(
    DELETE_USERS_BULK_WORKOUT_SCHEDULE_REQUEST,
    deleteUsersBulkWorkoutScheduleData(),
  );
  yield takeLatest(
    COMPLETE_USERS_BULK_WORKOUT_SCHEDULE_REQUEST,
    completeUsersBulkWorkoutScheduleData(),
  );
  yield takeLatest(GET_PROGRAMS_NAME_REQUEST, getProgramsName());
  yield takeLatest(USER_ASSIGN_PROGRAM_REQUEST, userAssignProgramData());
  yield takeLatest(ADD_USER_WORKOUT_TITLE_REQUEST, addUserWorkoutTitleData());
  yield takeLatest(
    UPDATE_USER_WORKOUT_TITLE_REQUEST,
    updateUserWorkoutTitleData(),
  );
  yield takeLatest(
    GET_EXERCISE_MEASUREMENT_REQUEST,
    getExerciseMeasurementData(),
  );
  yield takeLatest(
    DELETE_USER_WHOLE_EXERCISE_REQUEST,
    deleteUserWholeExerciseData(),
  );
  yield takeLatest(
    DELETE_USER_SINGLE_EXERCISE_REQUEST,
    deleteUserSingleExerciseData(),
  );
  yield takeLatest(
    GET_USER_FIRST_WORKOUT_BY_DATE_REQUEST,
    getUserFirstWorkoutByDateData(),
  );
  yield takeLatest(
    GET_USER_WORKOUT_CALENDAR_LIST_REQUEST,
    getUserWorkoutCalendarListData(),
  );
  yield takeLatest(GET_WORKOUTS_LIST_BY_DATE_REQUEST, getWorkoutsListByDate());
  yield takeLatest(
    REORDER_WORKOUT_EXERCISES_REQUEST,
    reorderWorkoutExercises(),
  );
}

export default [watchUsersWorkoutSchedulesData()];
