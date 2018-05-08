import React, { Component } from 'react';
import Select from 'react-select';
import Dropzone from 'react-dropzone';
import _ from 'lodash';
import StarRatingComponent from 'react-star-rating-component';
import DatePicker from 'react-datepicker';
import ReactQuill from 'react-quill';
import { SERVER_BASE_URL } from '../constants/consts';
import noImg from 'img/common/no-img.png'

export const InputField = (props) => {
    const { label, input, meta, wrapperClass, className, labelClass, placeholder, errorClass, type, disabled } = props;
    return (
        <div
            className={
                `${wrapperClass} ${(meta.touched && meta.error) ? 'has-error' : ''}`
            }
        >
            <label htmlFor={input.name} className={labelClass}>{label}</label>
            <input
                {...input}
                type={type ? type : 'text'}
                disabled={disabled ? disabled : false}
                className={className}
                placeholder={placeholder}
            />
            {meta.touched &&
                ((meta.error && <div className={errorClass}>{meta.error}</div>) || (meta.warning && <span className={warningClass}>{meta.warning}</span>))
            }
        </div>
    );
}

export const RadioFields = (props) => {
    const {
        label,
        input,
        meta,
        wrapperClass,
        className,
        labelClass,
        errorClass,
        type,
        radioList,
        checked,
        handleChange
    } = props;
    return (
        <div className={wrapperClass}>
            <label htmlFor={input.name} className={labelClass}>{label}</label>
            {
                radioList.map((obj, index) => {
                    return (
                        <div key={index}>
                            <input
                                {...input}
                                type="radio"
                                checked={(obj.value === checked)}
                                value={obj.value}
                                className={className}
                                onChange={(e) => handleChange(e.target.value)}
                            /> <span>{obj.label}</span>
                        </div>
                    );
                })
            }
            {meta.touched &&
                ((meta.error && <span className={errorClass}>{meta.error}</span>) || (meta.warning && <span className={warningClass}>{meta.warning}</span>))
            }
        </div>
    );
}

export const TextAreaField = (props) => {
    const { label, input, meta, wrapperClass, className, labelClass, placeholder, errorClass } = props;
    return (
        <div
            className={
                `${wrapperClass} ${(meta.touched && meta.error) ? 'has-error' : ''}`
            }
        >
            <label htmlFor={input.name} className={labelClass}>{label}</label>
            <textarea
                {...input}
                className={className}
                placeholder={placeholder}
            />
            {meta.touched &&
                ((meta.error && <div className={errorClass}>{meta.error}</div>) || (meta.warning && <span className={warningClass}>{meta.warning}</span>))
            }
        </div>
    );
}

export const CheckboxField = (props) => {
    const {
        label,
        input,
        meta,
        wrapperClass,
        className,
        labelClass,
        placeholder,
        errorClass,
        checked,
        handleClick,
        fieldLabel,
        id
    } = props;
    return (
        <div className={wrapperClass}>
            <input
                {...input}
                id={id}
                type="checkbox"
                className={className}
                placeholder={placeholder}
                checked={checked}
                onClick={(e) => handleClick(e.target.checked)}
            />
            <label htmlFor={input.name} className={labelClass}>{label}</label>
            {meta.touched &&
                ((meta.error && <span className={errorClass}>{meta.error}</span>) || (meta.warning && <span className={warningClass}>{meta.warning}</span>))
            }
        </div>
    );
}

export const SelectField_ReactSelect = (props) => {
    const { label, input, meta, wrapperClass, className, labelClass, placeholder, errorClass, initialValue, options, clearable } = props;
    let val = '';
    if (input.value && Object.keys(input.value).length > 0) {
        val = input.value;
    } else if (initialValue) {
        val = initialValue;
    }
    return (
        <div
            className={
                `${wrapperClass} ${(meta.touched && meta.error) ? 'has-error' : ''}`
            }
        >
            <label htmlFor={input.name} className={labelClass}>{label}</label>
            <Select
                {...input}
                value={val}
                options={options}
                className={className}
                placeholder={placeholder}
                onChange={(value) => input.onChange(value)}
                onBlur={() => input.onBlur({ ...input.value })}
                multi={false}
                clearable={clearable ? clearable : true}
            />
            {meta.touched &&
                ((meta.error && <div className={errorClass}>{meta.error}</div>) || (meta.warning && <span className={warningClass}>{meta.warning}</span>))
            }
        </div>
    );
}

export const SelectField_ReactSelectMulti = (props) => {
    const { label, input, meta, wrapperClass, className, labelClass, placeholder, errorClass, initialValue, options } = props;
    let val = '';
    if (input.value && Object.keys(input.value).length > 0) {
        val = input.value;
    } else if (initialValue) {
        val = initialValue;
    }
    return (
        <div
            className={
                `${wrapperClass} ${(meta.touched && meta.error) ? 'has-error' : ''}`
            }
        >
            <label htmlFor={input.name} className={labelClass}>{label}</label>
            <Select
                {...input}
                value={val}
                options={options}
                className={className}
                placeholder={placeholder}
                onChange={(value) => input.onChange(value)}
                onBlur={() => input.onBlur([...input.value])}
                multi={true}
                clearable={false}
            />
            {meta.touched &&
                ((meta.error && <div className={errorClass}>{meta.error}</div>) || (meta.warning && <span className={warningClass}>{meta.warning}</span>))
            }
        </div>
    );
}

export class FileField_Dropzone_Single extends Component {
    render() {
        const {
            label,
            input,
            meta,
            mainWrapperClass,
            wrapperClass,
            className,
            labelClass,
            errorClass,
            accept,
            existingImages
        } = this.props;
        let filesArr = _.values(input.value);
        let images = [];
        let _existingImages = [];
        _.forEach(existingImages, (path, key) => {
            if (path) {
                _existingImages.push(
                    <div className="image-preview-wrapper" key={key}>
                        <img
                            src={SERVER_BASE_URL + path}
                            alt="Image"
                            onError={(e) => {
                                e.target.src = noImg
                            }}
                        />
                    </div>
                )
            }
        });
        _.forEach(filesArr, (file, key) => {
            images.push(
                <div className="image-preview-wrapper" key={key}>
                    <img src={file.preview} />
                </div>
            )
        })
        return (
            <div className={mainWrapperClass}>
                <label htmlFor={input.name} className={labelClass}>{label}</label>
                {_existingImages}
                {input.value && images}
                <div className={wrapperClass}>
                    <Dropzone
                        {...input}
                        accept={accept ? accept : "image/jpeg, image/png, image/jpg, image/gif"}
                        onDrop={(filesToUpload, e) => input.onChange(filesToUpload)}
                        multiple={false}
                        className={className}
                    ></Dropzone>
                    {meta.touched &&
                        ((meta.error && <span className={errorClass}>{meta.error}</span>) || (meta.warning && <span className={warningClass}>{meta.warning}</span>))
                    }
                </div>
            </div>
        );
    }
}

export class FileField_Dropzone_Multi extends Component {
    render() {
        const {
            label,
            input,
            meta,
            mainWrapperClass,
            wrapperClass,
            className,
            labelClass,
            errorClass,
            accept,
            existingImages,
            showExistingImageDeleteModel,
        } = this.props;
        let filesArr = _.values(input.value);
        let images = [];
        let _existingImages = [];
        _.forEach(existingImages, (path, key) => {
            if (path) {
                _existingImages.push(
                    <div className="image-preview-wrapper dropzone-image-preview-wrapper" key={key}>
                        <img
                            src={SERVER_BASE_URL + path}
                            className="image"
                            alt="Image"
                            onError={(e) => {
                                e.target.src = noImg
                            }}
                        />
                        <div className="middle">
                            <button type="button" className="btn btn-danger no-margin" onClick={() => showExistingImageDeleteModel(path)}>Delete</button>
                        </div>
                    </div>
                )
            }
        });
        _.forEach(filesArr, (file, key) => {
            images.push(
                <div className="image-preview-wrapper" key={key}>
                    <img src={file.preview} />
                </div>
            )
        })
        return (
            <div className={mainWrapperClass}>
                <label htmlFor={input.name} className={labelClass}>{label}</label>
                {_existingImages}
                {input.value && images}
                <div className={wrapperClass}>
                    <Dropzone
                        {...input}
                        accept={accept ? accept : "image/jpeg, image/png, image/jpg, image/gif"}
                        onDrop={(filesToUpload, e) => input.onChange(filesToUpload)}
                        multiple={true}
                        className={className}
                    ></Dropzone>
                    {meta.touched &&
                        ((meta.error && <span className={errorClass}>{meta.error}</span>) || (meta.warning && <span className={warningClass}>{meta.warning}</span>))
                    }
                </div>
            </div>
        );
    }
}

export const FileField_Dropzone = (props) => {
    const { label, input, meta, wrapperClass, className, labelClass, errorClass, accept, multiple } = props;
    let filesArr = _.values(input.value);
    let images = [];
    _.forEach(filesArr, (file, key) => {
        images.push(
            <div className="images-preview-wrapper" key={key}>
                <div className="image-preview">
                    <img src={file.preview} />
                </div>
            </div>
        )
    })
    return (
        <div className={wrapperClass}>
            <label htmlFor={input.name} className={labelClass}>{label}</label>
            <Dropzone
                {...input}
                accept={accept ? accept : "image/jpeg, image/png, image/jpg, image/gif"}
                onDrop={(filesToUpload, e) => input.onChange(filesToUpload)}
                multiple={multiple ? multiple : false}
                className={className}
            >
                <div className="dropzone-image-preview-wrapper">
                    {input.value && images}
                </div>
            </Dropzone>
            {meta.touched &&
                ((meta.error && <span className={errorClass}>{meta.error}</span>) || (meta.warning && <span className={warningClass}>{meta.warning}</span>))
            }
        </div>
    );
}

export const StarRating = (props) => {
    const {
        label,
        input,
        meta,
        wrapperClass,
        labelClass,
        errorClass,
        starCount,
        onStarClick,
        starRating
    } = props;
    return (
        <div className={wrapperClass}>
            <label htmlFor={input.name} className={labelClass}>{label}</label>
            <StarRatingComponent
                {...input}
                starCount={starCount}
                value={parseInt(starRating)}
                onStarClick={(value) => (onStarClick(input.name, value))}
                initialRate={starRating}
            />
            {meta.touched &&
                ((meta.error && <span className={errorClass}>{meta.error}</span>) || (meta.warning && <span className={warningClass}>{meta.warning}</span>))
            }
        </div>
    );
}

export const DateField = (props) => {
    const {
        label,
        input,
        meta,
        wrapperClass,
        className,
        labelClass,
        placeholder,
        errorClass,
        selectedDate,
        handleChange,
        dateFormat,
    } = props;
    return (
        <div className={wrapperClass}>
            <label htmlFor={input.name} className={labelClass}>{label}</label>
            <DatePicker
                selected={selectedDate}
                onChange={handleChange}
                dateFormat={dateFormat ? dateFormat : "MM/DD/YYYY"}
                className={className}
                placeholderText={placeholder}
            />
            {meta.touched &&
                ((meta.error && <span className={errorClass}>{meta.error}</span>) || (meta.warning && <span className={warningClass}>{meta.warning}</span>))
            }
        </div>
    );
}

export const EditorField = (props) => {
    const {
        label,
        input,
        meta,
        wrapperClass,
        className,
        labelClass,
        placeholder,
        errorClass,
        type,
        handleChange
    } = props;
    return (
        <div className={wrapperClass}>
            <label htmlFor={input.name} className={labelClass}>{label}</label>
            <ReactQuill
                {...input}
                value={input.value ? input.value : ''}
                onChange={(content, delta, source, editor) => handleChange(content)}
                onBlur={(content) => { return content }}
                className={className}
                placeholder={placeholder}
            />
            {meta.touched &&
                ((meta.error && <span className={errorClass}>{meta.error}</span>) || (meta.warning && <span className={warningClass}>{meta.warning}</span>))
            }
        </div>
    );
}
