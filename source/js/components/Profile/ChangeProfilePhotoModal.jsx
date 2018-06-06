import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import Dropzone from "react-dropzone";
import Cropper from "react-cropper";

class ChangeProfilePhotoModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedImage: null,
            croppedImg: null,
        }
    }

    render() {
        const {
            show,
            handleSubmit,
        } = this.props;
        const {
            selectedImage,
            croppedImg,
        } = this.state;
        return (
            <div className="change-profile-photo-modal-wrapper">
                <Modal show={show} bsSize="large" className="gallery-popup">
                    <div className="gallery-popup-head">
                        <button type="button" className="close-round" onClick={() => this.handleClose()}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h3 className="title-h3">Select Photo</h3>
                    </div>

                    <div className="progress-popup-body d-flex">
                        {selectedImage &&
                            <Cropper
                                ref='cropper'
                                src={selectedImage.preview}
                                style={{ width: 600, height: 600 }}
                                viewMode={3}
                                aspectRatio={1}
                                guides={false}
                                autoCropArea={0.8}
                                cropBoxResizable={true}
                                minCropBoxWidth={200}
                                minCropBoxHeight={200}
                            />
                        }
                        {croppedImg &&
                            <img
                                src={croppedImg}
                                style={{
                                    width: 200,
                                    height: 200,
                                }}
                            />
                        }
                        <div className="gallery-popup-body-r">
                            <div className="upload-gallery">
                                <Dropzone
                                    name="profile_pic"
                                    className="no-padding"
                                    accept={"image/jpeg, image/png, image/jpg, image/gif"}
                                    onDrop={this.onDrop}
                                    multiple={false}
                                >
                                    <span>
                                        <i className="icon-add_a_photo"></i>
                                    </span>
                                </Dropzone>
                            </div>
                            <div className="gallery-post">
                                <button type="button" onClick={this.cropImg}>Crop</button>
                                <button type="button" onClick={() => handleSubmit({ ...this.state })}>Save</button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div >
        );
    }

    onDrop = (filesToUpload, e) => {
        this.setState({
            selectedImage: filesToUpload[0],
            croppedImg: null,
        });
    }

    cropImg = () => {
        this.setState({
            croppedImg: this.refs.cropper.getCroppedCanvas().toDataURL(),
            selectedImage: null,
        });
    }

    handleClose = () => {
        this.setState({
            croppedImg: null,
            selectedImage: null,
        });
        this.props.handleClose();
    }
}

export default ChangeProfilePhotoModal;