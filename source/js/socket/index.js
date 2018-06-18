export const receiveUserNotificationCount = (socket, callback) => {
    socket.on('receive_user_notification_count', (data) => {
        callback(data);
    });
}