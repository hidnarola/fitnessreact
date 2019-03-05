import React, { Component } from 'react';
import { connect } from "react-redux";
import { Modal } from 'react-bootstrap';
import { Field, reduxForm, formValueSelector } from "redux-form";
import { required, min, max, validNumber } from '../../formValidation/validationRules';
import { calculateBodyFatPercentage } from '../../helpers/funs';
import { GENDER_FEMALE } from '../../constants/consts';
import cns from "classnames";

const min0 = min(0);
const min18 = min(18);
const max110 = max(110);
const max200 = max(200);

class BodyFatModal extends Component {
    render() {
        const { show, handleClose, handleSubmit, gender, hidden_age } = this.props;
        return (
            <div className="add-body-fat-modal-wrapper">
                <Modal show={show} bsSize="large" className="progress-popup body-fat-form-wrapper">
                    <form onSubmit={handleSubmit}>
                        <div className="progress-popup-head">
                            <button type="button" className="close-round" onClick={handleClose}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h3 className="title-h3">Enter Body Fat</h3>
                            <p>To perform each measurement: Using the tips of your thumb and forefinger pinch the skin in the area to be measured. Pull the skin away from the muscle, being sure to 'get' all the subcutaneous fat underneath the skin but don't include the underlying muscle. Measure the thickness of this fold of fat and skin, in millimeters, with either a ruler (metric) or skin fold calipers. If you do have calipers, the jaws should be placed close to where the fingertips have the skin pinched so an accurate reading can be obtained (about 1 cm (1/4 in) away from the fingers). Release the caliper's handles and wait 2 seconds before taking the reading. Take a reading of that same site a few more times (release the fold and get a new 'pinch' for each measurement) and take the average - each reading should be within 1 or 2 mm of each other. If you don't have calipers you'll have to make do with a ruler.</p>
                        </div>

                        <div className="progress-popup-body">
                            <h3 className="title-h3">Three Points Caliper Measurements</h3>
                            <ul className="common-ul">
                                <li>
                                    <Field
                                        name="site1"
                                        type="text"
                                        label={(gender && gender === GENDER_FEMALE) ? 'Tricep' : 'Chest'}
                                        wrapperClass="grey-white remove-spinner"
                                        component={InputField}
                                        errorClass="help-block"
                                        placeholder={(gender && gender === GENDER_FEMALE) ? 'Tricep' : 'Chest'}
                                        validate={[required, validNumber, min0, max200]}
                                        unitValue="mm"
                                    />
                                </li>
                                <li>
                                    <Field
                                        name="site2"
                                        type="text"
                                        label={(gender && gender === GENDER_FEMALE) ? 'Suprailiac' : 'Abdominal'}
                                        wrapperClass="grey-white remove-spinner"
                                        component={InputField}
                                        errorClass="help-block"
                                        placeholder={(gender && gender === GENDER_FEMALE) ? 'Suprailiac' : 'Abdominal'}
                                        validate={[required, validNumber, min0, max200]}
                                        unitValue="mm"
                                    />
                                </li>
                                <li>
                                    <Field
                                        name="site3"
                                        type="text"
                                        label="Thigh"
                                        wrapperClass="grey-white remove-spinner"
                                        component={InputField}
                                        errorClass="help-block"
                                        placeholder="Thigh"
                                        validate={[required, validNumber, min0, max200]}
                                        unitValue="mm"
                                    />
                                </li>
                                <li className={cns({ 'display_none': (typeof hidden_age !== 'undefined' && hidden_age > 0) })}>
                                    <Field
                                        name="age"
                                        type="text"
                                        label="Age"
                                        wrapperClass="grey-white remove-spinner"
                                        component={InputField}
                                        errorClass="help-block"
                                        placeholder="Age"
                                        validate={[required, validNumber, min18, max110]}
                                        unitValue="years"
                                    />
                                    <Field
                                        name="hidden_age"
                                        component="input"
                                        type="hidden"
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
                                        type="text"
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
        hidden_age: selector(state, 'hidden_age'),
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