import React, { Component } from "react";
import ReactDOMServer from "react-dom/server";
import {
    LOCALSTORAGE_ACCESS_TOKEN_KEY,
    MEASUREMENT_UNIT_INCH,
    MEASUREMENT_UNIT_CENTIMETER,
    MEASUREMENT_UNIT_METER,
    MEASUREMENT_UNIT_FEET,
    MEASUREMENT_UNIT_POUND,
    MEASUREMENT_UNIT_GRAM,
    MEASUREMENT_UNIT_MILIGRAM,
    MEASUREMENT_UNIT_KILOGRAM,
    LOCALSTORAGE_USER_DETAILS_KEY,
    FITASSIST_USER_DETAILS_TOKEN_KEY,
    EXE_MEASUREMENT_UNITS,
    GENDER_FEMALE,
    REGEX_FOR_EMOJI_COLONS,
} from "../constants/consts";
import _ from 'lodash';
import moment from "moment";
import { AUTH_CONFIG } from "../auth/auth0-variables";
import { toast } from "react-toastify";
import { FaCheck, FaFrownO } from 'react-icons/lib/fa';
import $ from 'jquery';
import jwt from "jwt-simple";
import { Emoji } from "emoji-mart";

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

export function getToken() {
    const token = localStorage.getItem(LOCALSTORAGE_ACCESS_TOKEN_KEY);
    return token;
}

export function getLocalhostUserDetails() {
    const encryptedDetails = localStorage.getItem(LOCALSTORAGE_USER_DETAILS_KEY);
    return jwt.decode(encryptedDetails, FITASSIST_USER_DETAILS_TOKEN_KEY);
}

export function prepareDropdownOptionsData(data, valueKey, labelKey) {
    let ddData = _.mapValues(data, (o) => { return { value: o[valueKey], label: o[labelKey] } });
    return _.values(ddData);
}

export function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
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

export function scrollBottom(divId, animateSpeed = 'fast') {
    var scrollHeight = $(divId).prop('scrollHeight');
    scrollHeight += 130;
    $(divId).animate({ scrollTop: scrollHeight }, animateSpeed);
}

export function toggleSideMenu(id, show) {
    if (show) {
        $(`#${id}`).toggle({ direction: "left" });
    } else {
        $(`#${id}`).toggle({ direction: "right" });
    }
}

export function toggleSmallChatWindow(id) {
    $(`#${id}`).slideToggle(300, 'swing');
}

export function slideToBottomOfChatWindow(channelId) {
    var elem = $(`#chat-history_${channelId}`);
    // this is done because last child is added then we need to scroll so scroll hight increases so we need last child height also
    var lastChildInnerHeight = elem.children().last().innerHeight();
    lastChildInnerHeight += 16; // as inner div contains 16px margin;
    if (elem.scrollTop() + elem.innerHeight() + lastChildInnerHeight >= elem[0].scrollHeight) {
        scrollBottom(`#chat-history_${channelId}`, 'slow');
    }
}

export function convertUnits(from, to, value) {
    var result = value;
    switch (from) {
        case MEASUREMENT_UNIT_INCH:
            switch (to) {
                case MEASUREMENT_UNIT_CENTIMETER:
                    result = value * 2.54;
                    break;
                case MEASUREMENT_UNIT_METER:
                    result = value * 0.0254;
                    break;
                case MEASUREMENT_UNIT_FEET:
                    result = value * 0.0833333;
                    break;
            }
            break;
        case MEASUREMENT_UNIT_CENTIMETER:
            switch (to) {
                case MEASUREMENT_UNIT_INCH:
                    result = value * 0.393701;
                    break;
                case MEASUREMENT_UNIT_METER:
                    result = value * 0.01;
                    break;
                case MEASUREMENT_UNIT_FEET:
                    result = value * 0.0328084;
                    break;
            }
            break;
        case MEASUREMENT_UNIT_METER:
            switch (to) {
                case MEASUREMENT_UNIT_INCH:
                    result = value * 39.3701;
                    break;
                case MEASUREMENT_UNIT_CENTIMETER:
                    result = value * 100;
                    break;
                case MEASUREMENT_UNIT_FEET:
                    result = value * 3.28084;
                    break;
            }
            break;
        case MEASUREMENT_UNIT_FEET:
            switch (to) {
                case MEASUREMENT_UNIT_INCH:
                    result = value * 12;
                    break;
                case MEASUREMENT_UNIT_CENTIMETER:
                    result = value * 30.48;
                    break;
                case MEASUREMENT_UNIT_METER:
                    result = value * 0.3048;
                    break;
            }
            break;
        case MEASUREMENT_UNIT_GRAM:
            switch (to) {
                case MEASUREMENT_UNIT_MILIGRAM:
                    result = value * 1000;
                    break;
                case MEASUREMENT_UNIT_KILOGRAM:
                    result = value * 0.001;
                    break;
                case MEASUREMENT_UNIT_POUND:
                    result = value * 0.00220462;
                    break;
            }
            break;
        case MEASUREMENT_UNIT_MILIGRAM:
            switch (to) {
                case MEASUREMENT_UNIT_GRAM:
                    result = value * 0.001;
                    break;
            }
            break;
        case MEASUREMENT_UNIT_KILOGRAM:
            switch (to) {
                case MEASUREMENT_UNIT_POUND:
                    result = value * 2.20462;
                    break;
                case MEASUREMENT_UNIT_GRAM:
                    result = value * 1000;
                    break;
            }
            break;
        case MEASUREMENT_UNIT_POUND:
            switch (to) {
                case MEASUREMENT_UNIT_KILOGRAM:
                    result = value * 0.453592;
                    break;
                case MEASUREMENT_UNIT_GRAM:
                    result = value * 453.592;
                    break;
            }
            break;
    }
    return result;
}

export function prepareExerciseOptions(exercises) {
    let options = [];
    _.forEach(exercises, (o, i) => {
        options.push({
            value: o._id,
            label: o.name,
            cat: o.category,
            subCat: o.subCategory,
        });
    });
    return options;
}

export function prepareFieldsOptions(fieldData) {
    let options = [];
    _.forEach(fieldData, (o, i) => {
        let obj = _.find(EXE_MEASUREMENT_UNITS, ['value', o]);
        if (obj) {
            options.push(obj);
        }
    });
    return options;
}

export function getExeMeasurementValidationRules(value) {
    let selectedFieldUnit = null;
    if (value) {
        selectedFieldUnit = _.find(EXE_MEASUREMENT_UNITS, ['value', value]);
    }
    return selectedFieldUnit;
}

export function createNewStateForWorkout(workouts) {
    var newState = {};
    newState.workout = workouts;
    if (workouts && workouts.warmup && workouts.warmup.length > 0) {
        var lastIndex = workouts.warmup.length - 1;
        newState.workoutWarmupSequence = (typeof workouts.warmup[lastIndex].sequence !== 'undefined') ? workouts.warmup[lastIndex].sequence : -1;
    } else {
        newState.workoutWarmupSequence = -1;
    }
    if (workouts && workouts.exercise && workouts.exercise.length > 0) {
        var lastIndex = workouts.exercise.length - 1;
        newState.workoutSequence = (typeof workouts.exercise[lastIndex].sequence !== 'undefined') ? workouts.exercise[lastIndex].sequence : -1;
    } else {
        newState.workoutSequence = -1;
    }
    if (workouts && workouts.cooldown && workouts.cooldown.length > 0) {
        var lastIndex = workouts.cooldown.length - 1;
        newState.workoutCooldownSequence = (typeof workouts.cooldown[lastIndex].sequence !== 'undefined') ? workouts.cooldown[lastIndex].sequence : -1;
    } else {
        newState.workoutCooldownSequence = -1;
    }
    return newState;
}

export function calculateBodyFatPercentage(sumOf3Sites, age, gender) {
    var const1 = 495;
    var const2 = 1.10938;
    var const3 = 0.0008267;
    var const4 = 0.0000016;
    var const5 = 0.0002574;
    var const6 = 450;
    if (gender === GENDER_FEMALE) {
        const2 = 1.089733;
        const3 = 0.0009245;
        const4 = 0.0000025;
        const5 = 0.0000979;
    }
    return (const1 / (const2 - (const3 * sumOf3Sites) + (const4 * sumOf3Sites * sumOf3Sites) - (const5 * age)) - const6).toFixed(2);
}

export function clearCookies() {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

export function getElementOffsetRelativeToBody(el) {
    const rect = el.getBoundingClientRect();
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: (rect.top + scrollTop), left: (rect.left + scrollLeft), width: el.offsetWidth, height: el.offsetHeight }
}

export function replaceStringWithEmos(str, size = 16) {
    if (str) {
        str = str.replace(/contenteditable="false"/g, '')
        return str.replace(REGEX_FOR_EMOJI_COLONS, (match) => {
            return ReactDOMServer.renderToString(<Emoji emoji={match} set="emojione" size={size} />);
        });
    }
    return str;
}

export function sanitizeEditableContentValue(str = "") {
    let _str = str;
    if (str) {
        _str = _str.replace(/^(\&nbsp;|\ |<div><br><\/div>|<br>|<br \/>|<div>(&nbsp;|\ )*<\/div>)*/g, '');
        _str = _str.replace(/(\&nbsp;|\ |<div><br><\/div>|<br>|<br \/>|<div>(&nbsp;|\ )*<\/div>)*$/g, '');
    }
    return _str;
}

export function removeNBSP(str = "") {
    let _str = str;
    if (str) {
        _str = _str.replace(/&nbsp;/g, '');
    }
    return _str;
}

export function removeDivWithJustBr(str = "") {
    let _str = str;
    if (str) {
        _str = _str.replace(/<div><br><\/div>/g, '');
        _str = _str.replace(/<div><br \/><\/div>/g, '');
    }
    return _str;
}