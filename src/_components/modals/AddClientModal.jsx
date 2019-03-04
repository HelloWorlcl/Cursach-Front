import React from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

export const AddClientModal = ({ isOpen, onToggle, onSubmit }) => {
    return (
        <Modal isOpen={isOpen} toggle={onToggle} centered>
            <ModalHeader toggle={onToggle}>Create a new client</ModalHeader>
            <ModalBody>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input type='text' name='username' className='form-control' placeholder='Name' required />
                    </div>
                    <div className='form-group'>
                        <input type='email' name='email' className='form-control' placeholder='Email' required />
                    </div>
                    <div className='form-group'>
                        <input type='tel' name='phone' className='form-control' placeholder='Phone' required />
                    </div>
                    <div className='form-group'>
                        <input type='text' name='address' className='form-control' placeholder='Address' required />
                    </div>
                    <div className='form-group'>
                        {/* <input type='file' name='file' placeholder='Avatar' /> */}
                    </div>
                    <Button color='success'>Create</Button>
                </form>
            </ModalBody>
        </Modal>
    );
};
 