import React, { Component } from 'react';
import { connect } from 'react-redux';
import FitnessTestForm from './FitnessTestForm';
import {
    FITNESS_TEST_FORMAT_MAX_REP,
    FITNESS_TEST_FORMAT_MULTISELECT,
    FITNESS_TEST_FORMAT_A_OR_B
} from '../../../constants/consts';
import _ from "lodash";
import { adminRouteCodes } from '../../../constants/adminRoutes';
import { ts, focusToControl } from '../../../helpers/funs';
import { fitnessTestsAddRequest, fitnessTestsUpdateRequest, fitnessTestsReinitialize } from '../../../actions/admin/fitness_tests';

class FitnessTestSave extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saveActionInit: false,
        }
    }

    render() {
        return (
            <div className="fitness-test-save-wrapper">
                <div className="body-head space-btm-45 d-flex justify-content-start">
                    <div className="body-head-l">
                        <h2>Fitness Test</h2>
                    </div>
                </div>

                <div className="body-content row d-flex">
                    <div className="col-md-12">
                        <div className="white-box">
                            <div className="whitebox-head">
                                <h3 className="title-h3">Save Fitness Test</h3>
                            </div>
                            <div className="row d-flex whitebox-body">
                                <div className="col-md-12">
                                    <FitnessTestForm onSubmit={this.handleSubmit} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidUpdate() {
        const {
            saveActionInit,
        } = this.state;
        const {
            loading,
            history,
            error,
        } = this.props;
        if (saveActionInit && !loading) {
            this.setState({ saveActionInit: false });
            if (error.length <= 0) {
                ts('Fitness test saved successfully!');
                history.push(adminRouteCodes.FITNESS_TESTS)
            } else {
                focusToControl('#validation_errors_wrapper');
            }
        }
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch(fitnessTestsReinitialize());
    }


    //#region 
    handleSubmit = (data) => {
        const { dispatch, match } = this.props;
        var format = (data.format && data.format.value) ? data.format.value.trim() : '';
        var requestObj = {
            name: (data.name) ? data.name.trim() : '',
            category: (data.category && data.category.value) ? data.category.value.trim() : '',
            subCategory: (data.subCategory && data.subCategory.value) ? data.subCategory.value.trim() : '',
            description: (data.description) ? data.description.trim() : '',
            instructions: (data.instructions) ? data.instructions.trim() : '',
            format: format,
            image: (data.image) ? data.image : null,
        }
        if (format === FITNESS_TEST_FORMAT_MAX_REP && data.max_rep) {
            var maxReps = [];
            _.forEach(data.max_rep, (obj, index) => {
                if (obj && obj.value) {
                    maxReps.push(obj.value);
                }
            });
            requestObj.max_rep = JSON.stringify(maxReps);
        } else if (format === FITNESS_TEST_FORMAT_MULTISELECT && data.multiselect) {
            var titles = [];
            var images = [];
            _.forEach(data.multiselect, (obj, index) => {
                if (obj && obj.title) {
                    titles.push(obj.title);
                    images.push((obj.image && obj.image[0]) ? obj.image[0] : null);
                }
            });
            requestObj.title = JSON.stringify(titles);
            requestObj.images = images;
            requestObj.deletedMultiselectIds = (data.deletedMultiselectIds) ? data.deletedMultiselectIds : '';
        } else if (format === FITNESS_TEST_FORMAT_A_OR_B && data.titleA && data.titleB) {
            var titles = [
                data.titleA,
                data.titleB,
            ];
            var images = [
                (data.imageA) ? data.imageA[0] : null,
                (data.imageB) ? data.imageB[0] : null,
            ];
            requestObj.title = JSON.stringify(titles);
            requestObj.images = images;
        }

        var formData = new FormData();
        formData.append('name', requestObj.name);
        formData.append('category', requestObj.category);
        formData.append('subCategory', requestObj.subCategory);
        formData.append('description', requestObj.description);
        formData.append('instructions', requestObj.instructions);
        formData.append('format', requestObj.format);
        if (requestObj.image) {
            formData.append('featureImage', requestObj.image[0]);
        }
        if (format === FITNESS_TEST_FORMAT_MAX_REP && requestObj.max_rep) {
            formData.append('max_rep', requestObj.max_rep);
        } else if (format === FITNESS_TEST_FORMAT_MULTISELECT && requestObj.title) {
            if (requestObj.images) {
                for (let index = 0; index < requestObj.images.length; index++) {
                    const element = requestObj.images[index];
                    formData.append('images', element);
                }
            }
            formData.append('title', requestObj.title);
            if (requestObj.deletedMultiselectIds) {
                formData.append('delete_multiselect_image_ids', requestObj.deletedMultiselectIds);
            }
        } else if (format === FITNESS_TEST_FORMAT_A_OR_B && requestObj.title) {
            var imgSelectedIndex = [];
            if (requestObj.images) {
                for (let index = 0; index < requestObj.images.length; index++) {
                    const element = requestObj.images[index];
                    if (element !== null) {
                        formData.append('images', element);
                        imgSelectedIndex.push(index);
                    }
                }
            }
            formData.append('title', requestObj.title);
            formData.append('a_b_updateImageIndex', JSON.stringify(imgSelectedIndex));
        }
        if (match.params.id) {
            dispatch(fitnessTestsUpdateRequest(match.params.id, formData));
        } else {
            dispatch(fitnessTestsAddRequest(formData));
        }
        this.setState({ saveActionInit: true });
    }
    //#endregion
}

const mapStateToProps = (state) => {
    const { adminFitnessTests } = state;
    return {
        loading: adminFitnessTests.get('loading'),
        error: adminFitnessTests.get('error'),
    };
}

export default connect(
    mapStateToProps,
)(FitnessTestSave);