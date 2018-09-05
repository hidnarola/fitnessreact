import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import Muscles from "svg/muscles.svg";
import Pressure from "svg/pressure-dumbbell.svg";
import Resistance from "svg/resistance-band.svg";

class WidgetsListModal extends Component {
    render() {
        const { show } = this.props;
        return (
            <Modal show={show} className="widget-popup timeline-widgets-wrapper">
                <button type="button" className="close-round" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h3 className="title-h3">Add A Widget</h3>
                <div className="choose-widget">
                    <ul>
                        <li>
                            <div className="choosewidget-box">
                                <i className="icon-fitness_center"></i>
                                <big>Today's Workout</big>
                            </div>
                            <input type="checkbox" name="badges" id="badges" />
                            <label htmlFor="badges"></label>
                        </li>
                        <li>
                            <div className="choosewidget-box">
                                <i className="icon-view_quilt"></i>
                                <big>Activity Feed</big>
                            </div>
                            <input type="checkbox" name="badges" id="badges" />
                            <label htmlFor="badges"></label>
                        </li>
                        <li>
                            <div className="choosewidget-box">
                                <i className="icon-security"></i>
                                <big>Badges</big>
                            </div>
                            <input type="checkbox" name="badges" id="badges" />
                            <label htmlFor="badges"></label>
                        </li>
                        <li>
                            <div className="choosewidget-box">
                                <i className="icon-accessibility"></i>
                                <big>Body Fat</big>
                            </div>
                            <input type="checkbox" name="badges" id="badges" />
                            <label htmlFor="badges"></label>
                        </li>
                        <li>
                            <div className="choosewidget-box">
                                <i className="icon-all_inclusive"></i>
                                <big>Mobility</big>
                            </div>
                            <input type="checkbox" name="badges" id="badges" />
                            <label htmlFor="badges"></label>
                        </li>
                        <li>
                            <div className="choosewidget-box">
                                <Muscles />
                                <big>Muscle</big>
                            </div>
                            <input type="checkbox" name="badges" id="badges" />
                            <label htmlFor="badges"></label>
                        </li>
                        <li>
                            <div className="choosewidget-box">
                                <Pressure />
                                <big>Strength</big>
                            </div>
                            <input type="checkbox" name="badges" id="badges" />
                            <label htmlFor="badges"></label>
                        </li>
                        <li>
                            <div className="choosewidget-box">
                                <Resistance />
                                <big>Endurance</big>
                            </div>
                            <input type="checkbox" name="badges" id="badges" />
                            <label htmlFor="badges"></label>
                        </li>
                    </ul>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
}

export default connect(
    mapStateToProps,
)(WidgetsListModal);