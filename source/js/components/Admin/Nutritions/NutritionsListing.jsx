import React, { Component } from 'react';
import { connect } from 'react-redux';
import NutritionsSaveForm from './NutritionsSaveForm';
import { nutritionAddRequest } from '../../../actions/admin/nutritions';
import { showPageLoader, hidePageLoader } from '../../../actions/pageLoader';

const initialState = {
    id: null,
    name: null,
    description: null,
}

class NutritionsListing extends Component {
    constructor(props) {
        super(props);
        let initialObj = Object.assign({}, initialState);
        this.state = {
            showModal: false,
            nutritionData: initialObj
        }
    }

    handleShowModal = (doShow) => {
        this.setState({
            showModal: doShow
        });
    }

    handleSubmit = (data) => {
        const { dispatch } = this.props;
        dispatch(showPageLoader());
        dispatch(nutritionAddRequest(data));
        // call api
        // redirect if success
    }

    componentDidUpdate() {
        const { loading, dispatch } = this.props;
        if (loading) {
            dispatch(hidePageLoader());
        }
    }

    render() {
        const { showModal, nutritionData } = this.state;
        return (
            <div className="nutritions-listing-wrapper">
                <div className="body-head space-btm-45 d-flex justify-content-start">
                    <div className="body-head-l">
                        <h2>Nutritions</h2>
                    </div>
                    <div className="body-head-r">
                        <a href="javascript:void(0)" className="pink-btn" onClick={() => this.handleShowModal(true)}>Add Nutrition</a>
                    </div>
                </div>

                <div className="body-content row d-flex">
                    <div className="col-md-12">
                        <div className="white-box">
                            <div className="whitebox-head">
                                <h3 className="title-h3">Nutritions List</h3>
                            </div>
                            <div className="row d-flex whitebox-body">
                                <div className="col-md-12">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <NutritionsSaveForm
                    showModal={showModal}
                    handleShowModal={this.handleShowModal}
                    onSubmit={this.handleSubmit}
                    nutritionData={nutritionData}
                />

            </div>
        );
    }
}

export default connect()(NutritionsListing);