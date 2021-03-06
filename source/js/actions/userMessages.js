export const GET_USER_MESSAGE_CHANNEL_REQUEST = 'GET_USER_MESSAGE_CHANNEL_REQUEST';
export const GET_USER_MESSAGE_CHANNEL_SUCCESS = 'GET_USER_MESSAGE_CHANNEL_SUCCESS';
export const GET_USER_MESSAGE_CHANNEL_ERROR = 'GET_USER_MESSAGE_CHANNEL_ERROR';

export const LOAD_MORE_USER_MESSAGE_CHANNEL_REQUEST = 'LOAD_MORE_USER_MESSAGE_CHANNEL_REQUEST';
export const LOAD_MORE_USER_MESSAGE_CHANNEL_SUCCESS = 'LOAD_MORE_USER_MESSAGE_CHANNEL_SUCCESS';
export const LOAD_MORE_USER_MESSAGE_CHANNEL_ERROR = 'LOAD_MORE_USER_MESSAGE_CHANNEL_ERROR';

export const OPEN_USER_CHAT_WINDOW_REQUEST = 'OPEN_USER_CHAT_WINDOW_REQUEST';
export const OPEN_USER_CHAT_WINDOW_SUCCESS = 'OPEN_USER_CHAT_WINDOW_SUCCESS';
export const OPEN_USER_CHAT_WINDOW_ERROR = 'OPEN_USER_CHAT_WINDOW_ERROR';

export const SEND_NEW_MESSAGE_REQUEST = 'SEND_NEW_MESSAGE_REQUEST';
export const SEND_NEW_MESSAGE_SUCCESS = 'SEND_NEW_MESSAGE_SUCCESS';
export const SEND_NEW_MESSAGE_ERROR = 'SEND_NEW_MESSAGE_ERROR';

export const RECEIVE_NEW_MESSAGE = 'RECEIVE_NEW_MESSAGE';

export const CLOSE_USER_CHAT_WINDOW = 'CLOSE_USER_CHAT_WINDOW';

export const MESSAGE_TYPING_RESPONSE = 'MESSAGE_TYPING_RESPONSE';

export const TOGGLE_CHAT_WINDOW_MINIMIZE = 'TOGGLE_CHAT_WINDOW_MINIMIZE';

export const SET_USER_MESSAGES_COUNT = 'SET_USER_MESSAGES_COUNT';

export const GET_CHANNEL_REQUEST = 'GET_CHANNEL_REQUEST';
export const GET_CHANNEL_RESPONSE = 'GET_CHANNEL_RESPONSE';

export const MOVE_TO_GROUND_USER_CHAT_WINDOW = 'MOVE_TO_GROUND_USER_CHAT_WINDOW';

export const SET_USER_MESSAGES_STATE = 'SET_USER_MESSAGES_STATE';
export const RESET_USER_MESSAGES_STATE = 'RESET_USER_MESSAGES_STATE';

export function getUserMessageChannelRequest(requestData) {
    return {
        type: GET_USER_MESSAGE_CHANNEL_REQUEST,
        requestData
    }
}

export function getUserMessageChannelSuccess(data) {
    return {
        type: GET_USER_MESSAGE_CHANNEL_SUCCESS,
        data,
    }
}

export function getUserMessageChannelError(error) {
    return {
        type: GET_USER_MESSAGE_CHANNEL_ERROR,
        error,
    }
}

export function loadMoreUserMessageChannelRequest(requestData) {
    return {
        type: LOAD_MORE_USER_MESSAGE_CHANNEL_REQUEST,
        requestData
    }
}

export function loadMoreUserMessageChannelSuccess(data) {
    return {
        type: LOAD_MORE_USER_MESSAGE_CHANNEL_SUCCESS,
        data,
    }
}

export function loadMoreUserMessageChannelError(error) {
    return {
        type: LOAD_MORE_USER_MESSAGE_CHANNEL_ERROR,
        error,
    }
}

export function openUserChatWindowRequest(userDetails, channelId, userPreferences, friendshipStatus) {
    return {
        type: OPEN_USER_CHAT_WINDOW_REQUEST,
        userDetails,
        channelId,
        userPreferences,
        friendshipStatus,
    }
}

export function openUserChatWindowSuccess(data) {
    return {
        type: OPEN_USER_CHAT_WINDOW_SUCCESS,
        data,
    }
}

export function openUserChatWindowError(error) {
    return {
        type: OPEN_USER_CHAT_WINDOW_ERROR,
        error,
    }
}

export function closeUserChatWindow(channelId) {
    return {
        type: CLOSE_USER_CHAT_WINDOW,
        channelId,
    }
}

export function sendNewMessageRequest(data) {
    return {
        type: SEND_NEW_MESSAGE_REQUEST,
        data,
    }
}

export function sendNewMessageSuccess(data) {
    return {
        type: SEND_NEW_MESSAGE_SUCCESS,
        data,
    }
}

export function sendNewMessageError(error) {
    return {
        type: SEND_NEW_MESSAGE_ERROR,
        error,
    }
}

export function receiveNewMessageResponse(data) {
    return {
        type: RECEIVE_NEW_MESSAGE,
        data,
    }
}

export function messageTypingResponse(data) {
    return {
        type: MESSAGE_TYPING_RESPONSE,
        data,
    }
}

export function toggleChatWindowMinimize(channelId, minimize) {
    return {
        type: TOGGLE_CHAT_WINDOW_MINIMIZE,
        channelId,
        minimize,
    }
}

export function setUserMessagesCount(count) {
    return {
        type: SET_USER_MESSAGES_COUNT,
        count,
    }
}

export function getUserChannelRequest() {
    return {
        type: GET_CHANNEL_REQUEST,
    }
}

export function getUserChannelResponse() {
    return {
        type: GET_CHANNEL_RESPONSE,
    }
}

export function moveToGroundUserChatWindow(channelId) {
    return {
        type: MOVE_TO_GROUND_USER_CHAT_WINDOW,
        channelId
    }
}

export function setUserMesagesState(stateData) {
    return {
        type: SET_USER_MESSAGES_STATE,
        stateData
    }
}

export function resetUserMesagesState() {
    return {
        type: RESET_USER_MESSAGES_STATE
    }
}