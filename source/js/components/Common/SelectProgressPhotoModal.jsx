import React, { Component } from 'react';
import { Modal, Alert } from 'react-bootstrap';
import { reduxForm, Field } from "redux-form";
import ReactCalender from 'react-calendar/dist/entry.nostyle';
import Dropzone from 'react-dropzone';
import { requiredImage } from '../../formValidation/validationRules';
import Weightlifting from "svg/weightlifting.svg";
import { InputField } from '../../helpers/FormControlHelper';

class AddProgressPhotoModal extends Component {
    constructor(props) {
        super(props);
        var now = new Date();
        now.setHours(0, 0, 0, 0);
        this.state = {
            photoDate: now,
        }
        this.rejectedFiles = false;
    }

    componentWillMount() {
        const { photoDate } = this.state;
        const { change } = this.props;
        change('photo_date', photoDate);
    }

    render() {
        const { show, handleSubmit, isLoading } = this.props;
        const { photoDate } = this.state;
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

                        {this.rejectedFiles &&
                            <Alert bsStyle="danger">
                                <p>Invalid file(s). Please select jpg and png only</p>
                            </Alert>
                        }

                        <div className="progress-popup-body d-flex">
                            <Field
                                name="photo"
                                mainWrapperClass="image-form-main-wrapper"
                                component={PhotoUploadField}
                                className="progress-dropzone"
                                multiple={false}
                                validate={[requiredImage]}
                                errorClass="help-block"
                                handleRejectedError={this.handleRejectedError}
                            />
                            <Field
                                name="description"
                                component="textarea"
                                placeholder="Say something about this photo..."
                                className="form-control"
                            />
                            <Field
                                name="body"
                                component={InputField}
                                placeholder="Body"
                                className="form-control"
                            />
                            <Field
                                name="isolation"
                                component={InputField}
                                placeholder="isolation"
                                className="form-control"
                            />
                            <Field
                                name="posed"
                                component={InputField}
                                placeholder="posed"
                                className="form-control"
                            />
                            <div className="pregres-submit">
                                <button type="submit" disabled={isLoading}>Save</button>
                            </div>
                        </div>
                    </form>
                </Modal>
            </div>
        );
    }

    onChangePhotoDate = (date) => {
        const { change } = this.props;
        this.setState({
            photoDate: date
        });
        change('photo_date', date);
    }

    handleRejectedError = (flag) => {
        this.rejectedFiles = flag;
    }

    handleCloseModal = () => {
        const { handleClose } = this.props;
        this.handleRejectedError(false);
        handleClose();
    }
}

AddProgressPhotoModal = reduxForm({
    form: 'addProgressPhotoModalForm',
})(AddProgressPhotoModal)

export default AddProgressPhotoModal;

class PhotoUploadField extends Component {
    constructor(props) {
        super(props);
        this.isImageSelected = false;
    }

    render() {
        const {
            input,
            meta,
            wrapperClass,
            className,
            errorClass,
            accept,
            handleRejectedError,
        } = this.props;
        let filesArr = _.values(input.value);
        let images = [];
        _.forEach(filesArr, (file, key) => {
            images.push(
                <div className="image-preview-wrapper" key={key}>
                    <img src={file.preview} />
                </div>
            )
        })
        return (
            <div
                className={
                    `${wrapperClass ? wrapperClass : ''} ${(meta.touched && meta.error) ? 'has-error' : ''} ${this.rejectedFiles ? 'has-error' : ''}`
                }
            >
                <Dropzone
                    {...input}
                    accept={accept ? accept : "image/jpeg, image/png, image/jpg, image/gif"}
                    onClick={() => this.isImageSelected = false}
                    onDrop={(filesToUpload, rejectedFiles) => {
                        let rejectedFlag = (rejectedFiles && rejectedFiles.length > 0);
                        handleRejectedError(rejectedFlag)
                        this.isImageSelected = (filesToUpload && filesToUpload.length > 0);
                        input.onChange(filesToUpload);
                    }}
                    onFileDialogCancel={() => {
                        if (!this.isImageSelected) {
                            input.onChange('');
                        }
                    }}
                    multiple={true}
                    className={className}
                >
                    {!(input.value) &&
                        <div>
                            <Weightlifting />
                            <h4>Select an image</h4>
                        </div>
                    }
                    {input.value && images}
                </Dropzone>
                {meta.touched &&
                    ((meta.error && <span className={errorClass}>{meta.error}</span>) || (meta.warning && <span className={warningClass}>{meta.warning}</span>))
                }
            </div>
        );
    }
}