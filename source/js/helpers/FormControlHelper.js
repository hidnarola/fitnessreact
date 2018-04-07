import React, { Component } from 'react';
import Select from 'react-select';
import Dropzone from 'react-dropzone';
import _ from 'lodash';
import StarRatingComponent from 'react-star-rating-component';

export const InputField = (props) => {
    const { label, input, meta, wrapperClass, className, labelClass, placeholder, errorClass } = props;
    return (
        <div className={wrapperClass}>
            <label htmlFor={input.name} className={labelClass}>{label}</label>
            <input
                {...input}
                className={className}
                placeholder={placeholder}
            />
            {meta.touched &&
                ((meta.error && <span className={errorClass}>{meta.error}</span>) || (meta.warning && <span className={warningClass}>{meta.warning}</span>))
            }
        </div>
    );
}

export const TextAreaField = (props) => {
    const { label, input, meta, wrapperClass, className, labelClass, placeholder, errorClass } = props;
    return (
        <div className={wrapperClass}>
            <label htmlFor={input.name} className={labelClass}>{label}</label>
            <textarea
                {...input}
                className={className}
                placeholder={placeholder}
            />
            {meta.touched &&
                ((meta.error && <span className={errorClass}>{meta.error}</span>) || (meta.warning && <span className={warningClass}>{meta.warning}</span>))
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
        handleClick
    } = props;
    return (
        <div className={wrapperClass}>
            <label htmlFor={input.name} className={labelClass}>{label}</label>
            <input
                {...input}
                type="checkbox"
                className={className}
                placeholder={placeholder}
                checked={checked}
                onClick={(e) => handleClick(e.target.checked)}
            />
            {meta.touched &&
                ((meta.error && <span className={errorClass}>{meta.error}</span>) || (meta.warning && <span className={warningClass}>{meta.warning}</span>))
            }
        </div>
    );
}

export const SelectField_ReactSelect = (props) => {
    const { label, input, meta, wrapperClass, className, labelClass, placeholder, errorClass, initialValue, options } = props;
    let val = '';
    if (input.value && Object.keys(input.value).length > 0) {
        val = input.value;
    } else if (initialValue) {
        val = initialValue;
    }
    return (
        <div className={wrapperClass}>
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
                clearable={false}
            />
            {meta.touched &&
                ((meta.error && <span className={errorClass}>{meta.error}</span>) || (meta.warning && <span className={warningClass}>{meta.warning}</span>))
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
        <div className={wrapperClass}>
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
                ((meta.error && <span className={errorClass}>{meta.error}</span>) || (meta.warning && <span className={warningClass}>{meta.warning}</span>))
            }
        </div>
    );
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