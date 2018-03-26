import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from 'actions/login';
import { showPageLoader, hidePageLoader } from 'actions/pageLoader';
import AdminLoginForm from '../../components/Admin/Login/AdminLoginForm';
import { adminRouteCodes } from '../../constants/adminRoutes';
import { ADMIN_ROLE } from '../../constants/consts';
import { checkLogin, isLogin } from '../../helpers/loginHelper';


class AdminLogin extends Component {
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
            userRole: ADMIN_ROLE,
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
            this.props.history.push(adminRouteCodes.DASHBOARD);
        }
    }

    render() {
        const { error, loading } = this.props;
        return (
            <div className="step-wrap step-wrap-login login-wrapper">
                <div className="step-box">
                    <AdminLoginForm onSubmit={this.handleSubmit} loginError={error} loading={loading} />
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

export default connect(mapStateToProps)(AdminLogin);