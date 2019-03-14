import { Map } from "../../../node_modules/immutable";
import { VALIDATION_FAILURE_STATUS, BADGE_TYPE_TRACKING } from "../constants/consts";
import { generateValidationErrorMsgArr } from "../helpers/funs";
import {
    GET_USER_BADGES_BY_TYPE_REQUEST,
    GET_USER_BADGES_BY_TYPE_SUCCESS,
    GET_USER_BADGES_BY_TYPE_ERROR,
    SET_USER_BADGES_BY_TYPE
} from "../actions/userBadges";

const initialState = Map({
    loading: false,
    selectedBadgeType: BADGE_TYPE_TRACKING,
    badges: [],
    error: [],
    iDB:null
});

const actionMap = {
    [GET_USER_BADGES_BY_TYPE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            selectedBadgeType: (action.badgeType) ? action.badgeType : BADGE_TYPE_TRACKING,
            badges: [],
            error: [],
        }));
    },
    [GET_USER_BADGES_BY_TYPE_SUCCESS]: (state, action) => {
        var newState = {
            loading: false,
        }
        if (typeof action.data.status !== 'undefined' && action.data.status === 1) {
            newState.badges = action.data.badges;
        } else if (typeof action.data.status !== 'undefined' && action.data.status === 0) {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [GET_USER_BADGES_BY_TYPE_ERROR]: (state, action) => {
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
    [SET_USER_BADGES_BY_TYPE]: (state, action) => {
        return state.merge(Map(action.data));
    }
}

export default function reducer(state = initialState, action = {}) {
    if (action && action.type) {
        var fn = actionMap[action.type];
        return fn ? fn(state, action) : state;
    }
    return state;
}