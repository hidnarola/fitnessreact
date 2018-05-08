import { takeLatest, put, call } from 'redux-saga/effects';
import {
    BADGES_ADD_REQUEST,
    badgeAddError,
    badgeAddSuccess,
    badgeListSuccess,
    badgeListError,
    BADGES_LIST_REQUEST,
    badgeDeleteSuccess,
    badgeDeleteError,
    BADGES_DELETE_REQUEST,
    badgeSelectOneSuccess,
    badgeSelectOneError,
    BADGES_SELECT_ONE_REQUEST,
    badgeUpdateSuccess,
    badgeUpdateError,
    BADGES_UPDATE_REQUEST,
    badgeFilterError,
    badgeFilterSuccess,
    BADGES_FILTER_REQUEST
} from "../../actions/admin/badges";
import api from 'api/admin/badges';

function getAdminBadgesData() {
    return function* (action) {
        try {
            const data = yield call(() => api.getBadges());
            yield put(badgeListSuccess(data));
        } catch (error) {
            yield put(badgeListError(error));
        }
    }
}

function filterAdminBadgesData() {
    return function* (action) {
        try {
            const data = yield call(() => api.filterBadges(action.filterData));
            yield put(badgeFilterSuccess(data));
        } catch (error) {
            yield put(badgeFilterError(error));
        }
    }
}

function getAdminBadgeData() {
    return function* (action) {
        try {
            const _id = action._id;
            const data = yield call(() => api.getBadge(_id));
            yield put(badgeSelectOneSuccess(data));
        } catch (error) {
            yield put(badgeSelectOneError(error));
        }
    }
}

function postAdminBadgeData() {
    return function* (action) {
        try {
            const badgeData = action.badgeData;
            const data = yield call(() => api.addBadge(badgeData));
            yield put(badgeAddSuccess(data));
        } catch (error) {
            yield put(badgeAddError(error));
        }
    }
}

function putAdminBadgeData() {
    return function* (action) {
        try {
            const _id = action._id;
            const badgeData = action.badgeData;
            const data = yield call(() => api.updateBadge(_id, badgeData));
            yield put(badgeUpdateSuccess(data));
        } catch (error) {
            yield put(badgeUpdateError(error));
        }
    }
}

function deleteAdminBadgeData() {
    return function* (action) {
        try {
            const _id = action._id;
            const data = yield call(() => api.deleteBadge(_id));
            yield put(badgeDeleteSuccess(data));
        } catch (error) {
            yield put(badgeDeleteError(error));
        }
    }
}

export function* watchAdminBadges() {
    yield takeLatest(BADGES_LIST_REQUEST, getAdminBadgesData());
    yield takeLatest(BADGES_FILTER_REQUEST, filterAdminBadgesData());
    yield takeLatest(BADGES_SELECT_ONE_REQUEST, getAdminBadgeData());
    yield takeLatest(BADGES_ADD_REQUEST, postAdminBadgeData());
    yield takeLatest(BADGES_UPDATE_REQUEST, putAdminBadgeData());
    yield takeLatest(BADGES_DELETE_REQUEST, deleteAdminBadgeData());
}

export default [
    watchAdminBadges(),
]