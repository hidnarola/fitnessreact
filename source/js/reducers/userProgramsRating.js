import { Map } from "immutable";
import { generateValidationErrorMsgArr } from "../helpers/funs";
import {
    SAVE_USER_PROGRAMS_RATING_REQUEST,
    SAVE_USER_PROGRAMS_RATING_SUCCESS,
    SAVE_USER_PROGRAMS_RATING_ERROR
} from "../actions/userProgramsRating";
import { VALIDATION_FAILURE_STATUS } from "../constants/consts";

const initialState = Map({
    saveLoading: false,
    saveProgramsRating: null,
    saveError: [],
});

const actionMap = {
    [SAVE_USER_PROGRAMS_RATING_REQUEST]: (state, action) => {
        return state.merge(Map({
            saveLoading: true,
            saveProgramsRating: null,
            saveError: [],
        }));
    },
    [SAVE_USER_PROGRAMS_RATING_SUCCESS]: (state, action) => {
        var newState = { saveLoading: false }
        if (action.data && action.data.status && typeof action.data.status !== 'undefined' && action.data.status === 1) {
            newState.saveProgramsRating = action.data.data;
        } else {
            var msg = (action.data && action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.saveError = [msg];
        }
        return state.merge(Map(newState));
    },
    [SAVE_USER_PROGRAMS_RATING_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            saveLoading: false,
            saveError: error,
        }));
    },
}

export default function reducer(state = initialState, action = {}) {
    if (action && action.type) {
        var fn = actionMap[action.type];
        return fn ? fn(state, action) : state;
    }
    return state;
}