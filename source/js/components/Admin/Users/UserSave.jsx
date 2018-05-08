import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserForm from './UserForm';
import moment from 'moment';
import { userUpdateRequest } from '../../../actions/admin/users';
import { hidePageLoader, showPageLoader } from '../../../actions/pageLoader';
import { adminRouteCodes } from '../../../constants/adminRoutes';
import { focusToControl, ts } from '../../../helpers/funs';

class UserSave extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saveActionInit: false
        }
    }

    handleSubmit = (data) => {
        const { dispatch, match, history } = this.props;
        if (typeof match.params.id !== 'undefined') {
            this.setState({ saveActionInit: true });
            let dob = null;
            if (data.dob) {
                dob = data.dob.format('YYYY-MM-DD');
            }
            const userData = {
                firstName: data.first_name,
                email: data.email,
                status: data.status.value,
                lastName: (data.last_name) ? data.last_name : '',
                mobileNumber: (data.mobile_no) ? data.mobile_no : '',
                gender: (data.gender) ? data.gender : '',
                dob: dob,
                goal: _.map(data.goal, 'value'),
                image: data.user_img,
                aboutMe: (data.about_me) ? data.about_me : '',
            }
            var formData = new FormData();
            formData.append('firstName', userData.firstName);
            formData.append('email', userData.email);
            formData.append('status', userData.status);
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
            dispatch(showPageLoader());
            dispatch(userUpdateRequest(match.params.id, formData));
        } else {
            te();
            history.push(adminRouteCodes.USERS);
        }
    }

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

    componentDidUpdate() {
        const { loading, error, dispatch, match, history } = this.props;
        const { saveActionInit } = this.state;
        if (typeof match.params.id !== 'undefined' && saveActionInit && !loading) {
            this.setState({ saveActionInit: false });
            dispatch(hidePageLoader());
            if (error.length <= 0) {
                ts('User saved successfully!');
                history.push(adminRouteCodes.USERS);
            } else {
                focusToControl('#validation_errors_wrapper');
            }
        }
    }

}

const mapStateToProps = (state) => {
    const { adminUsers } = state;
    return {
        loading: adminUsers.get('loading'),
        error: adminUsers.get('error')
    };
}

export default connect(
    mapStateToProps,
)(UserSave);