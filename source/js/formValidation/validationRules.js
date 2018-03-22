export const required = (value) => {
    if (!value) {
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