import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { SelectField_ReactSelect } from "../../helpers/FormControlHelper";
import { requiredReactSelectNumberOptions } from "../../formValidation/validationRules";
import { Alert } from "react-bootstrap";
import { setUserProgramState } from "../../actions/userPrograms";

class AppendProgramFromCalendarForm extends Component {
    render() {
        const { handleSubmit, onCancel, programs, appendFromCalendarLoading, appendFromCalendarError } = this.props;
        const programOptions = programs.map((o) => ({ value: o._id, label: o.name }));
        return (
            <div className="append-program-alert-form">
                {appendFromCalendarError && appendFromCalendarError.length > 0 &&
                    <Alert bsStyle="danger">
                        {
                            appendFromCalendarError.map((o, i) => (<p key={i}>{o}</p>))
                        }
                    </Alert>
                }
                <form method="POST" onSubmit={handleSubmit}>
                    <Field
                        id="program_id"
                        name="program_id"
                        wrapperClass="form-group"
                        className="ta-left fs-14"
                        placeholder="Program"
                        component={SelectField_ReactSelect}
                        options={programOptions}
                        errorClass="help-block"
                        validate={[requiredReactSelectNumberOptions]}
                    />
                    <button type="button" className="btn btn-sm btn-danger" onClick={onCancel} disabled={appendFromCalendarLoading}>Cancel</button>
                    <button type="submit" className="btn btn-sm btn-success" disabled={appendFromCalendarLoading}>OK</button>
                </form>
            </div>
        )
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        const newState = { appendFromCalendarError: [] };
        dispatch(setUserProgramState(newState));
    }
}

const mapStateToProps = (state) => {
    const { userScheduleWorkouts, userPrograms } = state;
    return {
        programs: userScheduleWorkouts.get('programs'),
        appendFromCalendarLoading: userPrograms.get('appendFromCalendarLoading'),
        appendFromCalendarError: userPrograms.get('appendFromCalendarError')
    }
}

AppendProgramFromCalendarForm = reduxForm({
    form: "append_program_master_form"
})(AppendProgramFromCalendarForm);

export default connect(mapStateToProps)(AppendProgramFromCalendarForm);