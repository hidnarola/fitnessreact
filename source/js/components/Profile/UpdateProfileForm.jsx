import React, { Component } from 'react';
import ReactDOMServer from "react-dom/server";
import { connect } from 'react-redux';
import { Field, reduxForm, initialize, formValueSelector } from "redux-form";
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
    MEASUREMENT_UNIT_POUND,
    MEASUREMENT_UNIT_INCH,
} from '../../constants/consts';
import { capitalizeFirstLetter, ts, convertUnits, focusToControl, sanitizeEditableContentValue, connectIDB, isOnline, tw } from '../../helpers/funs';
import {
    getLoggedUserProfileDetailsRequest,
    saveLoggedUserProfileDetailsRequest,
    getLoggedUserProfileSettingsRequest,
    setUserProfileState
} from '../../actions/profile';
import moment from "moment";
import { showPageLoader, hidePageLoader } from '../../actions/pageLoader';
import { required, mobile, minLength, maxLength, min, max, validNumber } from '../../formValidation/validationRules';
import userFemale from 'img/common/user-female.png';
import userMale from 'img/common/user-male.png';
import home from 'img/common/home.png';
import gym from 'img/common/gym.png';
import ReactTooltip from "react-tooltip";
import jwt from "jwt-simple";
import { setLoggedUserFromLocalStorage } from '../../actions/user';
import Emos from '../Common/Emos';
import ContentEditable from 'react-contenteditable';
import { Emoji } from "emoji-mart";
import { IDB_TBL_POFILE_SETTING, IDB_READ_WRITE, IDB_READ } from '../../constants/idb';

const minLength2 = minLength(2);
const maxLength15 = maxLength(15);
const min50 = min(50);
const min44 = min(44);
const min20 = min(20);
const max1000 = max(1000);
const max600 = max(600);
const max240 = max(240);
const max2200 = max(2200);

class UpdateProfileForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectActionInit: false,
            dob: null,
            weightUnit: MEASUREMENT_UNIT_GRAM,
            heightUnit: MEASUREMENT_UNIT_CENTIMETER,
        }
        this.iDB;
    }

    render() {
        const { weightUnit, heightUnit } = this.state;
        let validateWeight = (weightUnit !== MEASUREMENT_UNIT_POUND) ? [validNumber, min20, max1000] : [validNumber, min44, max2200];
        let validateHeight = (heightUnit !== MEASUREMENT_UNIT_INCH) ? [validNumber, min50, max600] : [validNumber, min20, max240];
        return (
            <div className="update-profile-details-form col-md-12 no-padding">
                <form>
                    <div className="col-md-6 pull-left">
                        <div className="white-box">
                            <div className="mb-10">
                                <h3 className="title-h3">Profile Settings</h3>
                            </div>
                            <div className="stepbox-m personal-dtl no-padding width-100-per">
                                <ul className="">
                                    <li>
                                        <div className="form-div label_float">
                                            <label>First Name</label>
                                            <Field
                                                id="first_name"
                                                name="first_name"
                                                wrapperClass="input-wrap"
                                                placeholder="First Name"
                                                errorClass="help-block"
                                                type="text"
                                                component={InputField}
                                                validate={[required, minLength2, maxLength15]}
                                            />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-div label_float">
                                            <label>Last Name</label>
                                            <Field
                                                id="last_name"
                                                name="last_name"
                                                wrapperClass="input-wrap"
                                                placeholder="Last Name"
                                                errorClass="help-block"
                                                type="text"
                                                component={InputField}
                                                validate={[minLength2, maxLength15]}
                                            />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-div label_float">
                                            <label>Mobile No.</label>
                                            <Field
                                                id="mobile_no"
                                                name="mobile_no"
                                                wrapperClass="input-wrap"
                                                placeholder="Mobile No."
                                                errorClass="help-block"
                                                type="text"
                                                component={InputField}
                                                validate={[required, mobile]}
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
                                                    validate={[required]}
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
                                                    validate={[required]}
                                                />
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-div label_float">
                                            <label>Date Of Birth</label>
                                            <Field
                                                id="dob"
                                                name="dob"
                                                wrapperClass="input-wrap"
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
                                    </li>
                                    <li>
                                        <div className="form-div label_float">
                                            <label>Height</label>
                                            <Field
                                                id="height"
                                                name="height"
                                                wrapperClass="input-wrap weight-wrap input_unit"
                                                placeholder="Height"
                                                errorClass="help-block"
                                                type="text"
                                                component={InputField}
                                                units={(<label>{(heightUnit) ? heightUnit.toUpperCase() : MEASUREMENT_UNIT_CENTIMETER.toUpperCase()}</label>)}
                                                validate={validateHeight}
                                            />
                                            <Field
                                                type="hidden"
                                                component="input"
                                                name="heightUnit"
                                            />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-div label_float">
                                            <label>Weight</label>
                                            <Field
                                                id="weight"
                                                name="weight"
                                                wrapperClass="input-wrap weight-wrap input_unit"
                                                errorClass="help-block"
                                                type="text"
                                                placeholder="Weight"
                                                component={InputField}
                                                units={(<label>{(weightUnit) ? weightUnit.toUpperCase() : MEASUREMENT_UNIT_KILOGRAM.toUpperCase()}</label>)}
                                                validate={validateWeight}
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
                            <div className="mb-10">
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
                                                    validate={[required]}
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
                                                    validate={[required]}
                                                />
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="white-box pb-0 pt-0">
                            <div className="mb-10">
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

                        <div className="white-box pb-0 pt-0">
                            <div className="mb-10">
                                <h3 className="title-h3">About Me</h3>
                            </div>
                            <div className="stepbox-m personal-dtl no-padding width-100-per">
                                <ul className="">
                                    <li className="p-relative">
                                        <Field
                                            name="about_me"
                                            className="my-custom-textarea resize-vertical min-height-179"
                                            wrapperClass="form-group"
                                            component={MyCustomTextarea}
                                        />
                                        <Emos
                                            id="emos"
                                            pickerProps={{
                                                color: "#ff337f",
                                                onClick: this.handleEmoClick,
                                                onSelect: this.handleEmoSelect,
                                            }}
                                            positionClass="top-right"
                                            emosWrapClass="emotis-text-area"
                                        />
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

    componentDidMount() {

        connectIDB()().then((connection) => {
            this.handleIDBOpenSuccess(connection);
        });

        this.setState({ selectActionInit: true });
        if (isOnline()) {
            const { dispatch } = this.props;
            dispatch(showPageLoader());
            dispatch(getLoggedUserProfileDetailsRequest());
            dispatch(getLoggedUserProfileSettingsRequest());
        }

    }

    handleIDBOpenSuccess = (connection) => {
        this.iDB = connection.result;
        if (!isOnline()) {
            this.getDataFromIDB();
        }
    }

    getDataFromIDB = () => {
        const { dispatch } = this.props;
        const idbTbls = [IDB_TBL_POFILE_SETTING];

        // get preferences
        try {
            const transaction = this.iDB.transaction(idbTbls, IDB_READ);
            if (transaction) {
                const osPreference = transaction.objectStore(IDB_TBL_POFILE_SETTING);
                const iDBGetReq = osPreference.get('preferences');
                iDBGetReq.onsuccess = (event) => {
                    const { target: { result } } = event;
                    if (result) {
                        const resultObj = JSON.parse(result.data);
                        const data = { settings: resultObj }
                        dispatch(setUserProfileState(data));
                    } else {
                        const data = { settings: null }
                        dispatch(setUserProfileState(data));
                    }
                }
            }
        } catch (error) {
            const data = { settings: null }
            dispatch(setUserProfileState(data));
        }

        // get profile

        try {
            const transaction1 = this.iDB.transaction(idbTbls, IDB_READ);
            if (transaction1) {
                const osProfile = transaction1.objectStore(IDB_TBL_POFILE_SETTING);
                const iDBGetProfileReq = osProfile.get('profile');
                iDBGetProfileReq.onsuccess = (event) => {
                    const { target: { result } } = event;
                    if (result) {
                        const resultProfileObj = JSON.parse(result.data);
                        const dataProfile = { profile: resultProfileObj }
                        dispatch(setUserProfileState(dataProfile));
                    } else {
                        const dataProfile = { profile: null }
                        dispatch(setUserProfileState(dataProfile));
                    }
                }
            }
        } catch (error) {
            const dataProfile = { profile: null }
            dispatch(setUserProfileState(dataProfile));
        }



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
            profileError,
        } = this.props;
        if (selectActionInit && !loading && profile) {
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
                height: (profile.height) ? profile.height.toFixed(2) : '',
                weight: (profile.weight) ? profile.weight.toFixed(2) : '',
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
            if (profileError && profileError.length > 0) {
                focusToControl('.validation_errors_wrapper');
                dispatch(hidePageLoader());
            } else {
                dispatch(getLoggedUserProfileDetailsRequest());
                ts('Profile details updated successfully.');
            }
            handleSaveActionFlag(false);
        }
        if (!settingsLoading && !loading && ((prevProps.profile !== profile) || (prevProps.profileSettings !== profileSettings))) {
            var heightUnit = this.state.heightUnit;
            var weightUnit = this.state.weightUnit;
            if (profileSettings) {
                heightUnit = (profileSettings.bodyMeasurement) ? profileSettings.bodyMeasurement : MEASUREMENT_UNIT_CENTIMETER;
                weightUnit = (profileSettings.weight) ? profileSettings.weight : MEASUREMENT_UNIT_KILOGRAM;
                var height = (profile.height) ? convertUnits(MEASUREMENT_UNIT_CENTIMETER, heightUnit, profile.height).toFixed(2) : '';
                var weight = (profile.weight) ? convertUnits(MEASUREMENT_UNIT_GRAM, weightUnit, profile.weight).toFixed(2) : '';
                this.props.change('height', height);
                this.props.change('heightUnit', heightUnit);
                this.props.change('weight', weight);
                this.props.change('weightUnit', weightUnit);
            }
            this.setState({ heightUnit, weightUnit });
        }
        if (!settingsLoading && prevProps.settingsLoading !== settingsLoading) {
            // set user_settings data
            this.setUserSettingDataInDb()
        }
        if (!loading && prevProps.loading !== loading) {
            // set user data
            this.setUserDataInDb()
        }
    }

    componentWillUnmount() {
        try {
            const idbs = [IDB_TBL_POFILE_SETTING];
            if (isOnline()) {
                const transaction = this.iDB.transaction(idbs, IDB_READ_WRITE);
                if (transaction) {
                    const osProfile = transaction.objectStore(IDB_TBL_POFILE_SETTING);
                    osProfile.clear();
                }
            }
            this.iDB.close();
        } catch (error) { }
    }

    setUserSettingDataInDb = () => {
        const { profileSettings } = this.props;
        try {
            const idbData = { type: 'preferences', data: JSON.stringify(profileSettings) };
            const transaction = this.iDB.transaction([IDB_TBL_POFILE_SETTING], IDB_READ_WRITE);
            const objectStore = transaction.objectStore(IDB_TBL_POFILE_SETTING);
            const iDBGetReq = objectStore.get('preferences');
            iDBGetReq.onsuccess = (event) => {
                const { target: { result } } = event;
                if (result) {
                    objectStore.put(idbData);
                } else {
                    objectStore.add(idbData);
                }
            }
        } catch (error) {
        }
    }

    setUserDataInDb = () => {
        const { profile } = this.props;
        try {
            const idbData = { type: 'profile', data: JSON.stringify(profile) };
            const transaction = this.iDB.transaction([IDB_TBL_POFILE_SETTING], IDB_READ_WRITE);
            const objectStore = transaction.objectStore(IDB_TBL_POFILE_SETTING);
            const iDBGetReq = objectStore.get('profile');
            iDBGetReq.onsuccess = (event) => {
                const { target: { result } } = event;
                if (result) {
                    objectStore.put(idbData);
                } else {
                    objectStore.add(idbData);
                }
            }
        } catch (error) {
        }
    }

    handleChangeDob = (date) => {
        this.props.change('dob', date);
        this.setState({ dob: date });
    }

    updateLocalStorageUserDetails = (userDetails) => {
        var encryptedUserDetails = jwt.encode(userDetails, FITASSIST_USER_DETAILS_TOKEN_KEY);
        localStorage.setItem(LOCALSTORAGE_USER_DETAILS_KEY, encryptedUserDetails);
    }

    handleEmoClick = (emoji, event) => {
        const { id } = emoji;
        this.appendDescription(id);
    }

    handleEmoSelect = (emoji) => {
        const { id } = emoji;
        this.appendDescription(id);
    }

    appendDescription = (id) => {
        if (id) {
            const { aboutMe, change } = this.props;
            const _aboutMe = aboutMe +
                ReactDOMServer.renderToString(<span contentEditable={false} dangerouslySetInnerHTML={{
                    __html: Emoji({ html: true, set: 'emojione', emoji: id, size: 16 })
                }}></span>) +
                ReactDOMServer.renderToString(<span>&nbsp;</span>);
            change('about_me', _aboutMe);
        }
    }
}

const handleSubmit = (data, dispatch, props) => {
    const { handleSaveActionFlag } = props;
    const sanitizeAboutMe = sanitizeEditableContentValue(data.about_me);
    var formData = {
        firstName: (data.first_name && data.first_name.trim()) ? capitalizeFirstLetter(data.first_name.trim()) : '',
        lastName: (data.last_name && data.last_name.trim()) ? capitalizeFirstLetter(data.last_name.trim()) : '',
        mobileNumber: (data.mobile_no && data.mobile_no.trim()) ? data.mobile_no.trim() : '',
        gender: (data.gender) ? data.gender : GENDER_MALE,
        dateOfBirth: (data.dob) ? data.dob : '',
        goal: (data.primary_goal) ? data.primary_goal : null,
        aboutMe: (sanitizeAboutMe && sanitizeAboutMe.trim()) ? sanitizeAboutMe : '',
        height: (data.height) ? data.height : 0,
        weight: (data.weight) ? data.weight : 0,
        heightUnit: (data.heightUnit) ? data.heightUnit : '',
        weightUnit: (data.weightUnit) ? data.weightUnit : '',
        workoutLocation: (data.workout_location) ? data.workout_location : WORKOUT_LOCATION_GYM,
    };
    handleSaveActionFlag(true);
    dispatch(showPageLoader());
    dispatch(saveLoggedUserProfileDetailsRequest(formData));
}

const selector = formValueSelector('update_profile_details_form');

UpdateProfileForm = reduxForm({
    form: 'update_profile_details_form',
    onSubmit: (data, dispatch, props) => handleSubmit(data, dispatch, props)
})(UpdateProfileForm);

const mapStateToProps = (state) => {
    const { profile } = state;
    return {
        loading: profile.get('loading'),
        profile: profile.get('profile'),
        profileError: profile.get('error'),
        profileSettings: profile.get('settings'),
        settingsLoading: profile.get('settingsLoading'),
        aboutMe: selector(state, 'about_me')
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
            showYearDropdown,
            showMonthDropdown,
            scrollableYearDropdown,
            dropdownMode,
        } = this.props;
        return (
            <div className={wrapperClass}>
                <DatePicker
                    {...this.props}
                    selected={selectedDate}
                    onChange={handleChange}
                    dateFormat={dateFormat ? dateFormat : "DD/MM/YYYY"}
                    className={className}
                    placeholderText={placeholder}
                    showYearDropdown={(showYearDropdown) ? showYearDropdown : true}
                    showMonthDropdown={(showMonthDropdown) ? showMonthDropdown : true}
                    scrollableYearDropdown={(scrollableYearDropdown) ? scrollableYearDropdown : true}
                    dropdownMode={(dropdownMode) ? dropdownMode : 'select'}
                />
                {meta.touched &&
                    ((meta.error && <span className={errorClass}>{meta.error}</span>) || (meta.warning && <span className={warningClass}>{meta.warning}</span>))
                }
            </div>
        );
    }
}

class MyCustomTextarea extends Component {
    constructor(props) {
        super(props);
        this.contentEditable = React.createRef();
    }

    render() {
        const {
            wrapperClass,
            className,
            input
        } = this.props;
        return (
            <div className={wrapperClass}>
                <ContentEditable
                    innerRef={this.contentEditable}
                    html={input.value}
                    disabled={false}
                    onChange={(e) => input.onChange(e.target.value)}
                    tagName='div'
                    className={className}
                    placeholder="About me"
                />
            </div>
        );
    }

    focus = () => {
        this.contentEditable.current.focus();
    }
}