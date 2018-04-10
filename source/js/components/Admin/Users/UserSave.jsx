import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserForm from './UserForm';
import moment from 'moment';
import { userUpdateRequest } from '../../../actions/admin/users';
import { hidePageLoader, showPageLoader } from '../../../actions/pageLoader';
import { adminRouteCodes } from '../../../constants/adminRoutes';

class UserSave extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saveActionInit: false,
            error: []
        }
    }
    handleSubmit = (data) => {
        const { dispatch, match } = this.props;
        if (typeof match.params.id !== 'undefined') {
            this.setState({ saveActionInit: true, error: [] });
            let dob = null;
            if (data.dob) {
                dob = data.dob.format('YYYY-MM-DD');
            }
            const userData = {
                firstName: data.first_name,
                lastName: data.last_name,
                username: data.username,
                email: data.email,
                mobileNumber: data.mobile_no,
                gender: data.gender,
                dob: dob,
                goal: _.map(data.goal, 'value'),
                image: data.user_img,
                aboutMe: data.about_me,
                status: data.status.value,
            }
            var formData = new FormData();
            formData.append('first_name', userData.firstName);
            formData.append('last_name', userData.lastName);
            formData.append('username', userData.username);
            formData.append('email', userData.email);
            formData.append('mobileNumber', userData.mobileNumber);
            formData.append('gender', userData.gender);
            formData.append('dateOfBirth', userData.dob);
            formData.append('goal', JSON.stringify(userData.goal));
            formData.append('aboutMe', userData.aboutMe);
            formData.append('status', userData.status);
            if (userData.image) {
                formData.append('user_img', userData.image[0]);
            }
            dispatch(showPageLoader());
            dispatch(userUpdateRequest(match.params.id, formData));
        }
    }

    render() {
        const { error } = this.state;
        return (
            <div className="user-save-wrapper">
                <div className="body-head space-btm-45 d-flex justify-content-start">
                    <div className="body-head-l">
                        <h2>User</h2>
                    </div>
                </div>

                <div className="body-content row d-flex">
                    <div className="col-md-12">
                        <div className="white-box">
                            <div className="whitebox-head">
                                <h3 className="title-h3">Save User</h3>
                            </div>
                            <div className="row d-flex whitebox-body">
                                <div className="col-md-12">
                                    {error && error.length > 0 &&
                                        error.map((msg, index) => (
                                            <p key={index}>{msg}</p>
                                        ))
                                    }
                                </div>
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
        console.log(error);
        if (typeof match.params.id !== 'undefined' && saveActionInit && !loading) {
            this.setState({ saveActionInit: false });
            dispatch(hidePageLoader());
            if (!error) {
                history.push(adminRouteCodes.USERS);
            } else {
                let err = [];
                _.forEach(error, (o) => {
                    err.push(o.msg);
                })
                this.setState({ error: err });
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