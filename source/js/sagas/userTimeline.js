import { takeLatest, put, call } from "redux-saga/effects";
import api from "api/userTimeline";
import {
  getUserTimelineSuccess,
  getUserTimelineError,
  GET_USER_TIMELINE_REQUEST,
  getUserSingleTimelineSuccess,
  getUserSingleTimelineError,
  GET_USER_SINGLE_TIMELINE_REQUEST,
  addPostOnUserTimelineSuccess,
  addPostOnUserTimelineError,
  ADD_POST_ON_USER_TIMELINE_REQUEST,
  GET_PRIVACY_OF_TIMELINE_USER_REQUEST,
  getPrivacyOfTimelineUserSuccess,
  getPrivacyOfTimelineUserError,
  DELETE_POST_OF_TIMELINE_REQUEST,
  deletePostOfTimelineSuccess,
  deletePostOfTimelineError,
  CHANGE_ACCESS_LEVEL_POST_OF_TIMELINE_REQUEST,
  changeAccessLevelPostOfTimelineSuccess,
  changeAccessLevelPostOfTimelineError,
  getDiscoverUserTimelineSuccess,
  getDiscoverUserTimelineError,
  GET_DISCOVER_USER_TIMELINE_REQUEST
} from "../actions/userTimeline";

function getUserTimelineData() {
  return function*(action) {
    try {
      let username = action.username;
      let start = action.start;
      let offset = action.offset;
      const data = yield call(() =>
        api.getUserTimeline(username, start, offset)
      );
      yield put(getUserTimelineSuccess(data));
    } catch (error) {
      yield put(getUserTimelineError(error));
    }
  };
}
function getDiscoverUserTimelineData() {
  return function*(action) {
    try {
      let start = action.start;
      let offset = action.offset;
      const data = yield call(() => api.getDiscoverTimelinePost(start, offset));
      yield put(getDiscoverUserTimelineSuccess(data));
    } catch (error) {
      yield put(getDiscoverUserTimelineError(error));
    }
  };
}

function getUserSingleTimelineData() {
  return function*(action) {
    try {
      let postId = action.postId;
      const data = yield call(() => api.getUserSingleTimeline(postId));
      yield put(getUserSingleTimelineSuccess(data));
    } catch (error) {
      yield put(getUserSingleTimelineError(error));
    }
  };
}

function postPostOnUserTimelineData() {
  return function*(action) {
    try {
      let formData = action.formData;
      const data = yield call(() => api.addPostOnUserTimeline(formData));
      yield put(addPostOnUserTimelineSuccess(data));
    } catch (error) {
      yield put(addPostOnUserTimelineError(error));
    }
  };
}

function getPrivacyOfTimelineUserData() {
  return function*(action) {
    try {
      let username = action.username;
      const data = yield call(() => api.getPrivacyOfTimelineUser(username));
      yield put(getPrivacyOfTimelineUserSuccess(data));
    } catch (error) {
      yield put(getPrivacyOfTimelineUserError(error));
    }
  };
}

function deletePostOfTimelineData() {
  return function*(action) {
    try {
      let id = action.id;
      const data = yield call(() => api.deletePostOfTimeline(id));
      yield put(deletePostOfTimelineSuccess(data));
    } catch (error) {
      yield put(deletePostOfTimelineError(error));
    }
  };
}

function changeAccessLevelPostOfTimelineData() {
  return function*(action) {
    try {
      let id = action.id;
      let requestData = action.requestData;
      const data = yield call(() =>
        api.changeAccessLevelPostOfTimeline(id, requestData)
      );
      yield put(changeAccessLevelPostOfTimelineSuccess(data));
    } catch (error) {
      yield put(changeAccessLevelPostOfTimelineError(error));
    }
  };
}

export function* watchUserTimelineData() {
  yield takeLatest(GET_USER_TIMELINE_REQUEST, getUserTimelineData());
  yield takeLatest(
    GET_DISCOVER_USER_TIMELINE_REQUEST,
    getDiscoverUserTimelineData()
  );
  yield takeLatest(
    GET_USER_SINGLE_TIMELINE_REQUEST,
    getUserSingleTimelineData()
  );
  yield takeLatest(
    ADD_POST_ON_USER_TIMELINE_REQUEST,
    postPostOnUserTimelineData()
  );
  yield takeLatest(
    GET_PRIVACY_OF_TIMELINE_USER_REQUEST,
    getPrivacyOfTimelineUserData()
  );
  yield takeLatest(DELETE_POST_OF_TIMELINE_REQUEST, deletePostOfTimelineData());
  yield takeLatest(
    CHANGE_ACCESS_LEVEL_POST_OF_TIMELINE_REQUEST,
    changeAccessLevelPostOfTimelineData()
  );
}

export default [watchUserTimelineData()];
