import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { InputField, SelectField_ReactSelect } from "../../helpers/FormControlHelper";
import { required, minLength, maxLength, requiredReactSelectNumberOptions, requiredReactSelect } from "../../formValidation/validationRules";
import {
    SECONDARY_GOALS,
    PROGRAM_DIFFICULTY_LEVEL_OBJ,
    PROGRAM_PRIVATE,
    PROGRAM_PRIVATE_STR,
    PROGRAM_PUBLIC,
    PROGRAM_PUBLIC_STR
} from "../../constants/consts";
import { Alert } from "react-bootstrap";
import { setUserProgramState } from "../../actions/userPrograms";

const minLength2 = minLength(2);
const maxLength100 = maxLength(100);

const privacyOptions = [
    { value: PROGRAM_PRIVATE, label: PROGRAM_PRIVATE_STR },
    { value: PROGRAM_PUBLIC, label: PROGRAM_PUBLIC_STR }
];

class CreateProgramFromCalendarForm extends Component {
    render() {
        const { handleSubmit, onCancel, createFromCalendarLoading, createFromCalendarError } = this.props;
        return (
            <div className="create-program-alert-form">
                {createFromCalendarError && createFromCalendarError.length > 0 &&
                    <Alert bsStyle="danger">
                        {
                            createFromCalendarError.map((o, i) => (<p key={i}>{o}</p>))
                        }
                    </Alert>
                }
                <form method="POST" onSubmit={handleSubmit}>
                    <Field
                        name="title"
                        className="form-control"
                        wrapperClass="form-group"
                        placeholder="Name"
                        component={InputField}
                        errorClass="help-block"
                        validate={[required, minLength2, maxLength100]}
                    />
                    <Field
                        id="privacy"
                        name="privacy"
                        wrapperClass="form-group"
                        className="ta-left fs-14"
                        placeholder="Privacy"
                        component={SelectField_ReactSelect}
                        options={privacyOptions}
                        errorClass="help-block"
                        validate={[requiredReactSelectNumberOptions]}
                    />
                    <Field
                        id="goal"
                        name="goal"
                        wrapperClass="form-group"
                        className="ta-left fs-14"
                        placeholder="Goal"
                        component={SelectField_ReactSelect}
                        options={SECONDARY_GOALS}
                        errorClass="help-block"
                        validate={[requiredReactSelect]}
                    />
                    <Field
                        id="level"
                        name="level"
                        wrapperClass="form-group"
                        className="ta-left fs-14"
                        placeholder="Level"
                        component={SelectField_ReactSelect}
                        options={PROGRAM_DIFFICULTY_LEVEL_OBJ}
                        errorClass="help-block"
                        validate={[requiredReactSelect]}
                    />
                    <button type="button" className="btn btn-sm btn-danger" onClick={onCancel} disabled={createFromCalendarLoading}>Cancel</button>
                    <button type="submit" className="btn btn-sm btn-success" disabled={createFromCalendarLoading}>OK</button>
                </form>
            </div>
        )
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        const newState = { createFromCalendarError: [] };
        dispatch(setUserProgramState(newState));
    }
}

const mapStateToProps = (state) => {
    const { userPrograms } = state;
    return {
        createFromCalendarLoading: userPrograms.get('createFromCalendarLoading'),
        createFromCalendarError: userPrograms.get('createFromCalendarError')
    }
}

CreateProgramFromCalendarForm = reduxForm({
    form: "create_program_master_form"
})(CreateProgramFromCalendarForm);

export default connect(mapStateToProps)(CreateProgramFromCalendarForm);