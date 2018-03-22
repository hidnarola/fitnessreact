import { Map } from 'immutable';

import {
    GET_DASHBOARD_START,GET_DASHBOARD_ERROR,GET_DASHBOARD_SUCCESS,SET_WIDGETS
} from '../actions/dashboard';

const initialState = Map({
    loading: false,
    error: null,
    allWidgets:{
        todayWorkOut: true,
        nextMeal: true,
        activity: true,
        goalProgress: true,
        bodyFat: true,
        badges: true,
        weeksCalories: true,
        activityFeed: true
    },
    todayWorkOut:null,
    nextMeal:null,
    goalProgress:null,
    bodyFat:null,
    weekscalories:null
});

const actionsMap = {
    
    // Async action    

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
            // dashboardData:action.data,
            allWidgets:action.data.allWidgets,
            todayWorkOut:action.data.todayWorkOut,
            nextMeal:action.data.nextMeal,
            goalProgress:action.data.goalProgress,
            bodyFat:action.data.bodyFat,
            weeksCalories:action.data.weeksCalories
        }));
    },
    [SET_WIDGETS]: (state,action) =>{
        return state.merge(Map({
            allWidgets:action.data,
        }));
    }
    
};

export default function reducer(state = initialState, action = {}) {
    const fn = actionsMap[action.type];
    return fn ? fn(state, action) : state;
}