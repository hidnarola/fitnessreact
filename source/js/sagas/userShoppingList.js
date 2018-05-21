import { takeLatest, put, call } from 'redux-saga/effects';
import api from 'api/userShoppingList';
import {
    getUserShoppingListSuccess,
    getUserShoppingListError,
    GET_USER_SHOPPING_LIST_REQUEST
} from '../actions/userShoppingList';

function getUserShoppingListData() {
    return function* (action) {
        try {
            let requestData = action.requestData;
            const data = yield call(() => api.getUserShoppingList(requestData));
            yield put(getUserShoppingListSuccess(data));
        } catch (error) {
            yield put(getUserShoppingListError(error));
        }
    }
}

export function* watchUserShoppingListData() {
    yield takeLatest(GET_USER_SHOPPING_LIST_REQUEST, getUserShoppingListData());
}

export default [
    watchUserShoppingListData()
];