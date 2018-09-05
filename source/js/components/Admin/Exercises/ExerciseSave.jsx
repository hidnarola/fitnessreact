import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExerciseForm from './ExerciseForm';
import _ from 'lodash';
import { showPageLoader, hidePageLoader } from '../../../actions/pageLoader';
import { exerciseAddRequest, exerciseUpdateRequest } from '../../../actions/admin/exercises';
import { adminRouteCodes } from '../../../constants/adminRoutes';
import { capitalizeFirstLetter } from '../../../helpers/funs';
import { Alert } from "react-bootstrap";

class ExerciseSave extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saveActionInit: false,
        }
    }

    render() {
        const { error } = this.props;
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
                            <div className="whitebox-body">
                                {error && error.length > 0 &&
                                    <Alert bsStyle="danger">
                                        {
                                            error.map((e, i) => {
                                                return <p key={i}>{e}</p>
                                            })
                                        }
                                    </Alert>
                                }
                                <ExerciseForm onSubmit={this.handleSubmit} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidUpdate() {
        const { loading, dispatch, history, error } = this.props;
        const { saveActionInit } = this.state;
        if (saveActionInit && !loading) {
            if (!error || error.length <= 0) {
                history.push(adminRouteCodes.EXERCISE);
            }
            this.setState({ saveActionInit: false });
            dispatch(hidePageLoader());
        }
    }

    handleSubmit = (data) => {
        const { dispatch, match } = this.props;
        let exerciseData = {
            category: (data.category && data.category.value) ? data.category.value : '',
            subCategory: (data.sub_category && data.sub_category.value) ? data.sub_category.value : '',
            name: (data.name && data.name.trim()) ? capitalizeFirstLetter(data.name).trim() : '',
            description: (data.description) ? data.description : '<p></p>',
            mainMuscleGroup: (data.main_muscle && data.main_muscle.value) ? data.main_muscle.value : '',
            otherMuscleGroup: (data.other_muscle && data.other_muscle.length > 0) ? JSON.stringify(_.map(data.other_muscle, 'value')) : '',
            detailedMuscleGroup: (data.detailed_muscle && data.detailed_muscle.length > 0) ? JSON.stringify(_.map(data.detailed_muscle, 'value')) : '',
            mechanics: (data.mechanics && data.mechanics.value) ? data.mechanics.value : '',
            equipments: (data.equipments && data.equipments.length > 0) ? JSON.stringify(_.map(data.equipments, 'value')) : '',
            difficltyLevel: (data.difficulty_level && data.difficulty_level.value) ? data.difficulty_level.value : '',
            steps: (data.steps && data.steps.length > 0) ? JSON.stringify(_.map(data.steps, 'name')) : '',
            tips: (data.tips && data.tips.length > 0) ? JSON.stringify(_.map(data.tips, 'name')) : '',
            images: (data.images && data.images.length > 0) ? data.images : '',
            status: (data.status && data.status.value) ? data.status.value : 0,
            deletedImages: (data.deleted_images && data.deleted_images.length > 0) ? data.deleted_images : '',
        }

        var formData = new FormData();
        formData.append('category', exerciseData.category);
        formData.append('subCategory', exerciseData.subCategory);
        formData.append('name', exerciseData.name);
        formData.append('description', exerciseData.description);
        formData.append('mainMuscleGroup', exerciseData.mainMuscleGroup);
        formData.append('otherMuscleGroup', exerciseData.otherMuscleGroup);
        formData.append('detailedMuscleGroup', exerciseData.detailedMuscleGroup);
        formData.append('mechanics', exerciseData.mechanics);
        formData.append('equipments', exerciseData.equipments);
        formData.append('difficltyLevel', exerciseData.difficltyLevel);
        formData.append('steps', exerciseData.steps);
        formData.append('tips', exerciseData.tips);
        formData.append('status', exerciseData.status);
        if (exerciseData.images) {
            _.forEach(exerciseData.images, (file) => {
                formData.append('images', file);
            });
        }
        formData.append('delete_images', exerciseData.deletedImages);
        this.setState({ saveActionInit: true });
        dispatch(showPageLoader());
        if (typeof match.params.id !== 'undefined') {
            dispatch(exerciseUpdateRequest(match.params.id, formData))
        } else {
            dispatch(exerciseAddRequest(formData))
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