import React, { Component } from 'react';
import ReactTooltip from "react-tooltip";

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
            fieldWrapperErrorClass,
        } = this.props;
        return (
            <div className={
                (fieldWrapperErrorClass && meta.touched && meta.error) ? fieldWrapperErrorClass : ''
            }>
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
                    data-tip
                    data-for={id}
                />
                {meta.touched && (meta.error && <div className={errorClass}></div>)}
                {meta.touched && meta.error &&
                    <ReactTooltip id={id} place="top" type="error" effect="solid">
                        {meta.error}
                    </ReactTooltip>
                }
            </div>
        );
    }
}

export default WorkoutInputField;