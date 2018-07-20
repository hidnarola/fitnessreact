import React, { Component } from 'react';

class WorkoutDropdownField extends Component {
    render() {
        const {
            input,
            id,
            options,
            tabIndex,
        } = this.props;
        return (
            <div className="">
                <select
                    {...input}
                    name={input.name}
                    id={id}
                    onChange={(e) => input.onChange(e.target.value)}
                    tabIndex={(typeof tabIndex !== 'undefined') ? tabIndex : ''}
                >
                    {options && options.length > 0 &&
                        options.map((o, i) => {
                            return (
                                <option key={i} value={o.value}>{o.label}</option>
                            );
                        })
                    }
                </select>
            </div>
        );
    }
}

export default WorkoutDropdownField;