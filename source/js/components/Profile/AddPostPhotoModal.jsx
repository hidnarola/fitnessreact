import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import Dropzone from "react-dropzone";
import { Alert } from "react-bootstrap";

class AddPostPhotoModal extends Component {
    render() {
        const {
            show,
            handleClose,
            images,
            handleRemovePostImags,
            handleAddPostImages,
            postImagesError
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
                    {postImagesError && postImagesError.length > 0 &&
                        <Alert bsStyle="danger">
                            {
                                postImagesError.map((e, i) => {
                                    return <p key={i}>{e}</p>
                                })
                            }
                        </Alert>
                    }
                    <div className="progress-popup-body">
                        <div className="upload-gallery">
                            {images && images.length > 0 &&
                                images.map((img, i) => {
                                    return (
                                        <span key={i}>
                                            <img src={img.preview} alt="" />
                                            <button type="button" className="btn btn-danger no-margin" onClick={() => handleRemovePostImags(i)}><i className="icon-delete_forever"></i></button>
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
                </Modal>
            </div>
        );
    }
}

export default AddPostPhotoModal;