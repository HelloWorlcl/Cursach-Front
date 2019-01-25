import React, { Component } from 'react';
import { Menu } from './shared';
import ReactTable from 'react-table';
import { CARS_COLUMNS } from './../_constants';

class ClientCarsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
    }


    render() { 
        return (
            <React.Fragment>
                <Menu />
                <ReactTable
                    // data={}
                    columns={CARS_COLUMNS}
                    className='list-table'
                />
            </React.Fragment>
         );
    }
}
 
export default ClientCarsList;
