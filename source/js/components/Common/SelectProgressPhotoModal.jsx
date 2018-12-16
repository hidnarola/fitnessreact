import React, { Component } from 'react';
import { connect } from "react-redux";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { Modal } from "react-bootstrap";
import Cropper from "react-cropper";
import { SelectField_ReactSelect, InputField, TextAreaField } from '../../helpers/FormControlHelper';
import { PROGRESS_PHOTO_BASICS } from '../../constants/consts';
import { addImageSelectedFromDetailsPage } from '../../actions/userProgressPhotos';

class SelectProgressPhotoModal extends Component {
    render() {
        const { show, selectedImage, handleClose, bodyparts } = this.props;
        let bodypartOptions = [];
        if (bodyparts && bodyparts.length > 0) {
            bodyparts.map((o) => {
                bodypartOptions.push({ value: o._id, label: o.bodypart });
            });
        }
        return (
            <div className="add-details-progress-photo-modal-wrapper">
                <Modal show={show} bsSize="large" className="progress-popup">
                    <form>
                        <div className="progress-popup-head">
                            <button type="button" className="close-round" onClick={handleClose}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h3 className="title-h3">New Progress Photo</h3>
                        </div>

                        <div className="progress-popup-body">
                            <div className="col-md-6">
                                {selectedImage && selectedImage.length > 0 &&
                                    <Cropper
                                        ref='cropper'
                                        src={selectedImage[0].preview}
                                        alt="Selected Progress Image"
                                        aspectRatio={50 / 50}
                                        guides={false}
                                        responsive={true}
                                        restore={true}
                                        center={true}
                                        minCropBoxWidth={300}
                                        minCropBoxHeight={300}
                                        viewMode={3}
                                    />
                                }
                                <Field
                                    id="image_data"
                                    name="image_data"
                                    component="input"
                                    type="hidden"
                                />
                            </div>
                            <div className="col-md-6">
                                <Field
                                    id="caption"
                                    name="caption"
                                    className="form-control resize-vertical min-height-80"
                                    label="Caption"
                                    labelClass="control-label display_block"
                                    wrapperClass="form-group"
                                    placeholder="Caption"
                                    component={TextAreaField}
                                />
                                <Field
                                    id="basic"
                                    name="basic"
                                    label="Basic"
                                    labelClass="control-label display_block"
                                    wrapperClass="form-group"
                                    placeholder="Basic"
                                    component={SelectField_ReactSelect}
                                    options={PROGRESS_PHOTO_BASICS}
                                    errorClass="help-block"
                                />
                                <Field
                                    id="isolation"
                                    name="isolation"
                                    label="Isolation"
                                    labelClass="control-label display_block"
                                    wrapperClass="form-group"
                                    placeholder="Isolation"
                                    component={SelectField_ReactSelect}
                                    options={bodypartOptions}
                                    errorClass="help-block"
                                />
                                <Field
                                    id="posed"
                                    name="posed"
                                    type="text"
                                    className="form-control"
                                    label="Posed"
                                    labelClass="control-label display_block"
                                    wrapperClass="form-group"
                                    placeholder="Posed"
                                    component={InputField}
                                    errorClass="help-block"
                                />
                            </div>
                            <div className="pregres-submit">
                                <button type="button" onClick={this.selectProgressImage}>Save</button>
                            </div>
                        </div>
                    </form>
                </Modal>
            </div>
        );
    }

    selectProgressImage = () => {
        const { caption, basic, isolation, posed, dispatch, handleClose } = this.props;
        let image = this.refs.cropper.getCroppedCanvas().toDataURL();
        let requrestData = {
            image,
            caption: caption ? caption : null,
            basic: basic && basic.value ? basic.value : null,
            isolation: isolation && isolation.value ? isolation.value : null,
            posed: posed ? posed : null
        };
        dispatch(addImageSelectedFromDetailsPage(requrestData));
        handleClose();
    }
}

const selector = formValueSelector('add_details_progress_photo_form');

const mapStateToProps = (state) => {
    const { userProgressPhotos, userBodyparts } = state;
    return {
        selectedImage: userProgressPhotos.get('selectedImage'),
        bodyparts: userBodyparts.get('bodyparts'),
        caption: selector(state, 'caption'),
        basic: selector(state, 'basic'),
        isolation: selector(state, 'isolation'),
        posed: selector(state, 'posed'),
    }
}

SelectProgressPhotoModal = reduxForm({
    form: "add_details_progress_photo_form"
})(SelectProgressPhotoModal);

SelectProgressPhotoModal = connect(
    mapStateToProps
)(SelectProgressPhotoModal)

export default SelectProgressPhotoModal;

const submitSelectProgressPhotoData = (param1, param2, param3, param4) => {
    console.log('param1 => ', param1);
    console.log('param2 => ', param2);
    console.log('param3 => ', param3);
    console.log('param4 => ', param4);
}