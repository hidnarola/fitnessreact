import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import { SERVER_BASE_URL, LOCALSTORAGE_USER_DETAILS_KEY, FITASSIST_USER_DETAILS_TOKEN_KEY } from '../constants/consts';
import jwt from "jwt-simple";
class SocketDemo extends Component {
    constructor(props) {
        super(props);
        const socket = openSocket(SERVER_BASE_URL);
        var idDetailsToken = localStorage.getItem(LOCALSTORAGE_USER_DETAILS_KEY);
        var userDetails = (idDetailsToken) ? jwt.decode(idDetailsToken, FITASSIST_USER_DETAILS_TOKEN_KEY) : {};
        console.log(userDetails);
        socket.emit('join', userDetails);
    }

    render() {
        return (
            <div className="chat-demo">
                <h1>Join</h1>
            </div>
        );
    }
}

export default SocketDemo;