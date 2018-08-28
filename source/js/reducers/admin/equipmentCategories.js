import { Map } from "immutable";
import {
    EQUIPMENT_CATEGORIES_LIST_REQUEST,
    EQUIPMENT_CATEGORIES_LIST_ERROR,
    EQUIPMENT_CATEGORIES_LIST_SUCCESS
} from "../../actions/admin/equipmentCategories";

const initialState = Map({
    loading: false,
    error: null,
    equipmentCategories: null,
});

const actionMap = {
    [EQUIPMENT_CATEGORIES_LIST_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null,
            equipmentCategories: null,
        }));
    },
    [EQUIPMENT_CATEGORIES_LIST_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: null,
            equipmentCategories: action.data.equipment_categories,
        }));
    },
    [EQUIPMENT_CATEGORIES_LIST_ERROR]: (state, action) => {
        let error = 'Server error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: error,
            equipmentCategories: null,
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