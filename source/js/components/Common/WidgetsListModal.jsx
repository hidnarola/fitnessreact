import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import {
    WIDGET_TODAYS_WORKOUT,
    WIDGET_ACTIVITY_FEED,
    WIDGET_BADGES,
    WIDGET_BODY_FAT,
    WIDGET_MUSCLE,
    WIDGET_PROGRESS_PHOTO,
    WIDGETS_TYPE_DASHBOARD,
} from '../../constants/consts';
import { Field, reduxForm } from "redux-form";
import BadgeIcon from "svg/badge-icon.svg";
import MuscleIcon from "svg/muscles.svg";
import cns from "classnames";

class WidgetsListModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalTitle: 'Add A Widget',
        };
    }

    render() {
        const { show, handleSubmit, saveLoading, type } = this.props;
        const { modalTitle } = this.state;
        return (
            <Modal show={show} className={cns('widget-popup dashboard-widgets-wrapper widgets-wrapper')}>
                <form method="POST" onSubmit={handleSubmit}>
                    <button type="button" onClick={this.handleModaClose} className="close-round" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h3 className="title-h3">{modalTitle}</h3>
                    <div className="choose-widget">
                        <ul>
                            {type && type === WIDGETS_TYPE_DASHBOARD &&
                                <li className="custom_check">
                                    <Field
                                        type="checkbox"
                                        component="input"
                                        name={`widget_list_${WIDGET_TODAYS_WORKOUT}`}
                                        id={`widget_list_${WIDGET_TODAYS_WORKOUT}`}
                                    />
                                    <label htmlFor={`widget_list_${WIDGET_TODAYS_WORKOUT}`}><div className="choosewidget-box">
                                        <i className="icon-fitness_center"></i>
                                        <big>Today's Workout</big>
                                    </div></label>
                                </li>
                            }
                            {type && type === WIDGETS_TYPE_DASHBOARD &&
                                <li className="custom_check">
                                    <Field
                                        type="checkbox"
                                        component="input"
                                        name={`widget_list_${WIDGET_ACTIVITY_FEED}`}
                                        id={`widget_list_${WIDGET_ACTIVITY_FEED}`}
                                    />
                                    <label htmlFor={`widget_list_${WIDGET_ACTIVITY_FEED}`}><div className="choosewidget-box">
                                        <i className="icon-view_quilt"></i>
                                        <big>Activity Feed</big>
                                    </div></label>
                                </li>
                            }
                            <li className="custom_check">
                                <Field
                                    type="checkbox"
                                    component="input"
                                    name={`widget_list_${WIDGET_MUSCLE}`}
                                    id={`widget_list_${WIDGET_MUSCLE}`}
                                />
                                <label htmlFor={`widget_list_${WIDGET_MUSCLE}`}><div className="choosewidget-box">
                                    <MuscleIcon />
                                    <big>Muscle</big>
                                </div></label>
                            </li>
                            <li className="custom_check">
                                <Field
                                    type="checkbox"
                                    component="input"
                                    name={`widget_list_${WIDGET_PROGRESS_PHOTO}`}
                                    id={`widget_list_${WIDGET_PROGRESS_PHOTO}`}
                                />
                                <label htmlFor={`widget_list_${WIDGET_PROGRESS_PHOTO}`}><div className="choosewidget-box">
                                    <i className="icon-filter"></i>
                                    <big>Progress Photo</big>
                                </div></label>
                            </li>
                            <li className="custom_check">
                                <Field
                                    type="checkbox"
                                    component="input"
                                    name={`widget_list_${WIDGET_BADGES}`}
                                    id={`widget_list_${WIDGET_BADGES}`}
                                />
                                <label htmlFor={`widget_list_${WIDGET_BADGES}`}> <div className="choosewidget-box">
                                    <BadgeIcon />
                                    <big>Badges</big>
                                </div></label>
                            </li>
                            <li className="custom_check">
                                <Field
                                    type="checkbox"
                                    component="input"
                                    name={`widget_list_${WIDGET_BODY_FAT}`}
                                    id={`widget_list_${WIDGET_BODY_FAT}`}
                                />
                                <label htmlFor={`widget_list_${WIDGET_BODY_FAT}`}> <div className="choosewidget-box">
                                    <i className="icon-accessibility"></i>
                                    <big>Body Fat</big>
                                </div></label>
                            </li>
                        </ul>
                    </div>

                    <button type="submit" disabled={saveLoading} className="btm-btn">
                        <i className="icon-save"></i>
                        <span>Save</span>
                    </button>
                </form>
            </Modal>
        );
    }

    handleModaClose = () => {
        const { handleClose } = this.props;
        handleClose();
    }
}

WidgetsListModal = reduxForm({
    form: 'widgets_list_form',
})(WidgetsListModal);

export default WidgetsListModal;