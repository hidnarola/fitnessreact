import { Map } from "immutable";
import { CHANGE_USER_TIMELINE_WIDGETS_STATE } from "../actions/timelineWidgets";

const initialState = Map({
    badges: false,
    progressPhoto: false,
    stats: [],
    graph: [],
});

const actionMap = {
    [CHANGE_USER_TIMELINE_WIDGETS_STATE]: (state, action) => {
        return state.merge(Map({
            [action.stateName]: action.stateData,
        }));
    }
}

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}