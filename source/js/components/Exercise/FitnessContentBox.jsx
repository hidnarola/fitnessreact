import React, { Component } from 'react';
import FitnessContentBoxItem from './FitnessContentBoxItem';

class ExerciseFitnessContentBox extends Component {
    render() {
        const { title, data } = this.props;
        return (
            <div className="white-box space-btm-20">
                <div className="whitebox-head">
                    <h3 className="title-h3">{title}</h3>
                </div>
                <div className="whitebox-body">
                    {data &&
                        <FitnessContentBoxItem title="Upper Body" data={data.upperBody} />
                    }

                    {data &&
                        <FitnessContentBoxItem title="Lower Body" data={data.lowerBody} />
                    }
                </div>
            </div>
        );
    }
}

export default ExerciseFitnessContentBox;