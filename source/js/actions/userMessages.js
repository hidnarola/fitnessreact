export const GET_USER_MESSAGE_CHANNEL_REQUEST = 'GET_USER_MESSAGE_CHANNEL_REQUEST';
export const GET_USER_MESSAGE_CHANNEL_SUCCESS = 'GET_USER_MESSAGE_CHANNEL_SUCCESS';
export const GET_USER_MESSAGE_CHANNEL_ERROR = 'GET_USER_MESSAGE_CHANNEL_ERROR';

export const OPEN_USER_CHAT_WINDOW_REQUEST = 'OPEN_USER_CHAT_WINDOW_REQUEST';
export const OPEN_USER_CHAT_WINDOW_SUCCESS = 'OPEN_USER_CHAT_WINDOW_SUCCESS';
export const OPEN_USER_CHAT_WINDOW_ERROR = 'OPEN_USER_CHAT_WINDOW_ERROR';

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