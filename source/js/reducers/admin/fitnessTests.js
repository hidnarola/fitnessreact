import { Map } from "immutable";
import {
    FITNESS_TESTS_FILTER_REQUEST,
    FITNESS_TESTS_FILTER_SUCCESS,
    FITNESS_TESTS_FILTER_ERROR,
    FITNESS_TESTS_DELETE_REQUEST,
    FITNESS_TESTS_DELETE_SUCCESS,
    FITNESS_TESTS_DELETE_ERROR,
    FITNESS_TESTS_ADD_REQUEST,
    FITNESS_TESTS_ADD_SUCCESS,
    FITNESS_TESTS_ADD_ERROR,
    FITNESS_TESTS_SELECT_ONE_REQUEST,
    FITNESS_TESTS_SELECT_ONE_SUCCESS,
    FITNESS_TESTS_SELECT_ONE_ERROR,
    FITNESS_TESTS_UPDATE_REQUEST,
    FITNESS_TESTS_UPDATE_SUCCESS,
    FITNESS_TESTS_UPDATE_ERROR,
    FITNESS_TESTS_REINITIALIZE,
    FITNESS_TESTS_RECOVER_REQUEST,
    FITNESS_TESTS_RECOVER_SUCCESS,
    FITNESS_TESTS_RECOVER_ERROR,
    SET_FITNESS_TESTS_STATE
} from "../../actions/admin/fitnessTests";

import { generateValidationErrorMsgArr } from "../../helpers/funs";
import { VALIDATION_FAILURE_STATUS } from "../../constants/consts";

const initialState = Map({
    loading: false,
    fitnessTest: {},
    error: [],
    filteredFitnessTests: [],
    filteredTotalPages: 0,
    filteredLoading: false,
    recoverLoading: false,
    recoverFlag: false,
    recoverError: [],
});

const actionMap = {
    [FITNESS_TESTS_SELECT_ONE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
        }));
    },
    [FITNESS_TESTS_SELECT_ONE_SUCCESS]: (state, action) => {
        var newStateObj = {
            loading: false,
        };
        if (action.data.status && action.data.status === 1) {
            newStateObj.fitnessTest = action.data.test_exercise;
        } else {
            var errorMsg = 'Something went wrong! please try again later.';
            if (action.data.message) {
                errorMsg = action.data.message;
            }
            newStateObj.error = [errorMsg];
        }
        return state.merge(Map(newStateObj));
    },
    [FITNESS_TESTS_SELECT_ONE_ERROR]: (state, action) => {
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
    [FITNESS_TESTS_FILTER_REQUEST]: (state, action) => {
        return state.merge(Map({
            filteredLoading: true,
        }));
    },
    [FITNESS_TESTS_FILTER_SUCCESS]: (state, action) => {
        return state.merge(Map({
            filteredLoading: false,
            filteredFitnessTests: action.data.filtered_test_exercises,
            filteredTotalPages: action.data.filtered_total_pages,
        }));
    },
    [FITNESS_TESTS_FILTER_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            filteredLoading: false,
            error: error,
        }));
    },
    [FITNESS_TESTS_ADD_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
        }));
    },
    [FITNESS_TESTS_ADD_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            fitnessTest: action.data.test_exercise,
        }));
    },
    [FITNESS_TESTS_ADD_ERROR]: (state, action) => {
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
    [FITNESS_TESTS_UPDATE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
        }));
    },
    [FITNESS_TESTS_UPDATE_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            fitnessTest: action.data.test_exercise,
        }));
    },
    [FITNESS_TESTS_UPDATE_ERROR]: (state, action) => {
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
    [FITNESS_TESTS_DELETE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
        }));
    },
    [FITNESS_TESTS_DELETE_SUCCESS]: (state, action) => {
        var newStateObj = {
            loading: false,
        }
        if (action.data.status !== 1) {
            var errorMsg = 'Something went wrong! please try again later.';
            if (action.data.message) {
                errorMsg = action.data.message;
            }
            newStateObj.error = [errorMsg];
        }
        return state.merge(Map(newStateObj));
    },
    [FITNESS_TESTS_DELETE_ERROR]: (state, action) => {
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
    [FITNESS_TESTS_RECOVER_REQUEST]: (state, action) => {
        return state.merge(Map({
            recoverLoading: true,
            recoverFlag: false,
            recoverError: []
        }));
    },
    [FITNESS_TESTS_RECOVER_SUCCESS]: (state, action) => {
        let newState = { recoverLoading: false };
        if (action.data && action.data.status && action.data.status === 1) {
            newState.recoverFlag = true;
        } else {
            let msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later';
            newState.recoverError = [msg];
        }
        return state.merge(Map(newState));
    },
    [FITNESS_TESTS_RECOVER_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            recoverLoading: false,
            recoverError: error,
        }));
    },
    [FITNESS_TESTS_REINITIALIZE]: (state, action) => {
        return state.merge(initialState);
    },
    [SET_FITNESS_TESTS_STATE]: (state, action) => {
        return state.merge(Map(action.stateData));
    },
};

export default function reducer(state = initialState, action = {}) {
    if (action && action.type) {
        var fn = actionMap[action.type];
        return fn ? fn(state, action) : state;
    }
    return state;
}