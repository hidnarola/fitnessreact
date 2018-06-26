export const GET_USER_MESSAGE_CHANNEL_REQUEST = 'GET_USER_MESSAGE_CHANNEL_REQUEST';
export const GET_USER_MESSAGE_CHANNEL_SUCCESS = 'GET_USER_MESSAGE_CHANNEL_SUCCESS';
export const GET_USER_MESSAGE_CHANNEL_ERROR = 'GET_USER_MESSAGE_CHANNEL_ERROR';

export const OPEN_USER_CHAT_WINDOW_REQUEST = 'OPEN_USER_CHAT_WINDOW_REQUEST';
export const OPEN_USER_CHAT_WINDOW_SUCCESS = 'OPEN_USER_CHAT_WINDOW_SUCCESS';
export const OPEN_USER_CHAT_WINDOW_ERROR = 'OPEN_USER_CHAT_WINDOW_ERROR';

export const SEND_NEW_MESSAGE_REQUEST = 'SEND_NEW_MESSAGE_REQUEST';
export const SEND_NEW_MESSAGE_SUCCESS = 'SEND_NEW_MESSAGE_SUCCESS';
export const SEND_NEW_MESSAGE_ERROR = 'SEND_NEW_MESSAGE_ERROR';

export const RECEIVE_NEW_MESSAGE = 'RECEIVE_NEW_MESSAGE';

export const CLOSE_USER_CHAT_WINDOW = 'CLOSE_USER_CHAT_WINDOW';

export function getUserMessageChannelRequest(setStateFor = 'messenger') {
    return {
        type: GET_USER_MESSAGE_CHANNEL_REQUEST,
        setStateFor,
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

export function openUserChatWindowRequest(userDetails, channelId) {
    return {
        type: OPEN_USER_CHAT_WINDOW_REQUEST,
        userDetails,
        channelId,
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