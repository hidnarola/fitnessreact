import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LoginForm from '../components/Login/LoginForm';
import { login } from '../actions/login';
import { routeCodes } from 'constants/routes';
import { showPageLoader, hidePageLoader } from '../actions/pageLoader';
import { USER_ROLE } from '../constants/consts';
import { checkLogin } from '../helpers/loginHelper';
import Auth from '../auth/Auth';

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

    render() {
        const { error, loading } = this.props;
        return (
            <div className="step-wrap step-wrap-login login-wrapper">
                <div className="step-box">
                    <div className="step-box-l">
                        <div className="what-difference">
                            <h3>Create Your Account</h3>
                            <p>Come join the fitness community! Lets set up your Account. Already have one? <a href="#">Sign in here</a> </p>
                            <NavLink to={routeCodes.REGISTERUSER}>Register</NavLink>
                            <button type="button" onClick={this.handleLoginRequest}>Login</button>
                        </div>
                    </div>
                </div >
            </div >
        );
    }
}

export default Login;