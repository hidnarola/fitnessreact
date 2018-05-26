import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import Dropzone from "react-dropzone";
import Select from 'react-select';
import { requiredReactSelect } from '../../formValidation/validationRules';
import {
    ACCESS_LEVEL_PUBLIC,
    ACCESS_LEVEL_PUBLIC_STR,
    ACCESS_LEVEL_FRIENDS,
    ACCESS_LEVEL_FRIENDS_STR,
    ACCESS_LEVEL_PRIVATE,
    ACCESS_LEVEL_PRIVATE_STR
} from '../../constants/consts';
import _ from "lodash";

const accessLevelOptions = [
    { value: ACCESS_LEVEL_PUBLIC, label: ACCESS_LEVEL_PUBLIC_STR },
    { value: ACCESS_LEVEL_FRIENDS, label: ACCESS_LEVEL_FRIENDS_STR },
    { value: ACCESS_LEVEL_PRIVATE, label: ACCESS_LEVEL_PRIVATE_STR },
];

class AddGalleryPhotoModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            description: "",
            accessLevel: accessLevelOptions[0].value,
        }
    }

    componentWillUpdate(nextProps, nextState) {
        const { resetState, doResetState } = nextProps;
        if (doResetState) {
            this.setState({
                images: [],
                description: "",
                accessLevel: accessLevelOptions[0].value,
            });
            resetState(false);
        }
    }

    render() {
        const {
            images,
            description,
            accessLevel,
        } = this.state;
        const {
            show,
            handlePost,
            handleClose,
        } = this.props;
        return (
            <div className="add-galary-photo-modal-wrapper">
                <Modal show={show} bsSize="large" className="gallery-popup">
                    <div className="gallery-popup-head">
                        <button type="button" className="close-round" onClick={handleClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h3 className="title-h3">New Gallery Photos</h3>
                    </div>

                    <div className="progress-popup-body d-flex">
                        <div className="gallery-popup-body-l">
                            <span>
                                {images && images.length > 0 &&
                                    <div>
                                        <div className="">
                                            <button type="button" className="btn btn-danger no-margin" onClick={() => this.handleImageDelete(0)}>Delete</button>
                                        </div>
                                        <img src={images[0].preview} alt="" />
                                    </div>
                                }
                            </span>
                        </div>
                        <div className="gallery-popup-body-r">
                            <textarea
                                name="description"
                                placeholder="Say something about this photo..."
                                value={description}
                                className="form-control"
                                onChange={this.handleChange}
                            >
                            </textarea>
                            <div className="upload-gallery">
                                {images && images.length > 0 &&
                                    images.map((img, i) => {
                                        if (i === 0) {
                                            return null;
                                        }
                                        return (
                                            <span key={i}>
                                                <div className="">
                                                    <button type="button" className="btn btn-danger no-margin" onClick={() => this.handleImageDelete(i)}>Delete</button>
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
                                    onDrop={(filesToUpload, e) => {
                                        var allImages = _.concat(images, filesToUpload);
                                        this.handleImagesSelection(allImages);
                                    }}
                                    multiple={true}
                                >
                                    <span>
                                        <i className="icon-add_a_photo"></i>
                                    </span>
                                </Dropzone>
                            </div>
                            <div className="gallery-post">
                                <select
                                    name="accessLevel"
                                    value={accessLevel}
                                    onChange={this.handleChange}
                                >
                                    {accessLevelOptions && accessLevelOptions.length > 0 &&
                                        accessLevelOptions.map((obj, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={`${obj.value}`}
                                                >
                                                    {obj.label}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                                <button type="button" onClick={() => handlePost({ ...this.state })}>Post</button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div >
        );
    }

    handleImagesSelection = (fileList) => {
        this.setState({
            images: fileList,
        });
    }

    handleImageDelete = (index) => {
        const { dispatch } = this.props;
        var images = this.state.images;
        images.splice(index, 1);
        this.setState({ images });
    }

    handleChange = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        this.setState({ [name]: value });
    }
}

export default AddGalleryPhotoModal;