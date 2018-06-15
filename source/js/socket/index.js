export const receiveNotification = (socket, callback) => {
    socket.on('receive_notification', (data) => {
        console.log(data);
        callback(data);
    });
}