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
    EQUIPMENTS_UPDATE_ERROR,
    EQUIPMENTS_RECOVER_REQUEST,
    EQUIPMENTS_RECOVER_SUCCESS,
    EQUIPMENTS_RECOVER_ERROR,
    FILTER_EQUIPMENTS_REQUEST,
    FILTER_EQUIPMENTS_SUCCESS,
    FILTER_EQUIPMENTS_ERROR
} from "../../actions/admin/equipments";
import { VALIDATION_FAILURE_STATUS } from "../../constants/consts";
import { generateValidationErrorMsgArr } from "../../helpers/funs";

const initialState = Map({
    loading: false,
    error: [],
    equipment: null,
    equipments: [],
    filteredEquipments: [],
    filteredTotalPages: 0,
    filteredLoading: false,
});

const actionMap = {
    [EQUIPMENTS_LIST_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: [],
            equipments: [],
            equipment: null,
        }));
    },
    [EQUIPMENTS_LIST_SUCCESS]: (state, action) => {
        let newState = { loading: false };
        if (action.data && action.data.status && action.data.status === 1) {
            newState.equipments = action.data.equipments;
        } else {
            let msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [EQUIPMENTS_LIST_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            loading: false,
            error: error,
        }));
    },
    [EQUIPMENTS_SELECT_ONE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: [],
            equipments: [],
            equipment: null,
        }));
    },
    [EQUIPMENTS_SELECT_ONE_SUCCESS]: (state, action) => {
        let newState = { loading: false };
        if (action.data && action.data.status && action.data.status === 1) {
            newState.equipment = action.data.equipment;
        } else {
            let msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [EQUIPMENTS_SELECT_ONE_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            loading: false,
            error: error,
        }));
    },
    [FILTER_EQUIPMENTS_REQUEST]: (state, action) => {
        return state.merge(Map({
            filteredLoading: true,
            filteredEquipments: [],
            filteredTotalPages: 0,
            error: [],
        }));
    },
    [FILTER_EQUIPMENTS_SUCCESS]: (state, action) => {
        var newState = {
            filteredLoading: false,
        }
        if (action.data && action.data.filtered_equipments && action.data.filtered_equipments.length > 0) {
            newState.filteredEquipments = action.data.filtered_equipments;
            newState.filteredTotalPages = action.data.filtered_total_pages;
        }
        return state.merge(Map(newState));
    },
    [FILTER_EQUIPMENTS_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            filteredLoading: false,
            error: error,
        }));
    },
    [EQUIPMENTS_ADD_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: [],
            equipments: [],
            equipment: null,
        }));
    },
    [EQUIPMENTS_ADD_SUCCESS]: (state, action) => {
        let newState = { loading: false };
        if (action.data && action.data.status && action.data.status === 1) {
            newState.equipment = action.data.equipment;
        } else {
            let msg = (action.data.message) ? action.data.message : 'Something went wrong! Please try again later';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [EQUIPMENTS_ADD_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            loading: false,
            error: error,
        }));
    },
    [EQUIPMENTS_UPDATE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: [],
            equipments: [],
            equipment: null,
        }));
    },
    [EQUIPMENTS_UPDATE_SUCCESS]: (state, action) => {
        let newState = { loading: false };
        if (action.data && action.data.status && action.data.status === 1) {
            newState.equipment = action.data.equipment;
        } else {
            let msg = (action.data.message) ? action.data.message : 'Something went wrong! Please try again later';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [EQUIPMENTS_UPDATE_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            loading: false,
            error: error,
        }));
    },
    [EQUIPMENTS_DELETE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: [],
            equipments: [],
            equipment: null
        }));
    },
    [EQUIPMENTS_DELETE_SUCCESS]: (state, action) => {
        let newState = { loading: false };
        if (action.data && action.data.status && action.data.status !== 1) {
            let msg = (action.data.message) ? action.data.message : 'Something went wrong! Please try again later';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [EQUIPMENTS_DELETE_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            loading: false,
            error: error,
        }));
    },
    [EQUIPMENTS_RECOVER_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: [],
            equipments: [],
            equipment: null
        }));
    },
    [EQUIPMENTS_RECOVER_SUCCESS]: (state, action) => {
        let newState = { loading: false };
        if (action.data && action.data.status && action.data.status !== 1) {
            let msg = (action.data.message) ? action.data.message : 'Something went wrong! Please try again later';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [EQUIPMENTS_RECOVER_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            loading: false,
            error: error,
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