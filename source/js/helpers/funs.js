import { LOCALSTORAGE_TOKEN_ITEM_KEY } from "../constants/consts";
import _ from 'lodash';

export function extraHeaders() {
    const token = localStorage.getItem(LOCALSTORAGE_TOKEN_ITEM_KEY);
    let headers = {
        'x-access-token': token,
    };
    return headers;
}

export function prepareDropdownOptionsData(data, valueKey, labelKey) {
    let ddData = _.mapValues(data, (o) => { return { value: o[valueKey], label: o[labelKey] } });
    return _.values(ddData);
}

export function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
}