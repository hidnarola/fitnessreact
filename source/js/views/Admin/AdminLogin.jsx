import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from 'actions/login';
import { showPageLoader, hidePageLoader } from 'actions/pageLoader';
import AdminLoginForm from '../../components/Admin/Login/AdminLoginForm';
import { adminRouteCodes } from '../../constants/adminRoutes';
import { ADMIN_ROLE, LOCALSTORAGE_ACCESS_TOKEN_KEY } from '../../constants/consts';
import { checkLogin, isLogin } from '../../helpers/loginHelper';
import { ts } from '../../helpers/funs';
import { freeLoginLogoutState } from '../../actions/login';
import $ from "jquery";

class AdminLogin extends Component {
    constructor(props) {
        super(props);
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

    componentWillUpdate() {
        var token = localStorage.getItem(LOCALSTORAGE_ACCESS_TOKEN_KEY);
        if (token) {
            ts('Login success!');
            this.props.history.push(adminRouteCodes.DASHBOARD);
        }
    }

    componentDidUpdate() {
        const { dispatch, loading } = this.props;
        if (!loading) {
            dispatch(hidePageLoader());
        }
    }

    render() {
        return (
            <div className="step-wrap step-wrap-login login-wrapper">
                <div className="step-box">
                    <AdminLoginForm onSubmit={this.handleSubmit} />
                </div >
            </div >
        );
    }

    componentDidMount() {
        $('body').addClass('no-padding');
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch(freeLoginLogoutState());
        $('body').removeClass('no-padding');
    }
}

const mapStateToProps = (state) => {
    const { login } = state;
    return {
        loading: login.get('loading')
    }
}

export default connect(
    mapStateToProps
)(AdminLogin);