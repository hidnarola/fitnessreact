import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserForm from './UserForm';
import { userUpdateRequest, setUserState } from '../../../actions/admin/users';
import { ts, focusToControl } from '../../../helpers/funs';
import { hidePageLoader, showPageLoader } from '../../../actions/pageLoader';
import { adminRouteCodes } from '../../../constants/adminRoutes';
import { Alert } from "react-bootstrap";

class UserSave extends Component {
    render() {
        const { updateError } = this.props;
        return (
            <div className="user-save-wrapper">
                <div className="body-content row d-flex">
                    <div className="col-md-12">
                        <div className="white-box">
                            <div className="whitebox-head">
                                <h3 className="title-h3">Save User</h3>
                            </div>
                            <div className="row d-flex whitebox-body">
                                <div className="col-md-12 validation_errors_wrapper">
                                    {updateError && updateError.length > 0 &&
                                        <Alert bsStyle="danger">
                                            {updateError.map((o, i) => <p>{o}</p>)}
                                        </Alert>
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

    componentDidUpdate(prevProps, prevState) {
        const { updateLoading, updateUser, dispatch, history, updateError } = this.props;
        if (!updateLoading && prevProps.updateLoading !== updateLoading) {
            if (updateUser && prevProps.updateUser !== updateUser) {
                ts('User data updated!');
                history.push(adminRouteCodes.USERS);
            } else if (updateError && updateError !== prevProps.updateError && updateError.length > 0) {
                focusToControl('.validation_errors_wrapper');
            }
            dispatch(hidePageLoader());
        }
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        let userState = {
            updateLoading: false,
            updateUser: null,
            updateError: [],
            selectLoading: false,
            selectUser: null,
            selectUserPref: null,
            selectError: [],
        };
        dispatch(setUserState(userState));
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
                dob: dob,
                height: (data.height) ? data.height : '',
                weight: (data.weight) ? data.weight : '',
                heightUnit: (data.height_unit) ? data.height_unit : '',
                weightUnit: (data.weight_unit) ? data.weight_unit : '',
                gender: (data.gender) ? data.gender : '',
                workoutLocation: (data.workout_location) ? data.workout_location : '',
                goal: (data.goal) ? { name: data.goal.value, start: 0 } : '',
                aboutMe: (data.about_me) ? data.about_me : '',
                status: (data.status) ? data.status.value : '',
            }
            var formData = new FormData();
            formData.append('firstName', userData.firstName);
            formData.append('lastName', userData.lastName);
            formData.append('mobileNumber', userData.mobileNumber);
            if (userData.dob) {
                formData.append('dateOfBirth', userData.dob);
            }
            formData.append('height', userData.height);
            formData.append('weight', userData.weight);
            formData.append('heightUnit', userData.heightUnit);
            formData.append('weightUnit', userData.weightUnit);
            formData.append('gender', userData.gender);
            formData.append('workoutLocation', userData.workoutLocation);
            formData.append('goal', JSON.stringify(userData.goal));
            formData.append('aboutMe', userData.aboutMe);
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