import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LoginForm from '../components/Login/LoginForm';
import { login } from '../actions/login';
import { routeCodes } from 'constants/routes';


class Login extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        var token = localStorage.getItem('token');
        if (token) {
            props.history.push(routeCodes.DASHBOARD);
        }
    }

    handleSubmit = (data) => {
        const { dispatch } = this.props;
        let loginData = {
            email: data.email,
            password: data.password
        }
        dispatch(login(loginData));
    }

    componentWillUpdate() {
        var token = localStorage.getItem('token');
        if (token) {
            this.props.history.push(routeCodes.DASHBOARD);
        }
    }

    render() {
        const { error } = this.props;
        return (
            <div className="step-wrap step-wrap-login login-wrapper">
                <div className="step-box">
                    <div className="step-box-l">
                        <div className="what-difference">
                            <h3>Create Your Account</h3>
                            <p>Come join the fitness community! Lets set up your Account. Already have one? <a href="#">Sign in here</a> </p>
                            <NavLink to={routeCodes.REGISTERUSER}>Register</NavLink>
                        </div>
                    </div>

                    <LoginForm onSubmit={this.handleSubmit} />

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