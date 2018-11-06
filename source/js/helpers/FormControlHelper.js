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
    const { label, input, meta, wrapperClass, className, labelClass, placeholder, errorClass, type, disabled, properties, autoComplete, requiredAstrisk } = props;
    return (
        <div
            className={
                `${wrapperClass} ${(meta.touched && meta.error) ? 'has-error' : ''}`
            }
        >
            <label htmlFor={input.name} className={labelClass}>{label} {requiredAstrisk && <span style={{ color: "red" }}>*</span>}</label>
            <input
                {...input}
                type={type ? type : 'text'}
                disabled={disabled ? disabled : false}
                className={className}
                placeholder={placeholder}
                autoComplete={(autoComplete) ? autoComplete : 'off'}
                {...properties}
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
        handleChange,
        requiredAstrisk
    } = props;
    return (
        <div className={wrapperClass}>
            <label htmlFor={input.name} className={labelClass}>{label} {requiredAstrisk && <span style={{ color: "red" }}>*</span>}</label>
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
    const { label, input, meta, wrapperClass, className, labelClass, placeholder, errorClass, requiredAstrisk } = props;
    return (
        <div
            className={
                `${wrapperClass} ${(meta.touched && meta.error) ? 'has-error' : ''}`
            }
        >
            <label htmlFor={input.name} className={labelClass}>{label} {requiredAstrisk && <span style={{ color: "red" }}>*</span>}</label>
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
        id,
        requiredAstrisk
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
            <label htmlFor={input.name} className={labelClass}>{label} {requiredAstrisk && <span style={{ color: "red" }}>*</span>}</label>
            {meta.touched &&
                ((meta.error && <span className={errorClass}>{meta.error}</span>) || (meta.warning && <span className={warningClass}>{meta.warning}</span>))
            }
        </div>
    );
}

export const SelectField_ReactSelect = (props) => {
    const { label, input, meta, wrapperClass, className, labelClass, placeholder, errorClass, initialValue, options, clearable, requiredAstrisk } = props;
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
            <label htmlFor={input.name} className={labelClass}>{label} {requiredAstrisk && <span style={{ color: "red" }}>*</span>}</label>
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
    const { label, input, meta, wrapperClass, className, labelClass, placeholder, errorClass, initialValue, options, requiredAstrisk } = props;
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
            <label htmlFor={input.name} className={labelClass}>{label} {requiredAstrisk && <span style={{ color: "red" }}>*</span>}</label>
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
    constructor(props) {
        super(props);
        this.isFileSelected = false;
        this.rejectedFiles = false;
    }

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
            requiredAstrisk,
            alt
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
                    <img src={file.preview} alt={alt ? alt : ''} />
                </div>
            )
        })
        return (
            <div
                className={
                    `${mainWrapperClass} ${(meta.touched && meta.error) ? 'has-error' : ''} ${this.rejectedFiles ? 'has-error' : ''}`
                }
            >
                <label htmlFor={input.name} className={labelClass}>{label} {requiredAstrisk && <span style={{ color: "red" }}>*</span>}</label>
                <div className="image-form-flex-wrapper">
                    {_existingImages}
                    <div
                        className={
                            `${wrapperClass} ${(meta.touched && meta.error) ? 'has-error' : ''} ${this.rejectedFiles ? 'has-error' : ''}`
                        }
                    >
                        <Dropzone
                            {...input}
                            accept={accept ? accept : "image/jpeg, image/png, image/jpg"}
                            onClick={() => this.isFileSelected = false}
                            onDrop={(filesToUpload, rejectedFiles) => {
                                this.rejectedFiles = (rejectedFiles && rejectedFiles.length > 0);
                                if (filesToUpload && filesToUpload.length > 0) {
                                    this.isFileSelected = true;
                                }
                                input.onChange(filesToUpload);
                            }}
                            onFileDialogCancel={() => {
                                if (!this.isFileSelected) {
                                    input.onChange('');
                                }
                            }}
                            multiple={false}
                            className={className ? className : 'default-dropzone-wrapper'}
                        >
                            {input.value && images}
                            {!input.value &&
                                <div className="dz-singl-default-wrapper">
                                    <i className="icon-add_a_photo"></i>
                                    <span>Select Image</span>
                                </div>
                            }
                        </Dropzone>
                        {meta.touched &&
                            ((meta.error && <span className={errorClass ? errorClass : 'help-block'}>{meta.error}</span>) || (meta.warning && <span className={warningClass ? warningClass : 'help-block'}>{meta.warning}</span>))
                        }
                        {this.rejectedFiles &&
                            <span className={errorClass ? errorClass : 'help-block'}>Invalid file(s). Please select jpg and png only.</span>
                        }
                    </div>
                </div>
            </div>
        );
    }
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
        requiredAstrisk,
        className
    } = props;
    return (
        <div
            className={
                `${wrapperClass} ${(meta.touched && meta.error) ? 'has-error' : ''}`
            }
        >
            <label htmlFor={input.name} className={labelClass}>{label} {requiredAstrisk && <span style={{ color: "red" }}>*</span>}</label>
            <StarRatingComponent
                {...input}
                starRating={input.value}
                starCount={starCount}
                onStarClick={(value) => input.onChange(value)}
                className={className ? className : ''}
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
        showYearDropdown,
        showMonthDropdown,
        scrollableYearDropdown,
        dropdownMode,
        requiredAstrisk
    } = props;
    return (
        <div className={wrapperClass}>
            <label htmlFor={input.name} className={labelClass}>{label} {requiredAstrisk && <span style={{ color: "red" }}>*</span>}</label>
            <DatePicker
                {...props}
                selected={selectedDate}
                onChange={handleChange}
                dateFormat={dateFormat ? dateFormat : "DD/MM/YYYY"}
                className={className}
                placeholderText={placeholder}
                showYearDropdown={(showYearDropdown) ? showYearDropdown : true}
                showMonthDropdown={(showMonthDropdown) ? showMonthDropdown : true}
                scrollableYearDropdown={(scrollableYearDropdown) ? scrollableYearDropdown : true}
                dropdownMode={(dropdownMode) ? dropdownMode : 'select'}
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
        handleChange,
        requiredAstrisk
    } = props;
    return (
        <div
            className={
                `${wrapperClass} ${(meta.touched && meta.error) ? 'has-error' : ''}`
            }
        >
            <label htmlFor={input.name} className={labelClass}>{label} {requiredAstrisk && <span style={{ color: "red" }}>*</span>}</label>
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
