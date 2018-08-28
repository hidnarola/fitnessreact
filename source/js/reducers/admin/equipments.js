import { Map } from "immutable";
import {
    EQUIPMENTS_ADD_REQUEST,
    EQUIPMENTS_ADD_SUCCESS,
    EQUIPMENTS_ADD_ERROR,
    EQUIPMENTS_LIST_REQUEST,
    EQUIPMENTS_LIST_SUCCESS,
    EQUIPMENTS_LIST_ERROR,
    EQUIPMENTS_DELETE_REQUEST,
    EQUIPMENTS_DELETE_SUCCESS,
    EQUIPMENTS_DELETE_ERROR,
    EQUIPMENTS_SELECT_ONE_REQUEST,
    EQUIPMENTS_SELECT_ONE_SUCCESS,
    EQUIPMENTS_SELECT_ONE_ERROR,
    EQUIPMENTS_UPDATE_REQUEST,
    EQUIPMENTS_UPDATE_SUCCESS,
    EQUIPMENTS_UPDATE_ERROR
} from "../../actions/admin/equipments";

const initialState = Map({
    loading: false,
    error: null,
    equipment: null,
    equipments: null,
});

const actionMap = {
    [EQUIPMENTS_LIST_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null,
            equipments: null,
            equipment: null,
        }));
    },
    [EQUIPMENTS_LIST_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: null,
            equipments: action.data.equipments,
            equipment: null,
        }));
    },
    [EQUIPMENTS_LIST_ERROR]: (state, action) => {
        let error = 'Server error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: error,
            equipments: null,
            equipment: null,
        }));
    },
    [EQUIPMENTS_SELECT_ONE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null,
            equipments: null,
            equipment: null,
        }));
    },
    [EQUIPMENTS_SELECT_ONE_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: null,
            equipments: null,
            equipment: action.data.equipment,
        }));
    },
    [EQUIPMENTS_SELECT_ONE_ERROR]: (state, action) => {
        let error = 'Server error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: error,
            equipments: null,
            equipment: null,
        }));
    },
    [EQUIPMENTS_ADD_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null,
            equipments: null,
            equipment: null
        }));
    },
    [EQUIPMENTS_ADD_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: null,
            equipments: null,
            equipment: action.data.equipment
        }));
    },
    [EQUIPMENTS_ADD_ERROR]: (state, action) => {
        let error = 'Server error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: error,
            equipments: null,
            equipment: null
        }));
    },
    [EQUIPMENTS_UPDATE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null,
            equipments: null,
            equipment: null
        }));
    },
    [EQUIPMENTS_UPDATE_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: null,
            equipments: null,
            equipment: action.data.equipment
        }));
    },
    [EQUIPMENTS_UPDATE_ERROR]: (state, action) => {
        let error = 'Server error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: error,
            equipments: null,
            equipment: null
        }));
    },
    [EQUIPMENTS_DELETE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null,
            equipments: null,
            equipment: null
        }));
    },
    [EQUIPMENTS_DELETE_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: null,
            equipments: null,
            equipment: null
        }));
    },
    [EQUIPMENTS_DELETE_ERROR]: (state, action) => {
        let error = 'Server error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: error,
            equipments: null,
            equipment: null
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