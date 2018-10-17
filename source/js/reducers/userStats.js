import { Map } from "../../../node_modules/immutable";
import {
    GET_USER_STATS_REQUEST,
    GET_USER_STATS_SUCCESS,
    GET_USER_STATS_ERROR,
    GET_USER_GRAPH_DATA_REQUEST,
    GET_USER_GRAPH_DATA_SUCCESS,
    GET_USER_GRAPH_DATA_ERROR,
    GET_USER_SINGLE_STATS_REQUEST,
    GET_USER_SINGLE_STATS_SUCCESS,
    GET_USER_SINGLE_STATS_ERROR,
    SET_USER_STATS_STATE,
} from "../actions/userStats";
import { VALIDATION_FAILURE_STATUS, STATS_STRENGTH } from "../constants/consts";
import { generateValidationErrorMsgArr } from "../helpers/funs";
import moment from "moment";

const initialState = Map({
    loading: false,
    loadingFields: false,
    stats: null,
    selectedType: null,
    error: [],
    dateRange: null,
    regetStats: false,  // used as flag to hard reget stats data
});

const actionMap = {
    [GET_USER_STATS_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            stats: null,
            selectedType: (action.requestData && action.requestData.type) ? action.requestData.type : STATS_STRENGTH,
            dateRange: (action.requestData && action.requestData.dateRange) ? action.requestData.dateRange : null,
            error: [],
        }));
    },
    [GET_USER_STATS_SUCCESS]: (state, action) => {
        var newState = {
            loading: false,
        };
        if (action.data && typeof action.data.status !== 'undefined' && action.data.status === 1) {
            newState.stats = prepareStatsData(action.data.statistics);
        } else {
            let msg = (action.message) ? action.message : 'Something went wrong! please try again later.';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [GET_USER_STATS_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            loading: false,
            error: error,
        }));
    },
    [GET_USER_GRAPH_DATA_REQUEST]: (state, action) => {
        var newState = {};
        newState.stats = prepareStatsDataForGraphRequest(state.get('stats'), action.requestData);
        return state.merge(Map(newState));
    },
    [GET_USER_GRAPH_DATA_SUCCESS]: (state, action) => {
        var newState = {};
        newState.stats = prepareStateDataForGraphResponse(state.get('stats'), action.data);
        return state.merge(Map(newState));
    },
    [GET_USER_GRAPH_DATA_ERROR]: (state, action) => {
        var newState = {};
        newState.stats = prepareStateDataForGraphResponse(state.get('stats'), action.data);
        return state.merge(Map(newState));
    },
    [GET_USER_SINGLE_STATS_REQUEST]: (state, action) => {
        var newState = {
            loadingFields: true,
        };
        newState.stats = prepareStateDataForSingleRequest(state.get('stats'), action.requestData)
        return state.merge(Map(newState));
    },
    [GET_USER_SINGLE_STATS_SUCCESS]: (state, action) => {
        var newState = {
            loadingFields: false,
        };
        newState.stats = prepareStateDataForSingleResponse(state.get('stats'), action.data);
        return state.merge(Map(newState));
    },
    [GET_USER_SINGLE_STATS_ERROR]: (state, action) => {
        var newState = {
            loadingFields: false,
        };
        newState.stats = prepareStateDataForSingleResponse(state.get('stats'), action.data);
        return state.merge(Map(newState));
    },
    [SET_USER_STATS_STATE]: (state, action) => {
        return state.merge(Map(action.stateData));
    },
};

function prepareStatsData(statistics) {
    if (statistics && statistics.data) {
        let newStats = Object.assign({}, statistics);
        let data = newStats.data;
        let prevWeekStart = moment().startOf('day').utc().subtract(1, 'week').format('YYYY-MM-DD');
        let prevMonthStart = moment().startOf('day').utc().subtract(1, 'month').format('YYYY-MM-DD');
        data.map((o) => {
            let start = moment(o.startDate).startOf('day').utc();
            let end = moment(o.endDate).startOf('day').utc();
            o.startDate = start;
            o.endDate = end;
            o.dateRange = moment.range(
                start,
                end
            );
            switch (start.format('YYYY-MM-DD')) {
                case prevWeekStart:
                    o.activeCalendarBtn = 'week';
                    break;
                case prevMonthStart:
                    o.activeCalendarBtn = 'month';
                    break;
                default:
                    o.activeCalendarBtn = 'calendar';
                    break;
            }
            Object.keys(o.fields).map((key) => {
                if (typeof o.fields[key].total !== 'undefined' && o.fields[key].total > 0 && (typeof o.activeField === 'undefined' || o.activeField === '')) {
                    o.activeField = key;
                }
            });
            o.fieldsLoading = false;
            o.fieldsError = [];
            o.graphLoading = false;
            o.graphData = [];
            o.graphError = [];
        });
        return newStats;
    }
    return null;
}

function prepareStatsDataForGraphRequest(statistics, requestData) {
    if (statistics && statistics.data) {
        let newData = [];
        let data = statistics.data;
        data.map((o) => {
            let _o = Object.assign({}, o);
            requestData.map((rd) => {
                if (o.subCategory === rd.subCategory) {
                    _o.activeField = rd.activeField;
                    _o.graphLoading = true;
                    _o.graphData = [];
                    _o.graphError = [];
                }
            });
            newData.push(_o);
        });
        return { data: newData };
    }
    return null;
}

function prepareStateDataForGraphResponse(statistics, responseData) {
    if (statistics && statistics.data) {
        let newData = [];
        let data = statistics.data;
        data.map((o) => {
            let _o = Object.assign({}, o);
            responseData.statistics.map((res) => {
                if (o.subCategory === res.subCategory) {
                    _o.graphLoading = false;
                    _o.graphData = (res.graphData) ? res.graphData : [];
                    _o.graphData.map((o) => {
                        o.date = moment(o.date).local().format('DD/MM/YYYY')
                    });
                }
            });
            newData.push(_o);
        });
        return { data: newData };
    }
    return null;
}

function prepareStateDataForSingleRequest(statistics, requestData) {
    if (statistics && statistics.data) {
        let newData = [];
        let data = statistics.data;
        let prevWeekStart = moment().startOf('day').utc().subtract(1, 'week').format('YYYY-MM-DD');
        let prevMonthStart = moment().startOf('day').utc().subtract(1, 'month').format('YYYY-MM-DD');
        data.map((o) => {
            let _o = Object.assign({}, o);
            if (o.subCategory === requestData.subCategory) {
                _o.exerciseId = requestData.exerciseId;
                _o.dateRange = moment.range(
                    moment(requestData.start),
                    moment(requestData.end)
                );
                switch (requestData.start.format('YYYY-MM-DD')) {
                    case prevWeekStart:
                        _o.activeCalendarBtn = 'week';
                        break;
                    case prevMonthStart:
                        _o.activeCalendarBtn = 'month';
                        break;
                    default:
                        _o.activeCalendarBtn = 'calendar';
                        break;
                }
                _o.fieldsLoading = true;
                _o.fields = {};
                _o.fieldsError = [];
                _o.graphLoading = true;
                _o.graphData = [];
                _o.graphError = [];
            }
            newData.push(_o);
        });
        return { data: newData };
    }
    return null;
}

function prepareStateDataForSingleResponse(statistics, responseData) {
    if (statistics && statistics.data) {
        let newData = [];
        let data = statistics.data;
        data.map((o) => {
            let _o = Object.assign({}, o);
            if (o.subCategory === responseData.statistics.subCategory) {
                _o.fieldsLoading = false;
                if (responseData.status && responseData.status === 1) {
                    if (responseData.statistics.fields) {
                        _o.fields = responseData.statistics.fields;
                        let activeField = '';
                        Object.keys(responseData.statistics.fields).map((key) => {
                            if (typeof responseData.statistics.fields[key].total !== 'undefined' && responseData.statistics.fields[key].total > 0 && activeField === '') {
                                activeField = key;
                            }
                        });
                        _o.activeField = activeField;
                    } else {
                        _o.fields = responseData.statistics.fields;
                        _o.activeField = '';
                    }
                } else {
                    let msg = (responseData.message) ? responseData.message : 'Something went wrong! please try again later.';
                    _o.fieldsError = [msg];
                }
            }
            newData.push(_o);
        });
        return { data: newData };
    }
    return null;
}

export default function reducer(state = initialState, action = {}) {
    if (action && action.type) {
        var fn = actionMap[action.type];
        return fn ? fn(state, action) : state;
    }
    return state;
}