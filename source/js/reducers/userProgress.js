import { Map } from "../../../node_modules/immutable";
import { PROGRESS_BODY_FAT, VALIDATION_FAILURE_STATUS } from "../constants/consts";
import {
    GET_USER_PROGRESS_BY_CATEGORY_AND_DATE_REQUEST,
    GET_USER_PROGRESS_BY_CATEGORY_AND_DATE_SUCCESS,
    GET_USER_PROGRESS_BY_CATEGORY_AND_DATE_ERROR,
    SET_USER_PROGRESS_DATE_RANGE,
} from "../actions/userProgress";
import { generateValidationErrorMsgArr } from "../helpers/funs";
import moment from "moment";

const initialState = Map({
    loading: false,
    selectedType: PROGRESS_BODY_FAT,
    dateRange: null,
    progress: null,
    error: [],
});

const actionMap = {
    [SET_USER_PROGRESS_DATE_RANGE]: (state, action) => {
        return state.merge(Map({
            dateRange: action.dateRange,
        }));
    },
    [GET_USER_PROGRESS_BY_CATEGORY_AND_DATE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            selectedType: action.requestData.category,
            dateRange: action.requestData.dateRange,
            progress: null,
            error: [],
        }));
    },
    [GET_USER_PROGRESS_BY_CATEGORY_AND_DATE_SUCCESS]: (state, action) => {
        var newState = {
            loading: false,
        };
        if (typeof action.data.status !== 'undefined' && action.data.status === 1) {
            newState.progress = action.data.progress;
        } else if (typeof action.data.status !== 'undefined' && action.data.status === 0) {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [GET_USER_PROGRESS_BY_CATEGORY_AND_DATE_ERROR]: (state, action) => {
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
};

export default function reducer(state = initialState, action = {}) {
    var fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}