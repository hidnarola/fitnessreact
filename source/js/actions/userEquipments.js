export const GET_USER_EQUIPMENTS_REQUEST = 'GET_USER_EQUIPMENTS_REQUEST';
export const GET_USER_EQUIPMENTS_SUCCESS = 'GET_USER_EQUIPMENTS_SUCCESS';
export const GET_USER_EQUIPMENTS_ERROR = 'GET_USER_EQUIPMENTS_ERROR';

export const SAVE_USER_EQUIPMENTS_REQUEST = 'SAVE_USER_EQUIPMENTS_REQUEST';
export const SAVE_USER_EQUIPMENTS_SUCCESS = 'SAVE_USER_EQUIPMENTS_SUCCESS';
export const SAVE_USER_EQUIPMENTS_ERROR = 'SAVE_USER_EQUIPMENTS_ERROR';

export function getUserEquipmentsRequest() {
    return {
        type: GET_USER_EQUIPMENTS_REQUEST,
    }
}

export function getUserEquipmentsSuccess(data) {
    return {
        type: GET_USER_EQUIPMENTS_SUCCESS,
        data
    }
}

export function getUserEquipmentsError(error) {
    return {
        type: GET_USER_EQUIPMENTS_ERROR,
        error
    }
}

export function saveUserEquipmentsRequest(requestData) {
    return {
        type: SAVE_USER_EQUIPMENTS_REQUEST,
        requestData
    }
}

export function saveUserEquipmentsSuccess(data) {
    return {
        type: SAVE_USER_EQUIPMENTS_SUCCESS,
        data
    }
}

export function saveUserEquipmentsError(error) {
    return {
        type: SAVE_USER_EQUIPMENTS_ERROR,
        error
    }
}