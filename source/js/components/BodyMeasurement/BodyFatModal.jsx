import React, { Component } from 'react';
import { connect } from "react-redux";
import { Modal } from 'react-bootstrap';
import { Field, reduxForm, formValueSelector } from "redux-form";
import { required, min, max } from '../../formValidation/validationRules';
import { calculateBodyFatPercentage } from '../../helpers/funs';
import { GENDER_FEMALE } from '../../constants/consts';
import cns from "classnames";

const min0 = min(0);
const max110 = max(110);
const max200 = max(200);

class BodyFatModal extends Component {
    render() {
        const { show, handleClose, handleSubmit, gender, age } = this.props;
        return (
            <div className="add-body-fat-modal-wrapper">
                <Modal show={show} bsSize="large" className="progress-popup body-fat-form-wrapper">
                    <form onSubmit={handleSubmit}>
                        <div className="progress-popup-head">
                            <button type="button" className="close-round" onClick={handleClose}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h3 className="title-h3">Enter Body Fat</h3>
                            <p>We use We use We use We use We use We use We use We use We use We use We use We use We use We use We use We use We use We use We use We use We use We use We use We use We use We use We use</p>
                        </div>

                        <div className="progress-popup-body">
                            <h3 className="title-h3">Three Points Caliper Measurements</h3>
                            <ul className="common-ul">
                                <li>
                                    <Field
                                        name="site1"
                                        type="number"
                                        label={(gender && gender === GENDER_FEMALE) ? 'Tricep' : 'Chest'}
                                        wrapperClass="grey-white remove-spinner"
                                        component={InputField}
                                        errorClass="help-block"
                                        placeholder={(gender && gender === GENDER_FEMALE) ? 'Tricep' : 'Chest'}
                                        validate={[required, min0, max200]}
                                        unitValue="mm"
                                    />
                                </li>
                                <li>
                                    <Field
                                        name="site2"
                                        type="number"
                                        label={(gender && gender === GENDER_FEMALE) ? 'Suprailiac' : 'Abdominal'}
                                        wrapperClass="grey-white remove-spinner"
                                        component={InputField}
                                        errorClass="help-block"
                                        placeholder={(gender && gender === GENDER_FEMALE) ? 'Suprailiac' : 'Abdominal'}
                                        validate={[required, min0, max200]}
                                        unitValue="mm"
                                    />
                                </li>
                                <li>
                                    <Field
                                        name="site3"
                                        type="number"
                                        label="Thigh"
                                        wrapperClass="grey-white remove-spinner"
                                        component={InputField}
                                        errorClass="help-block"
                                        placeholder="Thigh"
                                        validate={[required, min0, max200]}
                                        unitValue="mm"
                                    />
                                </li>
                                <li className={cns({ 'display_none': (typeof age !== 'undefined' && age > 0) })}>
                                    <Field
                                        name="age"
                                        type="number"
                                        label="Age"
                                        wrapperClass="grey-white remove-spinner"
                                        component={InputField}
                                        errorClass="help-block"
                                        placeholder="Age"
                                        validate={[required, min0, max110]}
                                        unitValue="years"
                                    />
                                    <Field
                                        name="gender"
                                        component="input"
                                        type="hidden"
                                    />
                                    <Field
                                        name="log_date"
                                        component="input"
                                        type="hidden"
                                    />
                                </li>
                                <li className="body-fat-field-li">
                                    <Field
                                        name="bodyFat"
                                        type="number"
                                        label="Your Body Fat Percentage"
                                        wrapperClass="grey-white remove-spinner"
                                        component={InputField}
                                        errorClass="help-block"
                                        placeholder="Body Fat"
                                        readOnly={true}
                                        unitValue="%"
                                    />
                                </li>
                                <li>
                                    <div className="add-log d-flex">
                                        <button type="submit" className="ml-auto">Save Log <i className="icon-control_point"></i></button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </form>
                </Modal>
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const { site1, site2, site3, change, age, gender, log_date } = this.props;
        if (site1 && site2 && site3) {
            let sum = parseFloat(site1) + parseFloat(site2) + parseFloat(site3);
            let bodyFat = calculateBodyFatPercentage(sum, age, gender);
            change('bodyFat', bodyFat);
        }
        change('log_date', log_date);
    }

}

BodyFatModal = reduxForm({
    form: 'saveBodyFatForm'
})(BodyFatModal);

const selector = formValueSelector('saveBodyFatForm')
const selector1 = formValueSelector('userBodyMeasurement')
const mapStateToProps = (state) => {
    return {
        site1: selector(state, 'site1'),
        site2: selector(state, 'site2'),
        site3: selector(state, 'site3'),
        age: selector(state, 'age'),
        gender: selector(state, 'gender'),
        log_date: selector1(state, 'log_date'),
    };
}

export default connect(
    mapStateToProps
)(BodyFatModal);

const InputField = (props) => {
    const { label, input, meta, wrapperClass, className, labelClass, placeholder, errorClass, type, unitValue, readOnly } = props;
    return (
        <div>
            <div
                className={
                    `${wrapperClass} ${(meta.touched && meta.error) ? 'has-error' : ''}`
                }
            >
                <label htmlFor={input.name} className={labelClass}>{label}</label>
                <input
                    {...input}
                    type={type ? type : 'text'}
                    className={className}
                    placeholder={placeholder}
                    readOnly={(readOnly) ? readOnly : false}
                />
                {unitValue &&
                    <div className="cm-kg">{unitValue}</div>
                }
            </div>
            {meta.touched &&
                ((meta.error && <div className={errorClass}>{meta.error}</div>) || (meta.warning && <span className={warningClass}>{meta.warning}</span>))
            }
        </div>
    );
}