import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { Modal } from "react-bootstrap";
import Cropper from "react-cropper";
import { SelectField_ReactSelect, TextAreaField } from '../../helpers/FormControlHelper';
import { PROGRESS_PHOTO_BASICS, PROGRESS_PHOTO_CATEGORIES, PROGRESS_PHOTO_POSED } from '../../constants/consts';
import { addImageSelectedFromDetailsPage } from '../../actions/userProgressPhotos';
import { showPageLoader, hidePageLoader } from '../../actions/pageLoader';

class SelectProgressPhotoModal extends Component {
    render() {
        const { show, selectedImage, handleClose, bodyparts, photoCategory } = this.props;
        let bodypartOptions = [];
        if (bodyparts && bodyparts.length > 0) {
            bodyparts.map((o) => {
                bodypartOptions.push({ value: o._id, label: o.bodypart });
            });
        }
        let subCategoryOptions = [];
        if (photoCategory) {
            if (photoCategory.value === 'basic') {
                subCategoryOptions = PROGRESS_PHOTO_BASICS;
            } else if (photoCategory.value === 'isolation') {
                subCategoryOptions = bodypartOptions;
            } else if (photoCategory.value === 'posed') {
                subCategoryOptions = PROGRESS_PHOTO_POSED;
            }
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

                        <div className="progress-popup-body d-flex">
                            <div className="crop-l">
                                {selectedImage && selectedImage.length > 0 &&
                                    <Fragment>
                                        <label for="caption" class="control-label display_block">Selected Image </label>
                                        <Cropper
                                            ref='cropper'
                                            src={selectedImage[0].preview}
                                            viewMode={0}
                                            aspectRatio={1}
                                            guides={false}
                                            autoCropArea={0.8}
                                            cropBoxResizable={true}
                                            minCropBoxWidth={300}
                                            minCropBoxHeight={300}
                                            alt="Selected Progress Image"
                                        />
                                    </Fragment>
                                }
                                <Field
                                    id="image_data"
                                    name="image_data"
                                    component="input"
                                    type="hidden"
                                />
                            </div>
                            <div className="crop-r">
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
                                    id="category"
                                    name="category"
                                    label="Category"
                                    labelClass="control-label display_block"
                                    wrapperClass="form-group"
                                    placeholder="Category"
                                    component={SelectField_ReactSelect}
                                    options={PROGRESS_PHOTO_CATEGORIES}
                                    errorClass="help-block"
                                />
                                <Field
                                    id="sub_category"
                                    name="sub_category"
                                    label="Sub Category"
                                    labelClass="control-label display_block"
                                    wrapperClass="form-group"
                                    placeholder="Sub Category"
                                    component={SelectField_ReactSelect}
                                    options={subCategoryOptions}
                                    errorClass="help-block"
                                />
                                <div className="pregres-submit">
                                    <button type="button" onClick={this.selectProgressImage}>Add Photos <i className="icon-control_point"></i></button>
                                </div>
                            </div>

                        </div>
                    </form>
                </Modal>
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const { photoCategory, change } = this.props;
        if (photoCategory && prevProps.photoCategory && photoCategory.value && prevProps.photoCategory.value && prevProps.photoCategory.value !== photoCategory.value) {
            change('sub_category', null);
        } else if (!photoCategory) {
            change('sub_category', null);
        }
    }

    selectProgressImage = () => {
        const { caption, photoCategory, sub_category, dispatch, handleClose } = this.props;
        let self = this;
        dispatch(showPageLoader());
        setTimeout(() => {
            let image = self.refs.cropper.getCroppedCanvas().toDataURL();
            let requrestData = {
                image,
                caption: caption ? caption : null,
                category: photoCategory && photoCategory.value ? photoCategory.value : null,
                subCategory: sub_category && sub_category.value ? sub_category.value : null
            };
            dispatch(addImageSelectedFromDetailsPage(requrestData));
            dispatch(hidePageLoader());
            handleClose();
        }, 500);
    }
}

const selector = formValueSelector('add_details_progress_photo_form');

const mapStateToProps = (state) => {
    const { userProgressPhotos, userBodyparts } = state;
    return {
        selectedImage: userProgressPhotos.get('selectedImage'),
        bodyparts: userBodyparts.get('bodyparts'),
        caption: selector(state, 'caption'),
        photoCategory: selector(state, 'category'),
        sub_category: selector(state, 'sub_category'),
    }
}

SelectProgressPhotoModal = reduxForm({
    form: "add_details_progress_photo_form"
})(SelectProgressPhotoModal);

SelectProgressPhotoModal = connect(
    mapStateToProps
)(SelectProgressPhotoModal)

export default SelectProgressPhotoModal;