import React, { Component } from 'react';
import { connect } from 'react-redux';

class Fitness extends Component {
    render() {
        const { strength, flexibility, posture } = this.props;
        return (
            <div className="body-content d-flex row justify-content-start profilephoto-content">
                <div className="col-md-4">
                    <div className="white-box space-btm-20">
                        <div className="whitebox-head">
                            <h3 className="title-h3">Category</h3>
                        </div>
                        <div className="whitebox-body">
                            <div className="fitness-wrap">
                                <h4>Sub Category</h4>
                                <div className="fitness-test-box dropdown">
                                    <div className="fitness-test" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                        <a href="">
                                            <i className="icon-play_arrow"></i>
                                        </a>
                                        <h5>Item Title</h5>
                                        <span>
                                            <img src="" alt="" />
                                        </span>
                                    </div>
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
    const { exerciseFitness } = state;
    return {
    }
}

export default connect(mapStateToProps)(Fitness);