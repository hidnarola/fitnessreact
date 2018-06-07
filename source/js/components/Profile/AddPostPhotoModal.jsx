import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import Dropzone from "react-dropzone";

class AddPostPhotoModal extends Component {
    render() {
        const {
            show,
            handleClose,
            images,
            handleRemovePostImags,
            handleAddPostImages,
        } = this.props;
        return (
            <div className="add-post-photo-modal-wrapper">
                <Modal show={show} bsSize="large" className="gallery-popup post-photo-popup">
                    <div className="gallery-popup-head">
                        <button type="button" className="close-round" onClick={handleClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h3 className="title-h3">New Post Photos</h3>
                    </div>

                    <div className="progress-popup-body d-flex">
                        <div className="gallery-popup-body-r">
                            <div className="upload-gallery">
                                {images && images.length > 0 &&
                                    images.map((img, i) => {
                                        return (
                                            <span key={i}>
                                                <div className="">
                                                    <button type="button" className="btn btn-danger no-margin" onClick={() => handleRemovePostImags(i)}>Delete</button>
                                                </div>
                                                <img src={img.preview} alt="" />
                                            </span>
                                        )
                                    })
                                }
                                <Dropzone
                                    name="images"
                                    className="no-padding"
                                    accept={"image/jpeg, image/png, image/jpg, image/gif"}
                                    onDrop={handleAddPostImages}
                                    multiple={true}
                                >
                                    <span>
                                        <i className="icon-add_a_photo"></i>
                                    </span>
                                </Dropzone>
                            </div>
                            <div className="gallery-post">
                                <button type="button" onClick={handleClose}>Done</button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div >
        );
    }
}

export default AddPostPhotoModal;