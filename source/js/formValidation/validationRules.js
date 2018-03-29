export const required = (value) => {
    if (typeof value !== 'undefined' && !value.trim()) {
        return "Field is required";
    }
    return undefined;
}

export const email = (value) => {
    if (!value || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,5}$/i.test(value)) {
        return "Invalid email address";
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