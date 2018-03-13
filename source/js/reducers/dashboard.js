import { Map } from 'immutable';

import {
    GET_PEOPLE_START_NEW, GET_PEOPLE_ERROR_NEW, GET_PEOPLE_SUCCESS_NEW,
    GET_DASHBOARD_START,GET_DASHBOARD_ERROR,GET_DASHBOARD_SUCCESS
} from '../actions/dashboard';

const initialState = Map({
    loading: false,
    error: null,
    people: null    
});

const actionsMap = {
    // Async action
    [GET_PEOPLE_START_NEW]: (state) => {
        return state.merge(Map({
            loading: true,
            error: null,
            people: null,
        }));
    },
    [GET_PEOPLE_ERROR_NEW]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: action.error.message,
        }));
    },
    [GET_PEOPLE_SUCCESS_NEW]: (state, action) => {
        return state.merge(Map({
            loading: false,
            people:action.data
        }));
    },
    
    //-------------------------------------------------------------

    [GET_DASHBOARD_START]: (state) => {
        return state.merge(Map({
            loading: true,
            error: null,
            dashboardData: null,
        }));
    },
    [GET_DASHBOARD_ERROR]: (state,action) => {
        return state.merge(Map({
            loading: false,
            error: action.error.message,
        }));
    },
    [GET_DASHBOARD_SUCCESS]: (state,action) => {
        return state.merge(Map({
            loading: false,
            dashboardData:action.data
        }));
    },
};

export default function reducer(state = initialState, action = {}) {
    const fn = actionsMap[action.type];
    return fn ? fn(state, action) : state;
}