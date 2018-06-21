import { Map } from "immutable";
import {
    GET_USER_MESSAGE_CHANNEL_REQUEST,
    GET_USER_MESSAGE_CHANNEL_SUCCESS,
    GET_USER_MESSAGE_CHANNEL_ERROR,
} from "../actions/userMessages";

const initialState = Map({
    panelChannelLoading: false,
    panelChannels: [],
    panelChannelError: [],
    channelLoading: false,
    channels: [],
    channelError: [],
    setStateFor: '',
});

const actionMap = {
    [GET_USER_MESSAGE_CHANNEL_REQUEST]: (state, action) => {
        var newState = {
            loading: true,
            channels: [],
            error: [],
        }
        var customState = handleSetStateFor(action.setStateFor, newState, state);
        return state.merge(Map(customState));
    },
    [GET_USER_MESSAGE_CHANNEL_SUCCESS]: (state, action) => {
        var newState = {
            loading: false,
        };
        if (action.data.status === 1) {
            newState.channels = action.data.channels;
        } else {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.error = [msg];
        }
        var setStateFor = state.get('setStateFor');
        var customState = handleSetStateFor(setStateFor, newState, state);
        return state.merge(Map(customState));
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
            loading: false,
            error: error,
        }
        var setStateFor = state.get('setStateFor');
        var customState = handleSetStateFor(setStateFor, newState, state);
        return state.merge(Map(customState));
    },
}

function handleSetStateFor(setStateFor, state, prevState) {
    var newState = {};
    prevState.forEach((value, key) => {
        newState[key] = value;
    });
    if (setStateFor === 'messenger') {
        newState = {
            channelLoading: (typeof state.loading !== 'undefined') ? state.loading : prevState.get('channelLoading'),
            channels: (typeof state.channels !== 'undefined') ? state.channels : prevState.get('channels'),
            channelError: (typeof state.error !== 'undefined') ? state.error : prevState.get('channelError'),
            setStateFor: 'messenger',
        }
    } else if (setStateFor === 'messages_panel') {
        newState = {
            panelChannelLoading: (typeof state.loading !== 'undefined') ? state.loading : prevState.get('panelChannelLoading'),
            panelChannels: (typeof state.channels !== 'undefined') ? state.channels : prevState.get('panelChannels'),
            panelChannelError: (typeof state.error !== 'undefined') ? state.error : prevState.get('panelChannelError'),
            setStateFor: 'messages_panel',
        }
    }
    return newState;
}

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}