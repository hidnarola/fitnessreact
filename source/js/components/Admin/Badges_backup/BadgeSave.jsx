import React, { Component } from 'react';
import { connect } from 'react-redux';
import BadgeForm from './BadgeForm';

class BadgeSave extends Component {
    render() {
        return (
            <div className="badge-save-wrapper">
                <div className="body-head space-btm-45 d-flex justify-content-start">
                    <div className="body-head-l">
                        <h2>Badge</h2>
                    </div>
                </div>

                <div className="body-content row d-flex">
                    <div className="col-md-12">
                        <div className="white-box">
                            <div className="whitebox-head">
                                <h3 className="title-h3">Save Badge</h3>
                            </div>
                            <div className="row d-flex whitebox-body">
                                <div className="col-md-12">
                                    <BadgeForm onSubmit={this.handleSubmit} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    handleSubmit = (data) => {
        console.log(data);
        return;
        const { dispatch, match } = this.props;
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
            tips: JSON.stringify(_.map(data.tips, 'name')),
            images: data.images,
            deletedImages: data.deleted_images
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
        formData.append('tips', exerciseData.tips);
        if (exerciseData.images) {
            _.forEach(exerciseData.images, (file) => {
                formData.append('images', file);
            });
        }
        formData.append('delete_images', exerciseData.deletedImages);
        this.setState({
            saveActionInit: true
        });
        dispatch(showPageLoader());
        if (typeof match.params.id !== 'undefined') {
            dispatch(exerciseUpdateRequest(match.params.id, formData))
        } else {
            dispatch(exerciseAddRequest(formData))
        }
    }
}

const mapStateToProps = (state) => {
    return {

    };
}

export default connect(mapStateToProps)(BadgeSave);