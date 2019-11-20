import { takeLatest, put, call } from "redux-saga/effects";
import api from "api/userProgressPhotos";
import {
  addUserProgressPhotoSuccess,
  addUserProgressPhotoError,
  ADD_USER_PROGRESS_PHOTO_REQUEST,
  getUserProgressPhotoSuccess,
  getUserProgressPhotoError,
  GET_USER_PROGRESS_PHOTO_REQUEST,
  getUserLatestProgressPhotoSuccess,
  getUserLatestProgressPhotoError,
  GET_USER_LATEST_PROGRESS_PHOTO_REQUEST,
  LOAD_MORE_USER_PROGRESS_PHOTO_REQUEST,
  loadMoreUserProgressPhotoSuccess,
  loadMoreUserProgressPhotoError,
  deleteUserProgressPhotoSuccess,
  deleteUserProgressPhotoError,
  DELETE_USER_PROGRESS_PHOTO_REQUEST,
  ADD_USER_PROGRESS_ACTIVITY_PHOTO_REQUEST,
  addUserProgressActivityPhotoSuccess,
  addUserProgressActivityPhotoError,
  GET_RECENT_TAGS_PROGRESS_PHOTOS_REQUEST,
  getUserRecentHashTagsError,
  getUserRecentHashTagsSuccess
} from "../actions/userProgressPhotos";

function fetchUserProgressPhotosData() {
  return function*(action) {
    try {
      let username = action.username;
      let start = action.start;
      let noOfPhotos = action.noOfPhotos;
      let sort = action.sort;
      const data = yield call(() =>
        api.getUserProgressPhotos(username, start, noOfPhotos, sort)
      );
      yield put(getUserProgressPhotoSuccess(data));
    } catch (error) {
      yield put(getUserProgressPhotoError(error));
    }
  };
}

function loadMoreUserProgressPhotosData() {
  return function*(action) {
    try {
      let username = action.username;
      let start = action.start;
      let noOfPhotos = action.noOfPhotos;
      let sort = action.sort;
      const data = yield call(() =>
        api.getUserProgressPhotos(username, start, noOfPhotos, sort)
      );
      yield put(loadMoreUserProgressPhotoSuccess(data));
    } catch (error) {
      yield put(loadMoreUserProgressPhotoError(error));
    }
  };
}

function fetchUserLatestProgressPhotosData() {
  return function*(action) {
    try {
      let username = action.username;
      let noOfPhotos = action.noOfPhotos;
      const data = yield call(() =>
        api.getUserLatestProgressPhotos(username, noOfPhotos)
      );
      yield put(getUserLatestProgressPhotoSuccess(data));
    } catch (error) {
      yield put(getUserLatestProgressPhotoError(error));
    }
  };
}

function addUserProgressPhotoData() {
  return function*(action) {
    try {
      let formData = action.formData;
      const data = yield call(() => api.postUserProgressPhoto(formData));
      yield put(addUserProgressPhotoSuccess(data));
      action.callback(data);
    } catch (error) {
      yield put(addUserProgressPhotoError(error));
    }
  };
}

function addUserProgressActivityPhotoData() {
  return function*(action) {
    try {
      let formData = action.formData;
      const data = yield call(() =>
        api.postUserProgressActivityPhoto(formData)
      );
      yield put(addUserProgressActivityPhotoSuccess(data));
    } catch (error) {
      yield put(addUserProgressActivityPhotoError(error));
    }
  };
}

function deleteUserProgressPhotoData() {
  return function*(action) {
    try {
      let id = action.id;
      const data = yield call(() => api.deleteUserProgressPhoto(id));
      yield put(deleteUserProgressPhotoSuccess(data));
    } catch (error) {
      yield put(deleteUserProgressPhotoError(error));
    }
  };
}

function getUserRecentHashTagsProgressPhotoData() {
  return function*(action) {
    try {
      const data = yield call(() =>
        api.getRecentTagsProgressPhoto(action.requestData)
      );
      console.log("===========Saga data===========");
      console.log("Saga data", data);
      console.log("==========================");
      yield put(getUserRecentHashTagsSuccess(data));
    } catch (error) {
      yield put(getUserRecentHashTagsError(error));
    }
  };
}

export function* watchUserProgressPhotosData() {
  yield takeLatest(
    GET_USER_PROGRESS_PHOTO_REQUEST,
    fetchUserProgressPhotosData()
  );
  yield takeLatest(
    LOAD_MORE_USER_PROGRESS_PHOTO_REQUEST,
    loadMoreUserProgressPhotosData()
  );
  yield takeLatest(
    GET_USER_LATEST_PROGRESS_PHOTO_REQUEST,
    fetchUserLatestProgressPhotosData()
  );
  yield takeLatest(ADD_USER_PROGRESS_PHOTO_REQUEST, addUserProgressPhotoData());
  yield takeLatest(
    ADD_USER_PROGRESS_ACTIVITY_PHOTO_REQUEST,
    addUserProgressActivityPhotoData()
  );
  yield takeLatest(
    DELETE_USER_PROGRESS_PHOTO_REQUEST,
    deleteUserProgressPhotoData()
  );
  yield takeLatest(
    GET_RECENT_TAGS_PROGRESS_PHOTOS_REQUEST,
    getUserRecentHashTagsProgressPhotoData()
  );
}

export default [watchUserProgressPhotosData()];
