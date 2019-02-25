import React from 'react';
import { Input, Button }from 'reactstrap';
//TODO: This component is not used now, because I don't know how to implement it via the columns prop
class ClientTableHeader extends React.Component {
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

    render () {
        const { onInputChange, onDeleteClick } = this.props;

        return ([
            {
                id: 'select',
                Header: 'Select',
                width: 75,
                Cell: row => (
                    <React.Fragment>
                        <Input
                            type="checkbox"
                            className='select-checkbox'
                            onChange={onInputChange}
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
                        <Button onClick={onDeleteClick} color='danger' data-index={row.original.id}>
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
        ]);
    };
}

export { ClientTableHeader };
