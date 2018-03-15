var io = require('socket.io')();
var socketFunction = {}
socketFunction.socketStartUp = function (server) {
    io.attach(server);
    io.on('connection', function (socket) {
        console.log("New user is connected with socket:", socket.id);
    })
}
module.exports = socketFunction;