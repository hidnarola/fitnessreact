import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import moment from 'moment';
import {
    InputField,
    SelectField_ReactSelectMulti,
    FileField_Dropzone,
    TextAreaField,
    SelectField_ReactSelect,
    RadioFields,
    DateField
} from '../../../helpers/FormControlHelper';
import {
    requiredReactSelectMulti,
    required,
    requiredReactSelect,
    email
} from '../../../formValidation/validationRules';
import { adminRouteCodes } from '../../../constants/adminRoutes';
import { capitalizeFirstLetter } from '../../../helpers/funs';
import {
    GOAL_GAIN_MUSCLE,
    GOAL_GAIN_FLEXIBILITY,
    GOAL_LOSE_FAT,
    GOAL_GAIN_STRENGTH,
    GOAL_GAIN_POWER,
    GOAL_INCREASE_ENDURANCE,
    USER_STATUS_ACTIVE,
    USER_STATUS_INACTIVE,
    USER_STATUS_ACTIVE_STR,
    USER_STATUS_INACTIVE_STR
} from '../../../constants/consts';
import { showPageLoader } from '../../../actions/pageLoader';
import { userSelectOneRequest } from '../../../actions/admin/users';

const goalOptions = [
    { value: GOAL_GAIN_MUSCLE, label: capitalizeFirstLetter(GOAL_GAIN_MUSCLE) },
    { value: GOAL_GAIN_FLEXIBILITY, label: capitalizeFirstLetter(GOAL_GAIN_FLEXIBILITY) },
    { value: GOAL_LOSE_FAT, label: capitalizeFirstLetter(GOAL_LOSE_FAT) },
    { value: GOAL_GAIN_STRENGTH, label: capitalizeFirstLetter(GOAL_GAIN_STRENGTH) },
    { value: GOAL_GAIN_POWER, label: capitalizeFirstLetter(GOAL_GAIN_POWER) },
    { value: GOAL_INCREASE_ENDURANCE, label: capitalizeFirstLetter(GOAL_INCREASE_ENDURANCE) },
];

const userStatusOptions = [
    { value: USER_STATUS_ACTIVE, label: USER_STATUS_ACTIVE_STR },
    { value: USER_STATUS_INACTIVE, label: USER_STATUS_INACTIVE_STR },
];

class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dob: null,
            initSelectPageData: false,
        }
    }

    componentDidMount() {
        const { dispatch, match } = this.props;
        if (typeof match.params.id !== 'undefined') {
            this.setState({ initSelectPageData: true });
            dispatch(showPageLoader());
            dispatch(userSelectOneRequest(match.params.id));
        }
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="exercise-form-data">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-12">
                            <Field
                                name="first_name"
                                className="form-control"
                                label="First Name"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="First Name"
                                component={InputField}
                                errorClass=""
                                warningClass=""
                                validate={[required]}
                            />
                            <Field
                                name="last_name"
                                className="form-control"
                                label="Last Name"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Last Name"
                                component={InputField}
                                errorClass=""
                                warningClass=""
                                validate={[required]}
                            />
                            <Field
                                name="username"
                                className="form-control"
                                label="Username"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Username"
                                component={InputField}
                                errorClass=""
                                warningClass=""
                                validate={[required]}
                            />
                            <Field
                                name="email"
                                type="email"
                                className="form-control"
                                label="Email"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Email"
                                component={InputField}
                                errorClass=""
                                warningClass=""
                                validate={[required, email]}
                            />
                            <Field
                                name="mobile_no"
                                className="form-control"
                                label="Mobile No."
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Mobile No."
                                component={InputField}
                                errorClass=""
                                warningClass=""
                                validate={[required]}
                            />
                            <Field
                                name="gender"
                                className=""
                                label="Gender"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                component={RadioFields}
                                radioList={[
                                    { label: 'Male', value: 'male' },
                                    { label: 'Female', value: 'female' },
                                    { label: 'Transgender', value: 'transgender' },
                                ]}
                                errorClass=""
                                warningClass=""
                                validate={[required]}
                            />
                            <Field
                                name="dob"
                                className="form-control"
                                label="Date Of Birth"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Date Of Birth"
                                component={DateField}
                                selectedDate={this.state.dob}
                                handleChange={this.handleChangeDob}
                                dateFormat="MM/DD/YYYY"
                                errorClass=""
                                warningClass=""
                                validate={[required]}
                            />
                            <Field
                                name="goal"
                                label="Goals"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Goals"
                                component={SelectField_ReactSelectMulti}
                                options={goalOptions}
                                validate={[requiredReactSelectMulti]}
                            />
                            <Field
                                name="user_img"
                                label="Profile Image"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Profile Image"
                                component={FileField_Dropzone}
                                multiple={false}
                            />
                            <Field
                                name="about_me"
                                className="form-control"
                                label="About Me"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="About Me"
                                component={TextAreaField}
                            />
                            <Field
                                name="status"
                                label="Status"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Status"
                                component={SelectField_ReactSelect}
                                options={userStatusOptions}
                                validate={[requiredReactSelect]}
                            />
                            <div className="col-md-12 mb-20 clear-both">
                                <div className="stepbox-b">
                                    <NavLink to={adminRouteCodes.USERS} className="continues-btn">Back</NavLink>
                                    <button type="submit" className="continues-btn"><span>Save</span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    componentDidUpdate() {
        const { initSelectPageData } = this.state;
        const { loading, user, initialize } = this.props;
        if (initSelectPageData && !loading) {
            let goals = _.map(user.goal, (id) => {
                return _.find(goalOptions, (o) => {
                    return (o.value === id);
                })
            });
            let dob = null;
            if (user.dateOfBirth) {
                dob = moment(user.dateOfBirth);
            }
            const userData = {
                first_name: user.firstName,
                last_name: user.lastName,
                username: user.username,
                email: user.email,
                mobile_no: user.mobileNumber,
                gender: user.gender,
                dob: dob,
                goal: goals,
                user_img: user.avatar,
                about_me: user.aboutMe,
                status: _.find(userStatusOptions, (o) => { return (o.value === user.status) }),
            }
            initialize(userData);
            this.setState({
                initSelectPageData: false,
                dob: dob
            });
        }
    }


    handleChangeDob = (date) => {
        this.setState({ dob: date });
    }
}

UserForm = withRouter(UserForm);

UserForm = reduxForm({
    form: 'userSaveForm'
})(UserForm);

const mapStateToProps = (state) => {
    const { adminUsers } = state;
    return {
        loading: adminUsers.get('loading'),
        error: adminUsers.get('error'),
        user: adminUsers.get('user'),
    };
}

export default connect(mapStateToProps)(UserForm);