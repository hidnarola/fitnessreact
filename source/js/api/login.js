import { fetchResource } from "./index";

function userLogin(loginData) {
    var options = {
        method: 'POST',
        body: loginData
    }
    return fetchResource('user_login', options);
}

function adminLogin(loginData) {
    var options = {
        method: 'POST',
        body: loginData
    }
    return fetchResource('admin_login', options);
}

export default {
    userLogin,
    adminLogin,
}