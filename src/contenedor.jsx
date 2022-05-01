import React, { Component } from 'react'
import { HashRouter, Route } from 'react-router-dom'
import BandejaCuenta from './cuenta/bandejaCuenta.jsx'

class RoutesClass extends Component {
    constructor(props) {
        super(props);

        this.state = {
            routes: [
                { path: "/", component: BandejaCuenta, exact: true },
                { path: "/test", component: BandejaCuenta, exact: true },
            ]
        };

    }
    
    render = () => {
        return (
            <div >
                <HashRouter >
                    <div>
                        {this.state.routes.map((route, i) => (
                            <Route key={i} exact={route.exact} path={route.path} component={route.component} />
                        ))}
                    </div>
                </HashRouter>
            </div>
        );
    }
}

export default RoutesClass