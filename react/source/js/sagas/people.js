import { takeLatest, call, put } from 'redux-saga/effects';

import {
    GET_PEOPLE_START,
    GET_PEOPLE_ERROR,
    GET_PEOPLE_SUCCESS,
    GET_TOTAL_POSTS
} from 'actions/people';
import api from 'api/newapi';

// -------- Get people

function createGetPeople() {
    return function* (options) { // eslint-disable-line consistent-return
        try {
            const data = yield call(() => api.getPeople(options.id));
            const action = { type: GET_PEOPLE_SUCCESS, data };
            yield put(action);
        } catch (error) {
            const action = { type: GET_PEOPLE_ERROR, error };
            yield put(action);
        }
    };
}

function getTotalPosts(){
    return function* (options) { // eslint-disable-line consistent-return
        try {
            const data = yield call(() => api.getPosts(options.id));
            const action = { type: GET_PEOPLE_SUCCESS, data };
            yield put(action);
        } catch (error) {
            const action = { type: GET_PEOPLE_ERROR, error };
            yield put(action);
        }
    };
}


export function* getPeopleWatcher() { yield takeLatest(GET_PEOPLE_START, createGetPeople()); }
export function* getPostsWatcher() { yield takeLatest(GET_TOTAL_POSTS, getTotalPosts()); }


export default [
    getPeopleWatcher(),
    getPostsWatcher()
];
