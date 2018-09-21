import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ROLE, SESSION_EXPIRED_URL_TYPE, LOCALSTORAGE_ROLE_KEY, ADMIN_ROLE } from '../constants/consts';
import { checkLogin } from '../helpers/loginHelper';
import Auth from '../auth/Auth';
import { publicPath } from '../constants/routes';
import $ from "jquery";
import { adminRootRoute } from '../constants/adminRoutes';
import { te, toggleSideMenu } from '../helpers/funs';
import { resetUserMesagesState } from '../actions/userMessages';
import { resetLoggedUserState } from '../actions/user';

const auth = new Auth();

class Login extends Component {
    constructor(props) {
        super(props);
        let role = localStorage.getItem(LOCALSTORAGE_ROLE_KEY);
        if (role) {
            let decodedRole = window.atob(role);
            if (decodedRole === ADMIN_ROLE) {
                props.history.push(adminRootRoute);
            } else if (decodedRole === USER_ROLE) {
                if (auth.isAuthenticated()) {
                    var pushUrl = checkLogin();
                    props.history.push(pushUrl);
                }
            }
        }
    }

    componentWillMount() {
        const { match, history, dispatch, socket } = this.props;
        if (match.path === (publicPath + SESSION_EXPIRED_URL_TYPE)) {
            socket.emit('request_make_user_offline');
            te('Session expired! Login again.');
            history.push(publicPath);
        }
        toggleSideMenu('user-right-menu', false);
        toggleSideMenu('user-notification-panel', false);
        toggleSideMenu('user-message-panel', false);
        dispatch(resetLoggedUserState());
        dispatch(resetUserMesagesState());
    }

    handleLoginRequest = () => {
        auth.login();
    }

    handleSignUpRequest = () => {
        auth.signUp();
    }

    render() {
        return (
            <div className="step-wrap step-wrap-login login-wrapper">
                <div className="step-box step-box_expried">
                    <div className="step-box-l">
                        <div className="what-difference">
                            <h3>Create Your Account</h3>
                            <p>Come join the fitness community! Lets set up your Account. Already have one? <a href="javascript:void(0)" onClick={this.handleSignUpRequest}>Sign in here</a> </p>
                            <a href="javascript:void(0)" onClick={this.handleSignUpRequest}>Register</a>
                        </div>
                    </div>
                    <div className="step-box-r">
                        <div className="stepbox-head">
                            <h3>Login</h3>
                            <p>Come join the fitness community! Lets get to your Account.</p>
                        </div>
                        <div className="stepbox-b">
                            <button type="button" className="continues-btn" onClick={this.handleLoginRequest}><span>Login</span> <i className="icon-skip_next"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        $('body').addClass('no-padding');
    }

    componentWillUnmount() {
        $('body').removeClass('no-padding');
    }
}

const mapStateToProps = (state) => {
    const { user } = state;
    return {
        socket: user.get('socket')
    };
}

export default connect(mapStateToProps)(Login);