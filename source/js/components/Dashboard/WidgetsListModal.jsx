import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import {
    DASHBOARD_WIDGET_TODAYS_WORKOUT,
    DASHBOARD_WIDGET_ACTIVITY_FEED,
    DASHBOARD_WIDGET_BADGES,
    DASHBOARD_WIDGET_BODY_FAT,
} from '../../constants/consts';
import { Field, reduxForm } from "redux-form";
import BadgeIcon from "svg/badge-icon.svg";

class WidgetsListModal extends Component {
    render() {
        const { show, handleSubmit, handleClose, saveWidgetsLoading } = this.props;
        return (
            <Modal show={show} className="widget-popup dashboard-widgets-wrapper">
                <form method="POST" onSubmit={handleSubmit}>
                    <button type="button" onClick={handleClose} className="close-round" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h3 className="title-h3">Add A Widget</h3>
                    <div className="choose-widget">
                        <ul>
                            <li className="custom_check">
                                
                                <Field
                                    type="checkbox"
                                    component="input"
                                    name={`dashboard_${DASHBOARD_WIDGET_TODAYS_WORKOUT}`}
                                    id={`dashboard_${DASHBOARD_WIDGET_TODAYS_WORKOUT}`}
                                />
                                <label htmlFor={`dashboard_${DASHBOARD_WIDGET_TODAYS_WORKOUT}`}><div className="choosewidget-box">
                                    <i className="icon-fitness_center"></i>
                                    <big>Today's Workout</big>
                                </div></label>
                            </li>
                            <li className="custom_check">
                                
                                <Field
                                    type="checkbox"
                                    component="input"
                                    name={`dashboard_${DASHBOARD_WIDGET_ACTIVITY_FEED}`}
                                    id={`dashboard_${DASHBOARD_WIDGET_ACTIVITY_FEED}`}
                                />
                                <label htmlFor={`dashboard_${DASHBOARD_WIDGET_ACTIVITY_FEED}`}><div className="choosewidget-box">
                                    <i className="icon-view_quilt"></i>
                                    <big>Activity Feed</big>
                                </div></label>
                            </li>
                            <li className="custom_check">
                               
                                <Field
                                    type="checkbox"
                                    component="input"
                                    name={`dashboard_${DASHBOARD_WIDGET_BADGES}`}
                                    id={`dashboard_${DASHBOARD_WIDGET_BADGES}`}
                                />
                                <label htmlFor={`dashboard_${DASHBOARD_WIDGET_BADGES}`}> <div className="choosewidget-box">
                                    <BadgeIcon />
                                    <big>Badges</big>
                                </div></label>
                            </li>
                            <li className="custom_check">
                               
                                <Field
                                    type="checkbox"
                                    component="input"
                                    name={`dashboard_${DASHBOARD_WIDGET_BODY_FAT}`}
                                    id={`dashboard_${DASHBOARD_WIDGET_BODY_FAT}`}
                                />
                                <label htmlFor={`dashboard_${DASHBOARD_WIDGET_BODY_FAT}`}> <div className="choosewidget-box">
                                    <i className="icon-accessibility"></i>
                                    <big>Body Fat</big>
                                </div></label>
                            </li>
                        </ul>
                    </div>
                    <button type="submit" disabled={saveWidgetsLoading} className="">
                        <i className="icon-save"></i>
                        <span>Save</span>
                    </button>
                </form>
            </Modal>
        );
    }
}

WidgetsListModal = reduxForm({
    form: 'dashboard_widgets_list_form',
})(WidgetsListModal);

const mapStateToProps = (state) => {
    const { dashboard } = state;
    return {
        saveWidgetsLoading: dashboard.get('saveWidgetsLoading'),
    };
}

export default connect(
    mapStateToProps,
)(WidgetsListModal);