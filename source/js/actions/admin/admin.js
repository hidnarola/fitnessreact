export const SET_LOGGED_ADMIN_FROM_LOCALSTORAGE = 'SET_LOGGED_ADMIN_FROM_LOCALSTORAGE';

export function setLoggedAdminFromLocalStorage() {
    return {
        type: SET_LOGGED_ADMIN_FROM_LOCALSTORAGE,
    }
}