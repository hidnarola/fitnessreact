import React, { Component } from 'react';
import { connect } from 'react-redux';
import FitnessContentBox from './FitnessContentBox';
import { getExerciseFitnessData } from '../../actions/exercise/fitness';

class Fitness extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(getExerciseFitnessData());
    }

    render() {
        const { strength, flexibility, posture } = this.props;
        return (
            <div className="body-content d-flex row justify-content-start profilephoto-content">
                <div className="col-md-4">
                    <FitnessContentBox title="Strength" data={strength} />
                </div>

                <div className="col-md-4">
                    <FitnessContentBox title="Flexibility" data={flexibility} />
                </div>

                <div className="col-md-4">
                    <FitnessContentBox title="Posture" data={posture} />
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { exerciseFitness } = state;
    return {
        loading: exerciseFitness.get('loading'),
        error: exerciseFitness.get('error'),
        strength: exerciseFitness.get('strength'),
        flexibility: exerciseFitness.get('flexibility'),
        posture: exerciseFitness.get('posture'),
    }
}

export default connect(mapStateToProps)(Fitness);