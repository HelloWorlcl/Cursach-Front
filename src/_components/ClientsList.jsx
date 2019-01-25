import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from 'react-table';
import { Button, Input } from 'reactstrap';
import { Menu } from './shared';
import { SERVER_SETTINGS } from '../_constants';
import { AddClientModal, DeleteClientModal } from './modals';

class ClientsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isBatchEdit: false,
            editedData: {},
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

        this.createUser = this.createUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);

        this.prepareEditQuery = this.prepareEditQuery.bind(this);
        this.prepareEditDataToBeSent = this.prepareEditDataToBeSent.bind(this);
        this.prepareBatchEditQuery = this.prepareBatchEditQuery.bind(this);
        this.prepareSingleEditQuery = this.prepareSingleEditQuery.bind(this);
        this.prepareSingleEditDataToBeSent = this.prepareSingleEditDataToBeSent.bind(this);
        this.getFirstEditedUserId = this.getFirstEditedUserId.bind(this);
        this.getUpdatedData = this.getUpdatedData.bind(this);
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
                        <Input type='checkbox' />
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
            },
            {
                Header: 'Avatar',
                accessor: 'avatar',
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

    handleDeleteToggle() {
        this.setState({
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

    handleEdit() {
        this.editUser();
    }

    handleDelete(userId) {
        this.deleteUser(userId);
        this.handleDeleteToggle();
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
        const { url, batchEdit, clients } = SERVER_SETTINGS;

        return url + batchEdit + clients;
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

    deleteUser(userId) {
        console.log(`User with id = ${userId} was deleted`);
    }

    render() {
        const { data, editedData, addModal } = this.state;
        const isEmptyEditedData = !Object.keys(editedData).length;

        return (
            <React.Fragment>
                <Menu />
                <ReactTable
                    data={data}
                    columns={this.columns}
                    className='list-table'
                />
                <Button color='success' onClick={this.handleAddToggle}><i className="fas fa-user-plus"></i></Button>
                <AddClientModal
                    isOpen={addModal}
                    onToggle={this.handleAddToggle}
                    onSubmit={this.handleSubmit}
                />
                <DeleteClientModal
                    isOpen={this.state.deleteModal}
                    onToggle={this.handleDeleteToggle}
                    onDelete={() => this.handleDelete(row.original.id)}
                />
                <Button color='warning' disabled={isEmptyEditedData} onClick={this.handleEdit}>Save</Button>
                <Button color='danger' disabled onClick={this.handleDelete}>Delete</Button>
            </React.Fragment>
         );
    }
}
 
export default ClientsList;
