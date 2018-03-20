export const GET_EXERCISE_EQUIPMENT_START = 'GET_EXERCISE_EQUIPMENT_START';
export const GET_EXERCISE_EQUIPMENT_SUCCESS = 'GET_EXERCISE_EQUIPMENT_SUCCESS';
export const GET_EXERCISE_EQUIPMENT_ERROR = 'GET_EXERCISE_EQUIPMENT_ERROR';

export function getExerciseEquipments() {
    return {
        type: GET_EXERCISE_EQUIPMENT_START,
    }
}

export function exerciseEquipmentsSuccess(data) {
    return {
        type: GET_EXERCISE_EQUIPMENT_SUCCESS,
        data
    }
}

export function exerciseEquipmentsError(error) {
    return {
        type: GET_EXERCISE_EQUIPMENT_ERROR,
        error
    }
}