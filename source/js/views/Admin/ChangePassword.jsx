import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminHeader from '../../components/Admin/Template/AdminHeader';
import AdminNav from '../../components/Admin/Template/AdminNav';
import ChangePasswordForm from '../../components/Admin/Profile/ChangePasswordForm';
import { ts } from '../../helpers/funs';
import { changePasswordRequest, setChangePasswordState } from '../../actions/admin/changePassword';
import AddMetaDescription from '../../components/global/AddMetaDescription';

class ChangePassword extends Component {

    render() {
        return (
            <div className="admin-dashboard-wrapper">
                <AddMetaDescription>
                    <title>Change password | Fitly</title>
                </AddMetaDescription>
                <AdminHeader />
                <AdminNav />
                <section className="body-wrap">
                    <div className="badge-category-listing-wrapper">
                        <div className="body-head space-btm-45 d-flex justify-content-start">
                            <div className="body-head-l">
                                <h2>Change Password</h2>
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
                    </div>
                </section>
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const { loading, error } = this.props;
        if (!loading && prevProps.loading !== loading && (!error || error.length <= 0)) {
            ts('Password changed!');
        }
    }

    handleSubmit = (data) => {
        const { dispatch } = this.props;
        let requestData = {
            password: (data && data.password) ? data.password : '',
            newPassword: (data && data.new_password) ? data.new_password : '',
        }
        dispatch(changePasswordRequest(requestData));
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        let stateData = {
            loading: false,
            error: [],
        };
        dispatch(setChangePasswordState(stateData));
    }

}

const mapStateToProps = (state) => {
    const { adminChangePassword } = state;
    return {
        loading: adminChangePassword.get('loading'),
        error: adminChangePassword.get('error'),
    };
}

export default connect(
    mapStateToProps,
)(ChangePassword);