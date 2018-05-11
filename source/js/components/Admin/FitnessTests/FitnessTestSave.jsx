import React, { Component } from 'react';
import { connect } from 'react-redux';
import FitnessTestForm from './FitnessTestForm';

class FitnessTestSave extends Component {
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
                                    <FitnessTestForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    };
}

export default connect(
    mapStateToProps,
)(FitnessTestSave);