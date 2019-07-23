import { Map } from "immutable";
import { GET_INGRIDIENTS_REQUEST, GET_INGRIDIENTS_SUCCESS, GET_INGRIDIENTS_ERROR, HANDLE_CHANGE_INGRIDIENTS_SEARCH_FOR, RESET_NGRIDIENTS_SEARCH } from "../actions/new_nutrition";

const initialState = Map({
    loading: false,
    searchValue: '',
    ingridients: [],
    error: [],
    name: ''
});

const actionMap = {
    [GET_INGRIDIENTS_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            // ingridients: [],
            error: [],
        }));
    },
    [GET_INGRIDIENTS_SUCCESS]: (state, action) => {
        console.log('action.data.proximates => ', action.data.proximates);
        var newState = {
            loading: false,
        };
        if (action.data.status === 1) {
            newState.ingridients = action.data.proximates.sort(function (a, b) {
                if (a.foodName < b.foodName) { return -1; }
                if (a.foodName > b.foodName) { return 1; }
                return 0;
            });
            newState.error = [];
        } else {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            // newState.ingridients = [];
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [GET_INGRIDIENTS_ERROR]: (state, action) => {
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
    [HANDLE_CHANGE_INGRIDIENTS_SEARCH_FOR]: (state, action) => {
        return state.merge(Map({
            [action.name]: action.value,
        }));
    },
    [RESET_NGRIDIENTS_SEARCH]: (state, action) => {
        // return state.merge(Map(action.resetState));
    }
};

export default function reducer(state = initialState, action = {}) {
    if (action && action.type) {
        var fn = actionMap[action.type];
        return fn ? fn(state, action) : state;
    }
    return state;
}