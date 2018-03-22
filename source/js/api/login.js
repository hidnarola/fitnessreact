import { fetchResource } from "./index";

function userLogin(loginData) {
    var options = {
        method: 'POST',
        body: loginData
    }
    return fetchResource('user_login', options);
}

export default {
    userLogin,
}