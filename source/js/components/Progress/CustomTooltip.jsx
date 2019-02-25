import React, { Component } from 'react';

class CustomTooltip extends Component {
    render() {
        const { payload, label, active } = this.props;
        let payloadValue = "";
        if (payload && payload.length > 0) {
            payloadValue = payload[0].value;
        }
        if (active) {
            return (
                <div className="custom-graph-tooltip-wrapper">
                    <ul>
                        <li><strong>Date : </strong> <span>{label}</span></li>
                        {payload && payload.length > 0 && payload[0].payload && payload[0].payload.metaData && payload[0].payload.metaData.name &&
                            <li><strong>{payload[0].payload.metaData.name} : </strong> <span>{`${payloadValue} ${payload[0].payload.metaData.unit}`}</span></li>
                        }
                    </ul>
                </div>
            );
        }
        return null;
    }
}

export default CustomTooltip;