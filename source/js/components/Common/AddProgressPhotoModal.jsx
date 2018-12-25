import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Alert } from "react-bootstrap";
import { Field, reduxForm, reset } from "redux-form";
import Dropzone from 'react-dropzone';
import SelectProgressPhotoModal from "./SelectProgressPhotoModal";
import { forwardImageToDetailsPage, cancelImageSelectedFromDetailsPage, deleteImageSelectedFromDetailsPage } from "../../actions/userProgressPhotos";
import ProgressPlaceholder from "img/common/body-progress-img-placeholder.jpg";
import { PROGRESS_PHOTO_CATEGORIES, PROGRESS_PHOTO_BASICS, PROGRESS_PHOTO_POSED, MAX_IMAGE_FILE_SIZE_ALLOWED } from "../../constants/consts";
import SweetAlert from "react-bootstrap-sweetalert";

class AddProgressPhotoModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invalidFile: false,
            detailsModalShow: false,
            imgToDel: null
        };
    }

    render() {
        const { show, handleSubmit, isLoading, selectedPhotos, bodyparts } = this.props;
        const { invalidFile, detailsModalShow, imgToDel } = this.state;
        return (
            <div className="add-progress-photo-modal-wrapper">
                <Modal show={show} bsSize="large" className="progress-popup">
                    <form onSubmit={handleSubmit}>
                        <div className="progress-popup-head">
                            <button type="button" className="close-round" onClick={this.handleCloseModal}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h3 className="title-h3">New Progress Photo</h3>
                        </div>

                        {invalidFile &&
                            <Alert bsStyle="danger">
                                Please select max 2 MB jpg and png files only.
                            </Alert>
                        }

                        <div className="progress-popup-body new-progress-popup">
                            <div className="progress-popup-body-m">
                                <Field
                                    id="description"
                                    name="description"
                                    component="textarea"
                                    placeholder="Say something about photos..."
                                    className="form-control"
                                />
                            </div>
                            <div className="progress-popup-body-l progress-l-wrap upload-display-img">
                                {selectedPhotos && selectedPhotos.length > 0 &&
                                    selectedPhotos.map((o, i) => {
                                        let caption = o.caption ? o.caption : "";
                                        let category = o.category ? o.category : "";
                                        let subCategory = o.subCategory ? o.subCategory : "";
                                        let selectedCategory = _.find(PROGRESS_PHOTO_CATEGORIES, ["value", category]);
                                        let selectedSubCategory = null;
                                        if (selectedCategory) {
                                            switch (selectedCategory.value) {
                                                case "basic":
                                                    selectedSubCategory = _.find(PROGRESS_PHOTO_BASICS, ["value", subCategory]);
                                                    break;
                                                case "isolation":
                                                    let bodypartOptions = [];
                                                    if (bodyparts && bodyparts.length > 0) {
                                                        bodyparts.map((o) => {
                                                            bodypartOptions.push({ value: o._id, label: o.bodypart });
                                                        });
                                                    }
                                                    selectedSubCategory = _.find(bodypartOptions, ["value", subCategory]);
                                                    break;
                                                case "posed":
                                                    selectedSubCategory = _.find(PROGRESS_PHOTO_POSED, ["value", subCategory]);
                                                    break;
                                            }
                                        }
                                        return (
                                            <div className="" key={i}>
                                                <a href="javascript:void(0)">
                                                    <img src={o.image} />
                                                    <ul className="uploade-data">
                                                        {selectedCategory ? <li>{selectedCategory.label}</li> : ""}
                                                        {selectedSubCategory ? <li>{selectedSubCategory.label}</li> : ""}
                                                        {caption && <li>{caption}</li>}
                                                    </ul>
                                                </a>
                                                <button type="button" className="delete-img" onClick={() => this.handleShowDeleteModal(i)}><i className="icon-close"></i></button>
                                            </div>
                                        );
                                    })
                                }
                                <Field
                                    id="select_image"
                                    name="select_image"
                                    component={SelectImageComponent}
                                    handleCloseModal={this.handleCloseModal}
                                    setInvalidFile={this.setInvalidFile}
                                    openSelectProgressPhotoModal={this.openSelectProgressPhotoModal}
                                />
                            </div>
                            <div className="pregres-submit">
                                <button type="submit" disabled={isLoading}>Save</button>
                            </div>
                        </div>
                    </form>
                </Modal>
                <SelectProgressPhotoModal
                    show={detailsModalShow}
                    handleClose={this.handleSelectProgressPhotoModalClose}
                />
                <SweetAlert
                    show={(typeof imgToDel !== 'undefined' && imgToDel !== null && imgToDel >= 0)}
                    danger
                    showCancel
                    confirmBtnText="Yes, delete it!"
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title="Are you sure?"
                    onConfirm={this.handleDeleteImg}
                    onCancel={this.handleCloseDeleteModal}
                >
                    Image will not be able to recover!
                </SweetAlert>
            </div>
        );
    }

    handleCloseModal = (resetParentModalForm = true) => {
        const { handleClose } = this.props;
        this.setInvalidFile(false);
        handleClose(resetParentModalForm);
    }

    setInvalidFile = (flag) => {
        this.setState({ invalidFile: flag });
    }

    openSelectProgressPhotoModal = () => {
        const { dispatch } = this.props;
        this.setState({ detailsModalShow: true });
        dispatch(reset('add_details_progress_photo_form'));
    }

    handleSelectProgressPhotoModalClose = () => {
        const { dispatch, handleOpen } = this.props;
        dispatch(cancelImageSelectedFromDetailsPage());
        this.setState({ detailsModalShow: false });
        handleOpen();
    }

    handleDeleteImg = () => {
        const { dispatch } = this.props;
        const { imgToDel } = this.state;
        dispatch(deleteImageSelectedFromDetailsPage(imgToDel));
        this.handleCloseDeleteModal();
    }

    handleShowDeleteModal = (i) => {
        this.setState({ imgToDel: i });
    }

    handleCloseDeleteModal = () => {
        this.setState({ imgToDel: null });
    }
}

AddProgressPhotoModal = reduxForm({
    form: "add_progress_photo_modal_form"
})(AddProgressPhotoModal);

const mapStateToProps = (state) => {
    const { userProgressPhotos, userBodyparts } = state;
    return {
        selectedPhotos: userProgressPhotos.get('selectedProgressPhotos'),
        bodyparts: userBodyparts.get('bodyparts'),
    }
}

AddProgressPhotoModal = connect(
    mapStateToProps
)(AddProgressPhotoModal);

export default AddProgressPhotoModal;

class SelectImageComponent extends Component {
    constructor(props) {
        super(props);
        this.isValidFileSelected = false;
        this.isFileSelected = false;
    }

    render() {
        const {
            handleCloseModal,
            setInvalidFile,
            openSelectProgressPhotoModal,
            dispatch
        } = this.props;
        return (
            <Dropzone
                accept={['image/jpeg', 'image/jpg', 'image/png']}
                className="dropzone-div"
                multiple={false}
                maxSize={MAX_IMAGE_FILE_SIZE_ALLOWED}
                onDrop={(accepted, rejected) => {
                    this.isFileSelected = true;
                    this.isValidFileSelected = false;
                    if (accepted && accepted.length > 0) {
                        this.isValidFileSelected = true;
                        handleCloseModal(false);
                        openSelectProgressPhotoModal(true);
                        dispatch(forwardImageToDetailsPage(accepted));
                    }
                }}
                onFileDialogCancel={() => {
                    if (this.isFileSelected) {
                        setInvalidFile(!this.isValidFileSelected);
                        this.isFileSelected = false;
                    }
                }}
            >
                <img src={ProgressPlaceholder} />
                <div className="icon-plus"><i className="icon-control_point"></i></div>
            </Dropzone>
        )
    }
}

SelectImageComponent = connect()(SelectImageComponent)