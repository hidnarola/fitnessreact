import React, { Component } from 'react';
import WidgetMuscleCardGraph from './WidgetMuscleCardGraph';

class WidgetMuscleCard extends Component {
    render() {
        const { muscle } = this.props;
        return (
            muscle && Object.keys(muscle).length > 0 &&
            Object.keys(muscle).map((k, i) => {
                let o = muscle[k];
                return (
                    <WidgetMuscleCardGraph key={i} cardKey={k} data={o} {...this.props} />
                );
            })
        );
    }
}

export default WidgetMuscleCard;