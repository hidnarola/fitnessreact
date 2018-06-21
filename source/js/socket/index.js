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