import React from 'react';
import {AddClientModal, DeleteClientModal} from "../modals";

// class AddDeleteModals extends React.Component {
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             addModal: false
//         };
//
//         this.handleAddToggle = this.handleAddToggle.bind(this);
//     }
//
//     handleAddToggle() {
//         this.setState({
//             addModal: !this.state.addModal
//         });
//     }
//
//     render () {
//         const { addModal } = this.state;
//         const { isAddModalOpen, onSubmit, isDeleteModalOpen, onDeleteToggle, onDelete } = this.props;
//
//         return (
//             <React.Fragment>
//                 <AddClientModal
//                     isOpen={isAddModalOpen}
//                     onToggle={this.handleAddToggle}
//                     onSubmit={onSubmit}
//                 />
//                 <DeleteClientModal
//                     isOpen={isDeleteModalOpen}
//                     onToggle={onDeleteToggle}
//                     onDelete={onDelete}
//                 />
//             </React.Fragment>
//         );
//     }
// }

function AddDeleteModals(
    {
        isAddModalOpen,
        isDeleteModalOpen,
        onAddToggle,
        onSubmit,
        onDeleteToggle,
        onDelete
    }
) {
    return (
        <React.Fragment>
            <AddClientModal
                isOpen={isAddModalOpen}
                onToggle={onAddToggle}
                onSubmit={onSubmit}
            />
            <DeleteClientModal
                isOpen={isDeleteModalOpen}
                onToggle={onDeleteToggle}
                onDelete={onDelete}
            />
        </React.Fragment>
    );
}

export { AddDeleteModals };