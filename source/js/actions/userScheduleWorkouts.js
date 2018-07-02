export const SET_SELECTED_SLOT_FROM_CALENDAR = 'SET_SELECTED_SLOT_FROM_CALENDAR';

export function setSelectedSlotFromCalendar(slotInfo = null) {
    return {
        type: SET_SELECTED_SLOT_FROM_CALENDAR,
        slotInfo,
    }
}