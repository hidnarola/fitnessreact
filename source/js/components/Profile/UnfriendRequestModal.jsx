import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const UnfriendRequestModal = (props) => {
    const { show, handleYes, handleClose } = props;
    return (
        <div className="cancel-friend-request-modal-wrapper">
            <Modal show={show}>
                <Modal.Header>
                    <Modal.Title>Cancel request</Modal.Title>
                </Modal.Header>

                <Modal.Body>Are you sure you want to unfriend?</Modal.Body>

                <Modal.Footer>
                    <Button onClick={handleClose}>No</Button>
                    <Button bsStyle="danger" onClick={handleYes}>Yes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default UnfriendRequestModal;