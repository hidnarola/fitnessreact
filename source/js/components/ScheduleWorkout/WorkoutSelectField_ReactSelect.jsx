import React, { Component } from 'react';
import Select from "react-select";

class WorkoutSelectField_ReactSelect extends Component {
    render() {
        const {
            input,
            meta,
            wrapperClass,
            className,
            placeholder,
            errorClass,
            options,
        } = this.props;
        return (
            <div
                className={
                    `${wrapperClass} ${(meta.touched && meta.error) ? 'has-error' : ''}`
                }
            >
                <Select
                    {...input}
                    options={options}
                    className={className}
                    placeholder={placeholder}
                    onChange={(value) => input.onChange(value)}
                    onBlur={() => {
                        if (input.value) {
                            input.onBlur({ ...input.value });
                        }
                    }}
                    multi={false}
                    clearable={true}
                />
                {meta.touched &&
                    ((meta.error && <div className={errorClass}>{meta.error}</div>) || (meta.warning && <span className={warningClass}>{meta.warning}</span>))
                }
            </div>
        );
    }
}

export default WorkoutSelectField_ReactSelect;