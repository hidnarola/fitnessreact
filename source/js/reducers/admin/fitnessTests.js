import { Map } from "immutable";
import {
    FITNESS_TESTS_FILTER_REQUEST,
    FITNESS_TESTS_FILTER_SUCCESS,
    FITNESS_TESTS_FILTER_ERROR
} from "../../actions/admin/fitnessTests";

import { generateValidationErrorMsgArr } from "../../helpers/funs";
import { VALIDATION_FAILURE_STATUS } from "../../constants/consts";

const initialState = Map({
    error: [],
    filteredFitnessTests: [],
    filteredTotalPages: 0,
    filteredLoading: 0,
});

const actionMap = {
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
};

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}