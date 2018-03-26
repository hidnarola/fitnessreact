import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteConfirmation = (props) => {
    const { showDeleteModal, handleDelete, closeDeleteModal } = props;
    return (
        <div className="delete-confirmation-wrapper">
            <Modal show={showDeleteModal}>
                <Modal.Header>
                    <Modal.Title>Delete</Modal.Title>
                </Modal.Header>

                <Modal.Body>Are you sure you want to delete?</Modal.Body>

                <Modal.Footer>
                    <Button onClick={closeDeleteModal}>No</Button>
                    <Button bsStyle="danger" onClick={handleDelete}>Yes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default DeleteConfirmation;