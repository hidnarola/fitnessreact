export const CHANGE_USER_TIMELINE_WIDGETS_STATE = 'CHANGE_USER_TIMELINE_WIDGETS_STATE';

export function changeUserTimelineWidgetsState(stateName, stateData) {
    return {
        type: CHANGE_USER_TIMELINE_WIDGETS_STATE,
        stateName,
        stateData,
    };
}