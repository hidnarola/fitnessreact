import { Map } from "../../../node_modules/immutable";
import {
    GET_DASHBOARD_PAGE_REQUEST,
    GET_DASHBOARD_PAGE_SUCCESS,
    GET_DASHBOARD_PAGE_ERROR,
    SAVE_DASHBOARD_WIDGETS_DATA_REQUEST,
    SAVE_DASHBOARD_WIDGETS_DATA_SUCCESS,
    SAVE_DASHBOARD_WIDGETS_DATA_ERROR,
    CHANGE_DASHBOARD_BODY_FAT_WIDGET_REQUEST,
    CHANGE_DASHBOARD_BODY_FAT_WIDGET_SUCCESS,
    CHANGE_DASHBOARD_BODY_FAT_WIDGET_ERROR,
    CHANGE_COMPLETE_STATUS_OF_WORKOUT_REQUEST,
    CHANGE_COMPLETE_STATUS_OF_WORKOUT_SUCCESS,
    CHANGE_COMPLETE_STATUS_OF_WORKOUT_ERROR,
    CHANGE_DASHBOARD_MUSCLE_INNER_DATA_REQUEST,
    CHANGE_DASHBOARD_MUSCLE_INNER_DATA_SUCCESS,
    CHANGE_DASHBOARD_MUSCLE_INNER_DATA_ERROR
} from "../actions/dashboard";
import { VALIDATION_FAILURE_STATUS } from "../constants/consts";
import { generateValidationErrorMsgArr } from "../helpers/funs";
import moment from "moment";

const initialState = Map({
    loading: false,
    workouts: [],
    userWidgets: {},
    profileComplete: 0,
    badges: [],
    muscle: {},
    progressPhoto: {},
    bodyFat: [],
    activityFeed: [],
    error: [],
    saveWidgetsLoading: false,
    saveWidgetsError: [],
    changeBodyFatLoading: false,
    changeBodyFatError: [],
    changeCompleteWorkoutLoading: false,
    changeCompleteWorkoutError: [],
});

const actionMap = {
    [GET_DASHBOARD_PAGE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            workouts: [],
            userWidgets: {},
            profileComplete: 0,
            badges: [],
            muscle: {},
            progressPhoto: {},
            bodyFat: [],
            activityFeed: [],
            error: [],
        }));
    },
    [GET_DASHBOARD_PAGE_SUCCESS]: (state, action) => {
        let newState = { loading: false };
        if (action.data && action.data.status && action.data.status === 1) {
            newState.workouts = action.data.data.workouts;
            newState.userWidgets = action.data.data.userWidgets;
            newState.profileComplete = action.data.data.profileComplete;
            newState.badges = transformBadgeData(action.data.data.badges);
            newState.muscle = prepareMuscleData(action.data.data.muscle);
            newState.progressPhoto = action.data.data.progressPhoto;
            newState.bodyFat = transformBodyFatData(action.data.data.bodyFat);
            newState.activityFeed = action.data.data.activityFeed;
        } else {
            let msg = (newState.data.message) ? newState.data.message : 'Something went wrong! please try again later';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [GET_DASHBOARD_PAGE_ERROR]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: prepareResponseError(action),
        }));
    },
    [SAVE_DASHBOARD_WIDGETS_DATA_REQUEST]: (state, action) => {
        return state.merge(Map({
            saveWidgetsLoading: true,
            saveWidgetsError: [],
        }));
    },
    [SAVE_DASHBOARD_WIDGETS_DATA_SUCCESS]: (state, action) => {
        let newState = { saveWidgetsLoading: false };
        if (action.data && action.data.status && action.data.status === 1) {
            newState.userWidgets = action.data.widgets;
        } else {
            let msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later';
            newState.saveWidgetsError = [msg];
        }
        return state.merge(Map(newState));
    },
    [SAVE_DASHBOARD_WIDGETS_DATA_ERROR]: (state, action) => {
        return state.merge(Map({
            saveWidgetsLoading: false,
            saveWidgetsError: prepareResponseError(action),
        }));
    },
    [CHANGE_DASHBOARD_BODY_FAT_WIDGET_REQUEST]: (state, action) => {
        return state.merge(Map({
            changeBodyFatLoading: true,
            bodyFat: [],
            changeBodyFatError: [],
        }));
    },
    [CHANGE_DASHBOARD_BODY_FAT_WIDGET_SUCCESS]: (state, action) => {
        let newState = { changeBodyFatLoading: false };
        if (action.data && action.data.status && action.data.status === 1) {
            newState.userWidgets = action.data.data.widgets;
            newState.bodyFat = transformBodyFatData(action.data.data.bodyFat);
        } else {
            let msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later';
            newState.changeBodyFatError = [msg];
        }
        return state.merge(Map(newState));
    },
    [CHANGE_DASHBOARD_BODY_FAT_WIDGET_ERROR]: (state, action) => {
        return state.merge(Map({
            changeBodyFatLoading: false,
            changeBodyFatError: prepareResponseError(action),
        }));
    },
    [CHANGE_COMPLETE_STATUS_OF_WORKOUT_REQUEST]: (state, action) => {
        return state.merge(Map({
            changeCompleteWorkoutLoading: true,
            changeCompleteWorkoutError: [],
        }));
    },
    [CHANGE_COMPLETE_STATUS_OF_WORKOUT_SUCCESS]: (state, action) => {
        let newState = { changeCompleteWorkoutLoading: false };
        if (action.data && action.data.status && action.data.status === 1) {
            newState.workouts = action.cdata.data.workouts;
        } else {
            let msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later';
            newState.changeCompleteWorkoutError = [msg];
        }
        return state.merge(Map(newState));
    },
    [CHANGE_COMPLETE_STATUS_OF_WORKOUT_ERROR]: (state, action) => {
        return state.merge(Map({
            changeCompleteWorkoutLoading: false,
            changeCompleteWorkoutError: prepareResponseError(action),
        }));
    },
    [CHANGE_DASHBOARD_MUSCLE_INNER_DATA_REQUEST]: (state, action) => {
        let prevMuscleState = state.get('muscle');
        let nextMuscleState = {};
        Object.keys(prevMuscleState).map((k, i) => {
            let _o = Object.assign({}, prevMuscleState[k]);
            if (k === action.requestData.bodypart) {
                _o.loading = true;
                _o.error = [];
            }
            nextMuscleState[k] = _o;
        });
        return state.merge(Map({
            muscle: nextMuscleState,
        }));
    },
    [CHANGE_DASHBOARD_MUSCLE_INNER_DATA_SUCCESS]: (state, action) => {
        let prevMuscleState = state.get('muscle');
        let nextMuscleState = {};
        Object.keys(prevMuscleState).map((k, i) => {
            let _o = Object.assign({}, prevMuscleState[k]);
            if (k === action.data.data.bodypart) {
                if (action.data.data.muscle) {
                    _o = action.data.data.muscle;
                    if (_o.graphData) {
                        _o.graphData.map((o) => {
                            o.date = moment(o.date).local().format('DD/MM/YYYY');
                        });
                    }
                    _o.loading = false;
                    _o.error = [];
                } else {
                    _o = {
                        loading: false,
                        error: [],
                    }
                }
            }
            nextMuscleState[k] = _o;
        });
        return state.merge(Map({
            muscle: nextMuscleState,
            userWidgets: action.data.data.widgets,
        }));
    },
    [CHANGE_DASHBOARD_MUSCLE_INNER_DATA_ERROR]: (state, action) => {
        let prevMuscleState = state.get('muscle');
        let nextMuscleState = {};
        Object.keys(prevMuscleState).map((k, i) => {
            let _o = Object.assign({}, prevMuscleState[k]);
            if (k === action.data.data.bodypart) {
                _o.loading = false;
                _o.error = prepareResponseError(action);
            }
            nextMuscleState[k] = _o;
        })
        return state.merge(Map({
            muscle: nextMuscleState,
        }));
    },
};

function prepareResponseError(action) {
    let error = [];
    if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
        error = generateValidationErrorMsgArr(action.error.response.message);
    } else if (action.error && action.error.message) {
        error = [action.error.message];
    } else {
        error = ['Something went wrong! please try again later'];
    }
    return error;
}

function prepareMuscleData(data) {
    if (!data) {
        return data;
    }
    let _data = {};
    Object.keys(data).map((k, i) => {
        let _o = Object.assign({}, data[k]);
        if (_o.graphData) {
            _o.graphData.map((o) => {
                o.date = moment(o.date).local().format('DD/MM/YYYY');
            });
        }
        _o.loading = false;
        _o.error = [];
        _data[k] = _o;
    });
    return _data;
}

function transformBodyFatData(data) {
    let newData = [];
    if (data) {
        data.map((o) => {
            o.date = moment(o.date).local().format('DD/MM/YYYY');
            newData.push(o);
        });
    }
    return newData;
}

function transformBadgeData(data) {
    let newData = [];
    if (data) {
        data.map((o) => {
            o.createdAt = moment(o.createdAt).local().toString();
            newData.push(o);
        });
    }
    return newData;
}

export default function reducer(state = initialState, action = {}) {
    if (action && action.type) {
        var fn = actionMap[action.type];
        return fn ? fn(state, action) : state;
    }
    return state;
}