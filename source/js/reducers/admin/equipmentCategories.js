import { Map } from "immutable";
import {
    EQUIPMENT_CATEGORIES_LIST_REQUEST,
    EQUIPMENT_CATEGORIES_LIST_ERROR,
    EQUIPMENT_CATEGORIES_LIST_SUCCESS,
    FILTER_EQUIPMENT_CATEGORIES_REQUEST,
    FILTER_EQUIPMENT_CATEGORIES_SUCCESS,
    FILTER_EQUIPMENT_CATEGORIES_ERROR,
    EQUIPMENT_CATEGORIES_SELECT_ONE_REQUEST,
    EQUIPMENT_CATEGORIES_SELECT_ONE_SUCCESS,
    EQUIPMENT_CATEGORIES_SELECT_ONE_ERROR,
    EQUIPMENT_CATEGORIES_ADD_REQUEST,
    EQUIPMENT_CATEGORIES_ADD_SUCCESS,
    EQUIPMENT_CATEGORIES_ADD_ERROR,
    EQUIPMENT_CATEGORIES_UPDATE_REQUEST,
    EQUIPMENT_CATEGORIES_UPDATE_SUCCESS,
    EQUIPMENT_CATEGORIES_UPDATE_ERROR,
    EQUIPMENT_CATEGORIES_DELETE_REQUEST,
    EQUIPMENT_CATEGORIES_DELETE_SUCCESS,
    EQUIPMENT_CATEGORIES_DELETE_ERROR,
    SET_EQUIPMENT_CATEGORIES_STATE
} from "../../actions/admin/equipmentCategories";
import { generateValidationErrorMsgArr } from "../../helpers/funs";
import { VALIDATION_FAILURE_STATUS } from "../../constants/consts";

const initialState = Map({
    filteredLoading: false,
    filteredCategories: [],
    filteredTotalPages: 0,
    loading: false,
    error: [],
    equipmentCategories: [],
    equipmentCategory: null,
    saveLoading: false,
    saveEquipmentCategory: null,
    saveError: [],
    deleteLoading: false,
    deleteFlag: false,
    deleteError: [],
});

const actionMap = {
    [EQUIPMENT_CATEGORIES_LIST_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            equipmentCategories: [],
            error: [],
        }));
    },
    [EQUIPMENT_CATEGORIES_LIST_SUCCESS]: (state, action) => {
        let newState = { loading: false }
        if (action.data && action.data.status && action.data.status === 1) {
            newState.equipmentCategories = action.data.equipment_categories;
        } else {
            let msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [EQUIPMENT_CATEGORIES_LIST_ERROR]: (state, action) => {
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
    [FILTER_EQUIPMENT_CATEGORIES_REQUEST]: (state, action) => {
        return state.merge(Map({
            filteredLoading: true,
            filteredCategories: [],
            filteredTotalPages: 0,
            error: [],
        }));
    },
    [FILTER_EQUIPMENT_CATEGORIES_SUCCESS]: (state, action) => {
        let newState = {
            filteredLoading: false
        };
        if (action.data && action.data.filtered_equipment_categories && action.data.filtered_equipment_categories.length > 0) {
            newState.filteredCategories = action.data.filtered_equipment_categories;
            newState.filteredTotalPages = action.data.filtered_total_pages;
        }
        return state.merge(Map(newState));
    },
    [FILTER_EQUIPMENT_CATEGORIES_ERROR]: (state, action) => {
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
    [EQUIPMENT_CATEGORIES_SELECT_ONE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: [],
            equipmentCategories: [],
            equipmentCategory: null,
        }));
    },
    [EQUIPMENT_CATEGORIES_SELECT_ONE_SUCCESS]: (state, action) => {
        let newState = { loading: false };
        if (action.data && action.data.status && action.data.status === 1) {
            newState.equipmentCategory = action.data.equipment_category;
        } else {
            let msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [EQUIPMENT_CATEGORIES_SELECT_ONE_ERROR]: (state, action) => {
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
    [EQUIPMENT_CATEGORIES_ADD_REQUEST]: (state, action) => {
        return state.merge(Map({
            saveLoading: true,
            saveEquipmentCategory: null,
            saveError: [],
        }));
    },
    [EQUIPMENT_CATEGORIES_ADD_SUCCESS]: (state, action) => {
        let newState = { saveLoading: false };
        if (action.data && action.data.status && action.data.status === 1) {
            newState.saveEquipmentCategory = action.data.equipment_category;
        } else {
            let msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later';
            newState.saveError = [msg];
        }
        return state.merge(Map(newState));
    },
    [EQUIPMENT_CATEGORIES_ADD_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            saveLoading: false,
            saveError: error,
        }));
    },
    [EQUIPMENT_CATEGORIES_UPDATE_REQUEST]: (state, action) => {
        return state.merge(Map({
            saveLoading: true,
            saveEquipmentCategory: null,
            saveError: [],
        }));
    },
    [EQUIPMENT_CATEGORIES_UPDATE_SUCCESS]: (state, action) => {
        let newState = { saveLoading: false };
        if (action.data && action.data.status && action.data.status === 1) {
            newState.saveEquipmentCategory = action.data.equipment_category;
        } else {
            let msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later';
            newState.saveError = [msg];
        }
        return state.merge(Map(newState));
    },
    [EQUIPMENT_CATEGORIES_UPDATE_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            saveLoading: false,
            saveError: error,
        }));
    },
    [EQUIPMENT_CATEGORIES_DELETE_REQUEST]: (state, action) => {
        return state.merge(Map({
            deleteLoading: true,
            deleteFlag: false,
            deleteError: []
        }));
    },
    [EQUIPMENT_CATEGORIES_DELETE_SUCCESS]: (state, action) => {
        let newState = { deleteLoading: false };
        if (action.data && action.data.status && action.data.status === 1) {
            newState.deleteFlag = true;
        } else {
            let msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later';
            newState.deleteError = [msg];
        }
        return state.merge(Map(newState));
    },
    [EQUIPMENT_CATEGORIES_DELETE_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            deleteLoading: false,
            deleteError: error,
        }));
    },
    [SET_EQUIPMENT_CATEGORIES_STATE]: (state, action) => {
        return state.merge(Map(action.stateData));
    },
};

export default function reducer(state = initialState, action = {}) {
    if (action && action.type) {
        var fn = actionMap[action.type];
        return fn ? fn(state, action) : state;
    }
    return state;
}