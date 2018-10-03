import _ from 'lodash';
export const required = (value) => {
    if (!value) {
        return "Field is required";
    }
    return undefined;
}

export const validNumber = (value) => {
    if (value && !/^\d+(?:\.\d{1,})?$/i.test(value)) {
        return "Field should contain only numeric values.";
    }
    return undefined;
}

export const requiredReactSelect = (value) => {
    if (!value || !value.value) {
        return "Field is required";
    }
    return undefined;
}

export const requiredReactSelectStatus = (value) => {
    if (!value || Object.keys(value).length <= 0 || value.value === '') {
        return "Field is required";
    }
    return undefined;
}

export const requiredReactSelectMulti = (value) => {
    if (!value || !_.isArray(value) || _.isEmpty(value)) {
        return "Field is required";
    }
    return undefined;
}

export const requiredImage = (value) => {
    if (!value || typeof value === 'undefined' || Object.keys(value).length <= 0) {
        return "Field is required";
    }
    return undefined;
}

export const validImage = (value) => {
    let isError = false;
    if (value) {
        Array.from(value).forEach(file => {
            if (file.type !== 'image/jpeg' || file.type !== 'image/jpg' || file.type !== 'image/gif' || file.type !== 'image/png') {
                isError = true;
            }
        });
    }
    if (isError) {
        return "Invalid File. Please select jpg, png, gif only";
    }
    return undefined;
}

export const email = (value) => {
    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,5}$/i.test(value)) {
        return "Invalid email address";
    }
    return undefined;
}

export const mobile = (value) => {
    if (value && !/^(\+\d{1,3}[- ]?)?\d{6,15}$/i.test(value)) {
        return "Invalid mobile number";
    }
    return undefined;
}

export const maxLength = (max) => (value) => {
    if (value && value.length > max) {
        return "Length must be less than or equal to " + max
    }
    return undefined;
}

export const minLength = (min) => (value) => {
    if (value && value.length < min) {
        return "Length must be more than or equal to " + min
    }
    return undefined;
}

export const max = (max) => (value) => {
    if (value && value > max) {
        return "Value must be less than or equal to " + max
    }
    return undefined;
}

export const min = (min) => (value) => {
    if (value && value < min) {
        return "Value must be more than or equal to " + min
    }
    return undefined;
}