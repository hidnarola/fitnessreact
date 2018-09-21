import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
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
    requiredReactSelectStatus,
    minLength,
    maxLength,
    mobile
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
    WORKOUT_LOCATION_GYM,
    WORKOUT_LOCATION_HOME,
} from '../../../constants/consts';
import { userSelectOneRequest } from '../../../actions/admin/users';
import { showPageLoader, hidePageLoader } from '../../../actions/pageLoader';

const minLength2 = minLength(2);
const maxLength20 = maxLength(20);

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
            existingProfilePics: [],
            aboutMe: '',
        }
    }

    componentDidMount() {
        const { dispatch, match } = this.props;
        if (match && match.params && match.params.id) {
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
                        <div className="col-md-4">
                            <Field
                                name="first_name"
                                className="form-control"
                                label="First Name"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="First Name"
                                component={InputField}
                                errorClass="help-block"
                                validate={[required, minLength2, maxLength20]}
                            />
                        </div>
                        <div className="col-md-4">
                            <Field
                                name="last_name"
                                className="form-control"
                                label="Last Name"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Last Name"
                                component={InputField}
                                errorClass="help-block"
                                validate={[minLength2, maxLength20]}
                            />
                        </div>
                        <div className="col-md-4">
                            <Field
                                name="mobile_no"
                                className="form-control"
                                label="Mobile No."
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Mobile No."
                                component={InputField}
                                errorClass="help-block"
                                validate={[mobile]}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <Field
                                id="dob"
                                name="dob"
                                className="form-control"
                                label="Date Of Birth"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Date Of Birth"
                                component={DateField}
                                maxDate={moment().subtract(18, 'year')}
                                isClearable={true}
                                selectedDate={this.state.dob}
                                handleChange={this.handleChangeDob}
                                dateFormat="DD/MM/YYYY"
                                errorClass="help-block"
                                autoComplete="off"
                            />
                        </div>
                        <div className="col-md-4">
                            <Field
                                name="height"
                                className="form-control"
                                label="Height"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Height"
                                component={InputField}
                                type="number"
                            />
                        </div>
                        <div className="col-md-4">
                            <Field
                                name="weight"
                                className="form-control"
                                label="Weight"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Weight"
                                component={InputField}
                                type="number"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2">
                            <div className="form-group">
                                <label for="gender" className="control-label display_block">Gender</label>
                                <Field
                                    id={GENDER_MALE}
                                    name="gender"
                                    component="input"
                                    type="radio"
                                    value={GENDER_MALE}
                                />
                                <span className="rbtn">Male</span>
                                <Field
                                    id={GENDER_FEMALE}
                                    name="gender"
                                    component="input"
                                    type="radio"
                                    value={GENDER_FEMALE}
                                />
                                <span className="rbtn">Female</span>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group">
                                <label for="workout_location" className="control-label display_block">Workout Location</label>
                                <Field
                                    id={WORKOUT_LOCATION_HOME}
                                    name="workout_location"
                                    component="input"
                                    type="radio"
                                    value={WORKOUT_LOCATION_HOME}
                                />
                                <span className="rbtn">Home</span>
                                <Field
                                    id={WORKOUT_LOCATION_GYM}
                                    name="workout_location"
                                    component="input"
                                    type="radio"
                                    value={WORKOUT_LOCATION_GYM}
                                />
                                <span className="rbtn">Gym</span>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <Field
                                name="goal"
                                label="Goal"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                component={SelectField_ReactSelect}
                                options={goalOptions}
                            />
                        </div>
                        <div className="col-md-4">
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
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
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
                        </div>
                        <div className="col-md-6">
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
                        </div>
                    </div>
                    <div className="d-flex pull-right mt-10">
                        <div className="col-md-12">
                            <Link to={adminRouteCodes.USERS} className="custom-medium-link-btn">
                                <span>Back</span>
                                <i className="icon-arrow_back"></i>
                            </Link>
                            <button type="submit" className="custom-medium-btn">
                                <span>Save</span>
                                <i className="icon-save"></i>
                            </button>
                        </div>
                    </div>
                </form>
            </div >
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const { selectLoading, selectUser, selectError, initialize, dispatch } = this.props;
        if (!selectLoading && prevProps.selectLoading !== selectLoading && selectUser && prevProps.selectUser !== selectUser) {
            let dob = null;
            if (selectUser.dateOfBirth) {
                dob = moment(selectUser.dateOfBirth);
            }
            const userData = {
                first_name: selectUser.firstName,
                last_name: selectUser.lastName,
                mobile_no: selectUser.mobileNumber,
                dob: dob,
                height: selectUser.height,
                weight: selectUser.weight,
                gender: selectUser.gender,
                workout_location: selectUser.workoutLocation,
                goal: selectUser.goal.name,
                status: _.find(userStatusOptions, (o) => { return (o.value === selectUser.status) }),
                about_me: selectUser.aboutMe,
            }
            initialize(userData);
            this.setState({
                dob: dob,
                gender: selectUser.gender,
                existingProfilePics: [selectUser.avatar],
                aboutMe: selectUser.aboutMe,
            });
            dispatch(hidePageLoader());
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
        selectLoading: adminUsers.get('selectLoading'),
        selectUser: adminUsers.get('selectUser'),
        selectError: adminUsers.get('selectError'),
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