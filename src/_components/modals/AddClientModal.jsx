import React from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

export const AddClientModal = ({ isOpen, onToggle, onSubmit }) => {
    return (
        <Modal isOpen={isOpen} toggle={onToggle} centered>
            <ModalHeader toggle={onToggle}>Create a new client</ModalHeader>
            <ModalBody>
                <form onSubmit={onSubmit}>
                    <input type='text' name='username' placeholder='Name' />
                    <input type='email' name='email' placeholder='Email' />
                    <input type='tel' name='phone' placeholder='Phone' />
                    <input type='text' name='address' placeholder='Address' />
                    {/* <input type='file' name='file' placeholder='Avatar' /> */}
                    <Button color='success'>Create</Button>
                </form>
            </ModalBody>
        </Modal>
    );
}
 