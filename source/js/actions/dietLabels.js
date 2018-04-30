export const GET_DIET_LABELS_REQUEST = 'GET_DIET_LABELS_REQUEST';
export const GET_DIET_LABELS_SUCCESS = 'GET_DIET_LABELS_SUCCESS';
export const GET_DIET_LABELS_ERROR = 'GET_DIET_LABELS_ERROR';

export function getDietLabelsRequest() {
    return {
        type: GET_DIET_LABELS_REQUEST,
    }
}

export function getDietLabelsSuccess(data) {
    return {
        type: GET_DIET_LABELS_SUCCESS,
        data
    }
}

export function getDietLabelsError(error) {
    return {
        type: GET_DIET_LABELS_ERROR,
        error
    }
}