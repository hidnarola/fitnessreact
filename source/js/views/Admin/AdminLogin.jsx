import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { login } from 'actions/login';
import { showPageLoader, hidePageLoader } from 'actions/pageLoader';
import AdminLoginForm from '../../components/Admin/Login/AdminLoginForm';
import { adminRouteCodes, adminRootRoute } from '../../constants/adminRoutes';
import { ADMIN_ROLE, LOCALSTORAGE_ACCESS_TOKEN_KEY, SESSION_EXPIRED_URL_TYPE } from '../../constants/consts';
import { checkLogin, isLogin } from '../../helpers/loginHelper';
import { ts, te } from '../../helpers/funs';
import { freeLoginLogoutState } from '../../actions/login';
import $ from "jquery";
import logo from 'img/common/logo.png';

class AdminLogin extends Component {
    constructor(props) {
        super(props);
        if (isLogin()) {
            var pushUrl = checkLogin();
            props.history.push(pushUrl);
        }
    }

    componentWillMount() {
        const { match, history, dispatch } = this.props;
        if (match.path === (adminRootRoute + '/' + SESSION_EXPIRED_URL_TYPE)) {
            te('Session expired! Login again.');
            history.push(adminRootRoute);
            dispatch(hidePageLoader());
        }
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
                    <div className="logo_login_page">
                        <Link to={adminRouteCodes.LOGIN}>
                            <img src={logo} />Fitly
                        </Link>
                    </div>
                    <AdminLoginForm onSubmit={this.handleSubmit} />
                </div >
            </div >
        );
    }

    componentDidMount() {
        $('body').addClass('no-padding');
        $('body').addClass('with_login');
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch(freeLoginLogoutState());
        $('body').removeClass('no-padding');
        $('body').removeClass('with_login');
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