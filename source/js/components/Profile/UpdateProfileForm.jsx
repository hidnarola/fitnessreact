import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from "redux-form";
import DatePicker from "react-datepicker";

class UpdateProfileForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dob: null
        }
    }

    render() {
        return (
            <div className="update-profile-details-form col-md-12 no-padding">
                <div className="col-md-6">
                    <div className="white-box">
                        <div className="whitebox-head">
                            <h3 className="title-h3">Profile Settings</h3>
                        </div>
                        <div className="stepbox-m personal-dtl no-padding width-100-per">
                            <form>
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
                                            />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-div">
                                            <label>Gender</label>
                                            <div className="input-wrap radiobox">
                                                <Field
                                                    id="male"
                                                    name="gender"
                                                    wrapperClass="radiobox-inr"
                                                    errorClass="help-block"
                                                    type="radio"
                                                    component={InputField}
                                                    units={(<label htmlFor="male"></label>)}
                                                    value="male"
                                                />
                                                <Field
                                                    id="female"
                                                    name="gender"
                                                    wrapperClass="radiobox-inr"
                                                    errorClass="help-block"
                                                    type="radio"
                                                    component={InputField}
                                                    units={(<label htmlFor="female"></label>)}
                                                    value="female"
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
                                            <div className="input-wrap height-input-wrap">
                                                <Field
                                                    id="height_foor"
                                                    name="height_foor"
                                                    wrapperClass="height-input"
                                                    placeholder="Foot"
                                                    errorClass="help-block"
                                                    type="number"
                                                    component={InputField}
                                                    units={(<label>FT</label>)}
                                                />
                                                <Field
                                                    id="height_inch"
                                                    name="height_inch"
                                                    wrapperClass="height-input"
                                                    placeholder="Inch"
                                                    errorClass="help-block"
                                                    type="number"
                                                    component={InputField}
                                                    units={(<label>IN</label>)}
                                                />
                                            </div>
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
                                                component={InputField}
                                                units={(<label>KG</label>)}
                                            />
                                        </div>
                                    </li>
                                </ul>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    handleChangeDob = (date) => {
        this.props.change('dob', date);
        this.setState({ dob: date });
    }
}

UpdateProfileForm = reduxForm({
    form: 'update_profile_details_form'
})(UpdateProfileForm)

const mapStateToProps = (state) => {
    return {

    };
}

export default connect(
    mapStateToProps,
)(UpdateProfileForm);

const InputField = (props) => {
    const {
        label,
        input,
        meta,
        wrapperClass,
        inputWrapperClass,
        className,
        labelClass,
        placeholder,
        errorClass,
        type,
        disabled,
        units,
        id,
    } = props;
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

const DateField = (props) => {
    const {
        input,
        meta,
        wrapperClass,
        className,
        placeholder,
        errorClass,
        selectedDate,
        handleChange,
        dateFormat,
    } = props;
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