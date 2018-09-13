import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, initialize } from "redux-form";
import DatePicker from "react-datepicker";
import {
    WORKOUT_LOCATION_HOME,
    WORKOUT_LOCATION_GYM,
    GOAL_GAIN_MUSCLE,
    GOAL_IMPROVE_MOBILITY,
    GOAL_LOSE_FAT,
    GOAL_GAIN_STRENGTH,
    GOAL_INCREASE_ENDURANCE,
    GENDER_MALE,
    GENDER_FEMALE,
    MEASUREMENT_UNIT_CENTIMETER,
    MEASUREMENT_UNIT_KILOGRAM,
    MEASUREMENT_UNIT_GRAM,
    FITASSIST_USER_DETAILS_TOKEN_KEY,
    LOCALSTORAGE_USER_DETAILS_KEY,
} from '../../constants/consts';
import { capitalizeFirstLetter, ts, convertUnits } from '../../helpers/funs';
import ReactQuill from 'react-quill';
import {
    getLoggedUserProfileDetailsRequest,
    saveLoggedUserProfileDetailsRequest,
    getLoggedUserProfileSettingsRequest
} from '../../actions/profile';
import moment from "moment";
import { showPageLoader, hidePageLoader } from '../../actions/pageLoader';
import { required, mobile } from '../../formValidation/validationRules';
import userFemale from 'img/common/user-female.png';
import userMale from 'img/common/user-male.png';
import home from 'img/common/home.png';
import gym from 'img/common/gym.png';
import ReactTooltip from "react-tooltip";
import jwt from "jwt-simple";
import { setLoggedUserFromLocalStorage } from '../../actions/user';

class UpdateProfileForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectActionInit: false,
            dob: null,
            aboutMe: '',
            weightUnit: MEASUREMENT_UNIT_GRAM,
            heightUnit: MEASUREMENT_UNIT_CENTIMETER,
        }
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(showPageLoader());
        this.setState({ selectActionInit: true });
        dispatch(getLoggedUserProfileDetailsRequest());
        dispatch(getLoggedUserProfileSettingsRequest());
    }

    render() {
        const { handleSubmit } = this.props;
        const { weightUnit, heightUnit } = this.state;
        return (
            <div className="update-profile-details-form col-md-12 no-padding">
                <form id="form1" onSubmit={handleSubmit}>
                    <div className="col-md-6 pull-left">
                        <div className="white-box">
                            <div className="whitebox-head">
                                <h3 className="title-h3">Profile Settings</h3>
                            </div>
                            <div className="stepbox-m personal-dtl no-padding width-100-per">
                                <ul className="">
                                    <li>
                                        <div className="form-div">
                                            <label>First Name</label>
                                            <Field
                                                id="first_name"
                                                name="first_name"
                                                wrapperClass="input-wrap"
                                                placeholder="First Name"
                                                errorClass="help-block"
                                                type="text"
                                                component={InputField}
                                                validate={[required]}
                                            />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-div">
                                            <label>Last Name</label>
                                            <Field
                                                id="last_name"
                                                name="last_name"
                                                wrapperClass="input-wrap"
                                                placeholder="Last Name"
                                                errorClass="help-block"
                                                type="text"
                                                component={InputField}
                                                validate={[required]}
                                            />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-div">
                                            <label>Mobile No.</label>
                                            <Field
                                                id="mobile_no"
                                                name="mobile_no"
                                                wrapperClass="input-wrap"
                                                placeholder="Mobile No."
                                                errorClass="help-block"
                                                type="text"
                                                component={InputField}
                                                validate={[mobile]}
                                            />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-div">
                                            <label>Gender</label>
                                            <div className="input-wrap radiobox">
                                                <Field
                                                    id={GENDER_MALE}
                                                    name="gender"
                                                    wrapperClass="radiobox-inr"
                                                    errorClass="help-block"
                                                    type="radio"
                                                    component={InputField}
                                                    units={(
                                                        <label htmlFor="male" data-tip="Male"><img src={userMale} /></label>
                                                    )}
                                                    value={GENDER_MALE}
                                                />
                                                <Field
                                                    id={GENDER_FEMALE}
                                                    name="gender"
                                                    wrapperClass="radiobox-inr"
                                                    errorClass="help-block"
                                                    type="radio"
                                                    component={InputField}
                                                    units={(
                                                        <label htmlFor="female" data-tip="Female"><img src={userFemale} /></label>
                                                    )}
                                                    value={GENDER_FEMALE}
                                                />
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-div">
                                            <label>Date Of Birth</label>
                                            <Field
                                                id="dob"
                                                name="dob"
                                                wrapperClass="input-wrap"
                                                placeholder="Date Of Birth"
                                                component={DateField}
                                                selectedDate={this.state.dob}
                                                handleChange={this.handleChangeDob}
                                                dateFormat="MM/DD/YYYY"
                                                errorClass="help-block"
                                            />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-div">
                                            <label>Height</label>
                                            <Field
                                                id="height"
                                                name="height"
                                                wrapperClass="input-wrap weight-wrap"
                                                placeholder="Foot"
                                                errorClass="help-block"
                                                type="number"
                                                component={InputField}
                                                units={(<label>{heightUnit.toUpperCase()}</label>)}
                                            />
                                            <Field
                                                type="hidden"
                                                component="input"
                                                name="heightUnit"
                                            />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-div">
                                            <label>Weight</label>
                                            <Field
                                                id="weight"
                                                name="weight"
                                                wrapperClass="input-wrap weight-wrap"
                                                errorClass="help-block"
                                                type="number"
                                                placeholder="Kg"
                                                component={InputField}
                                                units={(<label>{weightUnit.toUpperCase()}</label>)}
                                            />
                                            <Field
                                                type="hidden"
                                                component="input"
                                                name="weightUnit"
                                            />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 pull-left">
                        <div className="white-box pb-0">
                            <div className="whitebox-head">
                                <h3 className="title-h3">Workout Location</h3>
                            </div>
                            <div className="stepbox-m personal-dtl no-padding width-100-per">
                                <ul className="">
                                    <li>
                                        <div className="form-div">
                                            <div className="input-wrap radiobox">
                                                <Field
                                                    id={WORKOUT_LOCATION_HOME}
                                                    name="workout_location"
                                                    wrapperClass="radiobox-inr"
                                                    errorClass="help-block"
                                                    type="radio"
                                                    component={InputField}
                                                    units={(<label htmlFor="home" data-tip="Home"><img src={home} /></label>)}
                                                    value={WORKOUT_LOCATION_HOME}
                                                />
                                                <Field
                                                    id={WORKOUT_LOCATION_GYM}
                                                    name="workout_location"
                                                    wrapperClass="radiobox-inr"
                                                    errorClass="help-block"
                                                    type="radio"
                                                    component={InputField}
                                                    units={(<label htmlFor="gym" data-tip="Gym"><img src={gym} /></label>)}
                                                    value={WORKOUT_LOCATION_GYM}
                                                />
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="white-box pb-0">
                            <div className="whitebox-head">
                                <h3 className="title-h3">Goals</h3>
                            </div>
                            <div className="stepbox-m personal-dtl no-padding width-100-per">
                                <ul className="">
                                    <li>
                                        <div className="form-div row">
                                            <div className="col-md-4">
                                                <Field
                                                    id={GOAL_GAIN_MUSCLE}
                                                    name="primary_goal"
                                                    wrapperClass="custom_radio mb-10"
                                                    errorClass="help-block"
                                                    type="radio"
                                                    component={InputField}
                                                    units={(<label htmlFor={GOAL_GAIN_MUSCLE}>{capitalizeFirstLetter(GOAL_GAIN_MUSCLE.replace('_', ' '))}</label>)}
                                                    value={GOAL_GAIN_MUSCLE}
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <Field
                                                    id={GOAL_IMPROVE_MOBILITY}
                                                    name="primary_goal"
                                                    wrapperClass="custom_radio mb-10"
                                                    errorClass="help-block"
                                                    type="radio"
                                                    component={InputField}
                                                    units={(<label htmlFor={GOAL_IMPROVE_MOBILITY}>{capitalizeFirstLetter(GOAL_IMPROVE_MOBILITY.replace('_', ' '))}</label>)}
                                                    value={GOAL_IMPROVE_MOBILITY}
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <Field
                                                    id={GOAL_LOSE_FAT}
                                                    name="primary_goal"
                                                    wrapperClass="custom_radio mb-10"
                                                    errorClass="help-block"
                                                    type="radio"
                                                    component={InputField}
                                                    units={(<label htmlFor={GOAL_LOSE_FAT}>{capitalizeFirstLetter(GOAL_LOSE_FAT.replace('_', ' '))}</label>)}
                                                    value={GOAL_LOSE_FAT}
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <Field
                                                    id={GOAL_GAIN_STRENGTH}
                                                    name="primary_goal"
                                                    wrapperClass="custom_radio mb-10"
                                                    errorClass="help-block"
                                                    type="radio"
                                                    component={InputField}
                                                    units={(<label htmlFor={GOAL_GAIN_STRENGTH}>{capitalizeFirstLetter(GOAL_GAIN_STRENGTH.replace('_', ' '))}</label>)}
                                                    value={GOAL_GAIN_STRENGTH}
                                                />
                                            </div>

                                            <div className="col-md-4">
                                                <Field
                                                    id={GOAL_INCREASE_ENDURANCE}
                                                    name="primary_goal"
                                                    wrapperClass="custom_radio mb-10"
                                                    errorClass="help-block"
                                                    type="radio"
                                                    component={InputField}
                                                    units={(<label htmlFor={GOAL_INCREASE_ENDURANCE}>{capitalizeFirstLetter(GOAL_INCREASE_ENDURANCE.replace('_', ' '))}</label>)}
                                                    value={GOAL_INCREASE_ENDURANCE}
                                                />
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="white-box pb-0">
                            <div className="whitebox-head">
                                <h3 className="title-h3">About Me</h3>
                            </div>
                            <div className="stepbox-m personal-dtl no-padding width-100-per">
                                <ul className="">
                                    <li>
                                        <div className="form-div">
                                            <Field
                                                name="about_me"
                                                value={this.state.aboutMe}
                                                handleChange={this.handleChangeTextEditor}
                                                className="editor-min-height-200"
                                                placeholder="About Me"
                                                wrapperClass="width-100-per"
                                                component={EditorField}
                                            />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </form>
                <ReactTooltip place="top" type="dark" effect="float" />
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            selectActionInit,
        } = this.state;
        const {
            loading,
            profile,
            dispatch,
            saveActionInit,
            handleSaveActionFlag,
            profileSettings,
            settingsLoading,
        } = this.props;
        if (selectActionInit && !loading) {
            this.setState({ selectActionInit: false });
            var dob = null;
            if (profile.dateOfBirth) {
                dob = moment(profile.dateOfBirth);
            }
            this.setState({ dob });
            var formData = {
                first_name: profile.firstName,
                last_name: profile.lastName,
                mobile_no: profile.mobileNumber,
                gender: profile.gender,
                dob: dob,
                height: profile.height.toFixed(2),
                weight: profile.weight.toFixed(2),
                heightUnit: this.state.heightUnit,
                weightUnit: this.state.weightUnit,
                workout_location: profile.workoutLocation,
                about_me: profile.aboutMe,
                primary_goal: (profile.goal) ? profile.goal.name : null,
            }
            this.updateLocalStorageUserDetails(profile);
            dispatch(initialize('update_profile_details_form', formData));
            dispatch(setLoggedUserFromLocalStorage());
            dispatch(hidePageLoader());
        } else if (saveActionInit && !loading) {
            this.setState({ selectActionInit: true });
            dispatch(getLoggedUserProfileDetailsRequest());
            ts('Profile details updated successfully.');
            handleSaveActionFlag(false);
        }
        if (!settingsLoading && !loading && ((prevProps.profile !== profile) || (prevProps.profileSettings !== profileSettings))) {
            var heightUnit = this.state.heightUnit;
            var weightUnit = this.state.weightUnit;
            if (profileSettings) {
                heightUnit = (profileSettings.bodyMeasurement) ? profileSettings.bodyMeasurement : MEASUREMENT_UNIT_CENTIMETER;
                weightUnit = (profileSettings.weight) ? profileSettings.weight : MEASUREMENT_UNIT_KILOGRAM;
                var height = convertUnits(MEASUREMENT_UNIT_CENTIMETER, heightUnit, profile.height).toFixed(2);
                var weight = convertUnits(MEASUREMENT_UNIT_GRAM, weightUnit, profile.weight).toFixed(2);
                this.props.change('height', height);
                this.props.change('heightUnit', heightUnit);
                this.props.change('weight', weight);
                this.props.change('weightUnit', weightUnit);
            }
            this.setState({
                heightUnit,
                weightUnit,
            });
        }
    }

    handleChangeDob = (date) => {
        this.props.change('dob', date);
        this.setState({ dob: date });
    }

    handleChangeTextEditor = (editorText) => {
        this.props.change('about_me', editorText);
        this.setState({ aboutMe: editorText });
    }

    updateLocalStorageUserDetails = (userDetails) => {
        var encryptedUserDetails = jwt.encode(userDetails, FITASSIST_USER_DETAILS_TOKEN_KEY);
        localStorage.setItem(LOCALSTORAGE_USER_DETAILS_KEY, encryptedUserDetails);
    }
}

const handleSubmit = (data, dispatch, props) => {
    const { handleSaveActionFlag } = props;
    var heightUnit = data.heightUnit;
    var weightUnit = data.weightUnit;
    var formData = {
        firstName: capitalizeFirstLetter(data.first_name),
        lastName: (data.last_name) ? capitalizeFirstLetter(data.last_name) : '',
        mobileNumber: (data.mobile_no) ? data.mobile_no : '',
        gender: (data.gender) ? data.gender : GENDER_MALE,
        dateOfBirth: (data.dob) ? data.dob : '',
        goal: (data.primary_goal) ? data.primary_goal : null,
        aboutMe: (data.about_me) ? data.about_me : '',
        height: (data.height) ? convertUnits(heightUnit, MEASUREMENT_UNIT_CENTIMETER, data.height) : 0,
        weight: (data.weight) ? convertUnits(weightUnit, MEASUREMENT_UNIT_GRAM, data.weight) : 0,
        workoutLocation: (data.workout_location) ? data.workout_location : WORKOUT_LOCATION_GYM,
    };
    handleSaveActionFlag(true);
    dispatch(showPageLoader());
    dispatch(saveLoggedUserProfileDetailsRequest(formData));
}

UpdateProfileForm = reduxForm({
    form: 'update_profile_details_form',
    onSubmit: (data, dispatch, props) => handleSubmit(data, dispatch, props)
})(UpdateProfileForm)

const mapStateToProps = (state) => {
    const { profile } = state;
    return {
        loading: profile.get('loading'),
        profile: profile.get('profile'),
        profileSettings: profile.get('settings'),
        settingsLoading: profile.get('loading'),
    };
}

export default connect(
    mapStateToProps,
)(UpdateProfileForm);

class InputField extends Component {
    render() {
        const {
            input,
            meta,
            wrapperClass,
            className,
            placeholder,
            errorClass,
            type,
            disabled,
            units,
            id,
        } = this.props;
        return (
            <div
                className={
                    `${wrapperClass} ${(meta.touched && meta.error) ? 'has-error' : ''}`
                }
            >
                <input
                    {...input}
                    id={(id) ? id : ''}
                    type={type ? type : 'text'}
                    disabled={disabled ? disabled : false}
                    className={className}
                    placeholder={placeholder}
                />
                {(units) ? units : ''}
                {meta.touched &&
                    ((meta.error && <div className={errorClass}>{meta.error}</div>) || (meta.warning && <span className={warningClass}>{meta.warning}</span>))
                }
            </div>
        );
    }
}

class DateField extends Component {
    render() {
        const {
            meta,
            wrapperClass,
            className,
            placeholder,
            errorClass,
            selectedDate,
            handleChange,
            dateFormat,
        } = this.props;
        return (
            <div className={wrapperClass}>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleChange}
                    dateFormat={dateFormat ? dateFormat : "MM/DD/YYYY"}
                    className={className}
                    placeholderText={placeholder}
                />
                {meta.touched &&
                    ((meta.error && <span className={errorClass}>{meta.error}</span>) || (meta.warning && <span className={warningClass}>{meta.warning}</span>))
                }
            </div>
        );
    }
}

class EditorField extends Component {
    render() {
        const {
            input,
            wrapperClass,
            placeholder,
            handleChange,
            className,
        } = this.props;
        return (
            <div className={wrapperClass}>
                <ReactQuill
                    {...input}
                    value={input.value ? input.value : ''}
                    onChange={(content, delta, source, editor) => handleChange(content)}
                    onBlur={(content) => { return content }}
                    placeholder={placeholder}
                    className={className}
                />
            </div>
        );
    }
}