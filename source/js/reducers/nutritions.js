import { Map } from "immutable";
import { GET_NUTRITION_REQUEST, GET_NUTRITION_SUCCESS, GET_NUTRITION_ERROR } from "../actions/nutritions";

const initialState = Map({
    loading: false,
    error: null,
    nutritions: null,
});

const actionMap = {
    [GET_NUTRITION_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
        }));
    },
    [GET_NUTRITION_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            nutritions: action.data.nutritions,
        }));
    },
    [GET_NUTRITION_ERROR]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: action.error.message,
        }));
    }
};

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}