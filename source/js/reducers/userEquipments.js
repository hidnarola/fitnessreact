import { Map } from "immutable";
import {
    GET_USER_EQUIPMENTS_REQUEST,
    GET_USER_EQUIPMENTS_SUCCESS,
    GET_USER_EQUIPMENTS_ERROR,
    SAVE_USER_EQUIPMENTS_REQUEST,
    SAVE_USER_EQUIPMENTS_SUCCESS,
    SAVE_USER_EQUIPMENTS_ERROR
} from "../actions/userEquipments";

const initialState = Map({
    loading: false,
    error: null,
    equipments: [],
    userEquipments: [],
});

const actionMap = {
    [GET_USER_EQUIPMENTS_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
        }));
    },
    [GET_USER_EQUIPMENTS_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            userEquipments: action.data.equipments.user_equipments,
            equipments: action.data.equipments.all_equipments,
        }));
    },
    [GET_USER_EQUIPMENTS_ERROR]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: action.error.message,
        }));
    },
    [SAVE_USER_EQUIPMENTS_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
        }));
    },
    [SAVE_USER_EQUIPMENTS_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
        }));
    },
    [SAVE_USER_EQUIPMENTS_ERROR]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: action.error.message,
        }));
    },
}

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}