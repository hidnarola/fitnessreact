import { takeLatest, put, call } from 'redux-saga/effects';
import api from 'api/userBadges';
import {
    GET_USER_BADGES_BY_TYPE_REQUEST,
    getUserBadgesByTypeSuccess,
    getUserBadgesByTypeError,
} from '../actions/userBadges';

function getUserBadgesByTypeData() {
    return function* (action) {
        try {
            let badgeType = action.badgeType;
            const data = yield call(() => api.getUserBadgesByType(badgeType));
            yield put(getUserBadgesByTypeSuccess(data));
        } catch (error) {
            yield put(getUserBadgesByTypeError(error));
        }
    }
}

export function* watchUserBadgesData() {
    yield takeLatest(GET_USER_BADGES_BY_TYPE_REQUEST, getUserBadgesByTypeData());
}

export default [
    watchUserBadgesData()
];