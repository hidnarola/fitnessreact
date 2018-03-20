import { Map } from "immutable";
import { GET_EXERCISE_EQUIPMENT_START, GET_EXERCISE_EQUIPMENT_SUCCESS, GET_EXERCISE_EQUIPMENT_ERROR } from "../../actions/exercise/equipments";

const initialState = Map({
    loading: false,
    error: null,
    equipments: null,
});

const actionMap = {
    [GET_EXERCISE_EQUIPMENT_START]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null,
            equipments: null,
        }));
    },
    [GET_EXERCISE_EQUIPMENT_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: null,
            equipments: action.data.equipments,
        }));
    },
    [GET_EXERCISE_EQUIPMENT_ERROR]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: action.error.message,
            equipments: null,
        }));
    },
}

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}