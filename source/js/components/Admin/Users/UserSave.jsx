import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserForm from './UserForm';
import { userUpdateRequest } from '../../../actions/admin/users';
import { ts } from '../../../helpers/funs';
import { hidePageLoader } from '../../../actions/pageLoader';
import { adminRouteCodes } from '../../../constants/adminRoutes';

class UserSave extends Component {
    render() {
        return (
            <div className="user-save-wrapper">
                <div className="body-content row d-flex">
                    <div className="col-md-12">
                        <div className="white-box">
                            <div className="whitebox-head">
                                <h3 className="title-h3">Save User</h3>
                            </div>
                            <div className="row d-flex whitebox-body">
                                <div className="col-md-12">
                                    <UserForm onSubmit={this.handleSubmit} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const { updateLoading, updateUser, dispatch, history } = this.props;
        if (!updateLoading && prevProps.updateLoading !== updateLoading && updateUser && prevProps.updateUser !== updateUser) {
            ts('User data updated!');
            dispatch(hidePageLoader());
            history.push(adminRouteCodes.USERS);
        }
    }

    handleSubmit = (data) => {
        const { dispatch, match, history } = this.props;
        if (match && match.params && match.params.id) {
            let dob = null;
            if (data.dob) {
                dob = data.dob.format('YYYY-MM-DD');
            }
            const userData = {
                firstName: data.first_name,
                lastName: (data.last_name) ? data.last_name : '',
                mobileNumber: (data.mobile_no) ? data.mobile_no : '',
                gender: (data.gender) ? data.gender : '',
                dob: dob,
                goal: (data.goal) ? data.goal.value : '',
                image: (data.user_img) ? data.user_img : '',
                aboutMe: (data.about_me) ? data.about_me : '',
                status: data.status.value,
            }
            var formData = new FormData();
            formData.append('firstName', userData.firstName);
            formData.append('lastName', userData.lastName);
            formData.append('mobileNumber', userData.mobileNumber);
            formData.append('gender', userData.gender);
            if (userData.dob) {
                formData.append('dateOfBirth', userData.dob);
            }
            formData.append('goals', JSON.stringify(userData.goal));
            formData.append('aboutMe', userData.aboutMe);
            if (userData.image) {
                formData.append('user_img', userData.image[0]);
            }
            formData.append('status', userData.status);
            dispatch(showPageLoader());
            dispatch(userUpdateRequest(match.params.id, formData));
        } else {
            te('Something went wrong! please try again later.');
            history.push(adminRouteCodes.USERS);
        }
    }
}

const mapStateToProps = (state) => {
    const { adminUsers } = state;
    return {
        updateLoading: adminUsers.get('updateLoading'),
        updateUser: adminUsers.get('updateUser'),
        updateError: adminUsers.get('updateError'),
    };
}

export default connect(
    mapStateToProps,
)(UserSave);