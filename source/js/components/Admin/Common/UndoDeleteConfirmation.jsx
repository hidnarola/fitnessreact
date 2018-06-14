import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const UndoDeleteConfirmation = (props) => {
    const { show, handleYes, handleClose } = props;
    return (
        <div className="undo-delete-confirmation-wrapper">
            <Modal show={show}>
                <Modal.Header>
                    <Modal.Title>Recover</Modal.Title>
                </Modal.Header>

                <Modal.Body>Are you sure you want to recover data?</Modal.Body>

                <Modal.Footer>
                    <Button onClick={handleClose}>No</Button>
                    <Button bsStyle="warning" onClick={handleYes}>Yes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default UndoDeleteConfirmation;