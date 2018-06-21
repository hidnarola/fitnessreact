export const GET_USER_MESSAGE_CHANNEL_REQUEST = 'GET_USER_MESSAGE_CHANNEL_REQUEST';
export const GET_USER_MESSAGE_CHANNEL_SUCCESS = 'GET_USER_MESSAGE_CHANNEL_SUCCESS';
export const GET_USER_MESSAGE_CHANNEL_ERROR = 'GET_USER_MESSAGE_CHANNEL_ERROR';

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