import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { reduxForm, Field } from "redux-form";
import ReactCalender from 'react-calendar/dist/entry.nostyle';
import Dropzone from 'react-dropzone';
import { requiredImage } from '../../formValidation/validationRules';

class AddProgressPhotoModal extends Component {
    constructor(props) {
        super(props);
        var now = new Date();
        now.setHours(0, 0, 0, 0);
        this.state = {
            photoDate: now,
        }
    }

    componentWillMount() {
        const { photoDate } = this.state;
        const { change } = this.props;
        change('photo_date', photoDate);
    }

    render() {
        const { show, handleClose, handleSubmit } = this.props;
        const { photoDate } = this.state;
        return (
            <div className="add-progress-photo-modal-wrapper">
                <Modal show={show} bsSize="large" className="progress-popup">
                    <form onSubmit={handleSubmit}>
                        <div className="progress-popup-head">
                            <button type="button" className="close-round" onClick={handleClose}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h3 className="title-h3">New Progress Photo</h3>
                        </div>

                        <div className="progress-popup-body d-flex">
                            <div className="progress-popup-body-l">
                                <Field
                                    name="photo"
                                    mainWrapperClass="image-form-main-wrapper"
                                    component={PhotoUploadField}
                                    className="progress-dropzone"
                                    multiple={false}
                                    validate={[requiredImage]}
                                />
                            </div>
                            <div className="progress-popup-body-m">
                                <Field
                                    name="description"
                                    component="textarea"
                                    placeholder="Say something about this photo..."
                                    className="form-control"
                                />
                            </div>
                            <div className="progress-popup-body-r">
                                <div className="log-date">
                                    <div className="log-date-head d-flex">
                                        <h4>Log Date</h4>
                                    </div>
                                    <div className="log-date-wrap">
                                        <ReactCalender
                                            name="photo_date"
                                            onChange={this.onChangePhotoDate}
                                            value={photoDate}
                                        />
                                    </div>
                                </div>
                                <div className="pregres-submit">
                                    <button type="submit">Save</button>
                                </div>
                            </div>
                            {/* <div className="row d-flex whitebox-body">
                                <div className="col-md-4">
                                    <Field
                                        name="photo"
                                        mainWrapperClass="image-form-main-wrapper"
                                        wrapperClass="form-group"
                                        component={PhotoUploadField}
                                        multiple={false}
                                        validate={[requiredImage]}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <Field
                                            name="description"
                                            component="textarea"
                                            placeholder="Say something about this photo..."
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="log-date">
                                        <div className="log-date-head d-flex">
                                            <h4>Photo Date</h4>
                                        </div>
                                        <div className="log-date-wrap">
                                            <ReactCalender
                                                name="photo_date"
                                                onChange={this.onChangePhotoDate}
                                                value={photoDate}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div> */}


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
}

AddProgressPhotoModal = reduxForm({
    form: 'addProgressPhotoModalForm',
})(AddProgressPhotoModal)

export default AddProgressPhotoModal;

class PhotoUploadField extends Component {
    render() {
        const {
            input,
            meta,
            wrapperClass,
            className,
            errorClass,
            accept,
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
            <div className={wrapperClass}>
                <Dropzone
                    {...input}
                    accept={accept ? accept : "image/jpeg, image/png, image/jpg, image/gif"}
                    onDrop={(filesToUpload, e) => input.onChange(filesToUpload)}
                    multiple={false}
                    className={className}
                >
                    {input.value && images}
                </Dropzone>
                {meta.touched &&
                    ((meta.error && <span className={errorClass}>{meta.error}</span>) || (meta.warning && <span className={warningClass}>{meta.warning}</span>))
                }
            </div>
        );
    }
}