import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ResetConfirmation = (props) => {
    const { show, handleYes, handleClose } = props;
    return (
        <div className="reset-confirmation-wrapper">
            <Modal show={show}>
                <Modal.Header>
                    <Modal.Title>Reset</Modal.Title>
                </Modal.Header>

                <Modal.Body>Are you sure you want to reset?</Modal.Body>

                <Modal.Footer>
                    <Button onClick={handleClose}>No</Button>
                    <Button bsStyle="warning" onClick={handleYes}>Yes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ResetConfirmation;