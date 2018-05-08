import { takeLatest, put, call } from 'redux-saga/effects';
import {
    userListSuccess,
    userListError,
    USERS_LIST_REQUEST,
    userDeleteSuccess,
    userDeleteError,
    USERS_DELETE_REQUEST,
    userSelectOneSuccess,
    userSelectOneError,
    USERS_SELECT_ONE_REQUEST,
    userUpdateSuccess,
    userUpdateError,
    USERS_UPDATE_REQUEST,
    userFilterSuccess,
    userFilterError,
    USERS_FILTER_REQUEST
} from "../../actions/admin/users";
import api from 'api/admin/users';

function getAdminUsersData() {
    return function* (action) {
        try {
            const data = yield call(() => api.getUsers());
            yield put(userListSuccess(data));
        } catch (error) {
            yield put(userListError(error));
        }
    }
}

function getAdminUserData() {
    return function* (action) {
        try {
            const _id = action._id;
            const data = yield call(() => api.getUser(_id));
            yield put(userSelectOneSuccess(data));
        } catch (error) {
            yield put(userSelectOneError(error));
        }
    }
}

function putAdminUserData() {
    return function* (action) {
        try {
            const _id = action._id;
            const userData = action.userData;
            const data = yield call(() => api.updateUser(_id, userData));
            yield put(userUpdateSuccess(data));
        } catch (error) {
            yield put(userUpdateError(error));
        }
    }
}

function deleteAdminUserData() {
    return function* (action) {
        try {
            const _id = action._id;
            const data = yield call(() => api.deleteUser(_id));
            yield put(userDeleteSuccess(data));
        } catch (error) {
            yield put(userDeleteError(error));
        }
    }
}

function filterAdminUserData() {
    return function* (action) {
        try {
            const filterData = action.filterData;
            const data = yield call(() => api.filterUser(filterData));
            yield put(userFilterSuccess(data));
        } catch (error) {
            yield put(userFilterError(error));
        }
    }
}

export function* watchAdminUsers() {
    yield takeLatest(USERS_LIST_REQUEST, getAdminUsersData());
    yield takeLatest(USERS_SELECT_ONE_REQUEST, getAdminUserData());
    yield takeLatest(USERS_UPDATE_REQUEST, putAdminUserData());
    yield takeLatest(USERS_DELETE_REQUEST, deleteAdminUserData());
    yield takeLatest(USERS_FILTER_REQUEST, filterAdminUserData());
}

export default [
    watchAdminUsers(),
]