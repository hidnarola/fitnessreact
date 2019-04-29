import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminHeader from '../../components/Admin/Template/AdminHeader';
import AdminNav from '../../components/Admin/Template/AdminNav';
import ProfileForm from '../../components/Admin/Profile/ProfileForm';
import { updateProfileRequest } from '../../actions/admin/profile';
import { ts, te } from '../../helpers/funs';
import { adminRouteCodes } from '../../constants/adminRoutes';
import { setLoggedAdminFromLocalStorage } from '../../actions/admin/admin';
import AddMetaDescription from '../../components/global/AddMetaDescription';

class Profile extends Component {

    render() {
        return (
            <div className="admin-dashboard-wrapper">
                <AddMetaDescription>
                    <title>Profile | Fitly</title>
                </AddMetaDescription>
                <AdminHeader />
                <AdminNav />
                <section className="body-wrap">
                    <div className="badge-category-listing-wrapper">
                        <div className="body-head space-btm-45 d-flex justify-content-start">
                            <div className="body-head-l">
                                <h2>Profile</h2>
                            </div>
                        </div>

                        <div className="body-content row d-flex">
                            <div className="col-md-12">
                                <div className="white-box">
                                    <div className="row d-flex whitebox-body">
                                        <div className="col-md-12">
                                            <ProfileForm onSubmit={this.handleSubmit} />
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
        const { loading, user, error, history, saveLoading, dispatch } = this.props;
        if (!loading && prevProps.loading !== loading && error && prevProps.error !== error && error.length > 0) {
            te('Something went wrong! please try again later.');
            history.push(adminRouteCodes.DASHBOARD);
        }
        if (!saveLoading && prevProps.saveLoading !== saveLoading && user && prevProps.user !== user) {
            ts('Updated!');
            dispatch(setLoggedAdminFromLocalStorage());
        }
    }

    handleSubmit = (data) => {
        const { dispatch } = this.props;
        let requestData = {
            firstName: (data && data.first_name) ? data.first_name.trim() : '',
            lastName: (data && data.last_name) ? data.last_name.trim() : '',
            email: (data && data.email) ? data.email.trim() : '',
        }
        dispatch(updateProfileRequest(requestData));
    }
}

const mapStateToProps = (state) => {
    const { adminProfile } = state;
    return {
        loading: adminProfile.get('loading'),
        user: adminProfile.get('user'),
        error: adminProfile.get('error'),
        saveLoading: adminProfile.get('saveLoading'),
    };
}

export default connect(
    mapStateToProps,
)(Profile);