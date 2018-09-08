import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import {
    TIMELINE_WIDGET_MUSCLE,
    TIMELINE_WIDGET_PROGRESS_PHOTO,
    TIMELINE_WIDGET_BADGES,
    TIMELINE_WIDGET_BODY_FAT,
    TIMELINE_MUSCLE_WIDGET_NECK,
    TIMELINE_MUSCLE_WIDGET_SHOULDER,
    TIMELINE_MUSCLE_WIDGET_CHEST,
    TIMELINE_MUSCLE_WIDGET_UPPER_ARM,
    TIMELINE_MUSCLE_WIDGET_WAIST,
    TIMELINE_MUSCLE_WIDGET_FOREARM,
    TIMELINE_MUSCLE_WIDGET_HIPS,
    TIMELINE_MUSCLE_WIDGET_THIGH,
    TIMELINE_MUSCLE_WIDGET_CALF,
    TIMELINE_MUSCLE_WIDGET_HEART_RATE,
    TIMELINE_MUSCLE_WIDGET_WEIGHT,
    TIMELINE_MUSCLE_WIDGET_HEIGHT
} from '../../constants/consts';
import { Field, reduxForm, formValueSelector } from "redux-form";
import BadgeIcon from "svg/badge-icon.svg";
import MuscleIcon from "svg/muscles.svg";

class WidgetsListModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMuscleSubMenu: false,
        };
    }

    render() {
        const { show, handleSubmit, saveWidgetsLoading } = this.props;
        const { showMuscleSubMenu } = this.state;
        return (
            <Modal show={show} className="widget-popup timeline-widgets-wrapper widgets-wrapper">
                <form method="POST" onSubmit={handleSubmit}>
                    <button type="button" onClick={this.handleModaClose} className="close-round" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h3 className="title-h3">Add A Widget</h3>
                    {!showMuscleSubMenu &&
                        <div className="choose-widget">
                            <ul>
                                <li className="custom_check">
                                    <Field
                                        type="checkbox"
                                        component="input"
                                        name={`timeline_${TIMELINE_WIDGET_MUSCLE}`}
                                        id={`timeline_${TIMELINE_WIDGET_MUSCLE}`}
                                        onChange={this.handleShowMuscleSubMenu}
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
                    }
                    {!showMuscleSubMenu &&
                        <button type="submit" disabled={saveWidgetsLoading} className="">
                            <i className="icon-save"></i>
                            <span>Save</span>
                        </button>
                    }

                    {showMuscleSubMenu &&
                        <div className="choose-widget sub-choose-widget">
                            <ul>
                                <li className="custom_check">
                                    <Field
                                        type="checkbox"
                                        component="input"
                                        name={`muscle_${TIMELINE_MUSCLE_WIDGET_NECK}`}
                                        id={`muscle_${TIMELINE_MUSCLE_WIDGET_NECK}`}
                                        onChange={this.handleShowMuscleSubMenu}
                                    />
                                    <label htmlFor={`muscle_${TIMELINE_MUSCLE_WIDGET_NECK}`}><div className="choosewidget-box">
                                        <MuscleIcon />
                                        <big>Neck</big>
                                    </div></label>
                                </li>
                                <li className="custom_check">
                                    <Field
                                        type="checkbox"
                                        component="input"
                                        name={`muscle_${TIMELINE_MUSCLE_WIDGET_SHOULDER}`}
                                        id={`muscle_${TIMELINE_MUSCLE_WIDGET_SHOULDER}`}
                                    />
                                    <label htmlFor={`muscle_${TIMELINE_MUSCLE_WIDGET_SHOULDER}`}><div className="choosewidget-box">
                                        <i className="icon-filter"></i>
                                        <big>Shoulders</big>
                                    </div></label>
                                </li>
                                <li className="custom_check">
                                    <Field
                                        type="checkbox"
                                        component="input"
                                        name={`muscle_${TIMELINE_MUSCLE_WIDGET_CHEST}`}
                                        id={`muscle_${TIMELINE_MUSCLE_WIDGET_CHEST}`}
                                    />
                                    <label htmlFor={`muscle_${TIMELINE_MUSCLE_WIDGET_CHEST}`}> <div className="choosewidget-box">
                                        <BadgeIcon />
                                        <big>Chest</big>
                                    </div></label>
                                </li>
                                <li className="custom_check">
                                    <Field
                                        type="checkbox"
                                        component="input"
                                        name={`muscle_${TIMELINE_MUSCLE_WIDGET_UPPER_ARM}`}
                                        id={`muscle_${TIMELINE_MUSCLE_WIDGET_UPPER_ARM}`}
                                    />
                                    <label htmlFor={`muscle_${TIMELINE_MUSCLE_WIDGET_UPPER_ARM}`}> <div className="choosewidget-box">
                                        <i className="icon-accessibility"></i>
                                        <big>Upper Arm</big>
                                    </div></label>
                                </li>
                                <li className="custom_check">
                                    <Field
                                        type="checkbox"
                                        component="input"
                                        name={`muscle_${TIMELINE_MUSCLE_WIDGET_WAIST}`}
                                        id={`muscle_${TIMELINE_MUSCLE_WIDGET_WAIST}`}
                                        onChange={this.handleShowMuscleSubMenu}
                                    />
                                    <label htmlFor={`muscle_${TIMELINE_MUSCLE_WIDGET_WAIST}`}><div className="choosewidget-box">
                                        <MuscleIcon />
                                        <big>Waist</big>
                                    </div></label>
                                </li>
                                <li className="custom_check">
                                    <Field
                                        type="checkbox"
                                        component="input"
                                        name={`muscle_${TIMELINE_MUSCLE_WIDGET_FOREARM}`}
                                        id={`muscle_${TIMELINE_MUSCLE_WIDGET_FOREARM}`}
                                    />
                                    <label htmlFor={`muscle_${TIMELINE_MUSCLE_WIDGET_FOREARM}`}><div className="choosewidget-box">
                                        <i className="icon-filter"></i>
                                        <big>Forearm</big>
                                    </div></label>
                                </li>
                                <li className="custom_check">
                                    <Field
                                        type="checkbox"
                                        component="input"
                                        name={`muscle_${TIMELINE_MUSCLE_WIDGET_HIPS}`}
                                        id={`muscle_${TIMELINE_MUSCLE_WIDGET_HIPS}`}
                                    />
                                    <label htmlFor={`muscle_${TIMELINE_MUSCLE_WIDGET_HIPS}`}> <div className="choosewidget-box">
                                        <BadgeIcon />
                                        <big>Hips</big>
                                    </div></label>
                                </li>
                                <li className="custom_check">
                                    <Field
                                        type="checkbox"
                                        component="input"
                                        name={`muscle_${TIMELINE_MUSCLE_WIDGET_THIGH}`}
                                        id={`muscle_${TIMELINE_MUSCLE_WIDGET_THIGH}`}
                                    />
                                    <label htmlFor={`muscle_${TIMELINE_MUSCLE_WIDGET_THIGH}`}> <div className="choosewidget-box">
                                        <i className="icon-accessibility"></i>
                                        <big>Thigh</big>
                                    </div></label>
                                </li>
                                <li className="custom_check">
                                    <Field
                                        type="checkbox"
                                        component="input"
                                        name={`muscle_${TIMELINE_MUSCLE_WIDGET_CALF}`}
                                        id={`muscle_${TIMELINE_MUSCLE_WIDGET_CALF}`}
                                        onChange={this.handleShowMuscleSubMenu}
                                    />
                                    <label htmlFor={`muscle_${TIMELINE_MUSCLE_WIDGET_CALF}`}><div className="choosewidget-box">
                                        <MuscleIcon />
                                        <big>Calf</big>
                                    </div></label>
                                </li>
                                <li className="custom_check">
                                    <Field
                                        type="checkbox"
                                        component="input"
                                        name={`muscle_${TIMELINE_MUSCLE_WIDGET_HEART_RATE}`}
                                        id={`muscle_${TIMELINE_MUSCLE_WIDGET_HEART_RATE}`}
                                    />
                                    <label htmlFor={`muscle_${TIMELINE_MUSCLE_WIDGET_HEART_RATE}`}><div className="choosewidget-box">
                                        <i className="icon-filter"></i>
                                        <big>Heart Rate</big>
                                    </div></label>
                                </li>
                                <li className="custom_check">
                                    <Field
                                        type="checkbox"
                                        component="input"
                                        name={`muscle_${TIMELINE_MUSCLE_WIDGET_WEIGHT}`}
                                        id={`muscle_${TIMELINE_MUSCLE_WIDGET_WEIGHT}`}
                                    />
                                    <label htmlFor={`muscle_${TIMELINE_MUSCLE_WIDGET_WEIGHT}`}> <div className="choosewidget-box">
                                        <BadgeIcon />
                                        <big>Weight</big>
                                    </div></label>
                                </li>
                                <li className="custom_check">
                                    <Field
                                        type="checkbox"
                                        component="input"
                                        name={`muscle_${TIMELINE_MUSCLE_WIDGET_HEIGHT}`}
                                        id={`muscle_${TIMELINE_MUSCLE_WIDGET_HEIGHT}`}
                                    />
                                    <label htmlFor={`muscle_${TIMELINE_MUSCLE_WIDGET_HEIGHT}`}> <div className="choosewidget-box">
                                        <i className="icon-accessibility"></i>
                                        <big>Height</big>
                                    </div></label>
                                </li>
                            </ul>
                        </div>
                    }

                    {showMuscleSubMenu &&
                        <button type="submit" disabled={saveWidgetsLoading} className="" onClick={this.handleHideMuscleSubMenu}>
                            <i className="icon-save"></i>
                            <span>Done</span>
                        </button>
                    }
                </form>
            </Modal>
        );
    }

    handleModaClose = () => {
        const { handleClose } = this.props;
        this.handleHideMuscleSubMenu();
        handleClose();
    }

    handleShowMuscleSubMenu = () => {
        this.setState({ showMuscleSubMenu: true });
    }

    handleHideMuscleSubMenu = () => {
        const { change, muscleSub } = this.props;
        let muscleChecked = false;
        switch (true) {
            case muscleSub[`muscle_${TIMELINE_MUSCLE_WIDGET_NECK}`]:
            case muscleSub[`muscle_${TIMELINE_MUSCLE_WIDGET_SHOULDER}`]:
            case muscleSub[`muscle_${TIMELINE_MUSCLE_WIDGET_CHEST}`]:
            case muscleSub[`muscle_${TIMELINE_MUSCLE_WIDGET_UPPER_ARM}`]:
            case muscleSub[`muscle_${TIMELINE_MUSCLE_WIDGET_WAIST}`]:
            case muscleSub[`muscle_${TIMELINE_MUSCLE_WIDGET_FOREARM}`]:
            case muscleSub[`muscle_${TIMELINE_MUSCLE_WIDGET_HIPS}`]:
            case muscleSub[`muscle_${TIMELINE_MUSCLE_WIDGET_THIGH}`]:
            case muscleSub[`muscle_${TIMELINE_MUSCLE_WIDGET_CALF}`]:
            case muscleSub[`muscle_${TIMELINE_MUSCLE_WIDGET_HEART_RATE}`]:
            case muscleSub[`muscle_${TIMELINE_MUSCLE_WIDGET_WEIGHT}`]:
            case muscleSub[`muscle_${TIMELINE_MUSCLE_WIDGET_HEIGHT}`]:
                muscleChecked = true;
                break;
        }
        change(`timeline_${TIMELINE_WIDGET_MUSCLE}`, muscleChecked);
        this.setState({ showMuscleSubMenu: false });
    }
}

const selector = formValueSelector('timeline_widgets_list_form');

WidgetsListModal = reduxForm({
    form: 'timeline_widgets_list_form',
})(WidgetsListModal);

const mapStateToProps = (state) => {
    const { timelineWidgets } = state;
    return {
        saveWidgetsLoading: timelineWidgets.get('saveWidgetsLoading'),
        muscleSub: selector(
            state,
            `muscle_${TIMELINE_MUSCLE_WIDGET_NECK}`,
            `muscle_${TIMELINE_MUSCLE_WIDGET_SHOULDER}`,
            `muscle_${TIMELINE_MUSCLE_WIDGET_CHEST}`,
            `muscle_${TIMELINE_MUSCLE_WIDGET_UPPER_ARM}`,
            `muscle_${TIMELINE_MUSCLE_WIDGET_WAIST}`,
            `muscle_${TIMELINE_MUSCLE_WIDGET_FOREARM}`,
            `muscle_${TIMELINE_MUSCLE_WIDGET_HIPS}`,
            `muscle_${TIMELINE_MUSCLE_WIDGET_THIGH}`,
            `muscle_${TIMELINE_MUSCLE_WIDGET_CALF}`,
            `muscle_${TIMELINE_MUSCLE_WIDGET_HEART_RATE}`,
            `muscle_${TIMELINE_MUSCLE_WIDGET_WEIGHT}`,
            `muscle_${TIMELINE_MUSCLE_WIDGET_HEIGHT}`
        ),
    };
}

export default connect(
    mapStateToProps,
)(WidgetsListModal);