import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import Muscles from "svg/muscles.svg";
import Pressure from "svg/pressure-dumbbell.svg";
import Resistance from "svg/resistance-band.svg";
import { DASHBOARD_WIDGET_TODAYS_WORKOUT, DASHBOARD_WIDGET_ACTIVITY_FEED, DASHBOARD_WIDGET_BADGES, DASHBOARD_WIDGET_BODY_FAT, DASHBOARD_WIDGET_MOBILITY, DASHBOARD_WIDGET_MUSCLE, DASHBOARD_WIDGET_STRENGTH, DASHBOARD_WIDGET_ENDURANCE } from '../../constants/consts';

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
                            <input type="checkbox" name={`dashboard_${DASHBOARD_WIDGET_TODAYS_WORKOUT}`} id={`dashboard_${DASHBOARD_WIDGET_TODAYS_WORKOUT}`} />
                            <label htmlFor={`dashboard_${DASHBOARD_WIDGET_TODAYS_WORKOUT}`}></label>
                        </li>
                        <li>
                            <div className="choosewidget-box">
                                <i className="icon-view_quilt"></i>
                                <big>Activity Feed</big>
                            </div>
                            <input type="checkbox" name={`dashboard_${DASHBOARD_WIDGET_ACTIVITY_FEED}`} id={`dashboard_${DASHBOARD_WIDGET_ACTIVITY_FEED}`} />
                            <label htmlFor={`dashboard_${DASHBOARD_WIDGET_ACTIVITY_FEED}`}></label>
                        </li>
                        <li>
                            <div className="choosewidget-box">
                                <i className="icon-security"></i>
                                <big>Badges</big>
                            </div>
                            <input type="checkbox" name={`dashboard_${DASHBOARD_WIDGET_BADGES}`} id={`dashboard_${DASHBOARD_WIDGET_BADGES}`} />
                            <label htmlFor={`dashboard_${DASHBOARD_WIDGET_BADGES}`}></label>
                        </li>
                        <li>
                            <div className="choosewidget-box">
                                <i className="icon-accessibility"></i>
                                <big>Body Fat</big>
                            </div>
                            <input type="checkbox" name={`dashboard_${DASHBOARD_WIDGET_BODY_FAT}`} id={`dashboard_${DASHBOARD_WIDGET_BODY_FAT}`} />
                            <label htmlFor={`dashboard_${DASHBOARD_WIDGET_BODY_FAT}`}></label>
                        </li>
                        <li>
                            <div className="choosewidget-box">
                                <i className="icon-all_inclusive"></i>
                                <big>Mobility</big>
                            </div>
                            <input type="checkbox" name={`dashboard_${DASHBOARD_WIDGET_MOBILITY}`} id={`dashboard_${DASHBOARD_WIDGET_MOBILITY}`} />
                            <label htmlFor={`dashboard_${DASHBOARD_WIDGET_MOBILITY}`}></label>
                        </li>
                        <li>
                            <div className="choosewidget-box">
                                <Muscles />
                                <big>Muscle</big>
                            </div>
                            <input type="checkbox" name={`dashboard_${DASHBOARD_WIDGET_MUSCLE}`} id={`dashboard_${DASHBOARD_WIDGET_MUSCLE}`} />
                            <label htmlFor={`dashboard_${DASHBOARD_WIDGET_MUSCLE}`}></label>
                        </li>
                        <li>
                            <div className="choosewidget-box">
                                <Pressure />
                                <big>Strength</big>
                            </div>
                            <input type="checkbox" name={`dashboard_${DASHBOARD_WIDGET_STRENGTH}`} id={`dashboard_${DASHBOARD_WIDGET_STRENGTH}`} />
                            <label htmlFor={`dashboard_${DASHBOARD_WIDGET_STRENGTH}`}></label>
                        </li>
                        <li>
                            <div className="choosewidget-box">
                                <Resistance />
                                <big>Endurance</big>
                            </div>
                            <input type="checkbox" name={`dashboard_${DASHBOARD_WIDGET_ENDURANCE}`} id={`dashboard_${DASHBOARD_WIDGET_ENDURANCE}`} />
                            <label htmlFor={`dashboard_${DASHBOARD_WIDGET_ENDURANCE}`}></label>
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