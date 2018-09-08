import React, { Component } from 'react';

class CustomTooltip extends Component {
    render() {
        const { payload, label, active } = this.props;
        if (active) {
            return (
                <div className="custom-graph-tooltip-wrapper">
                    <ul>
                        <li><strong>Date : </strong> <span>{label}</span></li>
                        {payload[0].payload && payload[0].payload.metaData && payload[0].payload.metaData.name &&
                            <li><strong>{payload[0].payload.metaData.name} : </strong> <span>{`${payload[0].value} ${payload[0].payload.metaData.unit}`}</span></li>
                        }
                    </ul>
                </div>
            );
        }
        return null;
    }
}

export default CustomTooltip;