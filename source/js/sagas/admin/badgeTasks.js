import { takeLatest, put, call } from 'redux-saga/effects';
import {
    BADGE_TASKS_ADD_REQUEST,
    badgeTaskAddError,
    badgeTaskAddSuccess,
    badgeTaskListSuccess,
    badgeTaskListError,
    BADGE_TASKS_LIST_REQUEST,
    badgeTaskDeleteSuccess,
    badgeTaskDeleteError,
    BADGE_TASKS_DELETE_REQUEST,
    badgeTaskSelectOneSuccess,
    badgeTaskSelectOneError,
    BADGE_TASKS_SELECT_ONE_REQUEST,
    badgeTaskUpdateSuccess,
    badgeTaskUpdateError,
    BADGE_TASKS_UPDATE_REQUEST,
    badgeTaskFilterError,
    badgeTaskFilterSuccess,
    BADGE_TASKS_FILTER_REQUEST
} from "../../actions/admin/badgeTasks";
import api from 'api/admin/badgeTasks';

function getAdminBadgeTasksData() {
    return function* (action) {
        try {
            const data = yield call(() => api.getBadgeTasks());
            yield put(badgeTaskListSuccess(data));
        } catch (error) {
            yield put(badgeTaskListError(error));
        }
    }
}

function filterAdminBadgeTasksData() {
    return function* (action) {
        try {
            const data = yield call(() => api.filterBadgeTasks(action.filterData));
            yield put(badgeTaskFilterSuccess(data.data));
        } catch (error) {
            yield put(badgeTaskFilterError(error));
        }
    }
}

function getAdminBadgeTaskData() {
    return function* (action) {
        try {
            const _id = action._id;
            const data = yield call(() => api.getBadgeTask(_id));
            yield put(badgeTaskSelectOneSuccess(data));
        } catch (error) {
            yield put(badgeTaskSelectOneError(error));
        }
    }
}

function postAdminBadgeTaskData() {
    return function* (action) {
        try {
            const badgeTaskData = action.badgeTaskData;
            const data = yield call(() => api.addBadgeTask(badgeTaskData));
            yield put(badgeTaskAddSuccess(data));
        } catch (error) {
            yield put(badgeTaskAddError(error));
        }
    }
}

function putAdminBadgeTaskData() {
    return function* (action) {
        try {
            const _id = action._id;
            const badgeTaskData = action.badgeTaskData;
            const data = yield call(() => api.updateBadgeTask(_id, badgeTaskData));
            yield put(badgeTaskUpdateSuccess(data));
        } catch (error) {
            yield put(badgeTaskUpdateError(error));
        }
    }
}

function deleteAdminBadgeTaskData() {
    return function* (action) {
        try {
            const _id = action._id;
            const data = yield call(() => api.deleteBadgeTask(_id));
            yield put(badgeTaskDeleteSuccess(data));
        } catch (error) {
            yield put(badgeTaskDeleteError(error));
        }
    }
}

export function* watchAdminBadgeTasks() {
    yield takeLatest(BADGE_TASKS_LIST_REQUEST, getAdminBadgeTasksData());
    yield takeLatest(BADGE_TASKS_FILTER_REQUEST, filterAdminBadgeTasksData());
    yield takeLatest(BADGE_TASKS_SELECT_ONE_REQUEST, getAdminBadgeTaskData());
    yield takeLatest(BADGE_TASKS_ADD_REQUEST, postAdminBadgeTaskData());
    yield takeLatest(BADGE_TASKS_UPDATE_REQUEST, putAdminBadgeTaskData());
    yield takeLatest(BADGE_TASKS_DELETE_REQUEST, deleteAdminBadgeTaskData());
}

export default [
    watchAdminBadgeTasks(),
]