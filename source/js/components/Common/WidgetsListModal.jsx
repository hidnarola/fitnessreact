import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import {
    WIDGET_TODAYS_WORKOUT,
    WIDGET_ACTIVITY_FEED,
    WIDGET_BADGES,
    WIDGET_BODY_FAT,
    WIDGET_MUSCLE,
    WIDGET_PROGRESS_PHOTO,
    MUSCLE_WIDGET_NECK,
    MUSCLE_WIDGET_SHOULDER,
    MUSCLE_WIDGET_CHEST,
    MUSCLE_WIDGET_UPPER_ARM,
    MUSCLE_WIDGET_WAIST,
    MUSCLE_WIDGET_FOREARM,
    MUSCLE_WIDGET_HIPS,
    MUSCLE_WIDGET_THIGH,
    MUSCLE_WIDGET_CALF,
    MUSCLE_WIDGET_HEART_RATE,
    MUSCLE_WIDGET_WEIGHT,
    MUSCLE_WIDGET_HEIGHT,
    WIDGETS_TYPE_DASHBOARD,
} from '../../constants/consts';
import { Field, reduxForm, formValueSelector } from "redux-form";
import BadgeIcon from "svg/badge-icon.svg";
import MuscleIcon from "svg/muscles.svg";
import cns from "classnames";

class WidgetsListModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMuscleSubMenu: false,
            modalTitle: 'Add A Widget',
        };
    }

    render() {
        const { show, handleSubmit, saveLoading, type } = this.props;
        const { showMuscleSubMenu, modalTitle } = this.state;
        return (
            <Modal show={show} className={cns('widget-popup dashboard-widgets-wrapper widgets-wrapper', { 'sub-widgets-view': showMuscleSubMenu })}>
                <form method="POST" onSubmit={handleSubmit}>
                    <button type="button" onClick={this.handleModaClose} className="close-round" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h3 className="title-h3">
                        {showMuscleSubMenu &&
                            <button type="button" className="icon-arrow_back modal-bk-btn-sub" onClick={this.handleHideMuscleSubMenu}></button>
                        }
                        {modalTitle}
                    </h3>
                    {!showMuscleSubMenu &&
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
                                        onChange={this.handleShowMuscleSubMenu}
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
                    }
                    {!showMuscleSubMenu &&
                        <button type="submit" disabled={saveLoading} className="btm-btn">
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
                                        name={`widget_list_${MUSCLE_WIDGET_NECK}`}
                                        id={`widget_list_${MUSCLE_WIDGET_NECK}`}
                                    />
                                    <label htmlFor={`widget_list_${MUSCLE_WIDGET_NECK}`}><div className="choosewidget-box">
                                        <MuscleIcon />
                                        <big>Neck</big>
                                    </div></label>
                                </li>
                                <li className="custom_check">
                                    <Field
                                        type="checkbox"
                                        component="input"
                                        name={`widget_list_${MUSCLE_WIDGET_SHOULDER}`}
                                        id={`widget_list_${MUSCLE_WIDGET_SHOULDER}`}
                                    />
                                    <label htmlFor={`widget_list_${MUSCLE_WIDGET_SHOULDER}`}><div className="choosewidget-box">
                                        <i className="icon-filter"></i>
                                        <big>Shoulders</big>
                                    </div></label>
                                </li>
                                <li className="custom_check">
                                    <Field
                                        type="checkbox"
                                        component="input"
                                        name={`widget_list_${MUSCLE_WIDGET_CHEST}`}
                                        id={`widget_list_${MUSCLE_WIDGET_CHEST}`}
                                    />
                                    <label htmlFor={`widget_list_${MUSCLE_WIDGET_CHEST}`}> <div className="choosewidget-box">
                                        <BadgeIcon />
                                        <big>Chest</big>
                                    </div></label>
                                </li>
                                <li className="custom_check">
                                    <Field
                                        type="checkbox"
                                        component="input"
                                        name={`widget_list_${MUSCLE_WIDGET_UPPER_ARM}`}
                                        id={`widget_list_${MUSCLE_WIDGET_UPPER_ARM}`}
                                    />
                                    <label htmlFor={`widget_list_${MUSCLE_WIDGET_UPPER_ARM}`}> <div className="choosewidget-box">
                                        <i className="icon-accessibility"></i>
                                        <big>Upper Arm</big>
                                    </div></label>
                                </li>
                                <li className="custom_check">
                                    <Field
                                        type="checkbox"
                                        component="input"
                                        name={`widget_list_${MUSCLE_WIDGET_WAIST}`}
                                        id={`widget_list_${MUSCLE_WIDGET_WAIST}`}
                                    />
                                    <label htmlFor={`widget_list_${MUSCLE_WIDGET_WAIST}`}><div className="choosewidget-box">
                                        <MuscleIcon />
                                        <big>Waist</big>
                                    </div></label>
                                </li>
                                <li className="custom_check">
                                    <Field
                                        type="checkbox"
                                        component="input"
                                        name={`widget_list_${MUSCLE_WIDGET_FOREARM}`}
                                        id={`widget_list_${MUSCLE_WIDGET_FOREARM}`}
                                    />
                                    <label htmlFor={`widget_list_${MUSCLE_WIDGET_FOREARM}`}><div className="choosewidget-box">
                                        <i className="icon-filter"></i>
                                        <big>Forearm</big>
                                    </div></label>
                                </li>
                                <li className="custom_check">
                                    <Field
                                        type="checkbox"
                                        component="input"
                                        name={`widget_list_${MUSCLE_WIDGET_HIPS}`}
                                        id={`widget_list_${MUSCLE_WIDGET_HIPS}`}
                                    />
                                    <label htmlFor={`widget_list_${MUSCLE_WIDGET_HIPS}`}> <div className="choosewidget-box">
                                        <BadgeIcon />
                                        <big>Hips</big>
                                    </div></label>
                                </li>
                                <li className="custom_check">
                                    <Field
                                        type="checkbox"
                                        component="input"
                                        name={`widget_list_${MUSCLE_WIDGET_THIGH}`}
                                        id={`widget_list_${MUSCLE_WIDGET_THIGH}`}
                                    />
                                    <label htmlFor={`widget_list_${MUSCLE_WIDGET_THIGH}`}> <div className="choosewidget-box">
                                        <i className="icon-accessibility"></i>
                                        <big>Thigh</big>
                                    </div></label>
                                </li>
                                <li className="custom_check">
                                    <Field
                                        type="checkbox"
                                        component="input"
                                        name={`widget_list_${MUSCLE_WIDGET_CALF}`}
                                        id={`widget_list_${MUSCLE_WIDGET_CALF}`}
                                    />
                                    <label htmlFor={`widget_list_${MUSCLE_WIDGET_CALF}`}><div className="choosewidget-box">
                                        <MuscleIcon />
                                        <big>Calf</big>
                                    </div></label>
                                </li>
                                <li className="custom_check">
                                    <Field
                                        type="checkbox"
                                        component="input"
                                        name={`widget_list_${MUSCLE_WIDGET_HEART_RATE}`}
                                        id={`widget_list_${MUSCLE_WIDGET_HEART_RATE}`}
                                    />
                                    <label htmlFor={`widget_list_${MUSCLE_WIDGET_HEART_RATE}`}><div className="choosewidget-box">
                                        <i className="icon-filter"></i>
                                        <big>Heart Rate</big>
                                    </div></label>
                                </li>
                                <li className="custom_check">
                                    <Field
                                        type="checkbox"
                                        component="input"
                                        name={`widget_list_${MUSCLE_WIDGET_WEIGHT}`}
                                        id={`widget_list_${MUSCLE_WIDGET_WEIGHT}`}
                                    />
                                    <label htmlFor={`widget_list_${MUSCLE_WIDGET_WEIGHT}`}> <div className="choosewidget-box">
                                        <BadgeIcon />
                                        <big>Weight</big>
                                    </div></label>
                                </li>
                                <li className="custom_check">
                                    <Field
                                        type="checkbox"
                                        component="input"
                                        name={`widget_list_${MUSCLE_WIDGET_HEIGHT}`}
                                        id={`widget_list_${MUSCLE_WIDGET_HEIGHT}`}
                                    />
                                    <label htmlFor={`widget_list_${MUSCLE_WIDGET_HEIGHT}`}> <div className="choosewidget-box">
                                        <i className="icon-accessibility"></i>
                                        <big>Height</big>
                                    </div></label>
                                </li>
                            </ul>
                        </div>
                    }

                    {showMuscleSubMenu &&
                        <button type="button" className="btm-btn" onClick={this.handleHideMuscleSubMenu}>
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
        this.setState({ showMuscleSubMenu: true, modalTitle: 'Select Muscle' });
    }

    handleHideMuscleSubMenu = () => {
        const { change, muscleSub } = this.props;
        let muscleChecked = false;
        switch (true) {
            case muscleSub[`widget_list_${MUSCLE_WIDGET_NECK}`]:
            case muscleSub[`widget_list_${MUSCLE_WIDGET_SHOULDER}`]:
            case muscleSub[`widget_list_${MUSCLE_WIDGET_CHEST}`]:
            case muscleSub[`widget_list_${MUSCLE_WIDGET_UPPER_ARM}`]:
            case muscleSub[`widget_list_${MUSCLE_WIDGET_WAIST}`]:
            case muscleSub[`widget_list_${MUSCLE_WIDGET_FOREARM}`]:
            case muscleSub[`widget_list_${MUSCLE_WIDGET_HIPS}`]:
            case muscleSub[`widget_list_${MUSCLE_WIDGET_THIGH}`]:
            case muscleSub[`widget_list_${MUSCLE_WIDGET_CALF}`]:
            case muscleSub[`widget_list_${MUSCLE_WIDGET_HEART_RATE}`]:
            case muscleSub[`widget_list_${MUSCLE_WIDGET_WEIGHT}`]:
            case muscleSub[`widget_list_${MUSCLE_WIDGET_HEIGHT}`]:
                muscleChecked = true;
                break;
        }
        change(`widget_list_${WIDGET_MUSCLE}`, muscleChecked);
        this.setState({ showMuscleSubMenu: false, modalTitle: 'Add A Widget' });
    }
}

const selector = formValueSelector('widgets_list_form');

WidgetsListModal = reduxForm({
    form: 'widgets_list_form',
})(WidgetsListModal);

const mapStateToProps = (state) => {
    return {
        muscleSub: selector(
            state,
            `widget_list_${MUSCLE_WIDGET_NECK}`,
            `widget_list_${MUSCLE_WIDGET_SHOULDER}`,
            `widget_list_${MUSCLE_WIDGET_CHEST}`,
            `widget_list_${MUSCLE_WIDGET_UPPER_ARM}`,
            `widget_list_${MUSCLE_WIDGET_WAIST}`,
            `widget_list_${MUSCLE_WIDGET_FOREARM}`,
            `widget_list_${MUSCLE_WIDGET_HIPS}`,
            `widget_list_${MUSCLE_WIDGET_THIGH}`,
            `widget_list_${MUSCLE_WIDGET_CALF}`,
            `widget_list_${MUSCLE_WIDGET_HEART_RATE}`,
            `widget_list_${MUSCLE_WIDGET_WEIGHT}`,
            `widget_list_${MUSCLE_WIDGET_HEIGHT}`
        ),
    };
}

export default connect(
    mapStateToProps,
)(WidgetsListModal);