export const SET_LOGGED_USER_FROM_LOCALSTORAGE = 'SET_LOGGED_USER_DATA_FROM_LOCALSTORAGE';

export const OPEN_SOCKET = 'OPEN_SOCKET';

export function setLoggedUserFromLocalStorage() {
    return {
        type: SET_LOGGED_USER_FROM_LOCALSTORAGE,
    }
}

export function openSocket(socket) {
    return {
        type: OPEN_SOCKET,
        socket,
    }
}