export const GET_TIMELINE_WIDGETS_AND_WIDGETS_DATA_REQUEST = 'GET_TIMELINE_WIDGETS_AND_WIDGETS_DATA_REQUEST';
export const GET_TIMELINE_WIDGETS_AND_WIDGETS_DATA_SUCCESS = 'GET_TIMELINE_WIDGETS_AND_WIDGETS_DATA_SUCCESS';
export const GET_TIMELINE_WIDGETS_AND_WIDGETS_DATA_ERROR = 'GET_TIMELINE_WIDGETS_AND_WIDGETS_DATA_ERROR';

export function getTimelineWidgetsAndWidgetsDataRequest() {
    return {
        type: GET_TIMELINE_WIDGETS_AND_WIDGETS_DATA_REQUEST
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