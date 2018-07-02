import { Map } from "immutable";
import {
    SET_SELECTED_SLOT_FROM_CALENDAR,
} from "../actions/userScheduleWorkouts";

const initialState = Map({
    slotInfo: null,
});

const actionMap = {
    [SET_SELECTED_SLOT_FROM_CALENDAR]: (state, action) => {
        return state.merge(Map({
            slotInfo: action.slotInfo,
        }));
    },
}

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}