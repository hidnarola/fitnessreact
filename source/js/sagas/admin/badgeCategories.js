import { takeLatest, put, call } from 'redux-saga/effects';
import {
    BADGE_CATEGORIES_ADD_REQUEST,
    badgeCategoryAddError,
    badgeCategoryAddSuccess,
    badgeCategoryListSuccess,
    badgeCategoryListError,
    BADGE_CATEGORIES_LIST_REQUEST,
    badgeCategoryDeleteSuccess,
    badgeCategoryDeleteError,
    BADGE_CATEGORIES_DELETE_REQUEST,
    badgeCategorySelectOneSuccess,
    badgeCategorySelectOneError,
    BADGE_CATEGORIES_SELECT_ONE_REQUEST,
    badgeCategoryUpdateSuccess,
    badgeCategoryUpdateError,
    BADGE_CATEGORIES_UPDATE_REQUEST,
    badgeCategoryFilterError,
    badgeCategoryFilterSuccess,
    BADGE_CATEGORIES_FILTER_REQUEST
} from "../../actions/admin/badgeCategories";
import api from 'api/admin/badgeCategories';

function getAdminBadgeCategoriesData() {
    return function* (action) {
        try {
            const data = yield call(() => api.getBadgeCategories());
            yield put(badgeCategoryListSuccess(data));
        } catch (error) {
            yield put(badgeCategoryListError(error));
        }
    }
}

function filterAdminBadgeCategoriesData() {
    return function* (action) {
        try {
            const data = yield call(() => api.filterBadgeCategories(action.filterData));
            yield put(badgeCategoryFilterSuccess(data));
        } catch (error) {
            yield put(badgeCategoryFilterError(error));
        }
    }
}

function getAdminBadgeCategoryData() {
    return function* (action) {
        try {
            const _id = action._id;
            const data = yield call(() => api.getBadgeCategory(_id));
            yield put(badgeCategorySelectOneSuccess(data));
        } catch (error) {
            yield put(badgeCategorySelectOneError(error));
        }
    }
}

function postAdminBadgeCategoryData() {
    return function* (action) {
        try {
            const badgeCategoryData = action.badgeCategoryData;
            const data = yield call(() => api.addBadgeCategory(badgeCategoryData));
            yield put(badgeCategoryAddSuccess(data));
        } catch (error) {
            yield put(badgeCategoryAddError(error));
        }
    }
}

function putAdminBadgeCategoryData() {
    return function* (action) {
        try {
            const _id = action._id;
            const badgeCategoryData = action.badgeCategoryData;
            const data = yield call(() => api.updateBadgeCategory(_id, badgeCategoryData));
            yield put(badgeCategoryUpdateSuccess(data));
        } catch (error) {
            yield put(badgeCategoryUpdateError(error));
        }
    }
}

function deleteAdminBadgeCategoryData() {
    return function* (action) {
        try {
            const _id = action._id;
            const data = yield call(() => api.deleteBadgeCategory(_id));
            yield put(badgeCategoryDeleteSuccess(data));
        } catch (error) {
            yield put(badgeCategoryDeleteError(error));
        }
    }
}

export function* watchAdminBadgeCategories() {
    yield takeLatest(BADGE_CATEGORIES_LIST_REQUEST, getAdminBadgeCategoriesData());
    yield takeLatest(BADGE_CATEGORIES_FILTER_REQUEST, filterAdminBadgeCategoriesData());
    yield takeLatest(BADGE_CATEGORIES_SELECT_ONE_REQUEST, getAdminBadgeCategoryData());
    yield takeLatest(BADGE_CATEGORIES_ADD_REQUEST, postAdminBadgeCategoryData());
    yield takeLatest(BADGE_CATEGORIES_UPDATE_REQUEST, putAdminBadgeCategoryData());
    yield takeLatest(BADGE_CATEGORIES_DELETE_REQUEST, deleteAdminBadgeCategoryData());
}

export default [
    watchAdminBadgeCategories(),
]