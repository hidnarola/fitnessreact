import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, initialize } from "redux-form";
import { showPageLoader, hidePageLoader } from '../../actions/pageLoader';
import { requiredReactSelect } from '../../formValidation/validationRules';
import Select from 'react-select';
import _ from "lodash";
import {
    MEASUREMENT_UNITS,
    MEASUREMENT_UNIT_KEY_LARGE_DISTANCE,
    MEASUREMENT_UNIT_KEY_HEAVY_MASS,
    MEASUREMENT_UNIT_KEY_MEASUREMENT,
    ACCESS_LEVEL_FRIENDS,
    ACCESS_LEVEL_PUBLIC,
    ACCESS_LEVEL_PRIVATE,
    ACCESS_LEVEL_PUBLIC_STR,
    ACCESS_LEVEL_FRIENDS_STR,
    ACCESS_LEVEL_PRIVATE_STR,
} from '../../constants/consts';
import { getLoggedUserProfileSettingsRequest, saveLoggedUserProfileSettingsRequest } from '../../actions/profile';
import { ts } from '../../helpers/funs';

class ProfileSettingsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectActionInit: false,
        };
        this.distanceOptions = [];
        this.weightOptions = [];
        this.bodyMeasurementOptions = [];
        var distanceOptionObj = _.find(MEASUREMENT_UNITS, ['key', MEASUREMENT_UNIT_KEY_LARGE_DISTANCE]);
        if (distanceOptionObj) {
            this.distanceOptions = distanceOptionObj.value;
        }
        var weightOptionObj = _.find(MEASUREMENT_UNITS, ['key', MEASUREMENT_UNIT_KEY_HEAVY_MASS]);
        if (weightOptionObj) {
            this.weightOptions = weightOptionObj.value;
        }
        var bodyMeasurementOptionObj = _.find(MEASUREMENT_UNITS, ['key', MEASUREMENT_UNIT_KEY_MEASUREMENT]);
        if (bodyMeasurementOptionObj) {
            this.bodyMeasurementOptions = bodyMeasurementOptionObj.value;
        }
        this.accessLevelOptions = [
            { value: ACCESS_LEVEL_PUBLIC, label: ACCESS_LEVEL_PUBLIC_STR },
            { value: ACCESS_LEVEL_FRIENDS, label: ACCESS_LEVEL_FRIENDS_STR },
            { value: ACCESS_LEVEL_PRIVATE, label: ACCESS_LEVEL_PRIVATE_STR },
        ];
    }

    componentWillMount() {
        const { dispatch } = this.props;
        this.setState({ selectActionInit: true });
        dispatch(showPageLoader());
        dispatch(getLoggedUserProfileSettingsRequest());
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="update-profile-settings-form col-md-12 no-padding">
                <form id="form1" onSubmit={handleSubmit}>
                    <div className="col-md-6 pull-left">
                        <div className="white-box">
                            <div className="whitebox-head">
                                <h3 className="title-h3">Units</h3>
                            </div>
                            <div className="stepbox-m personal-dtl no-padding width-100-per">
                                <ul className="">
                                    <li>
                                        <div className="form-div">
                                            <label>Distance</label>
                                            <Field
                                                name="distance"
                                                wrapperClass="input-wrap"
                                                placeholder="Distance"
                                                component={SelectField}
                                                options={this.distanceOptions}
                                                errorClass="help-block"
                                                validate={[requiredReactSelect]}
                                            />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-div">
                                            <label>Weight</label>
                                            <Field
                                                name="weight"
                                                wrapperClass="input-wrap"
                                                placeholder="Weight"
                                                component={SelectField}
                                                options={this.weightOptions}
                                                errorClass="help-block"
                                                validate={[requiredReactSelect]}
                                            />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-div">
                                            <label>Body Measurement</label>
                                            <Field
                                                name="body_measurement"
                                                wrapperClass="input-wrap"
                                                placeholder="Body Measurement"
                                                component={SelectField}
                                                options={this.bodyMeasurementOptions}
                                                errorClass="help-block"
                                                validate={[requiredReactSelect]}
                                            />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 pull-left">
                        <div className="white-box">
                            <div className="whitebox-head">
                                <h3 className="title-h3">Privacy</h3>
                            </div>
                            <div className="stepbox-m personal-dtl no-padding width-100-per">
                                <ul className="">
                                    <li>
                                        <div className="form-div">
                                            <label>Who can post on your wall?</label>
                                            <Field
                                                name="post_access"
                                                wrapperClass="input-wrap"
                                                placeholder="Who can post on your wall?"
                                                component={SelectField}
                                                options={this.accessLevelOptions}
                                                errorClass="help-block"
                                                validate={[requiredReactSelect]}
                                            />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-div">
                                            <label>Who can commnet on your post?</label>
                                            <Field
                                                name="comment_access"
                                                wrapperClass="input-wrap"
                                                placeholder="Who can commnet on your post?"
                                                component={SelectField}
                                                options={this.accessLevelOptions}
                                                errorClass="help-block"
                                                validate={[requiredReactSelect]}
                                            />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-div">
                                            <label>Who can message you?</label>
                                            <Field
                                                name="message_access"
                                                wrapperClass="input-wrap"
                                                placeholder="Who can message you?"
                                                component={SelectField}
                                                options={this.accessLevelOptions}
                                                errorClass="help-block"
                                                validate={[requiredReactSelect]}
                                            />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-div">
                                            <label>Who can send you friend request?</label>
                                            <Field
                                                name="friend_request_access"
                                                wrapperClass="input-wrap"
                                                placeholder="Who can send you friend request?"
                                                component={SelectField}
                                                options={this.accessLevelOptions}
                                                errorClass="help-block"
                                                validate={[requiredReactSelect]}
                                            />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    componentDidUpdate() {
        const {
            selectActionInit,
        } = this.state;
        const {
            settingsLoading,
            settings,
            dispatch,
            saveActionInit,
            handleSaveActionFlag,
        } = this.props;
        if (selectActionInit && !settingsLoading) {
            this.setState({ selectActionInit: false });
            var distanceObj = _.find(this.distanceOptions, ['value', settings.distance]);
            var weightObj = _.find(this.weightOptions, ['value', settings.weight]);
            var bodyMeasurementObj = _.find(this.bodyMeasurementOptions, ['value', settings.bodyMeasurement]);
            var postObj = _.find(this.accessLevelOptions, ['value', settings.postAccessibility.toString()]);
            var commentObj = _.find(this.accessLevelOptions, ['value', settings.commentAccessibility.toString()]);
            var messageObj = _.find(this.accessLevelOptions, ['value', settings.messageAccessibility.toString()]);
            var friendObj = _.find(this.accessLevelOptions, ['value', settings.friendRequestAccessibility.toString()]);
            var formData = {
                distance: (distanceObj) ? distanceObj : null,
                weight: (weightObj) ? weightObj : null,
                body_measurement: (bodyMeasurementObj) ? bodyMeasurementObj : null,
                post_access: (postObj) ? postObj : null,
                comment_access: (commentObj) ? commentObj : null,
                message_access: (messageObj) ? messageObj : null,
                friend_request_access: (friendObj) ? friendObj : null,
            }
            dispatch(initialize('update_profile_settings_form', formData));
            dispatch(hidePageLoader());
        } else if (saveActionInit && !settingsLoading) {
            this.setState({ selectActionInit: true });
            dispatch(getLoggedUserProfileSettingsRequest());
            ts('Profile settings updated successfully.');
            handleSaveActionFlag(false);
        }
    }
}

const handleSubmit = (data, dispatch, props) => {
    const { handleSaveActionFlag } = props;
    var formData = {
        distance: data.distance.value,
        weight: data.weight.value,
        bodyMeasurement: data.body_measurement.value,
        postAccessibility: data.post_access.value,
        commentAccessibility: data.comment_access.value,
        messageAccessibility: data.message_access.value,
        friendRequestAccessibility: data.friend_request_access.value,
    };
    handleSaveActionFlag(true);
    dispatch(showPageLoader());
    dispatch(saveLoggedUserProfileSettingsRequest(formData));
}

ProfileSettingsForm = reduxForm({
    form: 'update_profile_settings_form',
    onSubmit: (data, dispatch, props) => handleSubmit(data, dispatch, props)
})(ProfileSettingsForm)

const mapStateToProps = (state) => {
    const { profile } = state;
    return {
        settingsLoading: profile.get('settingsLoading'),
        settings: profile.get('settings'),
    };
}

export default connect(
    mapStateToProps,
)(ProfileSettingsForm);

const SelectField = (props) => {
    const { input, meta, wrapperClass, className, placeholder, errorClass, initialValue, options, clearable } = props;
    let val = '';
    if (input.value && Object.keys(input.value).length > 0) {
        val = input.value;
    } else if (initialValue) {
        val = initialValue;
    }
    return (
        <div
            className={
                `${wrapperClass} ${(meta.touched && meta.error) ? 'has-error' : ''}`
            }
        >
            <Select
                {...input}
                value={val}
                options={options}
                className={className}
                placeholder={placeholder}
                onChange={(value) => input.onChange(value)}
                onBlur={() => input.onBlur({ ...input.value })}
                multi={false}
                clearable={false}
            />
            {meta.touched &&
                ((meta.error && <div className={errorClass}>{meta.error}</div>) || (meta.warning && <span className={warningClass}>{meta.warning}</span>))
            }
        </div>
    );
}