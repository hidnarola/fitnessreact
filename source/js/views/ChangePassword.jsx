import React, { Component } from 'react';
import { connect } from 'react-redux';
import FitnessHeader from '../components/global/FitnessHeader';
import FitnessNav from '../components/global/FitnessNav';
import ChangePasswordForm from '../components/Profile/ChangePasswordForm';
import { ts, clearCookies } from '../helpers/funs';
import { setUserChangePasswordState, userChangePasswordRequest } from '../actions/changePassword';
import { routeCodes } from '../constants/routes';

class ChangePassword extends Component {
    render() {
        return (
            <div className="fitness-dashboard">
                <FitnessHeader />
                <FitnessNav />
                <section className="body-wrap">
                    <div className="body-head space-btm-45 d-flex justify-content-start front-white-header">
                        <div className="body-head-l">
                            <h2>Change Password</h2>
                            <p>Your goal choice shapes how your fitness assistant will ceate your meal and exercise plans, it’s important that
                                you set goals which are achieveable. Keep updating your profile and your fitness assistant will keep you
                                on track and meeting the goals you’ve set out for yourself.</p>
                        </div>
                    </div>
                    <div className="body-content row d-flex">
                        <div className="col-md-12">
                            <div className="white-box">
                                <div className="row d-flex whitebox-body">
                                    <div className="col-md-12">
                                        <ChangePasswordForm onSubmit={this.handleSubmit} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const { loading, error, history } = this.props;
        if (!loading && prevProps.loading !== loading && (!error || error.length <= 0)) {
            localStorage.clear();
            sessionStorage.clear();
            history.push(routeCodes.HOME);
            ts('Password changed! Please login with new password');
        }
    }

    handleSubmit = (data) => {
        const { dispatch } = this.props;
        let requestData = {
            newPassword: (data && data.new_password) ? data.new_password : '',
        }
        dispatch(userChangePasswordRequest(requestData));
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        let stateData = {
            loading: false,
            error: [],
        };
        dispatch(setUserChangePasswordState(stateData));
    }
}

const mapStateToProps = (state) => {
    const { userChangePassword } = state;
    return {
        loading: userChangePassword.get('loading'),
        error: userChangePassword.get('error'),
    };
}

export default connect(
    mapStateToProps,
)(ChangePassword);