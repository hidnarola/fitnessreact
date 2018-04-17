import { LOCALSTORAGE_ROLE_KEY, ADMIN_ROLE, USER_ROLE, LOCALSTORAGE_ACCESS_TOKEN_KEY } from "../constants/consts";
import { publicPath, routeCodes } from "../constants/routes";
import { adminRouteCodes, adminRootRoute } from "../constants/adminRoutes";

export const checkLogin = () => {
    var token = localStorage.getItem(LOCALSTORAGE_ACCESS_TOKEN_KEY);
    var role = localStorage.getItem(LOCALSTORAGE_ROLE_KEY);
    var decodeUserRole = window.atob(role);
    var pushUrl = publicPath;
    if (role && decodeUserRole === ADMIN_ROLE) {
        if (token) {
            pushUrl = adminRouteCodes.DASHBOARD;
        } else {
            pushUrl = adminRootRoute;
        }
    } else if (role && decodeUserRole === USER_ROLE) {
        if (token) {
            pushUrl = routeCodes.DASHBOARD;
        } else {
            pushUrl = publicPath;
        }
    } else {
        pushUrl = publicPath;
    }
    return pushUrl;
}

export const isLogin = () => {
    var token = localStorage.getItem(LOCALSTORAGE_ACCESS_TOKEN_KEY);
    if (token) {
        return true;
    }
    return false;
}