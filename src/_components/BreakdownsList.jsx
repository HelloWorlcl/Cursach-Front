import React, { Component } from 'react';
import { Menu } from './shared';
import ReactTable from 'react-table';


class BreakdownsList extends Component {
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


            </React.Fragment>
         );
    }
}
 
export default BreakdownsList;
