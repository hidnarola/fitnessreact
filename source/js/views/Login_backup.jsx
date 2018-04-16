import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LoginForm from '../components/Login/LoginForm';
import { login } from '../actions/login';
import { routeCodes } from 'constants/routes';
import { showPageLoader, hidePageLoader } from '../actions/pageLoader';
import { USER_ROLE } from '../constants/consts';
import { isLogin, checkLogin } from '../helpers/loginHelper';
import Auth from '../auth/Auth';

const auth = new Auth();

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        if (isLogin()) {
            var pushUrl = checkLogin();
            props.history.push(pushUrl);
        }
    }

    handleSubmit = (data) => {
        const { dispatch } = this.props;
        let loginData = {
            email: data.email,
            password: data.password,
            userRole: USER_ROLE,
        }
        dispatch(showPageLoader());
        dispatch(login(loginData));
    }

    componentDidUpdate() {
        const { dispatch, loading } = this.props;
        if (!loading) {
            dispatch(hidePageLoader());
        }
    }

    componentWillUpdate() {
        var token = localStorage.getItem('token');
        if (token) {
            this.props.history.push(routeCodes.DASHBOARD);
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

                    <LoginForm onSubmit={this.handleSubmit} loginError={error} loading={loading} />

                </div >
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    const { login } = state;
    return {
        loading: login.get('loading'),
        error: login.get('error'),
        user: login.get('user'),
        token: login.get('token'),
        refreshToken: login.get('refreshToken'),
    }
}

export default connect(mapStateToProps)(Login);