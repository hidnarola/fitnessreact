import { fetchResource, postFormData } from "./index";

function userLogin(loginData) {
    var options = {
        method: 'POST',
        body: loginData
    }
    return fetchResource('user_login', options);
}

function adminLogin(loginData) {
    return postFormData('admin_login', loginData);
}


export default {
    userLogin,
    adminLogin,
}