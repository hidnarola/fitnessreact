import React, { Component } from 'react';

class CustomTooltip1 extends Component {
    render() {
        const { payload, label, active, valueLabel, valueUnit } = this.props;
        let payloadValue = "";
        if (payload && payload.length > 0) {
            payloadValue = payload[0].value;
        }
        if (active) {
            return (
                <div className="custom-graph-tooltip-wrapper">
                    <ul>
                        <li><strong>Date : </strong> <span>{label}</span></li>
                        <li><strong>{(valueLabel) ? valueLabel : 'Data'} : </strong> <span>{payloadValue}{(valueUnit) ? valueUnit : ""}</span></li>
                    </ul>
                </div>
            );
        }
        return null;
    }
}

export default CustomTooltip1;