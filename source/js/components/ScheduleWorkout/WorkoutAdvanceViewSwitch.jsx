import React, { Component } from 'react';

class WorkoutAdvanceViewSwitch extends Component {
    render() {
        const {
            id,
            input,
            checked,
            tabIndex,
        } = this.props;
        return (
            <div className="switch-wrap">
                <small>Advance View</small>
                <div className="material-switch">
                    <input
                        {...input}
                        id={id}
                        name={input.name}
                        type="checkbox"
                        checked={(checked) ? checked : false}
                        onChange={(e) => input.onChange(e.target.checked)}
                        tabIndex={(tabIndex) ? tabIndex : ''}
                    />
                    <label htmlFor={id} className="label-default"></label>
                </div>
            </div>
        );
    }
}

export default WorkoutAdvanceViewSwitch;
