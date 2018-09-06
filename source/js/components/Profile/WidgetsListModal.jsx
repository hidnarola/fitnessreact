import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import {
    TIMELINE_WIDGET_MUSCLE,
    TIMELINE_WIDGET_PROGRESS_PHOTO,
    TIMELINE_WIDGET_BADGES,
    TIMELINE_WIDGET_BODY_FAT
} from '../../constants/consts';
import { Field, reduxForm } from "redux-form";
import BadgeIcon from "svg/badge-icon.svg";
import MuscleIcon from "svg/muscles.svg";

class WidgetsListModal extends Component {
    render() {
        const { show, handleSubmit, handleClose } = this.props;
        return (
            <Modal show={show} className="widget-popup timeline-widgets-wrapper widgets-wrapper">
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
                                    name={`timeline_${TIMELINE_WIDGET_MUSCLE}`}
                                    id={`timeline_${TIMELINE_WIDGET_MUSCLE}`}
                                />
                                <label htmlFor={`timeline_${TIMELINE_WIDGET_MUSCLE}`}><div className="choosewidget-box">
                                    <MuscleIcon />
                                    <big>Muscle</big>
                                </div></label>
                            </li>
                            <li className="custom_check">
                                <Field
                                    type="checkbox"
                                    component="input"
                                    name={`timeline_${TIMELINE_WIDGET_PROGRESS_PHOTO}`}
                                    id={`timeline_${TIMELINE_WIDGET_PROGRESS_PHOTO}`}
                                />
                                <label htmlFor={`timeline_${TIMELINE_WIDGET_PROGRESS_PHOTO}`}><div className="choosewidget-box">
                                    <i className="icon-filter"></i>
                                    <big>Progress Photo</big>
                                </div></label>
                            </li>
                            <li className="custom_check">
                                <Field
                                    type="checkbox"
                                    component="input"
                                    name={`timeline_${TIMELINE_WIDGET_BADGES}`}
                                    id={`timeline_${TIMELINE_WIDGET_BADGES}`}
                                />
                                <label htmlFor={`timeline_${TIMELINE_WIDGET_BADGES}`}> <div className="choosewidget-box">
                                    <BadgeIcon />
                                    <big>Badges</big>
                                </div></label>
                            </li>
                            <li className="custom_check">
                                <Field
                                    type="checkbox"
                                    component="input"
                                    name={`timeline_${TIMELINE_WIDGET_BODY_FAT}`}
                                    id={`timeline_${TIMELINE_WIDGET_BODY_FAT}`}
                                />
                                <label htmlFor={`timeline_${TIMELINE_WIDGET_BODY_FAT}`}> <div className="choosewidget-box">
                                    <i className="icon-accessibility"></i>
                                    <big>Body Fat</big>
                                </div></label>
                            </li>
                        </ul>
                    </div>
                    <button type="submit" className="">
                        <i className="icon-save"></i>
                        <span>Save</span>
                    </button>
                </form>
            </Modal>
        );
    }
}

WidgetsListModal = reduxForm({
    form: 'timeline_widgets_list_form',
})(WidgetsListModal);

const mapStateToProps = (state) => {
    return {

    };
}

export default connect(
    mapStateToProps,
)(WidgetsListModal);