import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LoginForm from '../components/Login/LoginForm';
import { login } from '../actions/login';
import { routeCodes } from 'constants/routes';
import { showPageLoader, hidePageLoader } from '../actions/pageLoader';
import { USER_ROLE, SESSION_EXPIRED_URL_TYPE } from '../constants/consts';
import { checkLogin } from '../helpers/loginHelper';
import Auth from '../auth/Auth';
import { publicPath } from '../constants/routes';
import $ from "jquery";

const auth = new Auth();

class Login extends Component {
    constructor(props) {
        super(props);
        if (auth.isAuthenticated()) {
            var pushUrl = checkLogin();
            props.history.push(pushUrl);
        }
    }

    handleLoginRequest = () => {
        auth.login();
    }

    handleSignUpRequest = () => {
        auth.signUp();
    }

    render() {
        const { error, loading, match } = this.props;
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
                        <div id="validation_errors_wrapper">
                            {(match.path === (publicPath + SESSION_EXPIRED_URL_TYPE)) &&
                                <div className="alert alert-danger" role="alert">
                                    <p>Session expired! please login again.</p>
                                </div>
                            }
                        </div>
                        <div className="stepbox-head">
                            <h3>Login</h3>
                            <p>Come join the fitness community! Lets get to your Account.</p>
                        </div>
                        <div className="stepbox-b">
                            <button type="button" className="continues-btn" onClick={this.handleLoginRequest}><span>Login</span> <i className="icon-skip_next"></i></button>
                        </div>
                    </div>
                </div>
            </div >
        );
    }

    componentDidMount() {
        $('body').addClass('no-padding');
    }
    
    componentWillUnmount() {
        $('body').removeClass('no-padding');
    }
    
    
}

export default Login;