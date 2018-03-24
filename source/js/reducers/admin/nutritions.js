import { Map } from "immutable";
import { NUTRITIONS_ADD_REQUEST, NUTRITIONS_ADD_SUCCESS, NUTRITIONS_ADD_ERROR } from "../../actions/admin/nutritions";

const initialState = Map({
    loading: false,
    error: null,
    nutrition: null
});

const actionMap = {
    [NUTRITIONS_ADD_REQUEST]: (state, action) => {
        return state.merge({
            loading: true,
            error: null,
            nutrition: null
        });
    },
    [NUTRITIONS_ADD_SUCCESS]: (state, action) => {
        return state.merge({
            loading: false,
            error: null,
            nutrition: action.data.nutrition
        });
    },
    [NUTRITIONS_ADD_ERROR]: (state, action) => {
        let error = 'Server error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge({
            loading: false,
            error: error,
            nutrition: null
        });
    },
};

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}