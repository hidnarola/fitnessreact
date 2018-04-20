export const GET_USER_EQUIPMENTS_REQUEST = 'GET_USER_EQUIPMENTS_REQUEST';
export const GET_USER_EQUIPMENTS_SUCCESS = 'GET_USER_EQUIPMENTS_SUCCESS';
export const GET_USER_EQUIPMENTS_ERROR = 'GET_USER_EQUIPMENTS_ERROR';

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