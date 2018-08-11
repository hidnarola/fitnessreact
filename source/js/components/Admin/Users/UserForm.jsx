import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import noImg from 'img/common/no-img.png'
import moment from 'moment';
import {
    InputField,
    SelectField_ReactSelectMulti,
    TextAreaField,
    SelectField_ReactSelect,
    RadioFields,
    DateField,
    EditorField
} from '../../../helpers/FormControlHelper';
import {
    requiredReactSelectMulti,
    required,
    email,
    requiredReactSelectStatus
} from '../../../formValidation/validationRules';
import { adminRouteCodes } from '../../../constants/adminRoutes';
import { capitalizeFirstLetter } from '../../../helpers/funs';
import {
    GOAL_GAIN_MUSCLE,
    GOAL_IMPROVE_MOBILITY,
    GOAL_LOSE_FAT,
    GOAL_GAIN_STRENGTH,
    GOAL_INCREASE_ENDURANCE,
    USER_STATUS_ACTIVE,
    USER_STATUS_INACTIVE,
    USER_STATUS_ACTIVE_STR,
    USER_STATUS_INACTIVE_STR,
    GENDER_MALE,
    GENDER_FEMALE,
} from '../../../constants/consts';
import { userSelectOneRequest } from '../../../actions/admin/users';
import { showPageLoader } from '../../../actions/pageLoader';

const goalOptions = [
    { value: GOAL_GAIN_MUSCLE, label: capitalizeFirstLetter(GOAL_GAIN_MUSCLE).replace('_', ' ') },
    { value: GOAL_IMPROVE_MOBILITY, label: capitalizeFirstLetter(GOAL_IMPROVE_MOBILITY).replace('_', ' ') },
    { value: GOAL_LOSE_FAT, label: capitalizeFirstLetter(GOAL_LOSE_FAT).replace('_', ' ') },
    { value: GOAL_GAIN_STRENGTH, label: capitalizeFirstLetter(GOAL_GAIN_STRENGTH).replace('_', ' ') },
    { value: GOAL_INCREASE_ENDURANCE, label: capitalizeFirstLetter(GOAL_INCREASE_ENDURANCE).replace('_', ' ') },
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
            gender: GENDER_MALE,
            initSelectPageData: false,
            existingProfilePics: [],
            aboutMe: '',
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
        const { existingProfilePics, aboutMe } = this.state;
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
                                errorClass="help-block"
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
                                errorClass="help-block"
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
                            />
                            <Field
                                name="gender"
                                className=""
                                label="Gender"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                component={RadioFields}
                                radioList={[
                                    { label: capitalizeFirstLetter(GENDER_MALE), value: GENDER_MALE },
                                    { label: capitalizeFirstLetter(GENDER_FEMALE), value: GENDER_FEMALE },
                                ]}
                                checked={this.state.gender}
                                handleChange={this.genderChange}
                                errorClass="help-block"
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
                                errorClass="help-block"
                            />
                            <Field
                                name="goal"
                                label="Goals"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Goals"
                                component={SelectField_ReactSelectMulti}
                                options={goalOptions}
                            />
                            <Field
                                name="user_img"
                                label="Profile Image"
                                labelClass="control-label display_block"
                                mainWrapperClass="image-form-main-wrapper"
                                wrapperClass="form-group"
                                placeholder="Profile Image"
                                component={UserProfileImageField}
                                multiple={false}
                                existingImages={existingProfilePics}
                            />
                            <Field
                                name="about_me"
                                value={aboutMe}
                                handleChange={this.handleChangeTextEditor}
                                className="editor-min-height-200"
                                label="About Me"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="About Me"
                                component={EditorField}
                            />
                            <Field
                                name="status"
                                label="Status"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Status"
                                component={SelectField_ReactSelect}
                                options={userStatusOptions}
                                validate={[requiredReactSelectStatus]}
                                errorClass="help-block"
                            />
                            <div className="col-md-12 mb-20 clear-both text-center">
                                <div className="stepbox-b stepbox-b-center">
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
                about_me: user.aboutMe,
                status: _.find(userStatusOptions, (o) => { return (o.value === user.status) }),
            }
            initialize(userData);
            this.setState({
                initSelectPageData: false,
                dob: dob,
                gender: user.gender,
                existingProfilePics: [user.avatar],
                aboutMe: user.aboutMe,
            });
        }
    }


    handleChangeDob = (date) => {
        this.props.change('dob', date);
        this.setState({ dob: date });
    }

    genderChange = (gender) => {
        this.props.change('gender', gender);
        this.setState({ gender: gender });
    }

    handleChangeTextEditor = (editorText) => {
        this.props.change('about_me', editorText);
        this.setState({ aboutMe: editorText });
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

class UserProfileImageField extends Component {
    render() {
        const {
            label,
            input,
            meta,
            mainWrapperClass,
            wrapperClass,
            className,
            labelClass,
            errorClass,
            accept,
            existingImages
        } = this.props;
        let filesArr = _.values(input.value);
        let images = [];
        let _existingImages = [];
        _.forEach(existingImages, (path, key) => {
            if (path) {
                _existingImages.push(
                    <div className="image-preview-wrapper" key={key}>
                        <img
                            src={path}
                            alt="Image"
                            onError={(e) => {
                                e.target.src = noImg
                            }}
                        />
                    </div>
                )
            }
        });
        _.forEach(filesArr, (file, key) => {
            images.push(
                <div className="image-preview-wrapper" key={key}>
                    <img src={file.preview} />
                </div>
            )
        })
        return (
            <div className={mainWrapperClass}>
                <label htmlFor={input.name} className={labelClass}>{label}</label>
                {_existingImages}
                {input.value && images}
                <div className={wrapperClass}>
                    <Dropzone
                        {...input}
                        accept={accept ? accept : "image/jpeg, image/png, image/jpg, image/gif"}
                        onDrop={(filesToUpload, e) => input.onChange(filesToUpload)}
                        multiple={false}
                        className={className}
                    ></Dropzone>
                    {meta.touched &&
                        ((meta.error && <span className={errorClass}>{meta.error}</span>) || (meta.warning && <span className={warningClass}>{meta.warning}</span>))
                    }
                </div>
            </div>
        );
    }
}