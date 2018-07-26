import React, { Component } from 'react';

class WorkoutInputField extends Component {
    render() {
        const {
            input,
            id,
            placeholder,
            type,
            min,
            max,
            meta,
            errorClass,
            warningClass,
        } = this.props;
        return (
            <div className="">
                <input
                    type="text"
                    name={input.name}
                    value={input.value}
                    id={id}
                    placeholder={placeholder}
                    type={(type) ? type : 'text'}
                    min={(typeof min !== 'undefined') ? min : ''}
                    max={(typeof max !== 'undefined') ? max : ''}
                    onChange={(e) => input.onChange(e.target.value)}
                />
                {meta.touched &&
                    ((meta.error && <div className={errorClass}>{meta.error}</div>) || (meta.warning && <span className={warningClass}>{meta.warning}</span>))
                }
            </div>
        );
    }
}

export default WorkoutInputField;