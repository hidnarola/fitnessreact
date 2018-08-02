import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from "redux-form";
import { required } from '../../formValidation/validationRules';
import { addUserProgramMasterRequest } from '../../actions/userPrograms';
import { te } from '../../helpers/funs';
import { withRouter } from "react-router-dom";
import { routeCodes } from '../../constants/routes';

class AddProgramMasterForm extends Component {
    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="add-program-master-form-alert-form">
                <form method="POST" onSubmit={handleSubmit}>
                    <Field
                        name="title"
                        className="form-control"
                        wrapperClass="form-group"
                        placeholder="Title"
                        component={InputField}
                        errorClass="help-block"
                        validate={[required]}
                    />
                    <Field
                        name="description"
                        className="form-control"
                        wrapperClass="form-group"
                        placeholder="Description"
                        component={TextAreaField}
                    />
                    <button type="button" className="btn btn-sm btn-danger">Cancel</button>
                    <button type="submit" className="btn btn-sm btn-success">OK</button>
                </form>
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const { loadingMaster, programMaster, errorMaster, history } = this.props;
        if (!loadingMaster && programMaster && prevProps.programMaster !== programMaster) {
            if (errorMaster && errorMaster.length <= 0) {
                var _id = programMaster._id;
                history.push(`${routeCodes.PROGRAM_SAVE}/${_id}`);
            } else {
                te(errorMaster[0]);
            }
        }
    }

}

AddProgramMasterForm = reduxForm({
    form: 'add_program_master_form',
    onSubmit: (data, dispatch, props) => handleSubmit(data, dispatch, props)
})(AddProgramMasterForm)

AddProgramMasterForm = withRouter(AddProgramMasterForm);

const mapStateToProps = (state) => {
    const { userPrograms } = state;
    return {
        loadingMaster: userPrograms.get('loadingMaster'),
        programMaster: userPrograms.get('programMaster'),
        errorMaster: userPrograms.get('errorMaster'),
    };
}

export default connect(
    mapStateToProps,
)(AddProgramMasterForm);

const handleSubmit = (data, dispatch, props) => {
    var requestData = {
        name: data.title,
        description: (data.description) ? data.description : '',
        type: 'user',
    }
    props.dispatch(addUserProgramMasterRequest(requestData));
}

const TextAreaField = (props) => {
    const { input, meta, wrapperClass, className, placeholder, errorClass } = props;
    return (
        <div
            className={
                `${wrapperClass} ${(meta.touched && meta.error) ? 'has-error' : ''}`
            }
        >
            <textarea
                {...input}
                className={className}
                placeholder={placeholder}
            />
            {meta.touched &&
                ((meta.error && <div className={errorClass}>{meta.error}</div>) || (meta.warning && <span className={warningClass}>{meta.warning}</span>))
            }
        </div>
    );
}

const InputField = (props) => {
    const { input, meta, wrapperClass, className, placeholder, errorClass, type, disabled, properties } = props;
    return (
        <div
            className={
                `${wrapperClass} ${(meta.touched && meta.error) ? 'has-error' : ''}`
            }
        >
            <input
                {...input}
                type={type ? type : 'text'}
                disabled={disabled ? disabled : false}
                className={className}
                placeholder={placeholder}
                {...properties}
                autoComplete="off"
            />
            {meta.touched &&
                ((meta.error && <div className={errorClass}>{meta.error}</div>) || (meta.warning && <span className={warningClass}>{meta.warning}</span>))
            }
        </div>
    );
}