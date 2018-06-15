import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import { SERVER_BASE_URL } from '../constants/consts';
class SocketDemo extends Component {
    constructor(props) {
        super(props);
        const socket = openSocket(SERVER_BASE_URL);
        this.state = {
            username: '',
            receiver: '',
            msg: '',
            allMsg: [],
        }
        socket.on('sendMessage', (msg) => {
            var allMsg = this.state.allMsg;
            allMsg.push(msg);
            this.setState({ allMsg });
        })
    }

    render() {
        return (
            <div className="chat-demo">
                Enter Username : <input
                    type="text"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                />
                <button type="button" onClick={this.connect}>Connect</button>

                <br />

                Receiver Username : <input
                    type="text"
                    name="receiver"
                    value={this.state.receiver}
                    onChange={this.handleChange}
                />

                <br />

                Enter Message : <textarea
                    name="msg"
                    value={this.state.msg}
                    onChange={this.handleChange}
                />
                <button type="button" onClick={this.sendMsg}>Send</button>

                {this.state.allMsg && this.state.allMsg.length > 0 &&
                    this.state.allMsg.map((msg, index) => {
                        return (
                            <p key={index}>{msg.msg}</p>
                        )
                    })
                }
            </div>
        );
    }

    connect = () => {
        socket.emit('joinUser', this.state.username);
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    sendMsg = () => {
        const { receiver, msg } = this.state;
        socket.emit('recieveMessage', { receiver, msg });
    }
}

export default SocketDemo;