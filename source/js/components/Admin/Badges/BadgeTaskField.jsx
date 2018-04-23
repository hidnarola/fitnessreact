import React, { Component } from 'react';
import { Field } from 'redux-form';
import Select from 'react-select';
import { required, requiredReactSelect } from '../../../formValidation/validationRules';

class BadgeTaskField extends Component {
    render() {
        const {
            wrapperClass,
            input,
            labelClass,
            label,
            actionOptions
        } = this.props;
        return (
            <div className="badge-task-field-wrapper no-margin row">
                <div className={`${wrapperClass}`}>
                    <label htmlFor={input.name} className={labelClass}>{label}</label>
                    <Field
                        name={`${input.name}_action`}
                        placeholder="Action"
                        component={TaskActionField}
                        options={actionOptions}
                        errorClass="help-block"
                        validate={[requiredReactSelect]}
                    />
                    <Field
                        name={`${input.name}_value`}
                        className="form-control"
                        placeholder="Value"
                        component={TaskValueField}
                        errorClass="help-block"
                        validate={[required]}
                    />
                    <Field
                        name={`${input.name}_unit`}
                        className="form-control"
                        placeholder="Units"
                        component={TaskUnitField}
                        errorClass="help-block"
                        validate={[required]}
                    />
                </div>
            </div>
        );
    }
}

const TaskValueField = (props) => {
    const { input, meta, className, placeholder, errorClass, type } = props;
    return (
        <div
            className={
                `col-md-4 pull-left ${(meta.touched && meta.error) ? 'has-error' : ''}`
            }
        >
            <input
                {...input}
                type={type ? type : 'text'}
                className={className}
                placeholder={placeholder}
            />
            {meta.touched &&
                ((meta.error && <div className={errorClass}>{meta.error}</div>) || (meta.warning && <span className={warningClass}>{meta.warning}</span>))
            }
        </div>
    );
}

const TaskUnitField = (props) => {
    const { input, meta, className, placeholder, errorClass, type } = props;
    return (
        <div
            className={
                `col-md-4 pull-left ${(meta.touched && meta.error) ? 'has-error' : ''}`
            }
        >
            <input
                {...input}
                type={type ? type : 'text'}
                className={className}
                placeholder={placeholder}
            />
            {meta.touched &&
                ((meta.error && <div className={errorClass}>{meta.error}</div>) || (meta.warning && <span className={warningClass}>{meta.warning}</span>))
            }
        </div>
    );
}

const TaskActionField = (props) => {
    const {
        input,
        meta,
        className,
        placeholder,
        errorClass,
        initialValue,
        options,
        clearable
    } = props;
    let val = '';
    if (input.value && Object.keys(input.value).length > 0) {
        val = input.value;
    } else if (initialValue) {
        val = initialValue;
    }
    return (
        <div
            className={
                `col-md-4 pull-left ${(meta.touched && meta.error) ? 'has-error' : ''}`
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
                clearable={clearable ? clearable : true}
            />
            {meta.touched &&
                ((meta.error && <div className={errorClass}>{meta.error}</div>) || (meta.warning && <span className={warningClass}>{meta.warning}</span>))
            }
        </div>
    );
}

export default BadgeTaskField;