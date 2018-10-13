import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requiredReactSelect } from '../../formValidation/validationRules';
import { SelectField_ReactSelect } from '../../helpers/FormControlHelper';
import { Field, reduxForm } from "redux-form";

class SelectAssignProgramForm extends Component {
    render() {
        const { handleSubmit, onCancel, options, assignProgramLoading } = this.props;
        return (
            <form method="POST" onSubmit={handleSubmit} className="assign-program-form-wrapper">
                <Field
                    id="program_id"
                    name="program_id"
                    label="Select Program"
                    className=""
                    wrapperClass="form-group"
                    placeholder="Select Program"
                    component={SelectField_ReactSelect}
                    options={options}
                    errorClass="help-block"
                    validate={[requiredReactSelect]}
                />
                <button type="button" onClick={onCancel} className="btn btn-sm btn-danger">Cancel</button>
                <button type="submit" disabled={assignProgramLoading} className="btn btn-sm btn-success">OK</button>
            </form>
        );
    }
}

SelectAssignProgramForm = reduxForm({
    form: 'select_assign_program_form'
})(SelectAssignProgramForm);

const mapStateToProps = (state) => {
    const { userScheduleWorkouts } = state;
    return {
        assignProgramLoading: userScheduleWorkouts.get('assignProgramLoading'),
    };
}

export default connect(
    mapStateToProps,
)(SelectAssignProgramForm);