import { takeLatest, call, put } from 'redux-saga/effects';

import api from 'api/userBodyMeasurement';
import {
  getUserBodyMeasurementSuccess,
  getUserBodyMeasurementError,
  GET_USER_BODY_MEASUREMENT_REQUEST,
  saveUserBodyMeasurementSuccess,
  saveUserBodyMeasurementError,
  SAVE_USER_BODY_MEASUREMENT_REQUEST,
  getUserBodyMeasurementLogDatesSuccess,
  getUserBodyMeasurementLogDatesError,
  GET_USER_BODY_MEASUREMENT_LOG_DATES_REQUEST,
  SAVE_USER_BODY_FAT_REQUEST,
  saveUserBodyFatSuccess,
  saveUserBodyFatError,
  GET_PROGRESS_PHOTOS_BY_DATE_REQUEST,
  getProgressPhotosByDateSuccess,
  getProgressPhotosByDateError,
  UPDATE_USER_BODY_MEASUREMENT_REQUEST,
  updateUserBodyMeasurementSuccess,
  updateUserBodyMeasurementError,
} from '../actions/userBodyMeasurement';

function fetchBodyMeasurementData() {
  return function*(action) {
    try {
      const data = yield call(() =>
        api.getBodyMeasurementData(action.requestData),
      );
      yield put(getUserBodyMeasurementSuccess(data));
    } catch (error) {
      yield put(getUserBodyMeasurementError(error));
    }
  };
}

function updateBodyMeasurementData() {
  return function*(action) {
    try {
      const data = yield call(() =>
        api.updateBodyMeasurementData(action.requestData),
      );
      yield put(updateUserBodyMeasurementSuccess(data));
      action.callback(data);
    } catch (error) {
      yield put(updateUserBodyMeasurementError(error));
    }
  };
}

function fetchBodyMeasurementLogDatesData() {
  return function*(action) {
    try {
      const data = yield call(() =>
        api.getBodyMeasurementLogDatesData(action.requestData),
      );
      yield put(getUserBodyMeasurementLogDatesSuccess(data));
    } catch (error) {
      yield put(getUserBodyMeasurementLogDatesError(error));
    }
  };
}

function saveBodyMeasurementData() {
  return function*(action) {
    try {
      const data = yield call(() => api.saveBodyMeasurementData(action.data));
      yield put(saveUserBodyMeasurementSuccess(data));
    } catch (error) {
      yield put(saveUserBodyMeasurementError(error));
    }
  };
}

function saveUserBodyFatData() {
  return function*(action) {
    try {
      const data = yield call(() => api.saveBodyFatData(action.requestData));
      yield put(saveUserBodyFatSuccess(data));
    } catch (error) {
      yield put(saveUserBodyFatError(error));
    }
  };
}

function getProgressPhotosByDateData() {
  return function*(action) {
    try {
      const data = yield call(() =>
        api.getProgressPhotosByDateData(action.requestData),
      );
      yield put(getProgressPhotosByDateSuccess(data));
    } catch (error) {
      yield put(getProgressPhotosByDateError(error));
    }
  };
}

export function* watchBodyMeasurementData() {
  yield takeLatest(
    GET_USER_BODY_MEASUREMENT_REQUEST,
    fetchBodyMeasurementData(),
  );
  yield takeLatest(
    UPDATE_USER_BODY_MEASUREMENT_REQUEST,
    updateBodyMeasurementData(),
  );
  yield takeLatest(
    GET_USER_BODY_MEASUREMENT_LOG_DATES_REQUEST,
    fetchBodyMeasurementLogDatesData(),
  );
  yield takeLatest(
    SAVE_USER_BODY_MEASUREMENT_REQUEST,
    saveBodyMeasurementData(),
  );
  yield takeLatest(SAVE_USER_BODY_FAT_REQUEST, saveUserBodyFatData());
  yield takeLatest(
    GET_PROGRESS_PHOTOS_BY_DATE_REQUEST,
    getProgressPhotosByDateData(),
  );
}

export default [watchBodyMeasurementData()];
