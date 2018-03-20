import { Map } from "immutable";
import { GET_EXERCISE_FITNESS_START, GET_EXERCISE_FITNESS_SUCCESS, GET_EXERCISE_FITNESS_ERROR } from "../../actions/exercise/fitness";

const initialState = Map({
    loading: false,
    error: null,
    strength: null,
    flexibility: null,
    posture: null,
});

const actionMap = {
    [GET_EXERCISE_FITNESS_START]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null,
            strength: null,
            flexibility: null,
            posture: null,
        }));
    },
    [GET_EXERCISE_FITNESS_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: null,
            strength: action.data.strength,
            flexibility: action.data.flexibility,
            posture: action.data.posture,
        }));
    },
    [GET_EXERCISE_FITNESS_ERROR]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: action.error.message,
            strength: null,
            flexibility: null,
            posture: null,
        }));
    }
}

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}