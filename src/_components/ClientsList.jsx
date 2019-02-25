import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from 'react-table';
import { Button, Input } from 'reactstrap';
import { Menu, ControlButtons, AddDeleteModals } from './shared';
import { SERVER_SETTINGS } from '../_constants';

class ClientsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isbatchEdit: false,
            isBatchDelete: false,
            editedData: {},
            userIdToBeDeleted: null,
            userIdsToBeDeleted: [],
            addModal: false,
            deleteModal: false
        };

        this.columns = this.initColumns();

        this.renderEditable = this.renderEditable.bind(this);

        this.handleAddToggle = this.handleAddToggle.bind(this);
        this.handleDeleteToggle = this.handleDeleteToggle.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        this.createUser = this.createUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);

        this.prepareEditQuery = this.prepareEditQuery.bind(this);
        this.prepareDeleteQuery = this.prepareDeleteQuery.bind(this);

        this.prepareEditDataToBeSent = this.prepareEditDataToBeSent.bind(this);
        this.prepareSingleEditDataToBeSent = this.prepareSingleEditDataToBeSent.bind(this);

        this.prepareBatchEditQuery = this.prepareBatchEditQuery.bind(this);
        this.prepareSingleEditQuery = this.prepareSingleEditQuery.bind(this);

        this.getFirstEditedUserId = this.getFirstEditedUserId.bind(this);
        this.getUpdatedData = this.getUpdatedData.bind(this);

        this.buildIdBatchQuery = this.buildIdBatchQuery.bind(this);
    }

    componentDidMount() {
        const { url, clients } = SERVER_SETTINGS;
        const query = url + clients;

        axios.get(query)
            .then(response => {
                this.setState({
                    data: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    initColumns() {
        return [
            {
                id: 'select',
                Header: 'Select',
                width: 75,
                Cell: row => (
                    <React.Fragment>
                        <Input
                            type="checkbox"
                            className='select-checkbox'
                            onChange={this.handleInputChange}
                            data-index={row.original.id}
                        />
                    </React.Fragment>
                )
            },
            {
                id: 'delete',
                Header: 'Delete',
                width: 75,
                Cell: row => (
                    <React.Fragment>
                        <Button onClick={this.handleDeleteToggle} color='danger' data-index={row.original.id}>
                            <i className='fas fa-user-minus' data-index={row.original.id}></i>
                        </Button>
                    </React.Fragment>
                )
            },
            {
                Header: 'Name',
                accessor: 'name',
                Cell: this.renderEditable.bind(this)
            },
            {
                Header: 'Email',
                accessor: 'email',
                Cell: this.renderEditable.bind(this)
            },
            {
                Header: 'Phone',
                accessor: 'phone',
                Cell: this.renderEditable.bind(this)
            },
            {
                Header: 'Address',
                accessor: 'address',
                Cell: this.renderEditable.bind(this)
            }
        ];
    }

    renderEditable(cellInfo) {
        const { data } = this.state;

        return (
            <div
                style={{ backgroundColor: '#fafafa' }}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const { editedData } = this.state;
                    let isBatchEdit = false;

                    editedData[cellInfo.original.id] = {
                        ...editedData[cellInfo.index],
                        [cellInfo.column.id]: e.target.innerText
                    };
                    
                    if (Object.keys(editedData).length > 1) {
                        isBatchEdit = true;
                    }

                    this.setState({ editedData, isBatchEdit });
                }}
                dangerouslySetInnerHTML={{
                    __html: data[cellInfo.index][cellInfo.column.id]
                }}
            />
        );
    } 

    handleAddToggle() {
        this.setState({
            addModal: !this.state.addModal
        });
    }

    handleDeleteToggle(event = null, batchDelete = false) {
        let userId = null;

        if (event && !batchDelete) {
            userId = +event.target.dataset.index;
        }

        this.setState({
            batchDelete,
            userIdToBeDeleted: userId,
            deleteModal: !this.state.deleteModal
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        const { username, email, phone, address } = e.target;
        const data = {
            name: username.value,
            email: email.value,
            phone: phone.value,
            address: address.value
        };

        this.createUser(data);
        this.handleAddToggle();
    }
    
    createUser(data) {
        const { url, clients } = SERVER_SETTINGS;
        const query = url + clients;

        axios.post(query, data)
            .then(response => {
                const createdUser = response.data;

                this.setState({
                    data: [...this.state.data, createdUser]
                });
            })
            .catch(error => console.log(error));
    }

    handleEdit() {
        this.editUser();
    }

    editUser() {
        const query = this.prepareEditQuery();
        const dataToBeSent = this.prepareEditDataToBeSent();

        axios.patch(query, dataToBeSent)
            .then(response => {
                const data = this.getUpdatedData(response.data)
                
                this.setState({
                    data,
                    editedData: {}
                });
            })
            .catch(error => console.log(error));
    }

    prepareEditQuery() {
        return this.state.isBatchEdit
            ? this.prepareBatchEditQuery()
            : this.prepareSingleEditQuery(this.getFirstEditedUserId());
    }

    getFirstEditedUserId() {
        const { editedData } = this.state;
        const userId = Object.keys(editedData)[0];

        return userId;
    }

    prepareBatchEditQuery() {
        const { url, batch, clients } = SERVER_SETTINGS;

        return url + batch + clients;
    }

    prepareSingleEditQuery(userId) {
        const { url, clients } = SERVER_SETTINGS;

        return url + clients + '/' + userId;
    }

    prepareEditDataToBeSent() {
        return this.state.isBatchEdit
            ? { ...this.state.editedData }
            : this.prepareSingleEditDataToBeSent(this.getFirstEditedUserId());
    }

    prepareSingleEditDataToBeSent(userId) {
        return this.state.editedData[userId];
    }

    getUpdatedData(responseData) {
        const { data } = this.state;

        let updatedData = [];
        let oldUsers = [];
        if (Array.isArray(responseData)) {
            const editedUsersIds = responseData.map(user => user.id);
            oldUsers = data.filter(user => !editedUsersIds.includes(user.id));
            updatedData = [ ...oldUsers, ...responseData ];
        } else {
            oldUsers = data.filter(user => user.id !== responseData.id);
            updatedData = [ ...oldUsers, Object.assign({}, responseData) ]
        }

        return updatedData;
    }

    handleDelete() {
        this.deleteUser(this.prepareDeleteQuery());
        this.handleDeleteToggle();
    }

    prepareDeleteQuery() {
        const { batchDelete, userIdToBeDeleted, userIdsToBeDeleted } = this.state;
        const { url, clients } = SERVER_SETTINGS;
        let userIdQuery = userIdToBeDeleted;
        let completeQuery = url;

        if (batchDelete) {
            completeQuery += this.buildIdBatchQuery();
        } else {
            completeQuery += clients + '/' + userIdQuery
        }
        
        return completeQuery;
    }

    buildIdBatchQuery() {
        const { batch, clients } = SERVER_SETTINGS;
        const { userIdsToBeDeleted } = this.state;
        let idBatchQuery = '?';

        userIdsToBeDeleted.forEach(userId => idBatchQuery += `ids[]=${userId}&`);

        return batch + clients + idBatchQuery;
    }

    deleteUser(query) {
        const { data, batchDelete } = this.state;
        let { userIdToBeDeleted, userIdsToBeDeleted } = this.state;

        axios.delete(query)
            .then(response => {
                if (response.status === 204) {
                    let updatedData = [];
                    if (batchDelete) {
                        updatedData = data.filter(user => !userIdsToBeDeleted.includes(user.id));
                        userIdsToBeDeleted = [];
                    } else {
                        updatedData = data.filter(user => user.id !== userIdToBeDeleted);
                        userIdToBeDeleted = null;
                    }

                    this.setState({
                        data: updatedData,
                        userIdToBeDeleted,
                        userIdsToBeDeleted
                    });
                }
            })
            .catch(error => console.log(error));
    }
    
    handleInputChange(event) {
        const userId = +event.target.dataset.index;
        let { userIdsToBeDeleted } = this.state;

        if (event.target.checked) {
            userIdsToBeDeleted.push(userId);
        } else {
            userIdsToBeDeleted = userIdsToBeDeleted.filter(oldUserId => oldUserId !== userId);
        }

        this.setState({ userIdsToBeDeleted });
    }

    render() {
        const {
            data,
            editedData,
            userIdsToBeDeleted,
            addModal,
            deleteModal
        } = this.state;
        const isEmptyEditedData = !Object.keys(editedData).length;
        const isEmptyUserIdsToBeDeleted = !userIdsToBeDeleted.length;

        return (
            <React.Fragment>
                <Menu />
                <ControlButtons
                    isEmptyEditedData={isEmptyEditedData}
                    isEmptyUserIdsToBeDeleted={isEmptyUserIdsToBeDeleted}
                    onAddClick={this.handleAddToggle}
                    onSaveClick={this.handleEdit}
                    onDeleteClick={this.handleDeleteToggle}
                />
                <ReactTable
                    data={data}
                    columns={this.columns}
                    className='list-table'
                />
                <AddDeleteModals
                    isAddModalOpen={addModal}
                    isDeleteModalOpen={deleteModal}
                    onAddToggle={this.handleAddToggle}
                    onDeleteToggle={this.handleDeleteToggle}
                    onSubmit={this.handleSubmit}
                    onDelete={this.handleDelete}
                />
            </React.Fragment>
         );
    }
}
 
export default ClientsList;
