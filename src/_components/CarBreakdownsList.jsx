import React, { Component } from 'react';
import { Menu } from './shared';
import ReactTable from 'react-table';
import { CARS_COLUMNS } from './../_constants';

class CarBreakdownsList extends Component {
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
 
export default CarBreakdownsList;
