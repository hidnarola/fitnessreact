import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Alert } from "react-bootstrap";
import { Field, reduxForm, reset } from "redux-form";
import Dropzone from 'react-dropzone';
import SelectProgressPhotoModal from "./SelectProgressPhotoModal";
import { forwardImageToDetailsPage, cancelImageSelectedFromDetailsPage } from "../../actions/userProgressPhotos";

class AddProgressPhotoModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invalidFile: false,
            detailsModalShow: false
        };
    }

    render() {
        const { show, handleSubmit, isLoading, selectedPhotos } = this.props;
        const { invalidFile, detailsModalShow } = this.state;
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
                                Please select jpg, jpeg and gif files only.
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
                            <div className="progress-popup-body-l progress-l-wrap">
                                {selectedPhotos && selectedPhotos.length > 0 &&
                                    selectedPhotos.map((o, i) => {
                                        return (
                                            <div className="" key={i}>
                                                <a href="javascript:void(0)">
                                                    <img src={o.image} />
                                                </a>
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
}

AddProgressPhotoModal = reduxForm({
    form: "add_progress_photo_modal_form"
})(AddProgressPhotoModal);

const mapStateToProps = (state) => {
    const { userProgressPhotos } = state;
    return {
        selectedPhotos: userProgressPhotos.get('selectedProgressPhotos'),
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
                onDrop={(accepted, rejected) => {
                    this.isFileSelected = false;
                    this.isValidFileSelected = false;
                    if (accepted && accepted.length > 0) {
                        this.isValidFileSelected = true;
                        this.isFileSelected = true;
                        handleCloseModal(false);
                        openSelectProgressPhotoModal(true);
                        dispatch(forwardImageToDetailsPage(accepted));
                    }
                }}
                onFileDialogCancel={() => {
                    if (this.isFileSelected) {
                        setInvalidFile(!this.isValidFileSelected);
                    }
                }}
            >
            </Dropzone>
        )
    }
}

SelectImageComponent = connect()(SelectImageComponent)