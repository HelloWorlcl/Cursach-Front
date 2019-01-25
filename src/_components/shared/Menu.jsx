import React, { Component } from 'react';
import { BrowserRouter, Route, Link  } from 'react-router-dom';
import { default as BurgerMenu }  from '../../Menu/Menu';

class Menu extends Component {
    render () {
        return (
            <BurgerMenu>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/clients">Clients</Link></li>
                    <li><Link to="/cars">Cars</Link></li>
                    <li><Link to="/breakdowns">Breakdowns</Link></li>
                    <li><Link to="/client/cars">Client Cars</Link></li>
                    <li><Link to="/car/breakdowns">Car Breakdowns</Link></li>
                </ul>
            </BurgerMenu>
        );
    }
};

export { Menu };
