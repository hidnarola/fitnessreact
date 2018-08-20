import React, { Component } from 'react';

class CustomTooltip1 extends Component {
    render() {
        const { payload, label, active, valueLabel, valueUnit } = this.props;
        if (active) {
            return (
                <div className="custom-graph-tooltip-wrapper">
                    <ul>
                        <li><strong>Date : </strong> <span>{label}</span></li>
                        <li><strong>{(valueLabel) ? valueLabel : 'Data'} : </strong> <span>{payload[0].value}{(valueUnit) ? valueUnit : ""}</span></li>
                    </ul>
                </div>
            );
        }
        return null;
    }
}

export default CustomTooltip1;