import React, { Component } from "react";
import { LOCALSTORAGE_ACCESS_TOKEN_KEY } from "../constants/consts";
import _ from 'lodash';
import moment from "moment";
import { AUTH_CONFIG } from "../auth/auth0-variables";
import { toast } from "react-toastify";
import { FaCheck, FaFrownO } from 'react-icons/lib/fa';
import $ from 'jquery';

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

export function te(msg = 'Something went wrong!') {
    toast.error(
        <span>
            <FaFrownO /> {msg}
        </span>
    );
}

export function convertMinsToTime(_mins) {
    var hours = Math.floor((_mins / 60)).toString();
    var mins = (_mins - (hours * 60)).toString();
    return moment(hours + ':' + mins, 'HH:mm')
}

export function convertTimeToMins(momentObj) {
    var hours = parseInt(momentObj.hours());
    var mins = parseInt(momentObj.minutes());
    return ((hours * 60) + mins);
}

export function generateValidationErrorMsgArr(errors) {
    var errorMsgs = [];
    _.forEach(errors, (err) => {
        if (err.msg) {
            errorMsgs.push(err.msg);
        }
    });
    return errorMsgs;
}

export function focusToControl(divId) {
    var divOffsetTop = $(document).find(divId).offset().top;
    divOffsetTop -= 130;
    $('html, body, document, window').animate({ scrollTop: divOffsetTop }, 'slow');
}

export function toggleSideMenu(id, show) {
    if (show) {
        $(`#${id}`).toggle({ direction: "left" });
    } else {
        $(`#${id}`).toggle({ direction: "right" });
    }
}