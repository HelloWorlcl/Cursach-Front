import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import ClientsList from '../_components/ClientsList';
import CarsList from '../_components/CarsList'
import BreakdownsList from '../_components/BreakdownsList';
import ClientCarsList from '../_components/ClientCarsList';
import CarBreakdownsList from '../_components/CarBreakdownsList';
import 'react-table/react-table.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <div>
                {alert.message &&
                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                }
                <Router history={history}>
                    <div>
                        <PrivateRoute exact path="/" component={HomePage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <PrivateRoute path="/clients" component={ClientsList} />
                        <PrivateRoute path="/cars" component={CarsList} />
                        <PrivateRoute path="/breakdowns" component={BreakdownsList} />
                        <PrivateRoute path="/client/cars" component={ClientCarsList} />
                        <PrivateRoute path="/car/breakdowns" component={CarBreakdownsList} />
                    </div>
                </Router>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };