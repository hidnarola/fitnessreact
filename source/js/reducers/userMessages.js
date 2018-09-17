import { Map } from "immutable";
import {
    GET_USER_MESSAGE_CHANNEL_REQUEST,
    GET_USER_MESSAGE_CHANNEL_SUCCESS,
    GET_USER_MESSAGE_CHANNEL_ERROR,
    OPEN_USER_CHAT_WINDOW_REQUEST,
    OPEN_USER_CHAT_WINDOW_SUCCESS,
    OPEN_USER_CHAT_WINDOW_ERROR,
    CLOSE_USER_CHAT_WINDOW,
    SEND_NEW_MESSAGE_REQUEST,
    SEND_NEW_MESSAGE_SUCCESS,
    SEND_NEW_MESSAGE_ERROR,
    RECEIVE_NEW_MESSAGE,
    MESSAGE_TYPING_RESPONSE,
    TOGGLE_CHAT_WINDOW_MINIMIZE,
    SET_USER_MESSAGES_COUNT,
    GET_CHANNEL_REQUEST,
    GET_CHANNEL_RESPONSE,
} from "../actions/userMessages";
import _ from "lodash";

const initialState = Map({
    panelChannelStart: 0,
    panelChannelLimit: 10,
    panelChannelLoading: false,
    panelChannels: [],
    panelChannelError: [],
    chatWindows: {},
    unreadMessagesCount: 0,
    requestChannelLoading: false,
});

const actionMap = {
    [GET_USER_MESSAGE_CHANNEL_REQUEST]: (state, action) => {
        var newState = {
            panelChannelStart: action.requestData.start,
            panelChannelLimit: action.requestData.limit,
            panelChannelLoading: true,
            panelChannels: [],
            panelChannelError: [],
        }
        return state.merge(Map(newState));
    },
    [GET_USER_MESSAGE_CHANNEL_SUCCESS]: (state, action) => {
        var newState = {
            panelChannelLoading: false,
        };
        if (action.data.status === 1) {
            newState.panelChannels = action.data.channels;
        } else {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.panelChannelError = [msg];
        }
        return state.merge(Map(newState));
    },
    [GET_USER_MESSAGE_CHANNEL_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        var newState = {
            panelChannelLoading: false,
            panelChannelError: error,
        }
        return state.merge(Map(newState));
    },
    [OPEN_USER_CHAT_WINDOW_REQUEST]: (state, action) => {
        var chatWindows = Object.assign({}, state.get('chatWindows'));
        var userDetails = action.userDetails;
        var channelId = action.channelId;
        var obj = {
            loading: true,
            userDetails,
            messages: [],
            isMinimized: false,
            isTyping: false,
        };
        chatWindows[channelId] = obj;
        return state.merge(Map({
            chatWindows,
        }));
    },
    [OPEN_USER_CHAT_WINDOW_SUCCESS]: (state, action) => {
        var chatWindows = Object.assign({}, state.get('chatWindows'));
        if (action.data.status === 1) {
            var channel = action.data.channel;
            if (channel && Object.keys(channel).length > 0) {
                var channelId = channel._id;
                var chatWindow = chatWindows[channelId];
                var messages = chatWindow['messages'];
                var userDetails = chatWindow['userDetails'];
                var newMessages = channel.messages;
                var allMessages = _.concat(messages, newMessages);
                var obj = {
                    loading: false,
                    userDetails,
                    messages: allMessages,
                    isMinimized: false,
                    isTyping: false,
                };
                chatWindows[channelId] = obj;
            }
        } else {

        }
        return state.merge(Map({
            chatWindows,
        }));
    },
    [OPEN_USER_CHAT_WINDOW_ERROR]: (state, action) => {
        var chatWindows = Object.assign({}, state.get('chatWindows'));
        return state.merge(Map({
            chatWindows,
        }));
    },
    [CLOSE_USER_CHAT_WINDOW]: (state, action) => {
        var chatWindows = Object.assign({}, state.get('chatWindows'));
        var channelId = action.channelId;
        var isWindowOpen = chatWindows.hasOwnProperty(channelId);
        if (isWindowOpen) {
            delete chatWindows[channelId];
        }
        return state.merge(Map({
            chatWindows,
        }));
    },
    [SEND_NEW_MESSAGE_REQUEST]: (state, action) => {
        var chatWindows = Object.assign({}, state.get('chatWindows'));
        var data = action.data;
        var channelId = data.channelId;
        var isWindowOpen = chatWindows.hasOwnProperty(channelId);
        if (isWindowOpen) {
            var loggedUser = data.loggedUser;
            var message = data.message;
            var createdAt = data.createdAt;
            var timestamp = data.timestamp;
            var msgs = chatWindows[channelId].messages;
            var newMsg = {
                _id: null,
                isSeen: 0,
                message: message,
                createdAt: createdAt,
                firstName: loggedUser.firstName,
                lastName: (loggedUser.lastName) ? loggedUser.lastName : '',
                authUserId: loggedUser.authUserId,
                username: loggedUser.username,
                avatar: loggedUser.avatar,
                flag: 'sent',
                timestamp: timestamp,
                isLoading: true,
            }
            msgs.push(newMsg);
            chatWindows[channelId].messages = msgs;
        }
        return state.merge(Map({
            chatWindows,
        }));
    },
    [SEND_NEW_MESSAGE_SUCCESS]: (state, action) => {
        var chatWindows = Object.assign({}, state.get('chatWindows'));
        if (action.data.status === 1) {
            var channel = action.data.channel;
            if (channel && Object.keys(channel).length > 0) {
                var channelId = channel._id;
                var chatWindow = chatWindows[channelId];
                var messages = chatWindow['messages'];
                var metadata = channel.metadata;
                var timestamp = metadata.timestamp;
                var localAppendedMsgIndex = _.findIndex(messages, ['timestamp', timestamp]);
                if (localAppendedMsgIndex >= 0) {
                    messages.splice(localAppendedMsgIndex, 1, channel.message);
                }
            }
        } else {

        }
        return state.merge(Map({
            chatWindows,
        }));
    },
    [SEND_NEW_MESSAGE_ERROR]: (state, action) => {
        var chatWindows = Object.assign({}, state.get('chatWindows'));
        return state.merge(Map({
            chatWindows,
        }));
    },
    [RECEIVE_NEW_MESSAGE]: (state, action) => {
        var chatWindows = Object.assign({}, state.get('chatWindows'));
        if (action.data.status === 1) {
            var channel = action.data.channel;
            if (channel && Object.keys(channel).length > 0) {
                var channelId = channel._id;
                var chatWindow = chatWindows[channelId];
                if (chatWindow) {
                    var messages = chatWindow['messages'];
                    messages.push(channel.message);
                }
            }
        } else {

        }
        return state.merge(Map({
            chatWindows,
        }));
    },
    [MESSAGE_TYPING_RESPONSE]: (state, action) => {
        var chatWindows = Object.assign({}, state.get('chatWindows'));
        if (action.data.status === 1) {
            var channel = action.data.channel;
            if (channel && Object.keys(channel).length > 0) {
                var channelId = channel._id;
                var isTyping = (typeof channel.isTyping !== 'undefined') ? channel.isTyping : false;
                var chatWindow = chatWindows[channelId];
                if (chatWindow) {
                    chatWindow.isTyping = isTyping;
                }
            }
        } else {

        }
        return state.merge(Map({
            chatWindows,
        }));
    },
    [TOGGLE_CHAT_WINDOW_MINIMIZE]: (state, action) => {
        var chatWindows = Object.assign({}, state.get('chatWindows'));
        var channelId = action.channelId;
        var isWindowOpen = chatWindows.hasOwnProperty(channelId);
        if (isWindowOpen) {
            chatWindows[channelId].isMinimized = (typeof action.minimize !== 'undefined') ? action.minimize : false;
        }
        return state.merge(Map({
            chatWindows,
        }));
    },
    [SET_USER_MESSAGES_COUNT]: (state, action) => {
        return state.merge(Map({
            unreadMessagesCount: action.count,
        }));
    },
    [GET_CHANNEL_REQUEST]: (state, action) => {
        return state.merge(Map({
            requestChannelLoading: true,
        }));
    },
    [GET_CHANNEL_RESPONSE]: (state, action) => {
        return state.merge(Map({
            requestChannelLoading: false,
        }));
    },
}

export default function reducer(state = initialState, action = {}) {
    if (action && action.type) {
        var fn = actionMap[action.type];
        return fn ? fn(state, action) : state;
    }
    return state;
}