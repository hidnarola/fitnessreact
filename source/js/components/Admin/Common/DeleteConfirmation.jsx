import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteConfirmation = (props) => {
    const { show, handleYes, handleClose } = props;
    return (
        <div className="delete-confirmation-wrapper">
            <Modal show={show}>
                <Modal.Header>
                    <Modal.Title>Delete</Modal.Title>
                </Modal.Header>

                <Modal.Body>Are you sure you want to delete?</Modal.Body>

                <Modal.Footer>
                    <Button onClick={handleClose}>No</Button>
                    <Button bsStyle="danger" onClick={handleYes}>Yes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default DeleteConfirmation;