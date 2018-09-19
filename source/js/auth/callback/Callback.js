import React, { Component } from 'react';
import Auth from '../Auth';
import { LOCALSTORAGE_ROLE_KEY, ADMIN_ROLE, USER_ROLE, AUTH_STATE_ACTION_LOGIN_KEY, AUTH_STATE_ACTION_SIGNUP_KEY, AUTH0_ACCESS_DENIED_ERR_STR } from '../../constants/consts';
import { isLogin, checkLogin } from '../../helpers/loginHelper';
import { publicPath } from '../../constants/routes';
import { te } from '../../helpers/funs';

const auth = new Auth();

class Callback extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { history, location } = this.props;
        if (location && location.hash && location.hash.includes(AUTH0_ACCESS_DENIED_ERR_STR)) {
            localStorage.removeItem(AUTH_STATE_ACTION_LOGIN_KEY);
            localStorage.removeItem(AUTH_STATE_ACTION_SIGNUP_KEY);
            te('Please allow authorization to access your profile details');
            history.push(publicPath);
        }
        let role = localStorage.getItem(LOCALSTORAGE_ROLE_KEY);
        let auth0LoginAction = localStorage.getItem(AUTH_STATE_ACTION_LOGIN_KEY);
        let auth0SignupAction = localStorage.getItem(AUTH_STATE_ACTION_SIGNUP_KEY);
        if (role) {
            let decodedRole = window.atob(role);
            let _isLogin = false;
            if (decodedRole === ADMIN_ROLE) {
                if (isLogin()) {
                    _isLogin = true;
                }
            } else if (decodedRole === USER_ROLE) {
                if (auth.isAuthenticated()) {
                    _isLogin = true;
                }
            }
            if (_isLogin) {
                var pushUrl = checkLogin();
                history.push(pushUrl);
            }
        } else if (!auth0LoginAction && !auth0SignupAction) {
            history.push(publicPath);
        }
    }

    render() {
        return (
            <div className="auth0-callback-wrapper">
                <h1>Loading...</h1>
            </div>
        );
    }

}

export default Callback;