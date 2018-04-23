import React, { Component } from "react";
import { LOCALSTORAGE_ACCESS_TOKEN_KEY } from "../constants/consts";
import _ from 'lodash';
import { AUTH_CONFIG } from "../auth/auth0-variables";
import { toast } from "react-toastify";
import { FaCheck } from 'react-icons/lib/fa';

export function extraHeaders() {
    const token = localStorage.getItem(LOCALSTORAGE_ACCESS_TOKEN_KEY);
    let headers = {
        'x-access-token': token,
    };
    return headers;
}

export function extraUserHeaders() {
    const token = localStorage.getItem(LOCALSTORAGE_ACCESS_TOKEN_KEY);
    let headers = {
        'authorization': `${AUTH_CONFIG.tokenType} ${token}`,
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

export function generateDTTableFilterObj(state, instance) {
    const { pageSize, page, filtered, sorted, columns } = state;
    let columnFilter = [];
    let columnSort = [];
    _.forEach(columns, (column) => {
        if (typeof column.id !== 'undefined') {
            if (filtered && filtered.length > 0) {
                let filterObj = _.find(filtered, (o) => {
                    return o.id === column.id;
                });
                if (typeof filterObj !== 'undefined') {
                    if (column.filterEqual) {
                        filterObj['isEqualFlag'] = true;
                    } else if (column.filterDigit) {
                        filterObj['isDigitFlag'] = true;
                    }

                    if (column.convertBoolean) {
                        filterObj.value = (filterObj.value == 'true');
                    }
                    columnFilter.push(filterObj);
                }
            }
        }
    });

    if (sorted && sorted.length > 0) {
        _.forEach(sorted, (sort) => {
            columnSort.push(sort);
        });
    }

    const filterData = {
        pageSize,
        page,
        columnFilter,
        columnSort,
    }

    return filterData;
}

export function ts(msg = 'Success') {
    toast.success(
        <span>
            <FaCheck /> {msg}
        </span>
    );
}