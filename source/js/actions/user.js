export const SET_LOGGED_USER_FROM_LOCALSTORAGE = 'SET_LOGGED_USER_DATA_FROM_LOCALSTORAGE';

export function setLoggedUserFromLocalStorage() {
    return {
        type: SET_LOGGED_USER_FROM_LOCALSTORAGE,
    }
}