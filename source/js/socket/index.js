export const receiveUserNotificationCount = (socket, callback) => {
    socket.on('receive_user_notification_count', (data) => {
        callback(data);
    });
}

export const receiveUserMessagesCount = (socket, callback) => {
    socket.on('receive_user_messages_count', (data) => {
        callback(data);
    });
}

export const receiveUsersConversationChannels = (socket, callback) => {
    socket.on('receive_users_conversation_channel', (data) => {
        callback(data);
    });
}

export const receiveUsersConversationByChannel = (socket, callback) => {
    socket.on('receive_users_conversation_by_channel', (data) => {
        callback(data);
    });
}

export const receiveSentNewMessageResponse = (socket, callback) => {
    socket.on('receive_sent_new_message_response', (data) => {
        callback(data);
    });
}

export const receiveNewMessage = (socket, callback) => {
    socket.on('receive_new_message', (data) => {
        callback(data);
    });
}

export const messageTypingStart = (socket, callback) => {
    socket.on('message_typing_start', (data) => {
        callback(data);
    });
}

export const messageTypingStop = (socket, callback) => {
    socket.on('message_typing_stop', (data) => {
        callback(data);
    });
}

export const receiveChannelId = (socket, callback) => {
    socket.on('receive_channel_id', (data) => {
        callback(data);
    });
}

export const receiveUserFriendRequestsCount = (socket, callback) => {
    socket.on('receive_user_friends_count', (data) => {
        callback(data);
    });
}

export const receiveLoggedUserFriends = (socket, callback) => {
    socket.on('receive_logged_user_friends', (data) => {
        console.log('receive_logged_user_friends => ', data);
        callback(data);
    });
}

export const receiveOnlineFriendStatus = (socket, callback) => {
    socket.on('receive_online_friend_status', (data) => {
        callback(data);
    });
}