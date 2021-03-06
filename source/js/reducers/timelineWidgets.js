import { Map } from "immutable";
import {
    GET_TIMELINE_WIDGETS_AND_WIDGETS_DATA_REQUEST,
    GET_TIMELINE_WIDGETS_AND_WIDGETS_DATA_SUCCESS,
    GET_TIMELINE_WIDGETS_AND_WIDGETS_DATA_ERROR,
    SAVE_TIMELINE_WIDGETS_REQUEST,
    SAVE_TIMELINE_WIDGETS_SUCCESS,
    SAVE_TIMELINE_WIDGETS_ERROR,
    CHANGE_TIMELINE_BODY_FAT_WIDGET_REQUEST,
    CHANGE_TIMELINE_BODY_FAT_WIDGET_SUCCESS,
    CHANGE_TIMELINE_BODY_FAT_WIDGET_ERROR,
    CHANGE_TIMELINE_MUSCLE_INNER_DATA_REQUEST,
    CHANGE_TIMELINE_MUSCLE_INNER_DATA_SUCCESS,
    CHANGE_TIMELINE_MUSCLE_INNER_DATA_ERROR,
    SET_TIMELINE_WIDGET_DATA
} from "../actions/timelineWidgets";
import { generateValidationErrorMsgArr } from "../helpers/funs";
import { VALIDATION_FAILURE_STATUS } from "../constants/consts";
import moment from "moment";

const initialState = Map({
    loading: false,
    userWidgets: {},
    bodyFat: [],
    badges: [],
    muscle: {},
    progressPhoto: {},
    error: [],
    saveWidgetsLoading: false,
    saveWidgetsError: [],
    changeBodyFatLoading: false,
    changeBodyFatError: [],
});

const actionMap = {
    [GET_TIMELINE_WIDGETS_AND_WIDGETS_DATA_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            userWidgets: {},
            bodyFat: [],
            badges: [],
            muscle: {},
            progressPhoto: {},
            error: [],
        }));
    },
    [GET_TIMELINE_WIDGETS_AND_WIDGETS_DATA_SUCCESS]: (state, action) => {
        let newState = { loading: false };
        if (action.data && action.data.status && action.data.status === 1) {
            newState.userWidgets = action.data.data.userWidgets;
            newState.bodyFat = transformBodyFatData(action.data.data.bodyFat);
            newState.badges = transformBadgeData(action.data.data.badges);
            newState.muscle = prepareMuscleData(action.data.data.muscle);
            newState.progressPhoto = action.data.data.progressPhoto;
        } else {
            let msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [GET_TIMELINE_WIDGETS_AND_WIDGETS_DATA_ERROR]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: prepareResponseError(action),
        }));
    },
    [SAVE_TIMELINE_WIDGETS_REQUEST]: (state, action) => {
        return state.merge(Map({
            saveWidgetsLoading: true,
            saveWidgetsError: [],
        }));
    },
    [SAVE_TIMELINE_WIDGETS_SUCCESS]: (state, action) => {
        let newState = { saveWidgetsLoading: false };
        if (action.data && action.data.status && action.data.status === 1) {
            newState.userWidgets = action.data.widgets;
        } else {
            let msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later';
            newState.saveWidgetsError = [msg];
        }
        return state.merge(Map(newState));
    },
    [SAVE_TIMELINE_WIDGETS_ERROR]: (state, action) => {
        return state.merge(Map({
            saveWidgetsLoading: false,
            saveWidgetsError: prepareResponseError(action),
        }));
    },
    [CHANGE_TIMELINE_BODY_FAT_WIDGET_REQUEST]: (state, action) => {
        return state.merge(Map({
            changeBodyFatLoading: true,
            bodyFat: [],
            changeBodyFatError: [],
        }));
    },
    [CHANGE_TIMELINE_BODY_FAT_WIDGET_SUCCESS]: (state, action) => {
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
    [CHANGE_TIMELINE_BODY_FAT_WIDGET_ERROR]: (state, action) => {
        return state.merge(Map({
            changeBodyFatLoading: false,
            changeBodyFatError: prepareResponseError(action),
        }));
    },
    [CHANGE_TIMELINE_MUSCLE_INNER_DATA_REQUEST]: (state, action) => {
        let prevMuscleState = state.get('muscle');
        let nextMuscleState = {};
        Object.keys(prevMuscleState).map((k, i) => {
            let _o = Object.assign({}, prevMuscleState[k]);
            _o.loading = true;
            _o.error = [];
            nextMuscleState[k] = _o;
        });
        return state.merge(Map({
            muscle: nextMuscleState,
        }));
    },
    [CHANGE_TIMELINE_MUSCLE_INNER_DATA_SUCCESS]: (state, action) => {
        let nextMuscleState = prepareMuscleData(action.data.data.muscle);
        return state.merge(Map({
            muscle: nextMuscleState,
            userWidgets: action.data.data.widgets,
        }));
    },
    [CHANGE_TIMELINE_MUSCLE_INNER_DATA_ERROR]: (state, action) => {
        let prevMuscleState = state.get('muscle');
        let nextMuscleState = {};
        Object.keys(prevMuscleState).map((k, i) => {
            let _o = Object.assign({}, prevMuscleState[k]);
            _o.loading = false;
            _o.error = prepareResponseError(action);
            nextMuscleState[k] = _o;
        })
        return state.merge(Map({
            muscle: nextMuscleState,
        }));
    },
    [SET_TIMELINE_WIDGET_DATA]: (state, action) => {
        return state.merge(Map(action.stateData));
    }
}

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