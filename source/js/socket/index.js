export const receiveUserNotificationCount = (socket, callback) => {
    socket.on('receive_user_notification_count', (data) => {
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