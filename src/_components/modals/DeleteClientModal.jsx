import React from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

export const DeleteClientModal = ({ isOpen, onToggle, onDelete }) => {
    return (
        <Modal isOpen={isOpen} toggle={onToggle} centered>
            <ModalHeader toggle={onToggle}>Do you really want to delete the user?</ModalHeader>
            <ModalBody>
                <Button onClick={onDelete} color='danger'>Yes</Button>
                <Button onClick={onToggle} color='success'>No</Button>
            </ModalBody>
        </Modal>
    );
}
 