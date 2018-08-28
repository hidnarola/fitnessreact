import { Map } from 'immutable';

import {
    INCREMENT,
} from 'actions/app';

const initialState = Map({
    counter: 0,
});

const actionMap = {
    [INCREMENT]: (state) => {
        const counter = state.get('counter') + 1;

        return state.merge(Map({
            counter,
        }));
    },
};

export default function reducer(state = initialState, action = {}) {
    if (action && action.type) {
        var fn = actionMap[action.type];
        return fn ? fn(state, action) : state;
    }
    return state;
}