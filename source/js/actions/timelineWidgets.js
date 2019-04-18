export const GET_TIMELINE_WIDGETS_AND_WIDGETS_DATA_REQUEST = 'GET_TIMELINE_WIDGETS_AND_WIDGETS_DATA_REQUEST';
export const GET_TIMELINE_WIDGETS_AND_WIDGETS_DATA_SUCCESS = 'GET_TIMELINE_WIDGETS_AND_WIDGETS_DATA_SUCCESS';
export const GET_TIMELINE_WIDGETS_AND_WIDGETS_DATA_ERROR = 'GET_TIMELINE_WIDGETS_AND_WIDGETS_DATA_ERROR';

export const SAVE_TIMELINE_WIDGETS_REQUEST = 'SAVE_TIMELINE_WIDGETS_REQUEST';
export const SAVE_TIMELINE_WIDGETS_SUCCESS = 'SAVE_TIMELINE_WIDGETS_SUCCESS';
export const SAVE_TIMELINE_WIDGETS_ERROR = 'SAVE_TIMELINE_WIDGETS_ERROR';

export const CHANGE_TIMELINE_BODY_FAT_WIDGET_REQUEST = 'CHANGE_TIMELINE_BODY_FAT_WIDGET_REQUEST';
export const CHANGE_TIMELINE_BODY_FAT_WIDGET_SUCCESS = 'CHANGE_TIMELINE_BODY_FAT_WIDGET_SUCCESS';
export const CHANGE_TIMELINE_BODY_FAT_WIDGET_ERROR = 'CHANGE_TIMELINE_BODY_FAT_WIDGET_ERROR';

export const CHANGE_TIMELINE_MUSCLE_INNER_DATA_REQUEST = 'CHANGE_TIMELINE_MUSCLE_INNER_DATA_REQUEST';
export const CHANGE_TIMELINE_MUSCLE_INNER_DATA_SUCCESS = 'CHANGE_TIMELINE_MUSCLE_INNER_DATA_SUCCESS';
export const CHANGE_TIMELINE_MUSCLE_INNER_DATA_ERROR = 'CHANGE_TIMELINE_MUSCLE_INNER_DATA_ERROR';

export const SET_TIMELINE_WIDGET_DATA = 'SET_TIMELINE_WIDGET_DATA';

export function getTimelineWidgetsAndWidgetsDataRequest(username) {
    return {
        type: GET_TIMELINE_WIDGETS_AND_WIDGETS_DATA_REQUEST,
        username
    };
}

export function getTimelineWidgetsAndWidgetsDataSuccess(data) {
    return {
        type: GET_TIMELINE_WIDGETS_AND_WIDGETS_DATA_SUCCESS,
        data
    };
}

export function getTimelineWidgetsAndWidgetsDataError(error) {
    return {
        type: GET_TIMELINE_WIDGETS_AND_WIDGETS_DATA_ERROR,
        error
    };
}

export function saveTimelineWidgetsRequest(requestData) {
    return {
        type: SAVE_TIMELINE_WIDGETS_REQUEST,
        requestData
    };
}

export function saveTimelineWidgetsSuccess(data) {
    return {
        type: SAVE_TIMELINE_WIDGETS_SUCCESS,
        data
    };
}

export function saveTimelineWidgetsError(error) {
    return {
        type: SAVE_TIMELINE_WIDGETS_ERROR,
        error
    };
}

export function changeTimelineBodyFatWidgetRequest(requestData) {
    return {
        type: CHANGE_TIMELINE_BODY_FAT_WIDGET_REQUEST,
        requestData
    }
}

export function changeTimelineBodyFatWidgetSuccess(data) {
    return {
        type: CHANGE_TIMELINE_BODY_FAT_WIDGET_SUCCESS,
        data
    }
}

export function changeTimelineBodyFatWidgetError(error) {
    return {
        type: CHANGE_TIMELINE_BODY_FAT_WIDGET_ERROR,
        error
    }
}

export function changeTimelineMuscleInnerDataRequest(requestData) {
    return {
        type: CHANGE_TIMELINE_MUSCLE_INNER_DATA_REQUEST,
        requestData
    }
}

export function changeTimelineMuscleInnerDataSuccess(data) {
    return {
        type: CHANGE_TIMELINE_MUSCLE_INNER_DATA_SUCCESS,
        data
    }
}

export function changeTimelineMuscleInnerDataError(error) {
    return {
        type: CHANGE_TIMELINE_MUSCLE_INNER_DATA_ERROR,
        error
    }
}

export function setTimeLineWidgetData(data) {
    return {
        type: SET_TIMELINE_WIDGET_DATA,
        data
    }
}
