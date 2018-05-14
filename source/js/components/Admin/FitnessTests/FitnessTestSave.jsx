import React, { Component } from 'react';
import { connect } from 'react-redux';
import FitnessTestForm from './FitnessTestForm';
import {
    FITNESS_TEST_FORMAT_MAX_REP,
    FITNESS_TEST_FORMAT_MULTISELECT,
    FITNESS_TEST_FORMAT_A_OR_B
} from '../../../constants/consts';
import _ from "lodash";
import { fitnessTestsAddRequest } from '../../../actions/admin/fitnessTests';
import { adminRouteCodes } from '../../../constants/adminRoutes';
import { ts } from '../../../helpers/funs';

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
        const { saveActionInit } = this.state;
        const { loading, history } = this.props;
        if (saveActionInit && !loading) {
            this.setState({ saveActionInit: false });
            ts('Fitness test saved successfully!');
            history.push(adminRouteCodes.FITNESS_TESTS)
        }
    }

    //#region 
    handleSubmit = (data) => {
        const { dispatch } = this.props;
        var format = data.format.value;
        var requestObj = {
            name: data.name,
            category: data.category.value,
            subCategory: data.subCategory.value,
            description: (data.description) ? data.description : '',
            instructions: (data.instructions) ? data.instructions : '',
            format: format,
            image: (data.image) ? data.image : null,
        }
        if (format === FITNESS_TEST_FORMAT_MAX_REP) {
            var maxReps = [];
            _.forEach(data.max_rep, (obj, index) => {
                maxReps.push(obj.value);
            });
            requestObj.max_rep = JSON.stringify(maxReps);
        } else if (format === FITNESS_TEST_FORMAT_MULTISELECT) {
            var titles = [];
            var images = [];
            _.forEach(data.multiselect, (obj, index) => {
                titles.push(obj.title);
                images.push((obj.image[0]) ? obj.image[0] : null);
            });
            requestObj.title = JSON.stringify(titles);
            requestObj.images = images;
        } else if (format === FITNESS_TEST_FORMAT_A_OR_B) {
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
            formData.append('image', requestObj.image[0]);
        }
        if (format === FITNESS_TEST_FORMAT_MAX_REP) {
            formData.append('max_rep', requestObj.max_rep);
        } else if (format === FITNESS_TEST_FORMAT_MULTISELECT || format === FITNESS_TEST_FORMAT_A_OR_B) {
            formData.append('title', requestObj.title);
            for (let index = 0; index < requestObj.images.length; index++) {
                const element = requestObj.images[index];
                if (element) {
                    formData.append('images', element);
                }
            }
        }
        this.setState({ saveActionInit: true });
        dispatch(fitnessTestsAddRequest(formData));
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