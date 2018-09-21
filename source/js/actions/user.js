export const SET_LOGGED_USER_FROM_LOCALSTORAGE = 'SET_LOGGED_USER_DATA_FROM_LOCALSTORAGE';

export const SET_LOGGED_USER_STATE = 'SET_LOGGED_USER_STATE';
export const RESET_LOGGED_USER_STATE = 'RESET_LOGGED_USER_STATE';

export const OPEN_SOCKET = 'OPEN_SOCKET';
export const CLOSE_SOCKET = 'CLOSE_SOCKET';

export function setLoggedUserFromLocalStorage() {
    return {
        type: SET_LOGGED_USER_FROM_LOCALSTORAGE,
    }
}

export function setLoggedUserState(stateData) {
    return {
        type: SET_LOGGED_USER_STATE,
        stateData
    }
}

export function resetLoggedUserState() {
    return {
        type: RESET_LOGGED_USER_STATE
    }
}

export function openSocket(socket) {
    return {
        type: OPEN_SOCKET,
        socket,
    }
}

export function closeSocket() {
    return {
        type: CLOSE_SOCKET,
    }
}