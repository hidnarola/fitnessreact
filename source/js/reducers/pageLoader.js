import { Map } from "immutable";
import { SHOW_PAGE_LOADER, HIDE_PAGE_LOADER } from "../actions/pageLoader";

const initialState = Map({
    loading: false,
});

const actionMap = {
    [SHOW_PAGE_LOADER]: (state, action) => {
        return state.merge(Map({
            loading: true,
        }));
    },
    [HIDE_PAGE_LOADER]: (state, action) => {
        return state.merge(Map({
            loading: false,
        }));
    },
}

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}