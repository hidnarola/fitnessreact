import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExerciseForm from './ExerciseForm';
import _ from 'lodash';
import { showPageLoader, hidePageLoader } from '../../../actions/pageLoader';
import { exerciseAddRequest } from '../../../actions/admin/exercises';
import { adminRouteCodes } from '../../../constants/adminRoutes';

class ExerciseSave extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saveActionInit: false
        }
    }

    handleSubmit = (data) => {
        const { dispatch } = this.props;
        let exerciseData = {
            name: data.name,
            description: data.description,
            mainMuscleGroup: _.get(data.main_muscle, 'value'),
            otherMuscleGroup: JSON.stringify(_.map(data.other_muscle, 'value')),
            detailedMuscleGroup: JSON.stringify(_.map(data.detailed_muscle, 'value')),
            type: _.get(data.type, 'value'),
            mechanics: _.get(data.mechanics, 'value'),
            equipments: JSON.stringify(_.map(data.equipments, 'value')),
            difficltyLevel: _.get(data.difficulty_level, 'value'),
            steps: JSON.stringify(_.map(data.steps, 'name')),
            images: data.images,
        }
        
        var formData = new FormData();
        formData.append('name', exerciseData.name);
        formData.append('description', exerciseData.description);
        formData.append('mainMuscleGroup', exerciseData.mainMuscleGroup);
        formData.append('otherMuscleGroup', exerciseData.otherMuscleGroup);
        formData.append('detailedMuscleGroup', exerciseData.detailedMuscleGroup);
        formData.append('type', exerciseData.type);
        formData.append('mechanics', exerciseData.mechanics);
        formData.append('equipments', exerciseData.equipments);
        formData.append('difficltyLevel', exerciseData.difficltyLevel);
        formData.append('steps', exerciseData.steps);
        if (exerciseData.images) {
            formData.append('images', exerciseData.images);
        }
        this.setState({
            saveActionInit: true
        });
        dispatch(showPageLoader());
        dispatch(exerciseAddRequest(formData))
    }
    render() {
        return (
            <div className="exercise-save-wrapper">
                <div className="body-head space-btm-45 d-flex justify-content-start">
                    <div className="body-head-l">
                        <h2>Exercise</h2>
                    </div>
                </div>

                <div className="body-content row d-flex">
                    <div className="col-md-12">
                        <div className="white-box">
                            <div className="whitebox-head">
                                <h3 className="title-h3">Save Exercise</h3>
                            </div>
                            <div className="row d-flex whitebox-body">
                                <div className="col-md-12">
                                    <ExerciseForm onSubmit={this.handleSubmit} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidUpdate() {
        const { loading, dispatch, history } = this.props;
        const { saveActionInit } = this.state;
        if (saveActionInit && !loading) {
            this.setState({
                saveActionInit: false
            });
            dispatch(hidePageLoader());
            history.push(adminRouteCodes.EXERCISE);
        }
    }
}

const mapStateToProps = (state) => {
    const { adminExercises } = state;
    return {
        loading: adminExercises.get('loading'),
        error: adminExercises.get('error'),
    }
}

export default connect(mapStateToProps)(ExerciseSave);