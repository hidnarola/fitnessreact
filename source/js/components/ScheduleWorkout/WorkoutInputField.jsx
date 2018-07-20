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
            </div>
        );
    }
}

export default WorkoutInputField;