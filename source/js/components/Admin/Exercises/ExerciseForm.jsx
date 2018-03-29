import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { required, maxLength, minLength } from '../../../formValidation/validationRules';
import { InputField, TextAreaField } from '../../../helpers/FormControlHelper';

function mapStateToProps(state) {
    return {

    };
}

const maxLength15 = maxLength(15);
const minLength2 = minLength(2);

class ExerciseForm extends Component {
    render() {
        return (
            <div className="exercise-form-data">
                <form>
                    <div className="row">
                        <div className="col-md-12">
                            <Field
                                name="name"
                                className="form-control"
                                label="Name"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Name"
                                component={InputField}
                                errorClass=""
                                warningClass=""
                                validate={[required, maxLength15, minLength2]}
                            />
                            <Field
                                name="description"
                                className="form-control"
                                label="Description"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Description"
                                component={TextAreaField}
                            />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

ExerciseForm = reduxForm({
    form: 'exerciseSaveForm'
})(ExerciseForm)

export default connect(
    mapStateToProps,
)(ExerciseForm);