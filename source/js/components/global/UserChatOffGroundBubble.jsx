import React, { Component } from 'react';
import { ButtonToolbar, Dropdown, MenuItem } from "react-bootstrap";
import { FaComments } from "react-icons/lib/fa";

class UserChatOffGroundBubble extends Component {
    render() {
        const { chatWindows, chatWindowKeys, handleMoveToGround } = this.props;
        return (
            <ButtonToolbar className="off-ground-chats-dd-wrapper">
                <Dropdown id="off-ground-chats-dd" dropup>
                    <Dropdown.Toggle noCaret><FaComments /></Dropdown.Toggle>
                    <Dropdown.Menu className="off-ground-menu-list">
                        {
                            chatWindowKeys.map((key, index) => {
                                var chatWindow = chatWindows[key];
                                var userDetails = chatWindow.userDetails;
                                if (chatWindow && !chatWindow.isOnGround && userDetails) {
                                    return (
                                        <MenuItem key={key} eventKey={key} onClick={() => handleMoveToGround(key)}>
                                            <div className="menu-item-wrap">
                                                <h5>{`${(userDetails.firstName) ? userDetails.firstName : ''} ${(userDetails.lastName) ? userDetails.lastName : ''}`}</h5>
                                                <button type="button" onClick={(e) => this.handleClose(e, key)} className="menu-item-close"><i className="icon-cancel"></i></button>
                                            </div>
                                        </MenuItem>
                                    );
                                }
                            })
                        }
                    </Dropdown.Menu>
                </Dropdown>
            </ButtonToolbar>
        );
    }

    handleClose = (e, channelId) => {
        e.stopPropagation();
        const { closeWindow } = this.props;
        closeWindow(channelId);
    }

}

export default UserChatOffGroundBubble;